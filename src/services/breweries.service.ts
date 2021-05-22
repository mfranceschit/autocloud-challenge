import config from 'config';
import fetch from 'node-fetch'

class BreweriesService {

  public retrieveBreweries = async (): Promise<any> => {
    const url = config.get('dataSource') as string
    const response = await fetch(url, { method: 'GET' })

    return response.json()
  }



}

export default BreweriesService;
