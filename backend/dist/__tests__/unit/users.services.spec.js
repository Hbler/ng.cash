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
const userCreate_service_1 = __importDefault(require("../../services/users/userCreate.service"));
const userRead_service_1 = __importDefault(require("../../services/users/userRead.service"));
const mock_1 = require("../mock");
describe("Testing user services", () => {
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
    it("Should be able to create an user with an account with the correct balance", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, userCreate_service_1.default)(mock_1.userOne);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("account");
        expect(result).toHaveProperty("username");
        expect(result).toHaveProperty("password");
        expect(result.username).toBe(mock_1.userOne.username);
        expect(result.password).not.toBe(mock_1.userOne.password);
        expect(result.account.balance).toBe(100);
    }));
    it("Should not be able to create an user with the same username", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, userCreate_service_1.default)(mock_1.userOne);
        })).rejects.toThrow("Username indisponível");
    }));
    it("Should be able to get an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield (0, userCreate_service_1.default)(mock_1.userTwo);
        const result = yield (0, userRead_service_1.default)(newUser.id);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("account");
        expect(result).toHaveProperty("username");
        expect(result).toHaveProperty("password");
        expect(result.username).toBe(mock_1.userTwo.username);
    }));
});
