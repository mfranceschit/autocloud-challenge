import { GroupedData, ResponseData } from '@/interfaces/breweries.interface';
import { camelize } from '@/utils/camelize';
import config from 'config';
import fetch from 'node-fetch';

class BreweriesService {
  public retrieveBreweries = async (): Promise<any> => {
    const url = config.get('dataSource') as string;
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return response.json();
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

      console.log(sortedGroup);
      return {
        ...current,
        [state]: sortedGroup,
      };
    }, {});

    return groupedData;
  };
}

export default BreweriesService;
