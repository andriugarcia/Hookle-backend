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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../../database");
var user_queries_1 = require("./user.queries");
var signup = function (_a) {
    var emailParam = _a.emailParam, passParam = _a.passParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.signup, { emailParam: emailParam, passParam: passParam })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var signupWithoutVerification = function (_a) {
    var emailParam = _a.emailParam, passParam = _a.passParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.signupWithoutVerification, {
                            emailParam: emailParam,
                            passParam: passParam,
                        })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_2 = _b.sent();
                    console.error(err_2);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var verify = function (_a) {
    var emailParam = _a.emailParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.verifyAccount, {
                            emailParam: emailParam,
                        })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_3 = _b.sent();
                    console.error(err_3);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var recover = function (_a) {
    var emailParam = _a.emailParam, passParam = _a.passParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.recover, {
                            emailParam: emailParam,
                            passParam: passParam,
                        })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_4 = _b.sent();
                    console.error(err_4);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var vote = function (_a) {
    var emailParam = _a.emailParam, clothingParam = _a.clothingParam, ratingParam = _a.ratingParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.vote, {
                            emailParam: emailParam,
                            clothingParam: clothingParam,
                            ratingParam: ratingParam,
                        })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_5 = _b.sent();
                    console.error(err_5);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var updateFilters = function (_a) {
    var emailParam = _a.emailParam, filtersParam = _a.filtersParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.updateFilters, { emailParam: emailParam, filtersParam: filtersParam })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_6 = _b.sent();
                    console.error(err_6);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var updateGenre = function (_a) {
    var emailParam = _a.emailParam, genreParam = _a.genreParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.updateGenre, { emailParam: emailParam, genreParam: genreParam })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_7 = _b.sent();
                    console.error(err_7);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var favorite = function (_a) {
    var emailParam = _a.emailParam, clothingParam = _a.clothingParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.favorite, { emailParam: emailParam, clothingParam: clothingParam })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_8 = _b.sent();
                    console.error(err_8);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var unfavorite = function (_a) {
    var emailParam = _a.emailParam, clothingParam = _a.clothingParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.unfavorite, { emailParam: emailParam, clothingParam: clothingParam })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_9 = _b.sent();
                    console.error(err_9);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var buy = function (_a) {
    var emailParam = _a.emailParam, clothingParam = _a.clothingParam;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, err_10;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(user_queries_1.default.buy, { emailParam: emailParam, clothingParam: clothingParam })];
                case 1:
                    _b.sent();
                    session.close();
                    return [2 /*return*/, true];
                case 2:
                    err_10 = _b.sent();
                    console.error(err_10);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = {
    signup: signup,
    signupWithoutVerification: signupWithoutVerification,
    verify: verify,
    recover: recover,
    vote: vote,
    updateFilters: updateFilters,
    updateGenre: updateGenre,
    favorite: favorite,
    unfavorite: unfavorite,
    buy: buy,
};
//# sourceMappingURL=user.database.js.map