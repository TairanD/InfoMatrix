import React, { useState } from "react";
import StaffTopBar from "../../components-staff/staff-top-bar";

import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../../app/components";
import PaginationTableCoding from "../tables/PaginationTableCoding";
import StaffSidebar from "../StaffSidebar";
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

export default function NewCoding() {
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
                    {/* Other content goes here */}
                    <StaffTopBar handleSubmit={handleSubmit} text={searchText}/>
                    <br />
                    <hr />
                    <hr />
                    <Container>
                        <Box className="breadcrumb">
                            <Breadcrumb routeSegments={[{ name: "Coding Questions" }]} />
                        </Box>

                        <SimpleCard title="All Coding Questions">
                            <PaginationTableCoding
                                passed_search={searchText}
                            />
                        </SimpleCard>
                    </Container>
        </MyBox>
    );
}
