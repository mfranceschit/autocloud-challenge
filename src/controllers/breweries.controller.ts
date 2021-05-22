import { NextFunction, Request, Response } from 'express';
import { GroupedData } from '@interfaces/breweries.interface';
import BreweriesService from '@services/breweries.service';

class BreweriesController {
  public breweriesService = new BreweriesService();

  public getBreweries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const breweries: GroupedData = await this.breweriesService.retrieveBreweries();

      res.status(200).json({ data: breweries, message: 'find breweries' });
    } catch (error) {
      next(error);
    }
  };
}

export default BreweriesController;
