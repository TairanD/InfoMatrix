import { useState, useEffect } from "react";
import { Span } from "../../../app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import {
  Button,
  Grid,
  Icon,
  styled,
  Box,
  Modal,
  MenuItem,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "white",
  //   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));

export default function ModalAddQuestion({ rerender }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    id: null,
    name: null,
    info: null,
    image: null,
    tags: null,
    tag1: null,
    tag2: null,
    tag3: null,
  });
  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  const [imgFile, setImgFile] = useState(null);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
    event.preventDefault();

    if (state) {
      const fd = new FormData();

      fd.append("name", state.name);
      fd.append("info", state.info);
      fd.append("tag1", state.tag1);
      fd.append("tag2", state.tag2);
      fd.append("tag3", state.tag3);
      fd.append("image", imgFile);

      axios
        .post("/upload_question", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data["msg"]);
          if (response.data["msg"] === "Question added !") {
            setOpen(false)
            rerender(); // re-fetch the datalist
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("State is null or undefined");
    }
  };

  const handleChange = (event) => {
    // event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImgFile(file); // set the file to the useState for upload
    const reader = new FileReader();

    reader.onload = () => {
      // Split the result string at the comma and get the second part (base64 data)
      const base64Data = reader.result.split(",")[1];
      setState({ ...state, image: base64Data });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const subjectList = [
    {
      value: "Machine_Learning",
      label: "Machine Learning",
    },
    {
      value: "C_Programming",
      label: "C Programming",
    },
    {
      value: "Java_Programming",
      label: "Java Programming",
    },
    {
      value: "Python_Programming",
      label: "Python Programming",
    },
    {
      value: "Computer_Network",
      label: "Computer Network",
    },
  ];

  const sourceList = [
    {
      value: "Text_Book",
      label: "Text Book",
    },
    {
      value: "Quiz",
      label: "Quiz",
    },
    {
      value: "Internet",
      label: "Internet",
    },
  ];

  const difficultyList = [
    {
      value: "Easy",
      label: "Easy",
    },
    {
      value: "Middle",
      label: "Middle",
    },
    {
      value: "Hard",
      label: "Hard",
    },
  ];

  return (
    <div>
      <button className="btn-success" style={{float: "right", borderRadius: "5px"}} onClick={handleOpen}>Add New Question</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <h4>Adding Question</h4>
            <Grid container spacing={2}>
              <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>

                <TextField
                  type="text"
                  name="name"
                  label="Subject"
                  onChange={handleChange}
                  value={state.name || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  multiline
                />
              </Grid>
              <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="info"
                  label="Question Description"
                  value={state.info || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  multiline
                />

              </Grid>

              <Grid item lg={4} md={4} sm={6} xs={6}>
                <h6 style={{ marginBottom: 15 }}>Tags: </h6>
                <TextField
                  select
                  name="tag1"
                  label="Discipline"
                  value={state.tag1 || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                >
                  {subjectList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  name="tag2"
                  label="Source"
                  value={state.tag2 || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                >
                  {sourceList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  name="tag3"
                  label="Difficulty"
                  value={state.tag3 || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                >
                  {difficultyList.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Image Upload Field */}
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ ml: 2 }}>
                {state.image ? (
                  <>
                    <h6 style={{ marginBottom: 15 }}>Image: </h6>
                    <img
                      src={"data:;base64," + state.image}
                      alt=""
                      className="editQuestionImg"
                    />
                  </>
                ) : (
                  <p style={{ color: "gray" }}>No image...</p>
                )}

                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image-upload"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    sx={state.image && { ml: 2 }}
                  >
                    {state.image ? "Update Image" : "Upload Image"}
                  </Button>
                </label>
              </Grid>
            </Grid>

            <Button
              color="primary"
              variant="contained"
              type="submit"
              sx={{ pl: 10, pr: 10, mt: 3 }}
            >
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
          </ValidatorForm>
        </Box>
      </Modal>
    </div>
  );
}
