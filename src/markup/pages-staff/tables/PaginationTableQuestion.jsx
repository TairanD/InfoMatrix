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
import FormQuestion from "../forms/form-question";
import ModalAddQuestion from "../forms-add/modal-add-question";
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

const questionAttributeList = ["ID", "Subject", "Description", "Answers", "Tags"];

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

export default function PaginationTableQuestion({ passed_search }) {
  // form data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleEditClick = (question) => {
    // Set the form data and open the modal
    setFormData({
      id: question.id,
      name: question.name,
      info: question.info,
      image: question.image,
      tags: question.tags,
    });
    setIsEditModalOpen(true);
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleDeleteClick = async (question) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
  
    // If the user confirms the deletion
    if (confirmDelete) {
      try {
        // Perform the deletion request
        const res = await axios.get("/del_question/" + question.id);
        console.log(res);
        // Refresh the data after deletion
        reFetch();
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting question:", error);
      }
    }
  };
  


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
    fetchResources("/all_questions");
  }, []);

  // re-fetch if needed
  function reFetch(){
    fetchResources("/all_questions");
  }

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
        if (element.name.toLowerCase().includes(searchText.toLowerCase())) {
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
      <ModalAddQuestion rerender={reFetch}/>
      <StyledTable>
        <TableHead>
          <TableRow>
            {
              <>
                <TableCell align="left">{questionAttributeList[0]}</TableCell>
                {questionAttributeList.slice(1).map((attribute, index) => (
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
            .map((question, index) => (
              <TableRow key={index}>
                <TableCell align="left">{question.id}</TableCell>
                <ToggleTableCell content={question.name} maxLength={6} maxWidth={200}/>
                <ToggleTableCell content={question.info} maxLength={10} maxWidth={350}/>
                <TableCell align="center>">
                  {question.num_answers ? (
                    question.num_answers < 10 ? (
                      <Small bgcolor={bgSecondary}>
                        {question.num_answers}
                      </Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>{question.num_answers}</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>{question.num_answers}</Small>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Paragraph>
                    {question.tags.split("$").map((tag, index) => (
                      <Small bgcolor={bgSecondary} style={{marginRight: "2px"}} >{tag}</Small>
                    ))}
                  </Paragraph>
                </TableCell>
                <TableCell align="center">
                <IconButton onClick={() => handleEditClick(question)}>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteClick(question)}>
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
                      <FormQuestion
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
