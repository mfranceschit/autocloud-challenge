import { Router } from 'express';
import passport from 'passport';
import BreweriesController from '@controllers/breweries.controller';
import Route from '@interfaces/routes.interface';

class BreweriesRoute implements Route {
  public path = '/breweries';
  public router = Router();
  public breweriesController = new BreweriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, passport.authenticate('jwt', { session: false }), this.breweriesController.getBreweries);
  }
}

export default BreweriesRoute;
