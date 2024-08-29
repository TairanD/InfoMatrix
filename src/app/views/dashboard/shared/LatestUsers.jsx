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
  IconButton,
} from "@mui/material";
import { Paragraph } from "../../../components/Typography";
import { useEffect, useState } from "react";
import axios from "axios";

// STYLED COMPONENTS
const CardHeader = styled(Box)(() => ({
  display: "flex",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "12px",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  textTransform: "capitalize",
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: "pre",
  "& small": {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  },
  "& td": { borderBottom: "none" },
  "& td:first-of-type": { paddingLeft: "16px !important" },
}));

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
}));

export default function LatestUsers() {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [dataList, setDataList] = useState([]);

  const fetchResources = async () => {
    const res = await axios.get("/find_latest_users");
    setDataList(res.data);
  };

  // Actually fetching the data based on the type
  useEffect(() => {
    fetchResources();
  }, []);

  // useEffect(() => {
  //   console.log("Latest Users useEffect:", dataList)
  // }, [dataList])

  return (
    <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
      <CardHeader>
        <Title>Latest Users</Title>
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
                Avatar
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Name
              </TableCell>

              <TableCell colSpan={2} sx={{ px: 0 }}>
                Role
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {dataList.map((user, index) => (
              <TableRow key={index} hover>
                <TableCell
                  colSpan={2}
                  align="left"
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Box display="flex" alignItems="center" gap={4}>
                    <Avatar src={"data:;base64," + user.avatar} />
                  </Box>
                </TableCell>

                <TableCell
                  align="left"
                  colSpan={2}
                  sx={{ px: 0, textTransform: "capitalize" }}
                >
                  <Paragraph>{user.name}</Paragraph>
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {user.role == 0 ? (
                    <Small bgcolor={bgSecondary}>Customer</Small>
                  ) : (
                    <Small bgcolor={bgPrimary}>Staff</Small>
                  )}
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

const productList = [
  {
    imgUrl: "/assets/images/products/headphone-2.jpg",
    name: "earphone",
    price: 100,
    available: 15,
  },
];
