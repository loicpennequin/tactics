import knex from 'knex';
import Bookshelf from 'bookshelf';
import ModelBase from 'bookshelf-modelbase';
import modelBasePlus from 'bookshelf-modelbase-plus';
import bookshelfBcrypt from 'bookshelf-bcrypt';
import config from '../config';
import modelFactory from '../factories/modelFactory';
import serviceFactory from '../factories/serviceFactory';

class DatabaseService {
    constructor() {
        this.bookshelfInstance = Bookshelf(knex(config.DB))
            .plugin('visibility')
            .plugin('registry')
            .plugin(modelBasePlus)
            .plugin(bookshelfBcrypt)
            .plugin('pagination');
        this._modelBase = ModelBase(this.bookshelfInstance);
    }

    createModel(name, definition) {
        const model = this._modelBase.extend(modelFactory(definition));
        this.bookshelfInstance.model(name, model);

        return model;
    }
}

export default serviceFactory('databaseService', new DatabaseService());
