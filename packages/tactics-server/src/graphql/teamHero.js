export default {
    schema: `
        type TeamHero {
            id: ID
            hero: Hero
            weapon: Item
            armor: Item
            trinket: Item
        }
        
        input TeamHeroInput {
            hero_id: Int!
            weapon_id: Int!
            armor_id: Int!
            trinket_id: Int!
        }

        extend type Query {
            teamhero(id: ID!): TeamHero
        }
    `,

    resolvers: {
        Query: {}
    }
};
