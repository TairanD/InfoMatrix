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

import FormUser from "../../../../markup/pages-staff/forms/form-user";

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

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
];
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

export default function PaginationTable({ element_type, passed_search }) {
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

  const Modal = ({ isOpen, onClose, children }) => {
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
    if (element_type === "user") {
      fetchResources("/find_users");
    }
  }, [element_type]);

  // re-fetch if needed
  function reFetch(){
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
    <>
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              {!element_type && (
                <>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Start Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </>
              )}
              {element_type === "user" && (
                <>
                  <TableCell align="left">{userAttributeList[0]}</TableCell>
                  {userAttributeList.slice(1).map((attribute, index) => (
                    <TableCell align="center">{attribute}</TableCell>
                  ))}
                  <TableCell align="left">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          {loading && (
            <div className="loading-icon">
              <i className="fa fa-spinner fa-spin fa-2x mt-3"></i>
            </div>
          )}
          <TableBody>
            {!element_type &&
              subscribarList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{subscriber.name}</TableCell>
                    <TableCell align="center">{subscriber.company}</TableCell>
                    <TableCell align="center">{subscriber.date}</TableCell>
                    <TableCell align="center">{subscriber.status}</TableCell>
                    <TableCell align="center">${subscriber.amount}</TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            {element_type === "user" &&
              dataList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.role == 0 ? (
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
                      <IconButton>
                        <Icon color="error">close</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            {isModalOpen && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  >
                    {formData && <FormUser data={formData} rerender={reFetch} closeForm={() => setIsModalOpen(false)} />}
                  </Modal>
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
          count={subscribarList.length}
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
