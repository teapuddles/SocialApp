// just like in ruby, this is how you'll set up you're schema
const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    // we could specifiy if our attributes are 
    // required, but we'll do it in gql instead!
    username: String,
    password: String, 
    email: String,
    createdAt: String
}); 

module.exports = model('User', userSchema)