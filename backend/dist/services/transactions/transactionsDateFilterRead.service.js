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
const typeorm_1 = require("typeorm");
const data_source_1 = __importDefault(require("../../data-source"));
const transactions_entity_1 = require("../../entities/transactions.entity");
const users_entity_1 = require("../../entities/users.entity");
const transactionsDateFilterReadService = (id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = data_source_1.default.getRepository(users_entity_1.User);
    const trasactionsRepo = data_source_1.default.getRepository(transactions_entity_1.Transaction);
    const user = yield userRepo.findOneBy({ id });
    if (!user) {
        throw new Error();
    }
    const addDays = (d, date) => {
        return new Date(date.valueOf() + 864e5 * d);
    };
    const transactionDate = new Date(date);
    const nextDayDate = addDays(1, transactionDate);
    const userTransactions = yield trasactionsRepo.find({
        where: [
            {
                debitedAccount: user.account,
                createdAt: (0, typeorm_1.Between)(transactionDate, nextDayDate),
            },
            {
                creditedAccount: user.account,
                createdAt: (0, typeorm_1.Between)(transactionDate, nextDayDate),
            },
        ],
    });
    return userTransactions;
});
exports.default = transactionsDateFilterReadService;
