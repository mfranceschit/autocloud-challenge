import { locateRegion } from '@/utils/coordinates';
import BreweriesService from '@services/breweries.service';
import mockedBreweries from './mocks/breweries.mock';

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

// import request from 'supertest';
// import App from '@/app';
// import { CreateUserDto } from '@dtos/users.dto';
// import { User } from '@interfaces/users.interface';
// import userModel from '@models/users.model';
// import UserRoute from '@routes/users.route';

// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });

// describe('Testing Users', () => {
//   describe('[GET] /users', () => {
//     it('response statusCode 200 / findAll', () => {
//       const findUser: User[] = userModel;
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return request(app.getServer()).get(`${usersRoute.path}`).expect(200, { data: findUser, message: 'findAll' });
//     });
//   });

//   describe('[GET] /users/:id', () => {
//     it('response statusCode 200 / findOne', () => {
//       const userId = 1;
//       const findUser: User = userModel.find(user => user.id === userId);
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200, { data: findUser, message: 'findOne' });
//     });
//   });

//   describe('[POST] /users', () => {
//     it('response statusCode 201 / created', async () => {
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4',
//       };
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
//     });
//   });

//   describe('[PUT] /users/:id', () => {
//     it('response statusCode 200 / updated', async () => {
//       const userId = 1;
//       const userData: CreateUserDto = {
//         email: 'test@email.com',
//         password: 'q1w2e3r4',
//       };
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
//     });
//   });

//   describe('[DELETE] /users/:id', () => {
//     it('response statusCode 200 / deleted', () => {
//       const userId = 1;
//       const deleteUser: User[] = userModel.filter(user => user.id !== userId);
//       const usersRoute = new UserRoute();
//       const app = new App([usersRoute]);

//       return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200, { data: deleteUser, message: 'deleted' });
//     });
//   });
// });
