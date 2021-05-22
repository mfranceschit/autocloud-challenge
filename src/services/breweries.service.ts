import { GroupedData, ResponseData } from '@/interfaces/breweries.interface';
import { camelize } from '@/utils/camelize';
import { locateRegion } from '@/utils/coordinates';
import config from 'config';
import fetch from 'node-fetch';

class BreweriesService {


  public retrieveBreweries = async (): Promise<GroupedData> => {
    const url = config.get('dataSource') as string;
    const response = await fetch(url, { method: 'GET' });
    const rawData = await response.json();

    const cleanedFromNullsData = this.removeNullAttributes(rawData)
    const camelizedData = this.camelizeAttributes(cleanedFromNullsData)
    const groupedData = this.groupByState(camelizedData)
    const data = this.calculateRegionForBreweries(groupedData)

    return data;
  };

  public removeNullAttributes = (data: ResponseData[]): ResponseData[] => {
    const noNulls = data.map(result => {
      const cleanedResult = { ...result };
      Object.keys(cleanedResult).forEach(key => cleanedResult[key] === null && delete cleanedResult[key]);
      return cleanedResult;
    });

    return noNulls;
  };

  public camelizeAttributes = (data: ResponseData[]): ResponseData[] => {
    const noSnakes = data.map(result => {
      const camelCaseResult = {};
      Object.keys(result).forEach(key => (camelCaseResult[camelize(key)] = result[key]));
      return camelCaseResult;
    });

    return noSnakes;
  };

  public groupByState = (data: ResponseData[]): GroupedData => {
    const groupedData = data.reduce((current: GroupedData, { state, ...attributes }) => {
      const group = current[state] ? [...current[state], attributes] : [attributes];

      const sortedGroup = group.sort((a, b) => (new Date(b.createdAt) >= new Date(a.createdAt) ? 1 : -1)); // Order by createdAt

      return {
        ...current,
        [state]: sortedGroup,
      };
    }, {});

    return groupedData;
  };

  public calculateRegionForBreweries = (data: GroupedData): GroupedData => {
    let breweriesWithRegion = {};
    for (const key in data) {
      const breweries = data[key]
        .filter(brewery => brewery.latitude !== null && brewery.longitude !== null)
        .map(filteredBrewery => ({
          ...filteredBrewery,
          region: locateRegion({
            lat: parseInt(filteredBrewery.latitude as string),
            lon: parseInt(filteredBrewery.longitude as string),
          }),
        }));

      if (breweries.length > 0) {
        breweriesWithRegion = {
          ...breweriesWithRegion,
          [key]: breweries,
        };
      }
    }

    return breweriesWithRegion;
  };
}

export default BreweriesService;
