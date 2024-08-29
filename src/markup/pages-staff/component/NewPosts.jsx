import React, { useState } from "react";
import StaffTopBar from "../../components-staff/staff-top-bar";

import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../../app/components";
import PaginationTableQuestion from "../tables/PaginationTableQuestion";
import background from "../../../images/background/bg5.jpg";
import StaffNav from "../../components-staff/staff-nav";
import PaginationTablePost from "../tables/PaginationTablePost";
import * as PropTypes from "prop-types";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

function MyBox(props) {
    return null;
}

MyBox.propTypes = {children: PropTypes.node};
export default function NewPosts() {
    const [searchText, setSearchText] = useState("");

    function handleSearch(msg) {
        console.log("Received in parent:", msg);
        setSearchText(msg);
    }

    const MyBox = styled("div")(()=>({
        minHeight: "100vh",
        backgroundImage: `url(${background})`
    }));
    return (
        <MyBox >
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
        </MyBox>
    );
}