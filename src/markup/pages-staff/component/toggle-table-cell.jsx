import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";

function ToggleTableCell({ content, maxLength, maxWidth }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncation = () => {
    setIsTruncated(!isTruncated);
  };

  const truncateString = (str, numWords) => {
    const words = str.split(" ");
    if (words.length > numWords) {
      return words.slice(0, numWords).join(" ") + "...";
    }
    return str;
  };

  return (
    <TableCell
      align="center"
      onClick={toggleTruncation}
      style={{
        cursor: "pointer",
        maxWidth: maxWidth, // Sets maximum width to keep width unchanged
        whiteSpace: isTruncated ? "nowrap" : "normal", // Prevents wrapping when truncated
        overflow: "hidden",
        textOverflow: "ellipsis", // Adds ellipsis at the end if truncated
        // marginLeft: "10px",
        // marginRight: "10px",
      }}
    >
      {isTruncated ? truncateString(content, maxLength) : content}
    </TableCell>
  );
}

export default ToggleTableCell;
