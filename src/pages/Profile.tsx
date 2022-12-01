import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Modal,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocument,
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import CreateIcon from "@mui/icons-material/Create";
import CircularProgress from "@mui/material/CircularProgress";
import "../utils/root-grid.css";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getFirestore,
  orderBy,
  Query,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import AddPostForm from "../components/AddPostForm";
import { app } from "../firebase";
import FriendsList from "../components/FriendsList";
import { Context } from "../context/Context";
import { IUser } from "../models/IUser";
import { IPost } from "../models/IPost";
import EditPostForm from "../components/EditPostForm";
interface FormValues {
  title: string;
  body: string;
}
const Profile = () => {
  const {
    openAddPost,
    handleCloseAddPost,
    handleOpenAddPost,
    openEditPost,
    handleOpenEditPost,
    handleCloseEditPost,
  } = useContext(Context);
  const lastElement = useRef<HTMLDivElement>(null);
  const auth = getAuth();
  const firestore = getFirestore();
  const [userAuth] = useAuthState(auth);
  const [users, usersLoading] = useCollectionData(
    collection(firestore, "users")
  );
  const openModal = async () => {
    handleOpenAddPost();
  };
  const [valuesError, setValuesError] = useState<boolean>(false);
  const [isPostSending, setIsPostSending] = useState(false);
  const [user, setUser] = useState<IUser | null | undefined | DocumentData>(
    null
  );
  const fetchUser = () => {
    const userDB = users?.find((user) => user.uid == userAuth?.uid);
    setUser(userDB);
  };
  useEffect(() => {
    fetchUser();
  });
  const editPost = async () => {};
  const addPost = async (
    value: FormValues,
    setValue: ({}: FormValues) => void
  ) => {
    if (value.body.length > 0 || value.title.length > 0) {
      setValuesError(false);
      setIsPostSending(true);
      await updateDoc(doc(firestore, "users", `${auth.currentUser?.uid}`), {
        posts: [
          ...users?.find((user) => user.uid == userAuth?.uid)?.posts,
          {
            body: value.body,
            title: value.title,
            createdAt: Timestamp.now(),
          },
        ],
      });
      setIsPostSending(false);
      handleCloseAddPost();
      setValue({ title: "", body: "" });
    } else {
      setValuesError(true);
    }
  };
  return (
    <Container>
      <Grid
        id="root__grid"
        container
        alignItems="top"
        justifyContent="space-around"
        padding="0.3cm"
      >
        <Slide direction="right" in={true}>
          <Grid id="child_grid" width="27.5%">
            <Paper sx={{ width: "100%", padding: "0.2cm", mb: 1 }}>
              <Grid container flexDirection="column" alignItems="center">
                <Box width="100%" marginBottom="0.2cm">
                  <Avatar
                    sx={{ width: "100%", height: "100%" }}
                    src={userAuth?.photoURL?.toString()}
                    alt="user_avatar"
                  />
                </Box>
                <Typography sx={{ m: 1 }} variant="h4">
                  Nickname: {userAuth?.displayName}
                </Typography>
                <Button variant="outlined" onClick={openModal}>
                  Add post
                </Button>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openAddPost}
                  onClose={handleCloseAddPost}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openAddPost}>
                    <Box
                      id="modal"
                      sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <AddPostForm
                        error={valuesError}
                        addPost={addPost}
                        isLoading={isPostSending}
                      />
                    </Box>
                  </Fade>
                </Modal>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={openEditPost}
                  onClose={handleCloseEditPost}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openEditPost}>
                    <Box
                      id="modal"
                      sx={{
                        position: "absolute" as "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <EditPostForm />
                    </Box>
                  </Fade>
                </Modal>
              </Grid>
            </Paper>
            <Paper
              sx={{
                width: "100%",
                padding: "0.2cm",
              }}
            >
              {usersLoading ? (
                <CircularProgress />
              ) : (
                <FriendsList friends={user?.friends} />
              )}
            </Paper>
          </Grid>
        </Slide>
        <Slide direction="left" in={true}>
          <Grid
            id="child_grid"
            width="67.5%"
            sx={{
              wordWrap: "break-word",
            }}
          >
            <Paper sx={{ width: "100%", padding: "10px" }}>
              <Grid container flexDirection="column">
                <Typography variant="h2">Posts:</Typography>
                {usersLoading ? (
                  <CircularProgress />
                ) : (
                  user?.posts?.reverse().map((post: IPost, index: number) => (
                    <Fade key={index} in={true}>
                      <Grid
                        id="parent"
                        sx={{
                          padding: "0.2cm",
                          m: 1,
                          borderTop: "1px solid lightgray",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h3">{post.title}</Typography>
                          <CreateIcon
                            id="child"
                            sx={{ cursor: "pointer" }}
                            onClick={handleOpenEditPost}
                          />
                        </Box>
                        <Typography variant="h5">{post.body}</Typography>
                        <Typography variant="body2" color="lightgray">
                          {post.createdAt.toDate().toUTCString()}
                        </Typography>
                      </Grid>
                    </Fade>
                  ))
                )}
                <div ref={lastElement} />
              </Grid>
            </Paper>
          </Grid>
        </Slide>
      </Grid>
    </Container>
  );
};

export default Profile;
