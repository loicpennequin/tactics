import serviceFactory from '../factories/serviceFactory';
import RestService from './restService';
import models from '../models';

export default serviceFactory(
    'teamHeroService',
    new RestService(models.teamHero)
);
