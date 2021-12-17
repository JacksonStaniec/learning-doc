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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const firebase_config_1 = require("./firebase-config");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const patientsCollection = firebase_config_1.db.collection("patients");
app.get("/", (_, res) => {
    res.send("Connected.");
});
app.get("/getPatients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = req.headers.authorization || "";
    try {
        /** only logged-in users can make requests to this endpoint */
        yield firebase_config_1.auth.verifyIdToken(idToken);
        const products = yield patientsCollection.get();
        res.json(products.docs.map((doc) => {
            const product = doc.data();
            return Object.assign(Object.assign({}, product), { id: doc.id });
        }));
    }
    catch (error) {
        res.send("auth error");
    }
}));
app.post("/createPatient", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = req.headers.authorization || "";
    try {
        yield firebase_config_1.auth.verifyIdToken(idToken);
        const decodedToken = yield firebase_admin_1.default.auth(firebase_config_1.app).verifyIdToken(idToken);
        const email = decodedToken.email;
        /** usually would check to see if user given by decodedToken is an admin, but
         * in this case only people with Cornell email addresses are qualified to
         * add new patients */
        if (email.endsWith("@cornell.edu")) {
            const newPatient = req.body;
            const addedPatient = yield patientsCollection.add(newPatient);
            res.send(addedPatient.id);
        }
        else {
            res.send("not admin");
        }
    }
    catch (error) {
        res.send("auth error");
    }
}));
app.listen(port, () => console.log(`Listening on port ${port}.`));
