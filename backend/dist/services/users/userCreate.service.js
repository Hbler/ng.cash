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
const data_source_1 = __importDefault(require("../../data-source"));
const bcryptjs_1 = require("bcryptjs");
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = require("../../errors/AppError");
const accounts_entity_1 = require("../../entities/accounts.entity");
const userCreateService = ({ username, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const accountRepo = data_source_1.default.getRepository(accounts_entity_1.Account);
    const alreadyExists = yield userRepo.findOneBy({
        username,
    });
    if (alreadyExists) {
        throw new AppError_1.AppError("Username indisponível", 400);
    }
    const account = accountRepo.create({
        balance: 100,
    });
    yield accountRepo.save(account);
    const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
    const user = userRepo.create({
        account,
        username,
        password: hashedPassword,
    });
    yield userRepo.save(user);
    return user;
});
exports.default = userCreateService;
