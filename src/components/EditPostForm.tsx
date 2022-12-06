import { Button, Container, Grid, TextField } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Context } from "../context/Context";
import { IPost } from "../models/IPost";
type Props = {
  post: IPost;
  setPost: Dispatch<SetStateAction<IPost>>;
  editPost: (oldPost: IPost, posts: IPost[], post: IPost) => Promise<void>;
  posts: IPost[];
};
const EditPostForm: FC<Props> = ({ post, setPost, editPost, posts }) => {
  const { handleCloseEditPost } = useContext(Context);
  const [oldPost, setOldPost] = useState<IPost>(post);
  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <TextField
          sx={{ mb: 1 }}
          required
          label="Title"
          value={post.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPost({ ...post, title: e.target.value });
          }}
        />
        <TextField
          sx={{ mb: 1 }}
          required
          multiline
          label="Description"
          value={post.body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPost({ ...post, body: e.target.value });
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            editPost(oldPost, posts, post);
            handleCloseEditPost();
          }}
        >
          Edit post
        </Button>
      </Grid>
    </Container>
  );
};
export default EditPostForm;
