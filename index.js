const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')
// gql comes with apollo server 

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

// typedefs are where we define all of 
// our queries etc for GraphQL 
// this is like setting up class attributes but for gql

// -----_TYPE DEFS AND RESOLVERS AND THEN STORED IN THEIR OWN GQL FOLDER___
// const typeDefs = gql`
// # define what a post is for gql so it can read what comes in the query appropriately 
//     type Post{
//         id: ID!
//         body: String!
//         createdAt: String!
//         username: String!
//     }
//     type Query{
//         # this getPosts query won't work unless there is an entry for Posts in our db,
//         # consider creating a new entry @ mongodb
//         sayHi: String!
//         getPosts: [Post]
//     }
// `
// for each query/mutuation/subscription
// it needs a resolver, like how things are passed in Redux
 
const server = new ApolloServer({
    typeDefs,
    resolvers
});
// remember ES6 infrences on itself so you
// don't need resolvers: resolvers 


mongoose.connect(MONGODB, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 4000 });
    })
    .then((resp) => {
    console.log(`Server running at ${resp.url}`);
})