import React, { useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Tooltip from "../../DiscordComponents/DiscordTooltip/DiscordToolTip";
import { ChannelContext } from "../../../context/channel/ChannelContext";
import { DmContext } from "../../../context/dm/DmContext";
import ClearIcon from "@mui/icons-material/Clear";
import AdvancedFilteringStyles from "../AdvancedFiltering/AdvancedFiltering.styles";

function PrefilterUser({ isDm = false, purge, disabled = false }) {
  const { state: channelState, setPreFilterUserId } =
    useContext(ChannelContext);
  const { state: dmState, setPreFilterUserId: setDmPrefilterUserId } =
    useContext(DmContext);

  const classes = AdvancedFilteringStyles();

  const { preFilterUserIds, preFilterUserId } = channelState;
  const {
    preFilterUserId: dmPreFilterUserId,
    preFilterUserIds: dmPreFilterUserIds,
  } = dmState;

  const users = isDm ? dmPreFilterUserIds : preFilterUserIds;
  const value = isDm ? dmPreFilterUserId : preFilterUserId;
  const setUserId = isDm ? setDmPrefilterUserId : setPreFilterUserId;

  const getDisplayValue = () => {
    const foundUser = users.find((user) => user.id === value);
    return foundUser?.name || (isDm || !value ? "" : value);
  };

  const handleChange = (e, newValue, reason) => {
    if (reason === "input") {
      setUserId(newValue);
    } else if (reason === "reset") {
      const foundUser = users.find((user) => user.name === newValue);
      setUserId(foundUser ? foundUser.id : null);
    } else {
      setUserId(null);
    }
  };

  const toolTipTitle = isDm
    ? "Messages By"
    : `${purge ? "Purge" : "Messages"} By`;

  const toolTipDescription = isDm
    ? "Search messages by User"
    : `${purge ? "Purge" : "Search"} messages by User or User Id`;

  const textfieldLabel = isDm
    ? "Messages By"
    : `${purge ? "Purge" : "Messages"} By`;

  return (
    <Tooltip
      arrow
      title={toolTipTitle}
      description={toolTipDescription}
      placement="top"
    >
      <Autocomplete
        clearIcon={<ClearIcon />}
        freeSolo={!isDm}
        onInputChange={handleChange}
        options={users?.map((user) => user.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            fullWidth
            size="small"
            label={textfieldLabel}
            className={classes.filterByUserName}
          />
        )}
        value={getDisplayValue()}
        disabled={disabled}
      />
    </Tooltip>
  );
}

export default PrefilterUser;