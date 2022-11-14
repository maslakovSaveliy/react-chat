import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
type Props = {};

const Home = (props: Props) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  return <div>home</div>;
};

export default Home;
