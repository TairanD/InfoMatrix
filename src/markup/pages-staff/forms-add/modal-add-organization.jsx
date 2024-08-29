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
  InputAdornment,
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

export default function ModalAddOrganization({ rerender }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState({
    id: null,
    type: null,
    name: null,
    description: null,
    icon: null,
    rank: null,
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
      fd.append("type", state.type);
      fd.append("description", state.description);
      fd.append("file", imgFile);
      if (state.type === 1) {
        fd.append("rank", +state.rank);
      } else {
        // fd.append("rank", null);
      }

      axios
        .post("/add_organization", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data["msg"]);
          if (response.data["msg"] === "Add Organisation Successful!") {
            setOpen(false);
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
      setState({ ...state, icon: base64Data });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button
        className="btn-success"
        style={{ float: "right", borderRadius: "5px" }}
        onClick={handleOpen}
      >
        Add New Organization
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <h4>Adding Organization</h4>
            <Grid container spacing={2}>
              <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="name"
                  label={state.type === 1 ? "School Name" : "Company Name"}
                  onChange={handleChange}
                  value={state.name || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  multiline
                />
                <TextField
                  select
                  name="type"
                  label="Organization Type"
                  value={state.type === 1 ? 1 : 0}
                  // value={"fuckYou"}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                >
                  <MenuItem value={1}>{"College"}</MenuItem>
                  <MenuItem value={0}>{"Company"}</MenuItem>
                </TextField>
                {state.type === 1 && (
                  <TextField
                    type="text"
                    name="rank"
                    label={"QS Rank"}
                    onChange={handleChange}
                    value={state.rank || ""}
                    // validators={["required"]}
                    // errorMessages={["this field is required"]}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">No.</InputAdornment>
                      ),
                    }}
                  />
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="description"
                  label={
                    state.type === 1
                      ? "School Description"
                      : "Company Description"
                  }
                  value={state.description || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  multiline
                />
              </Grid>

              {/* Image Upload Field */}
              <Grid item lg={10} md={10} sm={12} xs={12} sx={{ ml: 2 }}>
                {state.icon ? (
                  <>
                    <h6 style={{ marginBottom: 15 }}>Image: </h6>
                    <img
                      src={"data:;base64," + state.icon}
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
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <label htmlFor="image-upload">
                  <Button
                    color="primary"
                    variant="contained"
                    component="span"
                    sx={state.icon && { ml: 2 }}
                  >
                    {state.icon ? "Update Image" : "Upload Image"}
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
