"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// export type UserDocument = mongoose.Document & {
//     oid: string;
//     username: string;
//     password: string;
//     name: string;
//     email: string;
//     role: string;
//     address: {
//         street: string,
//         suite: string,
//         city: string,
//         zipcode: string,
//         geo: {
//             lat: string,
//             lng: string
//         }
//     };
//     phone: string;
//     website: string;
//     company: {
//         name: string,
//         catchPhrase: string,
//         bs: string
//     }
// };
const userSchema = new Schema({
    oid: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: String,
            lng: String
        }
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
});
// userSchema.methods.hasSamePassword = function(requestedPassword: string) {
//     return bcrypt.compareSync(requestedPassword, this.password);
// }
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.js.map