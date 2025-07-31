import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { expressMiddleware } from "@as-integrations/express5";
import { UsertypeDefs } from "./_Schemas/UserSchema.js";
import { UserResolvers } from "./Resolvers/UserResolver.js";
import { JobsTypeDefs } from "./_Schemas/JobSchema.js";
import { JobsResolvers } from "./Resolvers/JobResolver.js";
export async function StartApolloServer(app) {
    const AllTypeDefs = mergeTypeDefs([UsertypeDefs, JobsTypeDefs]);
    const AllResolvers = mergeResolvers([UserResolvers, JobsResolvers]);
    const Server = new ApolloServer({
        typeDefs: AllTypeDefs,
        resolvers: AllResolvers
    });
    await Server.start();
    app.use('/graphql', expressMiddleware(Server, { context: async ({ req, res }) => {
            return { req, res };
        }
    }));
}
