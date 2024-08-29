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
import CustomizedModal from "../component/modal";
import FormAnswer from "../forms/form-answer";
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

const answerAttributeList = [
  "ID",
  "Content",
  "Image",
  "Sender",
  "Belong to Question",
  "Rate",
];

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

export default function PaginationTableAnswer({ passed_search }) {
  ////////////////////////////////////
  // form data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleEditClick = (answer) => {
    // Set the form data and open the modal
    setFormData({
      id: answer.id,
      content: answer.content,
      image: answer.image,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (answer) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this answer?"
    );

    // If the user confirms the deletion
    if (confirmDelete) {
      try {
        // Perform the deletion request
        const res = await axios.get("/del_answer/" + answer.id);
        console.log(res);
        // Refresh the data after deletion
        reFetch();
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting answer:", error);
      }
    }
  };

  // re-fetch if needed
  function reFetch() {
    fetchResources("/all_answers");
  }
  /////////////////////////////////

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
    fetchResources("/all_answers");
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
                <TableCell align="left">{answerAttributeList[0]}</TableCell>
                {answerAttributeList.slice(1).map((attribute, index) => (
                  <TableCell align="center">{attribute}</TableCell>
                ))}
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
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
            .map((answer, index) => (
              <TableRow key={index}>
                <TableCell align="left">{answer.id}</TableCell>

                <ToggleTableCell
                  content={answer.content}
                  maxLength={10}
                  maxWidth={300}
                />
                <TableCell align="center">
                  {answer.image ? (
                    <img
                      className={"listImg"}
                      src={"data:;base64," + answer.image}
                      alt="#"
                    />
                  ) : (
                    <div style={{ color: "lightGray" }}>None</div>
                  )}
                </TableCell>
                <TableCell align="center">
                  {truncateString(answer.sender.name, 10)}
                </TableCell>
                <TableCell align="center">{answer.question_id}</TableCell>
                <TableCell align="center">
                  {answer.rate ? (
                    answer.rate < 10 ? (
                      <Small bgcolor={bgSecondary}>{answer.rate}</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>{answer.rate}</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>{answer.rate}</Small>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditClick(answer)}>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteClick(answer)}>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {isEditModalOpen && (
            <TableRow>
              <TableCell colSpan={7}>
                <CustomizedModal
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                >
                  {formData && (
                    <FormAnswer
                      data={formData}
                      rerender={reFetch}
                      closeForm={() => setIsEditModalOpen(false)}
                    />
                  )}
                </CustomizedModal>
              </TableCell>
            </TableRow>
          )}
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
