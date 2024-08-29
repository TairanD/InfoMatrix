import { Edit } from "@mui/icons-material";
import {
  Box,
  Card,
  Table,
  Select,
  Avatar,
  styled,
  TableRow,
  useTheme,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  IconButton
} from "@mui/material";
import { Paragraph } from "../../../components/Typography";
import {useEffect, useState} from "react";
import axios from "axios";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between"
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize"
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" }
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)"
}));

export default function LatestPosts() {

  const [postsList,setPostList] = useState([]);
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  useEffect(() => {
    fetchData("/latest_posts")
  }, []);

  const fetchData = async (url) =>{
    const res = await axios.get(url);
    setPostList(res.data);
  }

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Latest Posts</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} align="left" sx={{ px: 3 }}>
                Subject
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }} align="left">
                Content
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }} align="left">
                Organisation
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }} align="left">
                Sender
              </TableCell>

              <TableCell colSpan={1} sx={{ px: 0 }} align="center">
                Date
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {postsList.map((post, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    {/*<Avatar src={post.imgUrl} />*/}
                    <Paragraph style = {{width : "10vw",overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{post.Subject}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {/*${post.price > 999 ? (post.price / 1000).toFixed(1) + "k" : post.price}*/}
                  <Paragraph style = {{width : "15vw",overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{post.Content}</Paragraph>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                  {/*{post.available ? (*/}
                  {/*  post.available < 20 ? (*/}
                  {/*    <Small bgcolor={bgSecondary}>{post.available} available</Small>*/}
                  {/*  ) : (*/}
                  {/*    <Small bgcolor={bgPrimary}>in stock</Small>*/}
                  {/*  )*/}
                  {/*) : (*/}
                  {/*  <Small bgcolor={bgError}>out of stock</Small>*/}
                  {/*)}*/}
                  <Paragraph>{post.Organisation_id}</Paragraph>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                  <Paragraph>{post.sender_id}</Paragraph>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={1}>
                  <Paragraph>{post.Date}</Paragraph>
                </TableCell>

                {/*<TableCell sx={{ px: 0 }} colSpan={1}>*/}
                {/*  <IconButton>*/}
                {/*    <Edit color="primary" />*/}
                {/*  </IconButton>*/}
                {/*</TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}

