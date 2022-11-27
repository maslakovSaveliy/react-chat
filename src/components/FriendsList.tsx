import {
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { FC } from "react";
import { IUser } from "../models/IUser";

type Props = {
  friends: IUser[];
};

const FriendsList: FC<Props> = ({ friends }) => {
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="friends"
      subheader={
        <ListSubheader component="div" id="friends">
          Friends
        </ListSubheader>
      }
    >
      {friends.map((friend) => (
        <ListItemButton key={friend.uid}>
          <ListItemIcon>
            <Avatar src={friend.photoURL} />
          </ListItemIcon>
          <ListItemText primary={friend.displayName} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default FriendsList;
