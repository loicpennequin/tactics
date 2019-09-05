import Joi from 'joi';
import errorFactory from './errorFactory';

const baseModel = {
    initialize() {
        this.on('saving', this.handleSaving);
    },

    getValidators() {
        return Joi.object();
    },

    handleSaving(model, attrs) {
        return Joi.validate(this.attributes, this.getValidators(), {
            abortEarly: false,
            allowUnknown: true
        })
            .then(async () => {
                if (this.asyncValidators) {
                    await this.asyncValidators();
                }
            })
            .then(async () => {
                if (this.afterValidate) {
                    await this.afterValidate(attrs);
                }
            })
            .catch(err => {
                if (err.isJoi) {
                    throw errorFactory.invalidField(err.details[0].message, err);
                }
                else throw err;
            });
    }
};


export default function createModel(definition) {
    return {
        ...baseModel,
        ...definition
    };
}