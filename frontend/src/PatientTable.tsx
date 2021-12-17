export type Priority = "High" | "Medium" | "Low";

export type Patient = {
  name: string;
  age: number;
  priority: Priority;
};

type RowProps = {
  patient: Patient;
};

type TableProps = {
  patients: Patient[];
};

const PatientRow = ({ patient: { name, age, priority } }: RowProps) => {
  const priorityStyle =
    priority === "High"
      ? { color: "red" }
      : priority === "Medium"
      ? { color: "orange" }
      : {};

  return (
    <tr>
      <td>{name}</td>
      <td>{age}</td>
      <td style={{ ...priorityStyle }}>{priority}</td>
    </tr>
  );
};

export const PatientTable = ({ patients }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <PatientRow patient={patient} key={patient.name} />
        ))}
      </tbody>
    </table>
  );
};
