import { makeStyles } from "@mui/styles";

const ChannelMessagesStyles = makeStyles(() => ({
  boxContainer: {
    padding: "15px",
    maxHeight: "85%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: "1vh",
    flexDirection: "column",
  },
  tableBox: {
    maxHeight: ({ showOptionalFilters }) =>
      `calc(296px - ${showOptionalFilters ? "46px" : "0px"})`,
    overflow: "auto",
  },
  paper: {
    padding: "10px",
  },
  objIdTypography: {
    display: "block",
  },
  purgeHidden: {
    opacity: ({ purgeDialogOpen, exportDialogOpen }) =>
      (purgeDialogOpen || exportDialogOpen) && 0,
  },
  purgeWarning: {
    color: "#f44336",
  },
  autocomplete: {
    width: "330px !important",
  },
}));

export default ChannelMessagesStyles;