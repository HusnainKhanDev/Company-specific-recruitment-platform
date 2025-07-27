import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { expressMiddleware } from "@as-integrations/express5";
import ContextMD from "../MiddleWare/ContextMD.js";

import { UsertypeDefs } from "./_Schemas/UserSchema.js";
import { UserResolvers } from "./Resolvers/UserResolver.js";


export async function StartApolloServer(app: any){

    const AllTypeDefs = mergeTypeDefs([UsertypeDefs])
    const AllResolvers = mergeResolvers([UserResolvers])

    const Server = new ApolloServer({
        typeDefs: AllTypeDefs,
        resolvers: AllResolvers
    })

    await Server.start()

    app.use('/graphql', expressMiddleware(Server, {context: ContextMD}))

}