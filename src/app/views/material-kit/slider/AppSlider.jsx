import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "../../../components";
import ContinuousSlider from "./ContinuousSlider";
import DiscreteSlider from "./DiscreteSlider";
import InputSlider from "./InputSlider";
import RangeSlider from "./RangeSlider";
import VerticalSlider from "./VerticalSlider";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function AppSlider() {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Slider" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Continuous Slider">
          <ContinuousSlider />
        </SimpleCard>

        <SimpleCard title="Discrete Slider">
          <DiscreteSlider />
        </SimpleCard>

        <SimpleCard title="Range Slider">
          <RangeSlider />
        </SimpleCard>

        <SimpleCard title="Slider with Input">
          <InputSlider />
        </SimpleCard>

        <SimpleCard title="Vertical Slider">
          <VerticalSlider />
        </SimpleCard>
      </Stack>
    </Container>
  );
}
