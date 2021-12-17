import React from "react";
import SignIn from "./SignIn";
import PatientPortal from "./PatientPortal";

function App() {
  return (
    <div>
      <SignIn>
        <PatientPortal />
      </SignIn>
    </div>
  );
}

export default App;
