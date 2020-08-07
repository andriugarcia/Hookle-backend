"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clothing_service_1 = require("./clothing.service");
exports.default = [
    {
        method: 'GET',
        path: '/historial/{type}/{page}',
        options: { auth: 'jwt' },
        handler: clothing_service_1.default.getHistorial,
    },
    {
        method: 'GET',
        path: '/favorites/{page}',
        options: { auth: 'jwt' },
        handler: clothing_service_1.default.getFavorites,
    },
    {
        method: 'GET',
        path: '/bought/{page}',
        options: { auth: 'jwt' },
        handler: clothing_service_1.default.getBought,
    },
];
//# sourceMappingURL=clothing.controller.js.map