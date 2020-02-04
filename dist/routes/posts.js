"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const router = express_1.default.Router();
router.get('/posts', (req, res) => {
    const posts = [];
    node_fetch_1.default('http://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
        const arr = data;
        arr.forEach((dt) => {
            posts.push(dt);
        });
    })
        .catch(err => {
        return res.json({ error: "error" });
    });
});
exports.userRouter = router;
//# sourceMappingURL=posts.js.map