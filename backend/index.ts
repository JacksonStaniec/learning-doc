import express from "express";
import cors from "cors";
import { db, auth, app as adminapp } from "./firebase-config";
import admin from "firebase-admin";

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

const patientsCollection = db.collection("patients");

type Patient = {
  name: string;
  age: number;
  priority: "High" | "Medium" | "Low";
};

type PatientWithID = Patient & { id: string };

app.get("/", (_, res) => {
  res.send("Connected.");
});

app.get("/getPatients", async (req, res) => {
  const idToken = req.headers.authorization || "";
  try {
    /** only logged-in users can make requests to this endpoint */
    await auth.verifyIdToken(idToken);
    const products = await patientsCollection.get();
    res.json(
      products.docs.map((doc): PatientWithID => {
        const product = doc.data() as Patient;
        return { ...product, id: doc.id };
      })
    );
  } catch (error) {
    res.send("auth error");
  }
});

app.post("/createPatient", async (req, res) => {
  const idToken = req.headers.authorization || "";
  try {
    await auth.verifyIdToken(idToken);

    const decodedToken = await admin.auth(adminapp).verifyIdToken(idToken);
    const email = decodedToken.email;

    /** usually would check to see if user given by decodedToken is an admin, but
     * in this case only people with Cornell email addresses are qualified to
     * add new patients */
    if (email.endsWith("@cornell.edu")) {
      const newPatient = req.body as Patient;
      const addedPatient = await patientsCollection.add(newPatient);
      res.send(addedPatient.id);
    } else {
      res.send("not admin");
    }
  } catch (error) {
    res.send("auth error");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
