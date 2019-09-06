import databaseService from '../services/databaseService';
import Joi from 'joi';

const heroModel = databaseService.createModel('Hero', {
    tableName: 'heroes',

    getValidators() {
        return Joi.object().keys({
            id: Joi.number().positive(),
            name: Joi.string().required()
        });
    }
});

export default heroModel;
