import user from './user';
import hero from './hero';
import item from './item';
import team from './team';
import teamHero from './teamHero';

export const schema = `
    type Query {
        _id: Int
    }
    
    type Mutation {
        _id: Int
    }

    ${user.schema}
    ${hero.schema}
    ${item.schema}
    ${team.schema}
    ${teamHero.schema}
`;

export const resolvers = {
    Query: {
        ...user.resolvers.Query,
        ...hero.resolvers.Query,
        ...item.resolvers.Query,
        ...team.resolvers.Query,
        ...teamHero.resolvers.Query
    },

    Mutation: {
        ...user.resolvers.Mutation,
        ...team.resolvers.Mutation
    }
};
