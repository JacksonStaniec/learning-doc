import { useEffect, useState } from "react";
import { PatientTable, Patient, Priority } from "./PatientTable";
import { getAuth } from "firebase/auth";

type NewPatientProps = {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
};

const NewPatient = ({ patients, setPatients }: NewPatientProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Low");

  const createPatient = () => {
    const newPatient = { name, age, priority };

    /** send user token with request, backend will verify user is logged-in.
     *  only admins can create new patients, so user token will also be used
     *  to verify that admin is making the request. */
    getAuth()
      .currentUser?.getIdToken()
      .then((idToken) =>
        fetch("/createPatient", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: idToken,
          },
          body: JSON.stringify(newPatient),
        })
          .then((res) => res.text())
          .then((data) => {
            /** if user is an admin, then update with new patient */
            if (data === "not admin") {
              throw new Error("You must be an admin to add new patients.");
            } else {
              const newPatientWithID = { ...newPatient, id: data };
              setPatients([...patients, newPatientWithID]);
            }
          })
      );
  };

  return (
    <div>
      <p>Add New Patient:</p>
      <input
        type="text"
        name="name"
        placeholder="name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        name="age"
        placeholder="0"
        min="0"
        max="200"
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      <select
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={createPatient}>Add patient</button>
    </div>
  );
};

const PatientPortal = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    /** send user token with request, backend will verify user is logged-in */
    getAuth()
      .currentUser?.getIdToken()
      .then((idToken) => {
        fetch("/getPatients", {
          method: "GET",
          headers: {
            authorization: idToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const patients: Patient[] = data;

            const pvalue = (priority: Priority) =>
              priority === "High" ? 3 : priority === "Medium" ? 2 : 1;
            setPatients(
              // sort patients by priority
              patients.sort((p1, p2) => {
                return pvalue(p2.priority) - pvalue(p1.priority);
              })
            );
          });
      });
  }, [patients]);

  return (
    <div>
      <PatientTable patients={patients} />
      <NewPatient patients={patients} setPatients={setPatients} />
    </div>
  );
};

export default PatientPortal;
