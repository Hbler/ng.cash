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
exports.userReadController = exports.userCreateController = void 0;
const class_transformer_1 = require("class-transformer");
const userCreate_service_1 = __importDefault(require("../services/users/userCreate.service"));
const userRead_service_1 = __importDefault(require("../services/users/userRead.service"));
const userCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield (0, userCreate_service_1.default)(Object.assign({}, userData));
    return res.status(201).json(user);
});
exports.userCreateController = userCreateController;
const userReadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    const user = yield (0, userRead_service_1.default)(user_id);
    return res.json((0, class_transformer_1.instanceToPlain)(user));
});
exports.userReadController = userReadController;
