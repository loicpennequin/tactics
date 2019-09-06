import databaseService from '../services/databaseService';
import Joi from 'joi';

const teamModel = databaseService.createModel('Team', {
    tableName: 'teams',

    hasTimestamps: false,

    owner() {
        return this.belongsTo('User', 'user_id');
    },

    hero1() {
        return this.belongsTo('TeamHero', 'hero1_id');
    },

    hero2() {
        return this.belongsTo('TeamHero', 'hero2_id');
    },

    hero3() {
        return this.belongsTo('TeamHero', 'hero3_id');
    },

    getValidators() {
        console.log('team model validators');

        return Joi.object().keys({
            id: Joi.number().positive(),
            name: Joi.string().required(),
            hero1_id: Joi.number().positive(),
            hero2_id: Joi.number().positive(),
            hero3_id: Joi.number().positive()
        });
    }
});

export default teamModel;
