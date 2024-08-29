import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid, Icon, styled, MenuItem } from "@mui/material";
import { Span } from "../../app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

// Images
import bg1 from "../../images/background/bg1.jpg";
import appBg from "../../images/background/appointment-bg.png";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

function UploadQuestionBox(props) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    id: null,
    name: null,
    image: null,
    tags: null,
    // tag1: null,
    tag2: null,
    tag3: null,
  });
  // useEffect(() => {
  //   console.log("state: ", state);
  // }, [state]);

  const [description, setDescription] = useState("");
  const [tag1, setTag1] = useState();

  const [imgFile, setImgFile] = useState(null);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
    event.preventDefault();

    if (!props.isAuthenticated) {
      navigate("/login");
    } else {
      if (state && description && tag1) {
        const fd = new FormData();

        fd.append("name", state.name);
        fd.append("info", description);
        fd.append("tag1", tag1);
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
              navigate("/question-bank")
            }
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.error("State is null or undefined");
      }
    }
  };

  // handle state change
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

  // handle tag update
  useEffect(() => {
    // the async function will be called
    const fetchData = async () => {
      try {
        const response = await axios.post("/predict_tag", {
          text: description,
        });
        const data = response.data;
        // console.log(data);
        // setState({ ...state, tag1: data.tag });
        setTag1(data.tag);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // actually generating the tag
    if (description !== "") {
      // setTagsGenerated("generating...");
      // setState({ ...state, tag1: "generating..." })
      setTag1("generating...");
      fetchData();
    }
  }, [description]);

  return (
    <>
      <div
        className="section-area section-sp3 ovpr-dark bg-fix appointment-box"
        style={{ backgroundImage: "url(" + bg1 + ")" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-bx style1 text-white text-center">
              <h2 className="title-head">Upload Your Question</h2>
              {/* <p>
                Select the image of the question from your device and our
                specific OCR technology will automatically transfer it into
                texts
              </p> */}
            </div>
          </div>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
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
                  variant="standard"
                  sx={{
                    "& .MuiInputBase-root": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item lg={7} md={7} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="info"
                  label="Question Description"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  multiline
                  variant="standard"
                  sx={{
                    "& .MuiInputBase-root": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "white",
                    },
                  }}
                />
              </Grid>

              <Grid item lg={5} md={5} sm={12} xs={12}>
                <h6 style={{ marginBottom: 15, color: "white" }}>Tags: </h6>{" "}
                {/* Changed h6 color to white */}
                <TextField
                  name="tag1"
                  label="Discipline"
                  value={tag1 || ""}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  // disabled
                  sx={{
                    "& .MuiInputBase-root": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                />
                <TextField
                  select
                  name="tag2"
                  label="Source"
                  value={state.tag2 || ""}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  sx={{
                    "& .MuiInputBase-root": { color: "white" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
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
                  sx={{
                    "& .MuiInputBase-root": { color: "black" },
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
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
                    <h6 style={{ marginBottom: 15, color: "white" }}>
                      Image:{" "}
                    </h6>{" "}
                    {/* Changed h6 color to white */}
                    <img
                      src={"data:;base64," + state.image}
                      alt=""
                      className="editQuestionImg"
                    />
                  </>
                ) : (
                  <p style={{ color: "lightGrey" }}>No image...</p>
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
              className="btn button-md"
              sx={{ pl: 10, pr: 10, mt: 3 }}
            >
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
          </ValidatorForm>
        </div>
        <img src={appBg} className="appoint-bg" alt="" />
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.login.isAuthenticated };
};

export default connect(mapStateToProps)(UploadQuestionBox);
