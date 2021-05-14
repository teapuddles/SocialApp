const { model, Schema } = requires('mongoose');

const postSchema = new Schema({
     body: String,
     username: String,
     createdAt: String,
    //  each post has an ARRAY OF COMMENTS
    // AND AN ARRAY OF LIKES
    // define each part of these attributes here. 
    // this is really neat. Like customizing a serializer.
     comments: [
         {
             body: String,
             username: String,
             createdAt: String
         }
        ],
     likes: [
         {
            username: String,
            createdAt: String
         }
        ],
        // mongo db doesn't have relations between models,
        // the ORM lets us create them though!
        // I belive that this is sort of like self referential stuff
        // in ruby? Lets see how this plays out.
     user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
})