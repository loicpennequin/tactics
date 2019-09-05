import databaseService from '../services/databaseService';
import Joi from 'joi';

const teamHeroModel = databaseService.createModel('TeamHero', {
    tableName: 'team_heroes',
    
    hasTimestamps: false,

    owner() {
        return this.belongsTo('User', 'user_id');
    },

    hero() {
        return this.belongsTo('Hero', 'hero_id');
    },
    
    weapon() {
        return this.belongsTo('Item', 'weapon_id');
    },
    
    armor() {
        return this.belongsTo('Item', 'armor_id');
    },
    
    trinket() {
        return this.belongsTo('Item', 'trinket_id');
    },

    getValidators() {
        return Joi.object().keys({
            id: Joi.number().positive(),
            hero_id: Joi.number().positive(),
            weapon_id: Joi.number().positive(),
            armor_id: Joi.number().positive(),
            trinket_id: Joi.number().positive()
        });
    },
});

export default teamHeroModel;