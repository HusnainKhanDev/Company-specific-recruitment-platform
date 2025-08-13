import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { CheckAuthentication } from "../MiddleWare/isAuthenticated.js";
import { UsertypeDefs } from "./TypeDefes/UserTypeDefs.js";
import { UserResolvers } from "./Resolvers/UserResolver.js";
import { JobsTypeDefs } from "./TypeDefes/JobTypeDefs.js";
import { JobsResolvers } from "./Resolvers/JobResolver.js";
import { ApplicationsTypeDefs } from "./TypeDefes/ApplicationTypeDefs.js";
import { ApplicationResolvers } from "./Resolvers/ApplicationResolver.js";
export async function StartApolloServer(app) {
    const AllTypeDefs = mergeTypeDefs([UsertypeDefs, JobsTypeDefs, ApplicationsTypeDefs]);
    const AllResolvers = mergeResolvers([UserResolvers, JobsResolvers, ApplicationResolvers]);
    const BaseSchema = makeExecutableSchema({
        typeDefs: AllTypeDefs,
        resolvers: AllResolvers,
    });
    const SchemaWithMiddleware = applyMiddleware(BaseSchema, {
        Mutation: {},
        Query: {}
    });
    const Server = new ApolloServer({
        schema: SchemaWithMiddleware,
        //optional to do just to format error
        formatError: (error) => {
            return {
                message: error.message,
                //extensions is optional,means can or cannot use thats why we put ? in front of it
                statusCode: error.extensions?.statusCode || 500,
                path: error.path,
                code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            };
        }
    });
    await Server.start();
    app.use('/graphql', expressMiddleware(Server, { context: async ({ req, res }) => {
            return CheckAuthentication(req, res);
        }
    }));
}
