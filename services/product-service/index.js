import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './src/schema.js'

const server = new ApolloServer({
    schema,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
})

console.log(`🚀  Server ready at: ${url}`)