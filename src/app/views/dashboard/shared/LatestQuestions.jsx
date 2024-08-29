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

export default function LatestQuestions() {
  const [questionList,setQuestionList] = useState([]);
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  useEffect(() => {
    fetchData("/latest_questions")
  }, []);

  const fetchData = async (url) =>{
    const res = await axios.get(url);
    setQuestionList(res.data);
  }

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Latest Questions</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} sx={{ px: 3 }}>
                Subject
              </TableCell>

              <TableCell colSpan={4} sx={{ px: 0 }}>
                Describe
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Tags
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Answer
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Sender
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {questionList.map((question, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                  <Box display="flex" alignItems="center" gap={4}>
                    <Paragraph style = {{width : "10vw",overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{question.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                  {/*${question.price > 999 ? (question.price / 1000).toFixed(1) + "k" : question.price}*/}
                  <Paragraph style = {{width : "15vw",overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{question.info}</Paragraph>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  <Paragraph>{question.tags.split("$").map((tag,index) => (
                      <Small bgcolor={bgSecondary} style={{marginRight: "2px"}} >{tag}</Small>
                  ))}</Paragraph>
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  {question.num_answers ? (
                    question.num_answers < 10 ? (
                      <Small bgcolor={bgSecondary}>{question.num_answers}</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>{question.num_answers}</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>{question.num_answers}</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  <Paragraph>{question.id}</Paragraph>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
}

const productList = [
  {
    imgUrl: "/assets/images/products/headphone-2.jpg",
    name: "earphone",
    price: 100,
    available: 15
  }
];
