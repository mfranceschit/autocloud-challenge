import App from '@/app';
import request from 'supertest';
import BreweriesRoute from '@routes/breweries.route';
import { locateRegion } from '@/utils/coordinates';
import BreweriesService from '@services/breweries.service';
import mockedBreweries from './mocks/breweries.mock';
import mockedResponse from './mocks/response.mock';
import AuthService from '@/services/auth.service';

jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

describe('Util Coordinates', () => {
  it('Should return the region given the brewery coordinates', () => {
    // Michigan
    expect(
      locateRegion({
        lat: 42.2188971,
        lon: -84.43762976,
      }),
    ).toBe('Midwest');

    // Massachusetts
    expect(locateRegion({ lat: 42.407111, lon: -71.382539 })).toBe('Northeast');

    // Colorado
    expect(locateRegion({ lat: 40.026439, lon: -105.2480158 })).toBe('West');

    // Alabama
    expect(locateRegion({ lat: 32.31813, lon: -86.902198 })).toBe('South');

    // Pennsylvania
    // expect(locateRegion({ lat: 39.9648491, lon: -75.13506341 })).not.toBe('Midwest');
  });
});

describe('BreweriesService', () => {
  let breweriesService: BreweriesService;

  beforeAll(() => {
    breweriesService = new BreweriesService();
  });

  it('Should return an array of breweries without any null attributes', () => {
    const data = breweriesService.removeNullAttributes(mockedBreweries);

    data.map(brewery => {
      Object.keys(brewery).forEach(key => {
        expect(brewery[key]).not.toBeNull();
      });
    });
  });

  it('Should return an array of breweries without any snake_case attributes', () => {
    const data = breweriesService.camelizeAttributes(mockedBreweries);

    data.map(brewery => {
      Object.keys(brewery).forEach(key => {
        expect(key.includes('_')).toBe(false);
      });
    });
  });

  it('Should return an object of breweries grouped by state and sorted by creation', () => {
    const camelizedData = breweriesService.camelizeAttributes(mockedBreweries);
    const data = breweriesService.groupByState(camelizedData);

    expect(Object.keys(data).length).toBe(4);
    expect(data['Iowa'].length).toBe(2);
    expect(data['Iowa'][0]?.id).toBe(10187);
  });

  it('Should return an object of breweries grouped by state and sorted by creation', () => {
    const camelizedData = breweriesService.camelizeAttributes(mockedBreweries);
    const groupedData = breweriesService.groupByState(camelizedData);
    const data = breweriesService.calculateRegionForBreweries(groupedData);

    expect(data['Texas']).toBeUndefined();
    expect(data['Colorado'].length).toBe(1);
    expect(data['Colorado'][0]?.region).toBe('West');
  });
});

describe('[GET] /breweries', () => {
  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });

  it('Should return 401 unauthorized', () => {
    const breweriesRoute = new BreweriesRoute();
    const app = new App([breweriesRoute]);

    return request(app.getServer()).get(`${breweriesRoute.path}`).expect(401, 'Unauthorized');
  });

  it('Should return breweries data after ETL pipeline', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(mockedBreweries))));

    const authService = new AuthService();
    const breweriesRoute = new BreweriesRoute();

    const app = new App([breweriesRoute]);
    const auth = authService.createToken(1); // Create JWT Token with id user 1

    const response = await request(app.getServer())
      .get(`${breweriesRoute.path}`)
      .auth(auth.token, { type: 'bearer' })
      .expect(200);

      expect(response.body.data).toStrictEqual(mockedResponse)
  });
});
