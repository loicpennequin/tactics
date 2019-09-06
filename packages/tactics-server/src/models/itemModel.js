import databaseService from '../services/databaseService';
import Joi from 'joi';

const itemModel = databaseService.createModel('Item', {
    tableName: 'items',

    getValidators() {
        console.log('item model validators');
        return Joi.object().keys({
            id: Joi.number().positive(),
            name: Joi.string().required()
        });
    }
});

export default itemModel;
