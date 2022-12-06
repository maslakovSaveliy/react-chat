import { Button, Container, Grid, TextField } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
interface FormValues {
  title: string;
  body: string;
  id: number | null;
}
type Props = {
  addPost: (value: FormValues, setValue: ({}: FormValues) => void) => void;
  isLoading: boolean;
  error: boolean;
};
const AddPostForm: FC<Props> = ({ addPost, isLoading, error }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    body: "",
    id: null,
  });
  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              error={error}
              sx={{ mb: 1 }}
              required
              label="Title"
              value={formValues.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, title: e.target.value })
              }
            />
            <TextField
              error={error}
              sx={{ mb: 1 }}
              required
              multiline
              label="Description"
              value={formValues.body}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormValues({ ...formValues, body: e.target.value })
              }
            />
            <Button
              variant="contained"
              onClick={() => addPost(formValues, setFormValues)}
            >
              Add post
            </Button>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default AddPostForm;
