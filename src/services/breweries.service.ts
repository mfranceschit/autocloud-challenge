import config from 'config';
import fetch from 'node-fetch'

class BreweriesService {

  public retrieveBreweries = async (): Promise<any> => {
    const url = config.get('dataSource') as string
    const response = await fetch(url, { method: 'GET' })
    const data = await response.json()
    return response.json()
  }

  public removeNulls = (data: any[]): { [key: string]: string | number }[] => {

    const initial = data
    const noNulls = initial.map((result) => {
      const cleanedResult = {...result}
      Object.keys(cleanedResult).forEach(key => cleanedResult[key] === null && delete cleanedResult[key])


      return cleanedResult
    })

    return noNulls
  }



}

export default BreweriesService;
