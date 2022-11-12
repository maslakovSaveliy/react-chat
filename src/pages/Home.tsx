import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
type Props = {};

const Home = (props: Props) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  console.log(user);
  return <div>{user?.displayName}</div>;
};

export default Home;
