import React, {useEffect, useState} from "react";

import { Box, styled } from "@mui/material";
import PaginationTableUser from "../tables/PaginationTableUser";
import { Breadcrumb, SimpleCard } from "../../../app/components";
import StaffTopBar from "../../components-staff/staff-top-bar";
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


export default function NewUser() {

    const [searchText, setSearchText] = useState("");

    useEffect(()=>{
        console.log("searchText: ",searchText);
    },[searchText])

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
          {/* Other content goes here */}
            <StaffTopBar handleSubmit={handleSubmit} text={searchText}/>
            <br/>
            <hr/>
            <hr/>
          <Container>
            <Box className="breadcrumb">
              <Breadcrumb routeSegments={[{ name: "Users" }]} />
            </Box>

            <SimpleCard title="All Users">
              <PaginationTableUser
                passed_search={searchText}
              />
            </SimpleCard>
          </Container>
        </MyBox>
  );
}
