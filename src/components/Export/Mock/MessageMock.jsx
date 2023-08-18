import React, { useContext } from "react";
import { Stack, Typography } from "@mui/material";
import ExportStyles from "../Styles/Export.styles";
import AttachmentMock from "./AttachmentMock";
import AuthorAvatar from "./AuthorAvatar";
import { MessageContext } from "../../../context/message/MessageContext";
import EmbedMock from "./EmbedMock";
import { ChannelContext } from "../../../context/channel/ChannelContext";
import { GuildContext } from "../../../context/guild/GuildContext";
import classNames from "classnames";
import { format, parseISO } from "date-fns";

const MessageMock = ({ row, index, hideAttachments = false }) => {
  const { state: guildState } = useContext(GuildContext);
  const { state: channelState } = useContext(ChannelContext);
  const { state: messageState } = useContext(MessageContext);
  const { selectedGuild } = guildState;
  const { selectedChannel, channels } = channelState;
  const { threads, messages } = messageState;
  const classes = ExportStyles();
  const messageDate = parseISO(row.timestamp, new Date());
  const tz = messageDate
    .toLocaleTimeString(undefined, { timeZoneName: "short" })
    .split(" ")[2];
  const foundThread = threads?.find(
    (thread) => thread.id === row.id || thread.id === row.channel_id
  );
  const isReplyMsg = row.type === 19;
  const repliedToMsg = isReplyMsg
    ? messages.find((msg) => msg.id === row.message_reference.message_id)
    : null;

  const showChannelName = selectedGuild.id && !selectedChannel.id;

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      id={row.id}
      className={classes.mockStack}
    >
      {repliedToMsg && (
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          spacing={1}
        >
          <div className={classes.replyDiv} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={1}
            sx={{ maxWidth: 600 }}
          >
            <AuthorAvatar
              hideAttachments={hideAttachments}
              author={repliedToMsg.author}
              reply
            />
            <Typography className={classes.replyMessageName} variant="caption">
              <strong>{repliedToMsg.username}</strong>
            </Typography>
            <Typography className={classes.replyMessageText} variant="caption">
              {hideAttachments ? (
                repliedToMsg.content
              ) : (
                <a href={`#${repliedToMsg.id}`}>{repliedToMsg.content}</a>
              )}
            </Typography>
          </Stack>
        </Stack>
      )}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="flex-start"
        spacing={1}
        className={classes.messageMockMainStack}
      >
        <AuthorAvatar hideAttachments={hideAttachments} author={row.author} />
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Typography className={classes.typographyTitle} variant="body2">
              <strong>{row.username}</strong>
            </Typography>
            <Typography
              mt="1px"
              className={classes.typographyHash}
              variant="caption"
            >
              {`${format(messageDate, "MM/dd/yyyy")} at ${format(
                messageDate,
                "HH:mm:ss"
              )} ${tz}`}
            </Typography>
            {showChannelName && (
              <Typography
                variant="caption"
                mt="1px"
                className={classNames(
                  classes.channelName,
                  classes.typographyTitle
                )}
              >
                {
                  channels.find((channel) => channel.id === row.channel_id)
                    ?.name
                }
              </Typography>
            )}
          </Stack>
          {foundThread && (
            <Typography variant="caption" className={classes.typographyHash}>
              {foundThread.name}
            </Typography>
          )}
          <Typography
            className={classes.typographyMessageText}
            variant="body1"
            id={`message-data-${index}`}
          >
            {row.content}
          </Typography>
          {!hideAttachments && (
            <Stack
              mt="5px"
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              {row.attachments.map((attachment) => (
                <AttachmentMock attachment={attachment} />
              ))}
              {row.embeds.map((embed, index) => (
                <EmbedMock embed={embed} index={index} />
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default MessageMock;
