import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: String
    },
    oid: {
        type: String,
    },
    title: {
        type: String
    },
    body: {
        type: String
    },
    comments: {
        type: Array
    }
});



export const Post = mongoose.model('Post', postSchema);