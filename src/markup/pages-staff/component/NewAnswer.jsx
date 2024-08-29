import React, {useState} from "react";
import StaffTopBar from "../../components-staff/staff-top-bar";

import {Box, styled} from "@mui/material";
import {Breadcrumb, SimpleCard} from "../../../app/components";
import PaginationTableAnswer from "../tables/PaginationTableAnswer";
import background from "../../../images/background/bg5.jpg";

// STYLED COMPONENTS
const Container = styled("div")(({theme}) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: {margin: "16px"},
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: {marginBottom: "16px"},
    },
}));

export default function NewAnswer() {
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
            <StaffTopBar handleSubmit={handleSubmit} text={searchText}/>
            <br/>
            <hr/>
            <hr/>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{name: "Answers"}]}/>
                </Box>

                <SimpleCard title="All Answers">
                    <PaginationTableAnswer
                        passed_search={searchText}
                    />
                </SimpleCard>
            </Container>
        </MyBox>
    );
}
