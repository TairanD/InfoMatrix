import React, { useState } from "react";
import StaffNav from "../components-staff/staff-nav";
import StaffTopBar from "../components-staff/staff-top-bar";

import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../app/components";
import PaginationTablePost from "./tables/PaginationTablePost";
import PaginationTableOrganization from "./tables/PaginationTableOrganization";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

export default function AdminPost() {
    const [searchText, setSearchText] = useState("");

    function handleSearch(msg) {
        console.log("Received in parent:", msg);
        setSearchText(msg);
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <StaffNav />
                </div>
                <div className="col-lg-10">
                    {/* Other content goes here */}
                    <StaffTopBar onSearch={handleSearch} />
                    <br />
                    <hr />
                    <hr />
                    <Container>
                        <Box className="breadcrumb">
                            <Breadcrumb routeSegments={[{ name: "Answers" }]} />
                        </Box>

                        <SimpleCard title="All Answers">
                            <PaginationTablePost
                                passed_search={searchText}
                            />
                        </SimpleCard>
                    </Container>
                </div>
            </div>
        </div>
    );
}