import React, { useState } from "react";
import StaffTopBar from "../../components-staff/staff-top-bar";

import { Box, styled, LinearProgress } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../../app/components";
import background from "../../../images/background/bg5.jpg";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

export default function NewPost( {toHome} ) {
  const [searchText, setSearchText] = useState("");

  function handleSubmit(msg) {
    console.log("Received in parent:", msg);
    setSearchText(msg);
  }

  const MyBox = styled("div")(()=>({
      minHeight: "100vh",
        backgroundImage: `url(${background})`
    }));

  return (
  <MyBox>
          <StaffTopBar handleSubmit={handleSubmit} text={searchText} />
          <br />
          <hr />
          <hr />
          <Container>
            <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Posts" }]} toHome={toHome} />
            </Box>

            <SimpleCard title="All Posts" >
              {/* <PaginationTableQuestion
                passed_search={searchText}
              /> */}
              <h2 id="toBeDeveloped">To Be Developed...</h2>
              <LinearProgress />
            </SimpleCard>
          </Container>
  </MyBox>

  );
}
