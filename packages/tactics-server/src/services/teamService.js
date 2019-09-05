import serviceFactory from '../factories/serviceFactory';
import models from '../models';
import RestService from './restService';

class TeamService extends RestService {
    async create({ hero1, hero2, hero3, ...data }) {
        const heroPromises = [
            models.teamHero.create(hero1),
            models.teamHero.create(hero2),
            models.teamHero.create(hero3)
        ];
        const [hero1_id, hero2_id, hero3_id] = (await Promise.all(
            heroPromises
        )).map(model => model.toJSON().id);

        return await super.create({ ...data, hero1_id, hero2_id, hero3_id });
    }
}

export default serviceFactory('teamService', new TeamService(models.team));
