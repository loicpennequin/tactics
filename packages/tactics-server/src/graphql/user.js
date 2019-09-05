import errorService from '../services/errorService';

const resolverOptions = {
    withRelated: [
        'items',
        'heroes',
        'teams.hero1',
        'teams.hero2',
        'teams.hero3'
    ]
};

export default {
    schema: `
        type User {
            id: ID!
            email: String!
            username: String!
            gold: Int!
            mmr: Int!
            teams: [Team]
            heroes: [Hero]
            items: [Item]
        }
        
        input UserInput {
            email: String!
            username: String!
            password: String!
            passwordConfirm: String!
        }

        extend type Query {
            users: [User!]!
            user(id: ID!): User
        }

        extend type Mutation {
            createUser(data: UserInput): User!
            updateUser(data: UserInput, id: ID!): User!
        }
    `,

    resolvers: {
        Query: {
            users: async (parent, args, { services, withSession }, info) =>
                await errorService.graphQLWrap(() =>
                    withSession(() =>
                        services.user.findAll(null, resolverOptions)
                    )
                ),
            user: async (parent, { id }, { services, withSession }, info) =>
                await errorService.graphQLWrap(
                    withSession(() =>
                        services.user.findById(id, resolverOptions)
                    )
                )
        },

        Mutation: {
            createUser: async (parent, { data }, { services }, info) =>
                await errorService.graphQLWrap(() =>
                    services.user.create(data)
                ),
            updateUser: async (parent, { data }, { services, withSession }) =>
                await errorService.graphQLWrap(
                    withSession(session => services.user.update(data, session))
                )
        }
    }
};
