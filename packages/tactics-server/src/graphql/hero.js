import errorService from '../services/errorService';

export default {
    schema: `
        type Hero {
            id: ID!
            name: String!
        }

        extend type Query {
            heroes: [Hero!]!
            hero(id: ID!): Hero
        }
    `,

    resolvers: {
        Query: {
            heroes: async (parent, args, { services, session }, info) =>
                await errorService.graphQLWrap(() => services.hero.findAll()),
            hero: async (parent, { id }, { services }, info) =>
                await errorService.graphQLWrap(() => services.hero.findById(id))
        }
    }
};
