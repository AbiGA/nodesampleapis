"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.auth = (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(422).send({ errors: [{ title: 'Data missing', detail: "Provide email and password" }] });
    }
    user_1.User.findOne({ email }, function (err, user) {
        if (err) {
            return res.status(422).send({ errors: "Errors" });
        }
        if (!user) {
            return res.status(422).send({ errors: [{ title: 'Invalid User', detail: "User does not exist" }] });
        }
        console.log("User");
        if (bcryptjs_1.default.compareSync(user.password, this.password)) {
            const token = jsonwebtoken_1.default.sign({
                userId: user.id,
                username: user.username
            }, 'asdaeml23424[{45}]23.532dmn3vv', { expiresIn: '1h' });
            // return JWT Token
            return res.json(token);
        }
        else {
            return res.status(422).send({ errors: [{ title: 'Wrong Data', detail: "Wrong email or password" }] });
        }
    });
};
exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const user = parseToken(token);
        user_1.User.findById(user.userId, (err, usr) => {
            if (err) {
                return res.status(422).send({ errors: "Error" });
            }
            if (usr) {
                res.locals.user = usr;
                next();
            }
            else {
                notAuthorized(res);
            }
        });
    }
    else {
        notAuthorized(res);
    }
};
function parseToken(token) {
    return jsonwebtoken_1.default.verify(token.split(' ')[1], 'asdaeml23424[{45}]23.532dmn3vv');
}
function notAuthorized(res) {
    return res.status(401).send({ errors: [{ title: 'Not authorized', detail: "You need to login to get access" }] });
}
exports.allUsers = (req, res) => {
    res.send("Returns all Books");
};
exports.getUser = (req, res) => {
    res.send("Returns one book");
};
exports.deleteUser = (req, res) => {
    res.send("Returns one book");
};
exports.updateUser = (req, res) => {
    res.send("Returns one book");
};
exports.addUser = (req, res) => {
    res.send("Returns one book");
};
//# sourceMappingURL=user.js.map