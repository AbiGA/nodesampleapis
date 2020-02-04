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
router.get('/create', (req, res) => {
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
// router.get('', (req, res) => {
//     fetch('http://jsonplaceholder.typicode.com/users')
//      .then(response => response.json())
//      .then(data => {
//          const arr: any = data;
//          arr.forEach((dt: any) => {
//             const dburl = `mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/db${dt.id}?retryWrites=true&w=majority`;
//             mongoose.connect(dburl, { useNewUrlParser: true,
//             useUnifiedTopology: true }).then((db) => {
//                 const user: any = new User(dt);
//                 User.collection.drop();
//                 user.oid = dt.id;
//                 const salt = bcrypt.genSaltSync(10);
//                 const password = bcrypt.hashSync("default", salt);
//                 user.password = password;
//                 // console.log(User);
//                 user.save();
//                 // console.log(`Created DB: ${dt.id} : ${dt.name}`);
//             });
//          });
//      })
//      .catch(err => {
//         return res.json({error: "error"});
//      });
// });
exports.userRouter = router;
//# sourceMappingURL=user.js.map