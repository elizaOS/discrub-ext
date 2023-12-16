import { makeStyles } from "@mui/styles";

const ModalStyles = makeStyles(() => ({
  box: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  deleteIcon: {
    color: "red",
  },
  icon: {
    color: "rgb(210, 213, 247, 1)",
  },
  objIdTypography: {
    display: "block",
  },
  attachment: {
    backgroundColor: "#2b2d31",
    padding: "10px",
    borderRadius: "5px",
  },
  avatar: {
    cursor: "pointer",
  },
  dialogContent: {
    height: "300px",
    overflow: "hidden !important",
  },
  dialogActions: {
    minHeight: "57px",
  },
  stackContainer: {
    height: "100%",
    overflow: "auto",
    padding: "10px",
  },
  ellipsisTextContainer: {
    overflow: "hidden",
    display: "flex",
  },
  ellipsisText: {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default ModalStyles;
