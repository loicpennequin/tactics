export default class RestService {
    constructor(model) {
        this.model = model;
    }

    async findAll(filter, options) {
        return (await this.model.findAll(filter, options)).toJSON();
    }

    async findById(id, options) {
        return (await this.model.findById(id, options)).toJSON();
    }

    async create(data) {
        return (await this.model.create(data)).toJSON();
    }

    async update(data, id) {
        return (await this.model.update(data, { id })).toJSON();
    }

    async destroy(id) {
        return (await this.model.destroy(id)).toJSON();
    }
}
