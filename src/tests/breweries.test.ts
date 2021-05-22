import BreweriesService from '@services/breweries.service'
import mockedBreweries from './mocks/breweries.mock'

describe('BreweriesService', () => {
  let breweriesService: BreweriesService

  beforeAll(() => {
    breweriesService = new BreweriesService()
  })

  it('Should return an array of breweries without any null attributes', () => {

    const data = breweriesService.removeNullAttributes(mockedBreweries)

    data.map(brewery => {
      Object.keys(brewery).forEach(key => {
        expect(brewery[key]).not.toBeNull()
      })
    })
  });

  it('Should return an array of breweries without any snake_case attributes', () => {

    const data = breweriesService.camelizeAttributes(mockedBreweries)

    data.map(brewery => {
      Object.keys(brewery).forEach(key => {
        expect(key.includes('_')).toBe(false)
      })
    })
  });

  it('Should return an object of breweries grouped by state and sorted by creation', () => {

    const camelizedData = breweriesService.camelizeAttributes(mockedBreweries)
    const data = breweriesService.groupByState(camelizedData)


    expect(Object.keys(data).length).toBe(4)
    expect(data['Iowa'].length).toBe(2)
    expect(data['Iowa'][0]?.id).toBe(10187)

  });
});
