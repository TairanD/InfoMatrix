import React, {useEffect, useState} from "react";
import LatestPosts from "../../../app/views/dashboard/shared/LatestPosts";
import LatestQuestions from "../../../app/views/dashboard/shared/LatestQuestions";
import {Card, Grid, styled, useTheme} from "@mui/material";
import DoughnutChart from "../../../app/views/dashboard/shared/Doughnut";
import StatCards from "../../../app/views/dashboard/shared/StatCards";
import LatestUsers from "../../../app/views/dashboard/shared/LatestUsers";
import axios from "axios";
import background from "../../../images/background/bg5.jpg";
import LineChart from "../../../app/views/charts/echarts/LineChart";

const StaffOverview = () => {
    const [stat_data,setStatData] = useState("")
    const [proportionData,setProportionData] = useState("")
    const [predictionTraffic,setPredictionTraffic] = useState([])
    const fetchStatData = async (url) => {
        const res = await axios.get(url);
        setStatData(res.data);
    };

    const fetchProportionData = async (url) =>{
        const res = await axios.get(url);
        setProportionData(res.data);
    }

    const fetchPredictionData = async (url) =>{
        const res = await axios.get(url);
        console.log("Traffic: ",res)
        setPredictionTraffic(res.data.prediction);
    }

    useEffect(() => {
        fetchStatData("/dash_board")
        fetchProportionData("/post_proportion")
        fetchPredictionData("/predict_traffic")


    }, []);

    const { palette } = useTheme();

    const Title = styled("span")(() => ({
        fontSize: "1rem",
        fontWeight: "500",
        marginRight: ".5rem",
        textTransform: "capitalize"
    }));

    const SubTitle = styled("span")(({ theme }) => ({
        fontSize: "0.875rem",
        color: theme.palette.text.secondary
    }));

    const MyBox = styled("div")(()=>({
        minHeight: "100vh",
        padding: "25px",
        backgroundImage: `url(${background})`
    }));

  return (
      <MyBox>
            {/*<Layout1Topbar />*/}
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
          {/* Other content goes here */}

            <StatCards
                p_amount={stat_data.post_amount}
                q_amount={stat_data.question_amount}
                u_amount={stat_data.user_amount}
                view={stat_data.total_view}
            />

            <LatestPosts />
            <p>Main content of the staff portal...</p>
            <LatestQuestions />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Card sx={{ px: 3, py: 2, mb: 3 }}>
                        <Title>Proportion of Posts</Title>
                        <SubTitle>All the time</SubTitle>

                        <DoughnutChart
                            height="300px"
                            color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
                            study_num ={proportionData.study}
                            job_num ={proportionData.job}
                            others_num = {proportionData.others}
                        />

                    </Card>

                    <Card sx={{ px: 4, py: 2, mb: 3 }}>
                        <Title>Prediction of Traffic</Title>
                        <SubTitle>All the time</SubTitle>
                        <LineChart
                            height="300px"
                            color={[palette.primary.main, palette.primary.light]}
                            week_1={predictionTraffic.slice(0,7)}
                            week_2={predictionTraffic.slice(7,14)}
                        />
                    </Card>

                    <LatestUsers />

                </Grid>
            </Grid>
      </MyBox>

  );
};

export default StaffOverview;

