"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const typeorm_1 = require("typeorm");
const accounts_entity_1 = require("./accounts.entity");
let Transaction = class Transaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => accounts_entity_1.Account, (account) => account.debitTransactions, {
        eager: true,
    }),
    __metadata("design:type", accounts_entity_1.Account)
], Transaction.prototype, "debitedAccount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => accounts_entity_1.Account, (account) => account.creditTransctions, {
        eager: true,
    }),
    __metadata("design:type", accounts_entity_1.Account)
], Transaction.prototype, "creditedAccount", void 0);
Transaction = __decorate([
    (0, typeorm_1.Entity)("transactions")
], Transaction);
exports.Transaction = Transaction;
