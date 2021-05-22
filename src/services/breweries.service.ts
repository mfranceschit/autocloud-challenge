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

  public removeNullAttributes = (data: any[]): { [key: string]: string | number }[] => {
    const initial = data;
    const noNulls = initial.map(result => {
      const cleanedResult = { ...result };
      Object.keys(cleanedResult).forEach(key => cleanedResult[key] === null && delete cleanedResult[key]);
      return cleanedResult;
    });

    return noNulls;
  };

  public camelizeAttributes = (data: any[]): { [key: string]: string | number }[] => {
    const initial = data;
    const noNulls = initial.map(result => {
      const camelCaseResult = {};
      Object.keys(result).forEach(key => (camelCaseResult[camelize(key)] = result[key]));
      return camelCaseResult;
    });

    return noNulls;
  };
}

export default BreweriesService;
