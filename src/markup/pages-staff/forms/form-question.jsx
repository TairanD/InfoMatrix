import {
  Button,
  Grid,
  Icon,
  styled,
  MenuItem,
} from "@mui/material";
import { Span } from "../../../app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const FormQuestion = ({ data, rerender, closeForm }) => {
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

  const [imgFile, setImgFile] = useState(null);

  // If in edit mode
  useEffect(() => {
    if (data) {
      // setState(data);
      let newState = data;
      let tagsList = getSeparatedTags(data.tags);
      newState["tag1"] = tagsList[0];
      newState["tag2"] = tagsList[1];
      newState["tag3"] = tagsList[2];
      setState(newState);
    }
  }, [data]);

  useEffect(() => {
    console.log("state: ", state);
  }, [state]);

  // separate tags
  function getSeparatedTags(tagsString) {
    return tagsString.split("$");
  }

  // integrate tags
  function getIntegratedTags(tagsList) {
    let toReturn = "";
    let length = tagsList.length;
    for (let i = 0; i < length; i++) {
      toReturn += tagsList[i];
      if (i !== length - 1) {
        toReturn += "$";
      }
    }
    return toReturn;
  }

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
        .post("/edit_question/" + state.id, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data["msg"]);
          if (response.data["msg"] === "Question edited !") {
            rerender(); // re-fetch the datalist
            closeForm();
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
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <h4>Editing Question</h4>
        <Grid container spacing={2}>
          <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>

            {/* <TextField
              type="text"
              name="id"
              id="standard-basic"
              value={state.id || ""}
              label="Question ID"
              disabled // This makes the TextField non-interactive
            /> */}

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

            {/* <TextField
              type="text"
              name="tags"
              label="Tags (separated by `$`)"
              onChange={handleChange}
              value={state.tags || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
              disabled
            /> */}
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={6}>
            <h6 style={{marginBottom: 15}}>Tags: </h6>
            <TextField
              select
              name="tag1"
              label="Discipline"
              value={state.tag1 || ""}
              onChange={handleChange}
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
              <h6 style={{marginBottom: 15}}>Image: </h6>
              <img
                src={"data:;base64," + state.image}
                alt=""
                className="editQuestionImg"
              /></>
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
    </div>
  );
};

export default FormQuestion;
