import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import typeormConfig from './typeormConfig';
import { TaskResolver } from './resolvers/task';
export const AppDataSource = new DataSource(typeormConfig);

async function startServer() {
    const app = express();

    // Connect to the database
    await (await AppDataSource.initialize()).runMigrations();

    // Build the GraphQL schema
    const schema = await buildSchema({
        resolvers: [
            TaskResolver
        ],
    });

    const apolloServer = new ApolloServer({ schema });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // Start the server
    app.listen(4000, () => {
        console.log('Server started on http://localhost:4000/graphql');
    });
}


startServer().catch((err) => {
    console.log(err);
});
