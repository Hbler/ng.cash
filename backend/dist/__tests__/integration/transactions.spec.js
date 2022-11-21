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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const data_source_1 = __importDefault(require("../../data-source"));
const mock_1 = require("../mock");
describe("Testing transactions routes middlewares and controllers", () => {
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
    it("Should not be able to make a cash-out transaction without token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userOne);
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mock_1.userTwo);
        const response = yield (0, supertest_1.default)(app_1.default).post("/transactions");
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Token inválido");
    }));
    it("Should not be able to make a cash-out transaction with wrong value", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions")
            .send(mock_1.cashOutWrongValue)
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("The value must be greater than 0");
    }));
    it("Should not be able to make a cash-out transaction with invalid receiver", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions")
            .send(mock_1.cashOutWrongUsername)
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Invalid receiver username");
    }));
    it("Should not be able to make a cash-out transaction with to self", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions")
            .send(mock_1.cashOutWrongReceiver)
            .set("Authorization", `Bearer ${login.body.token}`);
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Não é possível transferir para a própria conta");
    }));
    it("Should be able to make a cash-out transaction", () => __awaiter(void 0, void 0, void 0, function* () {
        const login_one = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const login_two = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userTwo);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/transactions")
            .send(mock_1.cashOut)
            .set("Authorization", `Bearer ${login_one.body.token}`);
        const date = new Date().setHours(0, 0, 0, 0);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("value");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("debitedAccount");
        expect(response.body).toHaveProperty("creditedAccount");
        expect(response.body.value).toBe(mock_1.cashOut.value);
        expect(new Date(response.body.createdAt).setHours(0, 0, 0, 0)).toBe(date);
        const user_two_balance = yield (0, supertest_1.default)(app_1.default)
            .get("/accounts")
            .set("Authorization", `Bearer ${login_two.body.token}`);
        expect(user_two_balance.status).toBe(200);
        expect(user_two_balance.body).toHaveProperty("balance");
        expect(user_two_balance.body.balance).toBe(200);
    }));
    it("Should be able to list all related transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const login_one = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const login_two = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userTwo);
        yield (0, supertest_1.default)(app_1.default)
            .post("/transactions")
            .send(mock_1.cashOutTwo)
            .set("Authorization", `Bearer ${login_two.body.token}`);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/transactions")
            .set("Authorization", `Bearer ${login_one.body.token}`);
        expect(response.body instanceof Array).toBe(true);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("value");
        expect(response.body[0]).toHaveProperty("createdAt");
    }));
    it("Should be able to list all related cash-out transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const login_one = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/transactions/cashouts")
            .set("Authorization", `Bearer ${login_one.body.token}`);
        expect(response.body instanceof Array).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body[0].value).toBe(mock_1.cashOut.value);
    }));
    it("Should be able to list all related cash-in transactions", () => __awaiter(void 0, void 0, void 0, function* () {
        const login_one = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/transactions/cashins")
            .set("Authorization", `Bearer ${login_one.body.token}`);
        expect(response.body instanceof Array).toBe(true);
        expect(response.body.length).toBe(1);
        expect(response.body[0].value).toBe(mock_1.cashOutTwo.value);
    }));
    it("Should be able to filter transactions by date", () => __awaiter(void 0, void 0, void 0, function* () {
        const login_one = yield (0, supertest_1.default)(app_1.default).post("/login").send(mock_1.userOne);
        const date = new Date();
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/transactions/${date.toDateString()}`)
            .set("Authorization", `Bearer ${login_one.body.token}`);
        expect(response.body instanceof Array).toBe(true);
        expect(response.body.length).toBe(2);
    }));
});
