"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
exports.Post = mongoose_1.default.model('Post', postSchema);
//# sourceMappingURL=post.js.map