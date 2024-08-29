import { useState, useEffect } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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
    Link,
} from "@mui/material";
import {Paragraph} from "../../../app/components/Typography";


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

const postAttributeList = ["id","Subject","Sender", "Date","Belong Type", "View"];

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



export default function PaginationTablePost({ passed_search }) {
    // Store the current displayed data list
    const [dataList, setDataList] = useState([]);

    const navigate = useNavigate();

    // Data fetched
    const [fetchedDataList, setfetchedDataList] = useState([]);

    // Loading Icon
    const [loading, setLoading] = useState(false);
    const { palette } = useTheme();
    const bgPrimary = palette.primary.main;
    const bgSecondary = palette.secondary.main;
    const bgError = palette.error.main;

    function truncateString(str, maxLength) {
        let str_list = str.split(" ")
        if (str_list.length <= maxLength) {
            return str_list.join(" ");
        } else {
            return str_list.slice(0, maxLength).join(" ") + "...";
        }
    }

    // Axios fetch
    const fetchResourcesPost = async (url) => {
        setLoading(true);
        const res = await axios.get(url);
        setDataList(res.data);
        setLoading(false);
    };

    const handleSpecificClick = (post) => {

        // Extract post id and organisation id from the post object
        const { id, Organisation_id } = post;

        // Navigate to the desired URL using history.push
        navigate(`/forum/job/${Organisation_id}/post/${id}`);
    };

    const handleDeleteClick = (post) => {
        const { id } = post;
        // Perform the deletion logic here
        fetchResourcesPost(`/forum/delete/${id}`)
            .then(response => {
                window.location.reload();
                // navigate(`/staff/posts`)
            })
            .catch(error => {
                window.location.reload();
                console.log("Wrong");
            });
    };


    // Actually fetching the data based on the type
    useEffect(() => {
        fetchResourcesPost("/forum/forum_index");
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
            <StyledTable>
                <TableHead>
                    <TableRow>
                        {(
                            <>
                                <TableCell align="left">{postAttributeList[0]}</TableCell>
                                {postAttributeList.slice(1).map((attribute, index) => (
                                    <TableCell align="center">{attribute}</TableCell>
                                ))}
                                <TableCell align="center">Action</TableCell>
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
                    {dataList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((post, index) => (
                            <TableRow key={index}>
                                <TableCell align="left">{ post.id }</TableCell>
                                <TableCell align="center">
                                    {post.Subject}
                                </TableCell>
                                <TableCell align="center">
                                    { post.sender_id }
                                </TableCell>
                                <TableCell align="center">
                                    { post.Date }
                                </TableCell>
                                <TableCell align="center">{post.Belong_type == 0 ? ("Employability") : ("Education")}</TableCell>

                                <TableCell align="center">
                                    <IconButton onClick={() => handleSpecificClick(post)}>
                                        <VisibilityIcon color="action" />
                                    </IconButton>
                                </TableCell>

                                <TableCell align="center">
                                    <IconButton onClick={() => handleDeleteClick(post)}>
                                        <DeleteOutlineIcon color="error">close</DeleteOutlineIcon>
                                    </IconButton>
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
