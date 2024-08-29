import { Box, Card, Grid, IconButton, styled, Tooltip } from "@mui/material";
import {
  AttachMoney,
  Group,
  ShoppingCart,
  Store,
  ArrowRightAlt,
  Biotech,
  ViewArray,
  PostAdd,
  QuestionAnswer
} from "@mui/icons-material";
import { Small } from "../../../components/Typography";
import {EyeOutlined} from "@ant-design/icons";

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

export default function StatCards({p_amount,q_amount,view,u_amount}) {
  const cardList = [
    { name: "Users Amount", amount: u_amount, Icon: Group },
    { name: "This Week View", amount: view, Icon: EyeOutlined },
    { name: "Posts Amount", amount: p_amount, Icon: PostAdd },
    { name: "Questions Amount", amount: q_amount, Icon: QuestionAnswer }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name }) => (
        <Grid item xs={12} md={6} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" />

              <Box ml="12px">
                <Small>{name}</Small>
                <Heading>{amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <IconButton>
                <ArrowRightAlt />
              </IconButton>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
