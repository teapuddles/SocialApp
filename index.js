const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')
const { MONGODB } = require('./config.js')
const gql = require('graphql-tag')
// gql comes with apollo server

// typedefs are where we define all of 
// our queries etc for GraphQL 
// this is like setting up class attributes in ruby a bit
const typeDefs = gql`
    type Query{
        sayHi: String!
    }
`
// for each query/mutuation/subscription
// it needs a resolver, like how things are passed in Redux
const resolvers = {
    Query: {
        // our querys etc are written out as functions here
        sayHi: () => 'Hello World'
    } 

}

const server = new ApolloServer({
    typeDefs,
    resolvers
});
// remember ES6 infrences on itself so you
// don't need resolvers: resolvers 


mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 4000 });
    })
    .then((resp) => {
    console.log(`Server running at ${resp.url}`);
})