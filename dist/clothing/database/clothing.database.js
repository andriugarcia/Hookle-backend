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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("../../database");
var clothing_queries_1 = require("./clothing.queries");
var neo4j_driver_1 = require("neo4j-driver");
var getStack = function (filter, _a) {
    var emailParam = _a.emailParam;
    return __awaiter(this, void 0, void 0, function () {
        var session, tx, stack, populars, random, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    session = database_1.default.session();
                    tx = session.beginTransaction();
                    return [4 /*yield*/, tx.run(clothing_queries_1.default.stack(filter), {
                            emailParam: emailParam,
                        })];
                case 1:
                    stack = _b.sent();
                    return [4 /*yield*/, tx.run(clothing_queries_1.default.populars(filter), {
                            emailParam: emailParam,
                        })];
                case 2:
                    populars = _b.sent();
                    return [4 /*yield*/, tx.run(clothing_queries_1.default.random(filter))];
                case 3:
                    random = _b.sent();
                    session.close();
                    return [2 /*return*/, __spreadArrays(stack.records.map(function (record) { return record._fields[0].properties; }), populars.records.map(function (record) { return record._fields[0].properties; }), random.records.map(function (record) { return record._fields[0].properties; }))];
                case 4:
                    err_1 = _b.sent();
                    console.error(err_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
};
// const getStack = async function (filter, { emailParam }) {
//     try {
//         const session = driver.session()
//         console.log("FILTER", filter)
//         const result = await session.run(queries.stack(filter), {
//             emailParam,
//         })
//         session.close()
//         return result.records.map((record: any) => record._fields[0].properties)
//     } catch (err) {
//         console.error(err)
//         return null
//     }
// }
var getPopulars = function (filter, _a) {
    var emailParam = _a.emailParam;
    return __awaiter(this, void 0, void 0, function () {
        var session, result, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(clothing_queries_1.default.populars(filter), {
                            emailParam: emailParam,
                        })];
                case 1:
                    result = _b.sent();
                    session.close();
                    return [2 /*return*/, result.records.map(function (record) { return record._fields[0].properties; })];
                case 2:
                    err_2 = _b.sent();
                    console.error(err_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getRandom = function (filter) {
    return __awaiter(this, void 0, void 0, function () {
        var session, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(clothing_queries_1.default.random(filter))];
                case 1:
                    result = _a.sent();
                    session.close();
                    return [2 /*return*/, result.records.map(function (record) { return record._fields[0].properties; })];
                case 2:
                    err_3 = _a.sent();
                    console.error(err_3);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getHistorial = function (type, _a) {
    var emailParam = _a.emailParam, page = _a.page;
    return __awaiter(this, void 0, void 0, function () {
        var query, session, result, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    switch (type) {
                        case 'historicalAsc':
                            query = clothing_queries_1.default.historicalAsc;
                            break;
                        case 'ratingAsc':
                            query = clothing_queries_1.default.ratingAsc;
                            break;
                        case 'ratingDesc':
                            query = clothing_queries_1.default.ratingDesc;
                            break;
                        default:
                            query = clothing_queries_1.default.historicalDesc;
                            break;
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(query, {
                            emailParam: emailParam,
                            pageParam: neo4j_driver_1.int(page * 40),
                        })];
                case 2:
                    result = _b.sent();
                    session.close();
                    return [2 /*return*/, result.records.map(function (record) { return record._fields[0].properties; })];
                case 3:
                    err_4 = _b.sent();
                    console.error(err_4);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var getFavorites = function (_a) {
    var emailParam = _a.emailParam, page = _a.page;
    return __awaiter(this, void 0, void 0, function () {
        var session, result, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(clothing_queries_1.default.favorites, {
                            emailParam: emailParam,
                            pageParam: neo4j_driver_1.int(page * 40),
                        })];
                case 1:
                    result = _b.sent();
                    session.close();
                    return [2 /*return*/, result.records.map(function (record) { return record._fields[0].properties; })];
                case 2:
                    err_5 = _b.sent();
                    console.error(err_5);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
};
var getBought = function (_a) {
    var emailParam = _a.emailParam, page = _a.page;
    return __awaiter(this, void 0, void 0, function () {
        var session, result, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    session = database_1.default.session();
                    return [4 /*yield*/, session.run(clothing_queries_1.default.bought, {
                            emailParam: emailParam,
                            pageParam: neo4j_driver_1.int(page * 40),
                        })];
                case 1:
                    result = _b.sent();
                    session.close();
                    return [2 /*return*/, result.records.map(function (record) { return record._fields[0].properties; })];
                case 2:
                    err_6 = _b.sent();
                    console.error(err_6);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = {
    getStack: getStack,
    getPopulars: getPopulars,
    getHistorial: getHistorial,
    getFavorites: getFavorites,
    getBought: getBought,
    getRandom: getRandom,
};
//# sourceMappingURL=clothing.database.js.map