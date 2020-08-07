"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var neo4j_driver_1 = require("neo4j-driver");
dotenv.config({ path: __dirname + '/.env' });
var driver = neo4j_driver_1.default.driver('bolt://18.203.12.204', neo4j_driver_1.default.auth.basic(process.env.DATABASE_USER, process.env.DATABASE_PASS));
exports.default = driver;
//# sourceMappingURL=database.js.map