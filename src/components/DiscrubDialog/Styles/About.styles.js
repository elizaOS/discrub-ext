import { makeStyles } from "@mui/styles";

const AboutStyles = makeStyles(() => ({
  boxContainer: {
    paddingTop: "5px",
    maxHeight: "85%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  paper: {
    maxHeight: "600px",
    overflow: "auto",
  },
  accordianTitle: {
    userSelect: "none !important",
  },
  cryptoImg: {
    width: "130px",
  },
  kofiImg: {
    border: "0px",
    width: 240,
  },
  changelogText: {
    opacity: 0.5,
  },
  accordianSummary: {
    cursor: "default !important",
  },
}));

export default AboutStyles;