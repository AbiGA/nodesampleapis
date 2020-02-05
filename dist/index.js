"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = require("./routes/create");
const body_parser_1 = __importDefault(require("body-parser"));
const user_1 = require("./routes/user");
const app = express_1.default();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.use(body_parser_1.default.json());
app.use('/create', create_1.createRouter);
app.use('/user', user_1.userRouter);
// API Endpoints
// app.get("/users", userController.allUsers);
// app.get("/user/:id", userController.getUser);
// app.post("/user", userController.addUser);
// app.put("/user/:id", userController.updateUser);
// app.delete("/user/:id", userController.deleteUser);
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map