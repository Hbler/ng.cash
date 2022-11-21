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
exports.cashInsReadController = exports.cashOutsReadController = exports.transactionsDateFilterReadController = exports.transactionsReadController = exports.cashOutCreateController = void 0;
const cashInsRead_service_1 = __importDefault(require("../services/transactions/cashInsRead.service"));
const cashOutCreate_service_1 = __importDefault(require("../services/transactions/cashOutCreate.service"));
const cashOutsRead_service_1 = __importDefault(require("../services/transactions/cashOutsRead.service"));
const transactionsDateFilterRead_service_1 = __importDefault(require("../services/transactions/transactionsDateFilterRead.service"));
const transactionsRead_service_1 = __importDefault(require("../services/transactions/transactionsRead.service"));
const cashOutCreateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionData = req.body;
    const sender_id = req.user.id;
    const transaction = yield (0, cashOutCreate_service_1.default)(sender_id, Object.assign({}, transactionData));
    return res.status(201).json(transaction);
});
exports.cashOutCreateController = cashOutCreateController;
const transactionsReadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    const transactions = yield (0, transactionsRead_service_1.default)(user_id);
    return res.json(transactions);
});
exports.transactionsReadController = transactionsReadController;
const transactionsDateFilterReadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    const date = req.params.date;
    const transactions = yield (0, transactionsDateFilterRead_service_1.default)(user_id, date);
    return res.json(transactions);
});
exports.transactionsDateFilterReadController = transactionsDateFilterReadController;
const cashOutsReadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    const transactions = yield (0, cashOutsRead_service_1.default)(user_id);
    return res.json(transactions);
});
exports.cashOutsReadController = cashOutsReadController;
const cashInsReadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id;
    const transactions = yield (0, cashInsRead_service_1.default)(user_id);
    return res.json(transactions);
});
exports.cashInsReadController = cashInsReadController;
