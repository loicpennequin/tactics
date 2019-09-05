import { ApolloServer, gql } from 'apollo-server-express';
import { schema, resolvers } from '../graphql';
import models from '../models';
import services from '../services';
import passport from 'passport';
import errorFactory from '../factories/errorFactory';

export default function(app) {
    new ApolloServer({
        typeDefs: gql(schema),
        resolvers,
        context({ req, res }) {
            return new Promise((resolve, reject) => {
                let session;
                passport.authenticate(
                    'jwt',
                    { session: false },
                    async (err, user) => {
                        if (!err && user) {
                            session = user;
                        }
                        resolve({
                            withSession(fn) {
                                if (!session) {
                                    return () => errorFactory.unauthorized();
                                } else {
                                    return () => fn(session);
                                }
                            },
                            models,
                            services
                        });
                    }
                )(req, res);
            });
        }
    }).applyMiddleware({ app: app });
}
