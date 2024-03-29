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
var filterQuery_1 = require("../services/filterQuery");
var clothing_database_1 = require("./database/clothing.database");
var Boom = require("boom");
var shuffle = function (array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
    return array;
};
var getStack = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        var filter, result, nodes, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    filter = filterQuery_1.default(auth.credentials.filters, auth.credentials.genre);
                    return [4 /*yield*/, clothing_database_1.default.getStack(filter, {
                            emailParam: auth.credentials.email,
                        })];
                case 1:
                    result = _b.sent();
                    nodes = result.filter(function (v, i, a) { return a.findIndex(function (t) { return t.code === v.code; }) === i; });
                    return [2 /*return*/, shuffle(nodes)];
                case 2:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getPopulars = function (_a, h) {
    var auth = _a.auth, payload = _a.payload;
    return __awaiter(this, void 0, void 0, function () {
        var filter, result, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    filter = filterQuery_1.default(auth.credentials.filters, auth.credentials.genre);
                    return [4 /*yield*/, clothing_database_1.default.getPopulars(filter, {
                            emailParam: auth.credentials.email,
                        })];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_2 = _b.sent();
                    console.error(err_2);
                    throw Boom.badData('Error al obtener populares');
                case 4: return [2 /*return*/];
            }
        });
    });
};
var getHistorial = function (_a, h) {
    var auth = _a.auth, payload = _a.payload, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var result, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    console.log(params.order);
                    return [4 /*yield*/, clothing_database_1.default.getHistorial(params.order, {
                            emailParam: auth.credentials.email,
                            page: params.page,
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_3 = _b.sent();
                    console.error(err_3);
                    throw Boom.badData('Error al obtener el historial');
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getFavorites = function (_a, h) {
    var auth = _a.auth, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var result, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, clothing_database_1.default.getFavorites({
                            emailParam: auth.credentials.email,
                            page: params.page,
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_4 = _b.sent();
                    console.error(err_4);
                    throw Boom.badData('Error al obtener los favoritos');
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getFavProduct = function (_a, h) {
    var auth = _a.auth, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var result, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, clothing_database_1.default.getFavProduct({
                            emailParam: auth.credentials.email,
                            clothing: params.clothing,
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result.length > 0];
                case 2:
                    err_5 = _b.sent();
                    console.error(err_5);
                    throw Boom.badData('Error al obtener el producto');
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getBought = function (_a, h) {
    var auth = _a.auth, payload = _a.payload, params = _a.params;
    return __awaiter(this, void 0, void 0, function () {
        var result, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    if (!auth.credentials.confirmed)
                        throw Boom.forbidden('El usuario no está verificado');
                    return [4 /*yield*/, clothing_database_1.default.getBought({
                            emailParam: auth.credentials.email,
                            page: params.page,
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_6 = _b.sent();
                    console.error(err_6);
                    throw Boom.badData('Error al obtener los comprados');
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = { getStack: getStack, getPopulars: getPopulars, getFavProduct: getFavProduct, getHistorial: getHistorial, getFavorites: getFavorites, getBought: getBought };
//# sourceMappingURL=clothing.service.js.map