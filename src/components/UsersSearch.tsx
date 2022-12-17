import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useDebounce } from "../hooks/debounce";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IUser } from "../models/IUser";
type Props = {};
const UsersSearch = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search);
  const firestore = getFirestore();
  const [users, usersLoading] = useCollectionData(
    collection(firestore, "users")
  );
  const [searchedUsers, setSearchedUsers] = useState<DocumentData[]>([]);
  const searchUsers = () => {
    if (!search) {
      setSearchedUsers([]);
    } else {
      setSearchedUsers(users!);
      console.log(users!);
      console.log(searchedUsers);
      const res = searchedUsers.filter((user) =>
        user.displayName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedUsers(res!);
      console.log(res);
      console.log(searchedUsers);
    }
  };
  useEffect(() => {
    searchUsers();
  }, [debounced, users]);
  return (
    <Paper
      id="search"
      component="form"
      sx={{
        p: "2px 2px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: "35px",
        ":focus": { backgroundColor: "red" },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Users"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        inputProps={{ "aria-label": "search users" }}
      />
      <IconButton
        type="button"
        onClick={searchUsers}
        sx={{ p: "5px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
export default UsersSearch;
