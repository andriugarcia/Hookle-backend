"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = require("./user.service");
exports.default = [
    {
        method: 'GET',
        path: '/getMe',
        options: { auth: 'jwt' },
        handler: user_service_1.default.getMe,
    },
    {
        method: 'POST',
        path: '/vote',
        options: { auth: 'jwt' },
        handler: user_service_1.default.vote,
    },
    {
        method: 'POST',
        path: '/updateFilters',
        options: { auth: 'jwt' },
        handler: user_service_1.default.updateFilters,
    },
    {
        method: 'POST',
        path: '/updateGenre',
        options: { auth: 'jwt' },
        handler: user_service_1.default.updateGenre,
    },
    {
        method: 'POST',
        path: '/fav',
        options: { auth: 'jwt' },
        handler: user_service_1.default.fav,
    },
    {
        method: 'POST',
        path: '/unfav',
        options: { auth: 'jwt' },
        handler: user_service_1.default.unfav,
    },
    {
        method: 'POST',
        path: '/buy',
        options: { auth: 'jwt' },
        handler: user_service_1.default.buy,
    },
];
//# sourceMappingURL=user.controller.js.map