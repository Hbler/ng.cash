"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashOutTwo = exports.cashOut = exports.cashOutWrongReceiver = exports.cashOutWrongValue = exports.cashOutWrongUsername = exports.userTwo = exports.userOne = exports.userNoUpperPassword = exports.userNoNumberPassword = exports.userShortPassword = exports.userWrongUsername = void 0;
exports.userWrongUsername = {
    username: "wr",
    password: "1234ABCD",
};
exports.userShortPassword = {
    username: "user_one",
    password: "abcd",
};
exports.userNoNumberPassword = {
    username: "user_one",
    password: "abcdefgH",
};
exports.userNoUpperPassword = {
    username: "user_one",
    password: "abcd1234",
};
exports.userOne = {
    username: "user_one",
    password: "1234ABCD",
};
exports.userTwo = {
    username: "user_two",
    password: "1234ABCD",
};
exports.cashOutWrongUsername = {
    receiver: "wr",
    value: 100,
};
exports.cashOutWrongValue = {
    receiver: "user_two",
    value: 0,
};
exports.cashOutWrongReceiver = {
    receiver: "user_one",
    value: 100,
};
exports.cashOut = {
    receiver: "user_two",
    value: 100,
};
exports.cashOutTwo = {
    receiver: "user_one",
    value: 50,
};
