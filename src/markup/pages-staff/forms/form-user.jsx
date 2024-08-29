import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "../../../app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const FormUser = ({ data, rerender, closeForm }) => {
  const [state, setState] = useState({
    id: null,
    name: null,
    role: null,
    password: null,
  });

  //   useEffect(() => {
  //     console.log("the state: " , state);
  //   }, [state])

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
      fd.append("name", state.name);
      fd.append("role", state.role);
      fd.append("password", state.password);

      console.log(fd);

      axios
        .post("/edit_user/" + state.id, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data["msg"]);
          if (response.data["msg"] === "Edit Successful!"){
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

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="id"
              id="standard-basic"
              value={state.id || ""}
              label="User ID"
              disabled // This makes the TextField non-interactive
            />

            <TextField
              type="text"
              name="name"
              label="Username"
              onChange={handleChange}
              value={state.name || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="role"
              label="Role"
              value={state.role || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="text"
              name="password"
              label="Password"
              onChange={handleChange}
              value={state.password || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default FormUser;
