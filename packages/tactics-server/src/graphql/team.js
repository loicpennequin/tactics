import errorService from '../services/errorService';

const resolverOptions = {
    withRelated: [
        'hero1.hero',
        'hero1.weapon',
        'hero1.armor',
        'hero1.trinket',
        'hero2.hero',
        'hero2.weapon',
        'hero2.armor',
        'hero2.trinket',
        'hero3.hero',
        'hero3.weapon',
        'hero3.armor',
        'hero3.trinket'
    ]
};

export default {
    schema: `
        type Team {
            id: ID!
            name: String!
            user: User!
            hero1: TeamHero
            hero2: TeamHero
            hero3: TeamHero
        }
        
        input TeamInput {
            name: String!
            hero1: TeamHeroInput
            hero2: TeamHeroInput
            hero3: TeamHeroInput
        }
        
        extend type Query {
            teams: [Team!]
            team(id: ID!): Team
        }

        extend type Mutation {
            createTeam(data: TeamInput): Team!
            updateTeam(data: TeamInput, id: ID!): Team!
        }
    `,

    resolvers: {
        Query: {
            teams: async (parent, args, { services, withSession }) =>
                await errorService.graphQLWrap(
                    withSession(() =>
                        services.team.findAll(null, resolverOptions)
                    )
                ),
            team: async (parent, { id }, { services, withSession }) =>
                await errorService.graphQLWrap(
                    withSession(() =>
                        services.team.findById(id, resolverOptions)
                    )
                )
        },

        Mutation: {
            createTeam: async (parent, { data }, { services, withSession }) =>
                await errorService.graphQLWrap(
                    withSession(session =>
                        services.team.create({ ...data, user_id: session })
                    )
                ),
            updateTeam: async (
                parent,
                { data, id },
                { services, withSession }
            ) =>
                await errorService.graphQLWrap(
                    withSession(session => services.team.update(data, id))
                )
        }
    }
};
