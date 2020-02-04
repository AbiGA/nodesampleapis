"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const node_fetch_1 = __importDefault(require("node-fetch"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
const posts = [];
router.get('/users', (req, res) => {
    node_fetch_1.default('http://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
        const arr = data;
        arr.forEach((dt) => {
            const user = new user_1.User(dt);
            user.oid = dt.id;
            const salt = bcryptjs_1.default.genSaltSync(10);
            const password = bcryptjs_1.default.hashSync("default", salt);
            user.password = password;
            user.save();
        });
        return res.json(data);
    })
        .catch(err => {
        return res.json({ error: "error" });
    });
});
router.get('/posts', (req, res) => {
    const comments = [];
    const resr = [];
    node_fetch_1.default('http://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
        const arr = data;
        arr.forEach((post) => {
            //  comments.oid = comment.id;
            posts.push(post);
        });
        node_fetch_1.default('http://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then(data1 => {
            const arr1 = data1;
            arr1.forEach((comment) => {
                //  comments.oid = comment.id;
                comments.push(comment);
            });
        });
        return res.json(comments);
    });
});
exports.createRouter = router;
//# sourceMappingURL=create.js.map