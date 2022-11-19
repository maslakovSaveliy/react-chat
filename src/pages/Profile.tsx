import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import "../utils/root-grid.css";
import {
  addDoc,
  collection,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import AddPostForm from "../components/AddPostForm";
interface FormValues {
  title: string;
  body: string;
}
const Profile = () => {
  const auth = getAuth();
  const firestore = getFirestore();
  const [user] = useAuthState(auth);
  const [posts, postsLoading] = useCollectionData(
    query(collection(firestore, "posts"), orderBy("createdAt"))
  );
  const userPosts = posts?.filter(
    (post) => post.displayName == user?.displayName
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModal = async () => {
    handleOpen();
  };
  const [isPostSending, setIsPostSending] = useState(false);
  const addPost = async (
    value: FormValues,
    setValue: ({}: FormValues) => void
  ) => {
    setIsPostSending(true);
    await addDoc(collection(firestore, "posts"), {
      displayName: user?.displayName,
      title: value.title,
      body: value.body,
      createdAt: serverTimestamp(),
    });
    setIsPostSending(false);
    handleClose();
    setValue({ title: "", body: "" });
  };
  return (
    <Container>
      <Grid
        id="root__grid"
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems="top"
        justifyContent="space-around"
        padding="0.3cm"
      >
        <Grid id="child_grid" width="27.5%">
          <Paper sx={{ width: "100%", padding: "0.2cm" }}>
            <Grid container flexDirection="column" alignItems="center">
              <Box width="100%" marginBottom="0.2cm">
                <Avatar
                  sx={{ width: "100%", height: "100%" }}
                  src={user?.photoURL?.toString()}
                  alt="user_avatar"
                />
              </Box>
              <Typography sx={{ m: 1 }} variant="h4">
                Nickname: {user?.displayName}
              </Typography>
              <Button variant="outlined" onClick={openModal}>
                Add post
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Box
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
                    <AddPostForm addPost={addPost} isLoading={isPostSending} />
                  </Box>
                </Fade>
              </Modal>
            </Grid>
          </Paper>
        </Grid>
        <Grid className="child_grid" width="67.5%">
          <Paper sx={{ width: "100%", padding: "0.2cm" }}>
            <Grid container flexDirection="column">
              <Typography variant="h2">Posts:</Typography>
              {postsLoading ? (
                <CircularProgress />
              ) : (
                userPosts?.map((post, index) => (
                  <Grid
                    key={index}
                    sx={{
                      padding: "0.2cm",
                      m: 1,
                      borderTop: "1px solid lightgray",
                    }}
                  >
                    <Typography variant="h3">{post.title}</Typography>
                    <Typography variant="h5">{post.body}</Typography>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
