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
import ModalAddQuestion from "../forms-add/modal-add-question";
import ToggleTableCell from "../component/toggle-table-cell";
import FormOrg from "../forms/form-organization";
import ModalAddOrganization from "../forms-add/modal-add-organization";

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
  "Name",
  "Icon",
  "Type",
  "Description",
  "rank",
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

export default function PaginationTableOrganization({ passed_search }) {
  // form data
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleEditClick = (org) => {
    // Set the form data and open the modal
    setFormData({
      id: org.id,
      type: org.type,
      name: org.name,
      description: org.description,
      rank: org.rank,
      icon: org.icon,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (organization) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this organization?"
    );

    // If the user confirms the deletion
    if (confirmDelete) {
      try {
        // Perform the deletion request
        const res = await axios.get("/del_organization/" + organization.id);
        console.log(res);
        // Refresh the data after deletion
        reFetch();
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting answer:", error);
      }
    }
  };

  // Store the current displayed data list
  const [dataList, setDataList] = useState([]);

  // Data fetched
  const [fetchedDataList, setFetchedDataList] = useState([]);
  const [fetchSchoolDataList, setFetchSchoolDataList] = useState([]);
  const [fetchCompanyDataList, setFetchCompanyDataList] = useState([]);

  // Loading Icon
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const bgError = palette.error.main;

  // Axios fetch
  const fetchResourcesEnterprise = async (url) => {
    setLoading(true);
    const res = await axios.get(url);
    setFetchCompanyDataList(res.data);
    setLoading(false);
  };

  const fetchResourcesCollege = async (url) => {
    setLoading(true);
    const res = await axios.get(url);
    setFetchSchoolDataList(res.data);
    setLoading(false);
  };

  // Actually fetching the data based on the type
  useEffect(() => {
    fetchResourcesEnterprise("/forum/enterprise");
    fetchResourcesCollege("/forum/college");
  }, []);

  // re-fetch if needed
  function reFetch() {
    fetchResourcesEnterprise("/forum/enterprise");
    fetchResourcesCollege("/forum/college");
  }

  useEffect(() => {
    if (fetchSchoolDataList.length !== 0 && fetchCompanyDataList.length !== 0) {
      let concatList = fetchSchoolDataList.concat(fetchCompanyDataList);
      concatList.sort((a, b) => a.id - b.id);
      setFetchedDataList(concatList);
    }
  }, [fetchSchoolDataList, fetchCompanyDataList]);

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
      <ModalAddOrganization rerender={reFetch} />
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
            .map((organization, index) => (
              <TableRow key={index}>
                <TableCell align="left">{organization.id}</TableCell>
                <TableCell align="center">{organization.name}</TableCell>
                <TableCell align="center">
                  <img
                    className={"listImg"}
                    src={"data:;base64," + organization.icon}
                    alt="#"
                  />
                </TableCell>
                <TableCell align="center">
                  {organization.type === 0 ? "Company" : "College"}
                </TableCell>

                <ToggleTableCell
                  content={organization.description}
                  maxLength={10}
                  maxWidth={350}
                />
                <TableCell align="center">
                  {(organization.rank)  ? (
                    <Small bgcolor={bgSecondary}>{organization.rank} </Small>
                  ) : (
                    <div style={{ color: "lightGray" }}>None</div>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleEditClick(organization)}>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDeleteClick(organization)}>
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
                    <FormOrg
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
