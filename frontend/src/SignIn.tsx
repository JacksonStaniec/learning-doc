/** Adapted from Trends in Web Dev lecture material
 * https://webdev.cornelldti.org/
 */

import React, { useState, useEffect } from "react";
import {
  User,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./firebase";

type Props = {
  readonly children: React.ReactNode;
};

const SignIn = ({ children }: Props) => {
  const onGoogleSignIn = () => {
    signInWithPopup(auth, provider);
  };

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Hi, {user.displayName}!</h2>
          <div>{user.email}</div>
          <button onClick={() => signOut(auth)}>Sign-Out</button>
          {children}
        </div>
      ) : (
        <button onClick={onGoogleSignIn}>Sign-In</button>
      )}
    </div>
  );
};

export default SignIn;
