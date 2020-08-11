"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsonwebtoken_1 = require("jsonwebtoken");
var user_database_1 = require("./database/user.database");
var validate_database_1 = require("../auth/validate.database");
var confirmation_1 = require("../mail/confirmation");
var recover_1 = require("../mail/recover");
var bcrypt = require("bcrypt");
var Boom = require("boom");
var signup = function (_a, h) {
    var payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        var user, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, validate_database_1.default(payload.email)];
                case 1:
                    user = _e.sent();
                    if (!!user) {
                        throw Boom.badData('Ya existe un usuario con este email');
                    }
                    _c = (_b = user_database_1.default).signupWithoutVerification;
                    _d = {
                        emailParam: payload.email
                    };
                    return [4 /*yield*/, bcrypt.hash(payload.password, 10)];
                case 2: return [4 /*yield*/, _c.apply(_b, [(_d.passParam = _e.sent(),
                            _d)])];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, confirmation_1.default(payload.email, jsonwebtoken_1.sign(__assign({}, payload), process.env.SECRET_KEY, { expiresIn: '1d' }))];
                case 4:
                    _e.sent();
                    return [2 /*return*/, {
                            accessToken: jsonwebtoken_1.sign(__assign({}, payload), process.env.SECRET_KEY, {
                                expiresIn: '1d',
                            }),
                        }];
            }
        });
    });
};
var login = function (_a) {
    var credentials = _a.auth.credentials;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            console.log(credentials);
            return [2 /*return*/, {
                    user: credentials,
                    accessToken: jsonwebtoken_1.sign(__assign({}, credentials), process.env.SECRET_KEY, {
                        expiresIn: '1d',
                    }),
                }];
        });
    });
};
var verify = function (_a) {
    var credentials = _a.auth.credentials;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_database_1.default.verify({ emailParam: credentials.email })];
                case 1:
                    _b.sent();
                    return [2 /*return*/, 'OK'];
            }
        });
    });
};
var recover = function (_a) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log(auth.credentials.email);
                    _c = (_b = user_database_1.default).recover;
                    _d = {
                        emailParam: auth.credentials.email
                    };
                    return [4 /*yield*/, bcrypt.hash(payload.password, 10)];
                case 1: return [4 /*yield*/, _c.apply(_b, [(_d.passParam = _e.sent(),
                            _d)])];
                case 2:
                    _e.sent();
                    return [2 /*return*/, 'OK'];
            }
        });
    });
};
var sendRecoverPassword = function (_a, h) {
    var payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Email', payload.email);
                    return [4 /*yield*/, recover_1.default(payload.email, jsonwebtoken_1.sign(__assign({}, payload), process.env.SECRET_KEY, { expiresIn: '1d' }))];
                case 1:
                    _b.sent();
                    return [2 /*return*/, 'OK'];
            }
        });
    });
};
var getMe = function (_a, h) {
    var auth = _a.auth;
    return __awaiter(this, void 0, void 0, function () {
        var _b, email, filters, genre, confirmed;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, validate_database_1.default(auth.credentials.email)];
                case 1:
                    _b = _c.sent(), email = _b.email, filters = _b.filters, genre = _b.genre, confirmed = _b.confirmed;
                    return [2 /*return*/, {
                            email: email,
                            filters: filters,
                            genre: genre,
                            confirmed: confirmed,
                        }];
            }
        });
    });
};
var vote = function (_a) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_database_1.default.vote({
                        emailParam: auth.credentials.email,
                        clothingParam: payload.clothing,
                        ratingParam: payload.rating,
                    })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, 'OK'];
                    }
                    else {
                        throw Boom.badData('No se ha podido votar correctamente');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var updateFilters = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, user_database_1.default.updateFilters({
                            emailParam: auth.credentials.email,
                            filtersParam: payload.filters,
                        })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, 'OK'];
                    }
                    else {
                        throw Boom.badData('No se ha podido actualizar los filtros');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var updateGenre = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, user_database_1.default.updateGenre({
                            emailParam: auth.credentials.email,
                            genreParam: payload.genre,
                        })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, 'OK'];
                    }
                    else {
                        throw Boom.badData('No se ha podido actualizar el género');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var fav = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, user_database_1.default.favorite({
                            emailParam: auth.credentials.email,
                            clothingParam: payload.clothing,
                        })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, 'OK'];
                    }
                    else {
                        throw Boom.badData('No se ha podido guardar a favoritos');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var unfav = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, user_database_1.default.unfavorite({
                            emailParam: auth.credentials.email,
                            clothingParam: payload.clothing,
                        })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, 'OK'];
                    }
                    else {
                        throw Boom.badData('No se ha podido quitar de favoritos');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
var buy = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, user_database_1.default.buy({
                            emailParam: auth.credentials.email,
                            clothingParam: payload.clothing,
                        })];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/, 'OK'];
                    }
                    else {
                        throw Boom.badData('No se ha podido comprar');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = {
    signup: signup,
    login: login,
    verify: verify,
    sendRecoverPassword: sendRecoverPassword,
    recover: recover,
    getMe: getMe,
    vote: vote,
    updateFilters: updateFilters,
    updateGenre: updateGenre,
    fav: fav,
    unfav: unfav,
    buy: buy,
};
//# sourceMappingURL=user.service.js.map