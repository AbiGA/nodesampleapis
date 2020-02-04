"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_1 = require("./routes/create");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
const port = 3000;
const DB_URI = 'mongodb+srv://sampleuser:samplepassword@cluster0-fegur.mongodb.net/master?retryWrites=true&w=majority';
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
app.use(body_parser_1.default.json());
app.use('/create', create_1.createRouter);
// API Endpoints
// app.get("/users", userController.allUsers);
// app.get("/user/:id", userController.getUser);
// app.post("/user", userController.addUser);
// app.put("/user/:id", userController.updateUser);
// app.delete("/user/:id", userController.deleteUser);
mongoose_1.default.connect(DB_URI, { useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
    // const fakeDb = new FakeDb;
    // fakeDb.seedDb();
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map