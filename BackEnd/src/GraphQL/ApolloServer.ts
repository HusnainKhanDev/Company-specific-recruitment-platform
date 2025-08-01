import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { expressMiddleware } from "@as-integrations/express5";


import { UsertypeDefs } from "./_Schemas/UserSchema.js";
import { UserResolvers } from "./Resolvers/UserResolver.js";
import { JobsTypeDefs } from "./_Schemas/JobSchema.js";
import { JobsResolvers } from "./Resolvers/JobResolver.js";
import { GraphQLError } from "graphql";


export async function StartApolloServer(app: any){

    const AllTypeDefs = mergeTypeDefs([UsertypeDefs, JobsTypeDefs])
    const AllResolvers = mergeResolvers([UserResolvers, JobsResolvers])

    const Server = new ApolloServer({
        typeDefs: AllTypeDefs,
        resolvers: AllResolvers,
        formatError: (error) => {
            return {
                message: error.message,
                //extensions is optional,means can or cannot use thats why we put ? in front of it
                statusCode: error.extensions?.statusCode || 500,
                path: error.path,
                code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            }
        }
    })

    await Server.start()

    app.use('/graphql', expressMiddleware(Server, {context: async ({req, res})=> {
            return { req, res }
        }
    }))

}