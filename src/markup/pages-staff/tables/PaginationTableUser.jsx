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

import FormUser from "../forms/form-user";

// STYLED COMPONENT
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0 } },
  },
}));

const userAttributeList = ["ID", "Name", "Email", "Role", "Avatar"];

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

export default function PaginationTable({ passed_search }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleEditClick = (user) => {
    // Set the form data and open the modal
    setFormData({
      id: user.id,
      name: user.name,
      role: user.role,
      password: "your_password",
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    console.log("Modal", isModalOpen);
  }, [isModalOpen]);

  const CustomizedModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <>
        <span
          className="close"
          onClick={onClose}
          style={{
            position: "absolute",
            right: "8vw",
            color: "black",
            fontSize: "50px",
          }}
        >
          &times;
        </span>
        {children}
      </>
    );
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
    fetchResources("/find_users");
  }, []);

  // re-fetch if needed
  function reFetch() {
    fetchResources("/find_users");
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
        // search by name or email
        if (element.name.toLowerCase().includes(searchText.toLowerCase()) || element.email.toLowerCase().includes(searchText.toLowerCase())) {
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

  // set for current user
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    fetch("/user_status")
      .then((res) => res.json())
      .then((currentUser) => {
        setCurrentUser(currentUser);

      });
  }, []);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])
  useEffect(() => {
    console.log(fetchedDataList);
  }, [fetchedDataList])

  const handleDeleteClick = async (user) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    // If the user confirms the deletion
    if (confirmDelete) {
      try {
        // Perform the deletion request
        const res = await axios.get("/del_user/" + user.id);
        console.log(res);
        // Refresh the data after deletion
        reFetch();
      } catch (error) {
        // Handle any errors that occur during the deletion process
        console.error("Error deleting answer:", error);
      }
    }
  };

  return (
    <>
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">{userAttributeList[0]}</TableCell>
              {userAttributeList.slice(1).map((attribute, index) => (
                <TableCell align="center">{attribute}</TableCell>
              ))}
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
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
              .map((user, index) => (user.name !== "deleted_user" &&
                <TableRow key={index}>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="center">{user.name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.role === 0 ? (
                      <Small bgcolor={bgSecondary}>Customer</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>Staff</Small>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <img
                      className={"listImg"}
                      src={"data:;base64," + user.avatar}
                      alt="#"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEditClick(user)}>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDeleteClick(user)}>
                      <Icon color="error">close</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {isModalOpen && (
              <TableRow>
                <TableCell colSpan={7}>
                  <CustomizedModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  >
                    {formData && (
                      <FormUser
                        data={formData}
                        rerender={reFetch}
                        closeForm={() => setIsModalOpen(false)}
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
    </>
  );
}
