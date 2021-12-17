"use strict";
/** Adapted from Trends in Web Dev lecture material
 * https://webdev.cornelldti.org/
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.auth = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const serviceAccountPath = "./firebase-adminsdk.json";
const hydrateServiceAccount = (serviceAccountPath) => {
    var _a;
    const serviceAccount = JSON.parse((0, fs_1.readFileSync)(serviceAccountPath).toString());
    const privateKey = (_a = process.env.FIREBASE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, "\n");
    return Object.assign(Object.assign({}, serviceAccount), { privateKey });
};
const app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(hydrateServiceAccount(serviceAccountPath)),
});
exports.app = app;
const db = firebase_admin_1.default.firestore();
exports.db = db;
const auth = firebase_admin_1.default.auth();
exports.auth = auth;
