const Post = require('../../models/Post')

module.exports = {
    Query: {
        sayHi: () => "hello world",
        // our querys etc are written out as functions here
        // queries are like any other request, so we'll do it async/await
        async getPosts(){
            try{
                const posts = await Post.find()
                return posts
            } catch(err){
                throw new Error(err)
            }
        }
    } 
}