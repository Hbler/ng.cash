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
const users_entity_1 = require("../../entities/users.entity");
const cashInsRead_service_1 = __importDefault(require("../../services/transactions/cashInsRead.service"));
const cashOutCreate_service_1 = __importDefault(require("../../services/transactions/cashOutCreate.service"));
const cashOutsRead_service_1 = __importDefault(require("../../services/transactions/cashOutsRead.service"));
const transactionsDateFilterRead_service_1 = __importDefault(require("../../services/transactions/transactionsDateFilterRead.service"));
const transactionsRead_service_1 = __importDefault(require("../../services/transactions/transactionsRead.service"));
const userCreate_service_1 = __importDefault(require("../../services/users/userCreate.service"));
const mock_1 = require("../mock");
describe("Testing transaction services", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((error) => {
            console.log(error);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it("Should not be able to create a transaction to 'yourself'", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_two = yield (0, userCreate_service_1.default)(mock_1.userTwo);
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, cashOutCreate_service_1.default)(user_two.id, Object.assign({}, mock_1.cashOut));
        })).rejects.toThrow("Não é possível transferir para a própria conta");
    }));
    it("Should be able to create a transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const user_one = yield (0, userCreate_service_1.default)(mock_1.userOne);
        const result = yield (0, cashOutCreate_service_1.default)(user_one.id, Object.assign({}, mock_1.cashOut));
        const date = new Date();
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("value");
        expect(result).toHaveProperty("createdAt");
        expect(result).toHaveProperty("debitedAccount");
        expect(result).toHaveProperty("creditedAccount");
        expect(result.value).toBe(mock_1.cashOut.value);
        expect(result.createdAt.setHours(0, 0, 0, 0)).toBe(date.setHours(0, 0, 0, 0));
    }));
    it("Should not be able to create a transaction with insufficient funds", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = data_source_1.default.getRepository(users_entity_1.User);
        const user = yield userRepo.findOneBy({ username: "user_one" });
        yield expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, cashOutCreate_service_1.default)(user.id, Object.assign({}, mock_1.cashOut));
        })).rejects.toThrow("Saldo nsuficiente");
    }));
    it("Should be able to get all transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = data_source_1.default.getRepository(users_entity_1.User);
        const user = yield userRepo.findOneBy({ username: "user_one" });
        const result = yield (0, transactionsRead_service_1.default)(user.id);
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("value");
        expect(result[0]).toHaveProperty("createdAt");
        expect(result[0].value).toBe(100);
    }));
    it("Should be able to get cash-out transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = data_source_1.default.getRepository(users_entity_1.User);
        const user = yield userRepo.findOneBy({ username: "user_one" });
        const result = yield (0, cashOutsRead_service_1.default)(user.id);
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("value");
        expect(result[0]).toHaveProperty("createdAt");
        expect(result[0].value).toBe(100);
    }));
    it("Should be able to get cash-in transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = data_source_1.default.getRepository(users_entity_1.User);
        const user = yield userRepo.findOneBy({ username: "user_two" });
        const result = yield (0, cashInsRead_service_1.default)(user.id);
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("value");
        expect(result[0]).toHaveProperty("createdAt");
        expect(result[0].value).toBe(100);
    }));
    it("Should be able to get transactions by date", () => __awaiter(void 0, void 0, void 0, function* () {
        const userRepo = data_source_1.default.getRepository(users_entity_1.User);
        const user = yield userRepo.findOneBy({ username: "user_one" });
        const date = new Date().toDateString();
        const result = yield (0, transactionsDateFilterRead_service_1.default)(user.id, date);
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toHaveProperty("id");
        expect(result[0]).toHaveProperty("value");
        expect(result[0]).toHaveProperty("createdAt");
        expect(result[0].value).toBe(100);
    }));
});
