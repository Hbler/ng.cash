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
const accounts_entity_1 = require("../../entities/accounts.entity");
const users_entity_1 = require("../../entities/users.entity");
const balanceReadService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const accountRepo = data_source_1.default.getRepository(accounts_entity_1.Account);
    const user = yield userRepo.findOneBy({ id });
    if (!user) {
        throw new Error();
    }
    const account = yield accountRepo.findOneBy({
        id: user.account.id,
    });
    if (!account) {
        throw new Error();
    }
    return { balance: account.balance };
});
exports.default = balanceReadService;
