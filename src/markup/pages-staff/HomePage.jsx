import React, {useEffect, useState} from "react";
import StaffSidebar from "./StaffSidebar";
import {styled, useTheme} from "@mui/material";
import axios from "axios";
import StaffTopBar from "../components-staff/staff-top-bar";
import NewUser from "./component/NewUser";
import StaffOverview from "./component/StaffOverview";
import NewAnswer from "./component/NewAnswer";
import NewQuestion from "./component/NewQuestion";
import NewCoding from "./component/NewCoding";
import NewOrganization from "./component/NewOrganiztion";
import NewPosts from "./component/NewPosts";

const HomePage = () => {
    const [stat_data, setStatData] = useState("")
    const [proportionData, setProportionData] = useState("")
    const fetchStatData = async (url) => {
        const res = await axios.get(url);
        setStatData(res.data);
    };

    const fetchProportionData = async (url) => {
        const res = await axios.get(url);
        setProportionData(res.data);
    }

    useEffect(() => {
        fetchStatData("/dash_board")
        fetchProportionData("/post_proportion")
    }, []);

    const {palette} = useTheme();

    const Title = styled("span")(() => ({
        fontSize: "1rem",
        fontWeight: "500",
        marginRight: ".5rem",
        textTransform: "capitalize"
    }));

    const SubTitle = styled("span")(({theme}) => ({
        fontSize: "0.875rem",
        color: theme.palette.text.secondary
    }));

    const [whichComponent, setWhichComponent] = useState("homepage");


    const renderComponent = () => {
        switch (whichComponent) {
            case 'homepage':
                return <StaffOverview/>;
            case 'user':
                return <NewUser/>;
            case 'answer':
                return <NewAnswer/>;
            case 'question':
                return <NewQuestion toHome={toHome}/>;
            case 'coding':
                return <NewCoding/>;
            case 'organization':
                return <NewOrganization/>;
            default:
                return <StaffOverview/>;
        }
    }

    function toHome(){
        setWhichComponent("homepage");
        // renderComponent();
    }


    return (
        <div className="container-fluid">
            <div className="row" style={{minHeight: "100vh"}}>
                <div className="col-md-2" style={{backgroundColor: "#4c1864"}}>
                    {whichComponent && <StaffSidebar setWhichComponent={setWhichComponent}/>}
                    
                </div>

                <div className="col-md-10" style={{padding: "0"}}>
                    {renderComponent()}
                </div>
            </div>
        </div>

    );
};

export default HomePage;

