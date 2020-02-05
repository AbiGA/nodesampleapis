"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../models/user");
const post_1 = require("../models/post");
const mongoose_1 = __importDefault(require("mongoose"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
const DB_URI = 'mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/master?retryWrites=true&w=majority';
router.get('/users', (req, res) => {
    mongoose_1.default.connect(DB_URI, { useNewUrlParser: true,
        useUnifiedTopology: true }).then(() => {
        // const fakeDb = new FakeDb;
        // fakeDb.seedDb();
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
});
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts1 = [];
    const users = [];
    yield node_fetch_1.default('http://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        data.forEach((post) => {
            post.comments = [];
            posts1.push(post);
        });
        yield node_fetch_1.default('http://jsonplaceholder.typicode.com/comments')
            .then(response => response.json())
            .then((commentsData) => __awaiter(void 0, void 0, void 0, function* () {
            posts1.forEach((post, index) => {
                const comments = [];
                commentsData.forEach((comment) => {
                    if (comment.postId === post.id) {
                        comments.push(comment);
                    }
                });
                posts1[index].comments.push(...comments);
            });
        }));
        yield node_fetch_1.default('http://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(arr => {
            arr.forEach((dt) => {
                posts1.forEach((pst) => {
                    if (pst.userId === dt.id) {
                        const post = new post_1.Post(pst);
                        users.push(post);
                        // pst.save();
                    }
                });
                const dburl = `mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/user${dt.id}?retryWrites=true&w=majority`;
                mongoose_1.default.connect(dburl, { useNewUrlParser: true,
                    useUnifiedTopology: true }).then((db) => {
                    users.forEach((item) => {
                        if (dt.id === +item.userId) {
                            const post = new post_1.Post(item);
                            post_1.Post.remove({});
                            //  post.save();
                        }
                        // await post.save();
                    });
                });
            });
            return res.json(posts1);
        });
    }))
        .catch(err => {
        return res.json({ error: "error" });
    });
}));
router.get('/dbs', (req, res) => {
    const arr = [1, 2, 3];
    arr.forEach((ar, index) => {
        const dburl = `mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/db${index}?retryWrites=true&w=majority`;
        mongoose_1.default.connect(dburl, { useNewUrlParser: true,
            useUnifiedTopology: true }).then((db) => {
            const post = new post_1.Post();
            post.save();
        });
    });
});
exports.createRouter = router;
//# sourceMappingURL=create.js.map