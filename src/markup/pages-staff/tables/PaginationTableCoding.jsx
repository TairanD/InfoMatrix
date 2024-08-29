import { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Icon,
  Table,
  styled,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  TablePagination,
  useTheme,
} from "@mui/material";
import { Paragraph } from "../../../app/components/Typography";
import ToggleTableCell from "../component/toggle-table-cell";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const questionAttributeList = ["id", "name", "content", "difficulty", "tags"];

const Small = styled("small")(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: "#fff",
  padding: "2px 8px",
  borderRadius: "4px",
  overflow: "hidden",
  background: bgcolor,
  boxShadow: "0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  marginRight: "2px",
}));

export default function PaginationTableCoding({ passed_search }) {
  // Store the current displayed data list
  const [dataList, setDataList] = useState([]);

  // Data fetched
  const [fetchedDataList, setfetchedDataList] = useState([]);

  // Loading Icon
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const bgError = palette.error.main;

  function truncateString(str, maxLength) {
    let str_list = str.split(" ");
    if (str_list.length <= maxLength) {
      return str_list.join(" ");
    } else {
      return str_list.slice(0, maxLength).join(" ") + "...";
    }
  }

  // Axios fetch
  const fetchResources = async (url) => {
    setLoading(true);
    const res = await axios.get(url);
    setfetchedDataList(res.data);
    setDataList(res.data);
    setLoading(false);
  };

  // Actually fetching the data based on the type
  useEffect(() => {
    fetchResources("/all_coding_questions");
  }, []);

  // Set search Text
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    // pass the param to the searchText
    setSearchText(passed_search);
    if (searchText === "") {
      setDataList(fetchedDataList);
    } else {
      let newDataList = [];
      fetchedDataList.forEach(function (element) {
        // console.log(element.name);
        if (element.content.toLowerCase().includes(searchText.toLowerCase())) {
          newDataList.push(element);
        }
      });
      console.log("Filter Result:", newDataList);
      setDataList(newDataList);
    }
  }, [searchText, fetchedDataList, passed_search]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            {
              <>
                <TableCell align="left">{questionAttributeList[0]}</TableCell>
                {questionAttributeList.slice(1).map((attribute, index) => (
                  <TableCell align="center">{attribute}</TableCell>
                ))}
              </>
            }
          </TableRow>
        </TableHead>
        {loading && (
          <div className="loading-icon">
            <i className="fa fa-spinner fa-spin fa-2x mt-3"></i>
          </div>
        )}
        <TableBody>
          {dataList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((question, index) => (
              <TableRow key={index}>
                <TableCell align="left">{question.id}</TableCell>
                <TableCell align="center">
                  {truncateString(question.name, 10)}
                </TableCell>

                <ToggleTableCell content={question.content} maxLength={10} maxWidth={200}/>

                <TableCell align="center">
                  {question.difficulty === "Easy" && (
                    <Small bgcolor={"#00c400"}>{question.difficulty}</Small>
                  )}
                  {question.difficulty === "Medium" && (
                    <Small bgcolor={"#e3ca00"}>{question.difficulty}</Small>
                  )}

                  {question.difficulty === "Hard" && (
                    <Small bgcolor={bgError}>{question.difficulty}</Small>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Paragraph>
                    {question.tag
                      .split(",")
                      .slice(0, 3)
                      .map((tag, index) => (
                        <Small bgcolor={bgSecondary}>{tag}</Small>
                      ))}
                  </Paragraph>
                  <Paragraph>
                    {question.tag
                      .split(",")
                      .slice(3)
                      .map((tag, index) => (
                        <Small bgcolor={bgSecondary}>{tag}</Small>
                      ))}
                  </Paragraph>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={dataList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
}
