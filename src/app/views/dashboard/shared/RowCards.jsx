import { Fragment } from "react";
import { Box, Fab, Card, Grid, styled, Avatar, Checkbox, IconButton } from "@mui/material";
import { DateRange, MoreVert, StarOutline } from "@mui/icons-material";
// import format from "date-fns/format";
import { Span } from "../../../components/Typography";

// STYLED COMPONENTS
const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: "500",
  [theme.breakpoints.down("sm")]: { marginLeft: 4 }
}));

const StyledFabStar = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: "none",
  background: "#08ad6c !important",
  backgroundColor: "rgba(9, 182, 109, 1) !important",
  [theme.breakpoints.down("sm")]: { display: "none" }
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  marginLeft: 0,
  boxShadow: "none",
  color: "white !important",
  background: `${theme.palette.error.main} !important`,
  [theme.breakpoints.down("sm")]: { display: "none" }
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: "32px !important",
  height: "32px !important"
}));

function formatDate(date) {
  const d = new Date(date);
  const z = n => n.toString().padStart(2, '0'); // Adds leading zero if needed

  const month = z(d.getMonth() + 1); // getMonth() returns month from 0-11
  const day = z(d.getDate());
  const year = d.getFullYear();
  const hour12 = d.getHours() % 12 || 12; // Converts 24hr to 12hr format, replaces '0' hour with '12' for 12 AM
  const minutes = z(d.getMinutes());
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM';

  return `${month}/${day}/${year} ${hour12}:${minutes}${ampm}`;
}

export default function RowCards() {
  return [1, 2, 3, 4].map((id) => (
    <Fragment key={id}>
      <Card sx={{ py: 1, px: 2 }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <Box display="flex" alignItems="center">
              <Checkbox />

              {id % 2 === 1 ? (
                <StyledFabStar size="small">
                  <StarOutline />
                </StyledFabStar>
              ) : (
                <StyledFab size="small">
                  <DateRange />
                </StyledFab>
              )}

              <ProjectName>Project {id}</ProjectName>
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            {/* <Box color="text.secondary">{format(new Date().getTime(), "MM/dd/yyyy hh:mma")}</Box> */}
            <Box color="text.secondary">{formatDate(new Date())}</Box>
          </Grid>

          <Grid item xs={3} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box display="flex" position="relative" marginLeft="-0.875rem !important">
              <StyledAvatar src="/assets/images/face-4.jpg" />
              <StyledAvatar src="/assets/images/face-4.jpg" />
              <StyledAvatar src="/assets/images/face-4.jpg" />
              <StyledAvatar sx={{ fontSize: "14px" }}>+3</StyledAvatar>
            </Box>
          </Grid>

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Box py={1} />
    </Fragment>
  ));
}
