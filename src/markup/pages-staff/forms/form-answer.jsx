import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "../../../app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const FormAnswer = ({ data, rerender, closeForm }) => {
  const [state, setState] = useState({
    id: null,
    content: null,
    image: null,
  });

  useEffect(() => {
    console.log(state);
  }, [state])

  const [imgFile, setImgFile] = useState(null);

  // If in edit mode
  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data]);

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
    event.preventDefault();

    if (state) {
      const fd = new FormData();
      fd.append("content", state.content);
      fd.append("file", imgFile);

      axios
        .post("/edit_answer/" + state.id, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data["msg"]);
          if (response.data["msg"] === "Edit the answer successfully!"){
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
    event.persist();
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

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <h4>Editing Answer</h4>
        <Grid container spacing={2}>
          <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="id"
              id="standard-basic"
              value={state.id || ""}
              label="Answer ID"
              disabled // This makes the TextField non-interactive
            />

            <TextField
              type="text"
              name="content"
              label="Answer Content"
              onChange={handleChange}
              value={state.content || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
              multiline
            />
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

export default FormAnswer;
