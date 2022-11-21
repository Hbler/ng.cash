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
const transactions_entity_1 = require("../../entities/transactions.entity");
const users_entity_1 = require("../../entities/users.entity");
const AppError_1 = require("../../errors/AppError");
const cashOutCreateService = (sender_id, { receiver, value }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const accountRepo = data_source_1.default.getRepository(accounts_entity_1.Account);
    const trasactionsRepo = data_source_1.default.getRepository(transactions_entity_1.Transaction);
    const senderUser = yield userRepo.findOneBy({ id: sender_id });
    if (!senderUser) {
        throw new Error();
    }
    const senderAccount = yield accountRepo.findOneBy({
        id: senderUser.account.id,
    });
    if (!senderAccount) {
        throw new Error();
    }
    if (senderAccount.balance < value) {
        throw new AppError_1.AppError("Saldo nsuficiente", 401);
    }
    const receiverUser = yield userRepo.findOneBy({ username: receiver });
    if (!receiverUser) {
        throw new AppError_1.AppError("Username não encontrado", 404);
    }
    if (senderUser.username === receiverUser.username) {
        throw new AppError_1.AppError("Não é possível transferir para a própria conta", 403);
    }
    const receiverAccount = yield accountRepo.findOneBy({
        id: receiverUser.account.id,
    });
    if (!receiverAccount) {
        throw new Error();
    }
    yield accountRepo.update(senderAccount.id, {
        balance: senderAccount.balance - value,
    });
    yield accountRepo.update(receiverAccount.id, {
        balance: receiverAccount.balance + value,
    });
    const transaction = trasactionsRepo.save({
        debitedAccount: senderAccount,
        creditedAccount: receiverAccount,
        value,
    });
    return transaction;
});
exports.default = cashOutCreateService;
