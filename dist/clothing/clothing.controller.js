"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clothing_service_1 = require("./clothing.service");
exports.default = [
    {
        method: 'GET',
        path: '/historial/{order}/{page}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothing_service_1.default.getHistorial,
    },
    {
        method: 'GET',
        path: '/favorites/{page}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothing_service_1.default.getFavorites,
    },
    {
        method: 'GET',
        path: '/bought/{page}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothing_service_1.default.getBought,
    },
    {
        method: 'GET',
        path: '/stack',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothing_service_1.default.getStack,
    },
    {
        method: 'GET',
        path: '/fav/{clothing}',
        options: {
            auth: {
                strategies: ['jwt', 'google'],
            }
        },
        handler: clothing_service_1.default.getFavProduct,
    },
];
//# sourceMappingURL=clothing.controller.js.map