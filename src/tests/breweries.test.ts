import BreweriesService from '@services/breweries.service'
import mockedBreweries from './mocks/breweries.mock'

describe('BreweriesService', () => {
  let breweriesService: BreweriesService

  beforeAll(() => {
    breweriesService = new BreweriesService()
  })

  it('Should return an array of breweries without any null attributes', () => {

    const data = breweriesService.removeNulls(mockedBreweries)

    data.map(brewery => {
      Object.keys(brewery).forEach(key => {
        console.log(key)
        expect(brewery[key]).not.toBeNull()
      })
    })
  });

});
