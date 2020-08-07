"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = require("../user/user.service");
exports.default = [
    {
        method: 'POST',
        path: '/signup',
        handler: user_service_1.default.signup,
        config: { auth: false },
    },
    {
        method: 'POST',
        path: '/signin',
        handler: user_service_1.default.login,
        options: {
            auth: 'simple',
        },
    },
];
//# sourceMappingURL=auth.controller.js.map