const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose')
const gql = require('graphql-tag')
// gql comes with apollo server
const Post = require('./models/Post')
const { MONGODB } = require('./config.js')

// typedefs are where we define all of 
// our queries etc for GraphQL 
// this is like setting up class attributes but for gql
const typeDefs = gql`
# define what a post is for gql so it can read what comes in the query appropriately 
    type Post{
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!
    }
    type Query{
        # this getPosts query won't work unless there is an entry for Posts in our db,
        # consider creating a new entry @ mongodb
        getPosts: [Post]
    }
`
// for each query/mutuation/subscription
// it needs a resolver, like how things are passed in Redux
const resolvers = {
    Query: {
        // our querys etc are written out as functions here
        // queries are like any other request, so we'll do it async/await
        async getPosts(){
            try{
                const posts = await Post.find()
                return posts
            } catch(err) {
                throw new Error(err)
            }
        }
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