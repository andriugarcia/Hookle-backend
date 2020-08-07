"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = require("../user/user.service");
exports.default = [
    {
        method: 'POST',
        path: '/signup',
        handler: user_service_1.default.signup,
        options: {
            auth: false,
        },
    },
    {
        method: 'POST',
        path: '/signin',
        handler: user_service_1.default.login,
        options: {
            auth: 'simple',
        },
    },
    {
        method: 'POST',
        path: '/verify',
        handler: user_service_1.default.verify,
        options: {
            auth: 'jwt',
        },
    },
    {
        method: 'POST',
        path: '/recover',
        handler: user_service_1.default.recover,
        options: {
            auth: 'jwt',
        },
    },
    {
        method: 'POST',
        path: '/sendRecoverPassword',
        handler: user_service_1.default.sendRecoverPassword,
        options: {
            auth: false,
        },
    },
];
//# sourceMappingURL=auth.controller.js.map