import React, { useState, useEffect, useRef, useContext } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import MessageChip from "../MessageChip/MessageChip";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Box from "@mui/material/Box";
import ModalDebugMessage from "../ModalDebugMessage/ModalDebugMessage";
import { MessageContext } from "../../../context/message/MessageContext";
import {
  Typography,
  Button,
  Checkbox,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import ModalStyles from "../Styles/Modal.styles";
import { wait } from "../../../utils";

const DeleteModal = ({ open, handleClose }) => {
  const classes = ModalStyles();

  const {
    state: messageState,
    deleteMessage,
    updateMessage,
  } = useContext(MessageContext);
  const { selectedMessages, messages } = messageState;

  const [deleteConfig, setDeleteConfig] = useState({
    attachments: true,
    messages: true,
  });
  const [deleting, setDeleting] = useState(false);
  const [deleteObj, setDeleteObj] = useState(null);
  const [debugMessage, setDebugMessage] = useState("");
  const resetDebugMessage = () => {
    setDebugMessage("");
  };
  const openRef = useRef();
  openRef.current = open;

  useEffect(() => {
    setDeleteConfig({ attachments: true, messages: true });
  }, [open]);

  /**
   * Attempt to delete the selected message
   */
  const handleDeleteMessage = async () => {
    setDeleting(true);
    let count = 0;
    let selectedRows = await messages.filter((x) =>
      selectedMessages.includes(x.id)
    );
    while (count < selectedMessages.length && openRef.current) {
      let currentRow = await selectedRows.filter(
        // eslint-disable-next-line no-loop-func
        (x) => x.id === selectedMessages[count]
      )[0];
      setDeleteObj(currentRow);
      if (
        (deleteConfig.attachments && deleteConfig.messages) ||
        (currentRow.content.length === 0 && deleteConfig.attachments) ||
        (currentRow.attachments.length === 0 && deleteConfig.messages)
      ) {
        const response = await deleteMessage(currentRow);
        if (response === null) {
          count++;
        } else if (response > 0) {
          setDebugMessage(`Pausing for ${response} seconds...`);
          await wait(response, resetDebugMessage);
        } else {
          setDebugMessage("You do not have permission to modify this message!");
          await wait(0.5, resetDebugMessage);
          count++;
        }
      } else if (deleteConfig.attachments || deleteConfig.messages) {
        const response = await updateMessage(
          deleteConfig.attachments
            ? { ...currentRow, attachments: [] }
            : { ...currentRow, content: "" }
        );
        if (response === null) {
          count++;
        } else if (response > 0) {
          setDebugMessage(`Pausing for ${response} seconds...`);
          await wait(response, resetDebugMessage);
        } else {
          setDebugMessage("You do not have permission to modify this message!");
          await wait(0.5, resetDebugMessage);
          count++;
        }
      } else break;
    }
    setDeleting(false);
    handleClose();
  };
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">Delete Data</Typography>
        <Typography variant="caption">
          Proceed with caution, this is permanent!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                disabled={deleting}
                defaultChecked
                onChange={(e) => {
                  setDeleteConfig({
                    ...deleteConfig,
                    attachments: e.target.checked,
                  });
                }}
              />
            }
            label="Attachments"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                disabled={deleting}
                defaultChecked
                onChange={(e) => {
                  setDeleteConfig({
                    ...deleteConfig,
                    messages: e.target.checked,
                  });
                }}
              />
            }
            label="Messages"
          />
          {deleting && deleteObj && (
            <>
              <Box my={1} className={classes.box}>
                <MessageChip
                  avatar={`https://cdn.discordapp.com/avatars/${deleteObj.author.id}/${deleteObj.author.avatar}.png`}
                  username={deleteObj.username}
                  content={deleteObj.content}
                />
                <ArrowRightAltIcon className={classes.icon} />
                <DeleteSweepIcon className={classes.deleteIcon} />
              </Box>
              <ModalDebugMessage debugMessage={debugMessage} />
              <Stack justifyContent="center" alignItems="center">
                <CircularProgress />
              </Stack>
              <Typography className={classes.objIdTypography} variant="caption">
                {deleteObj.id}
              </Typography>
            </>
          )}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button
          variant="contained"
          disabled={deleting}
          onClick={handleDeleteMessage}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteModal;