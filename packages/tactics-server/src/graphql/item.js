import errorService from '../services/errorService';

export default {
    schema: `
        type Item {
            id: ID!
            name: String!
        }
        
        extend type Query{
           items: [Item!]!
           item(id: ID!): Item
        }
    `,

    resolvers: {
        Query: {
            items: async (parent, args, { services }, info) =>
                await errorService.graphQLWrap(() => services.item.findAll()),
            item: async (parent, { id }, { services }, info) =>
                await errorService.graphQLWrap(() => services.item.findById(id))
        }
    }
};
