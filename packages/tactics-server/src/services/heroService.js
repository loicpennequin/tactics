import serviceFactory from '../factories/serviceFactory';
import RestService from './restService';
import models from '../models';

export default serviceFactory('heroService', new RestService(models.hero));
