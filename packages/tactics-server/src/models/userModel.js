import databaseService from '../services/databaseService';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import errorFactory from '../factories/errorFactory';

const userModel = databaseService.createModel('User', {
    tableName: 'users',
    hasTimestamps: true,
    hidden: [
        'password',
        'reset_password_token',
        'reset_password_token_expire',
        'refresh_token'
    ],
    bcrypt: { field: 'password' },

    teams() {
        return this.hasMany('Team', 'user_id');
    },

    heroes() {
        return this.belongsToMany('Hero', 'user_heroes', 'hero_id', 'user_id');
    },

    items() {
        return this.belongsToMany('Item', 'user_items', 'item_id', 'user_id');
    },

    async asyncValidators() {
        const { email } = this.attributes;

        let count;
        if (this.isNew()) {
            count = await userModel.query({ where: { email } }).count('id');
        } else {
            count = await userModel
                .query(qb => {
                    qb.where({ email }).andWhere('id', '<>', this.id);
                })
                .count('id');
        }
        if (count > 0) {
            throw errorFactory.invalidField('This email is already in use');
        }
    },

    getValidators() {
        const { password } = this.attributes;
        console.log('user model validators');
        return Joi.object().keys({
            id: Joi.number().positive(),
            username: Joi.string()
                .min(4)
                .max(16)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(4)
                .required(),
            passwordConfirm: Joi.any()
                .only(password)
                .optional(),
            reset_password_token: Joi.any()
                .allow(null)
                .optional(),
            reset_password_token_expire: Joi.number()
                .allow(null)
                .optional(),
            refresh_token: Joi.any()
                .allow(null)
                .optional(),
            created_at: Joi.any().optional(),
            updated_at: Joi.any().optional()
        });
    },

    afterValidate(attrs) {
        delete attrs.passwordConfirm;
    },

    async comparePassword(password) {
        return await bcrypt.compare(password, this.get('password'));
    }
});

export default userModel;
