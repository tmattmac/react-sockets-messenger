import { CircularProgress, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import getContext from "../../contexts/getContext";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexFlow: "column nowrap",
  },
  header: {
    background: "white",
    padding: "3em",
    boxShadow: "0 2px 20px rgba(88,133,196,0.1)",
  },
  headerText: {
    fontWeight: "bold",
  },
}));

const MessagePane = ({ newConversation = false }) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const { conversationId } = useParams();
  const {
    conversations,
    loadConversation,
    markConversationRead,
    sendMessage: send,
  } = useContext(getContext("conversations"));

  let conversation;
  let sendMessage;
  if (newConversation) {
    const users = location.state?.users;
    conversation = {
      messages: [],
      hydrated: true,
      users,
    };
    sendMessage = async (text) => {
      const conversationId = await send(users, text);
      history.replace(`/messages/${conversationId}`);
    };
  } else {
    conversation = conversations[conversationId];
    sendMessage = (text) => {
      send(conversation.users, text, conversationId);
    };
  }

  const isLoaded = conversation.hydrated;

  useEffect(() => {
    if (!isLoaded) {
      loadConversation(conversationId);
    } else if (!newConversation) {
      markConversationRead(conversationId);
    }
  }, [
    isLoaded,
    conversationId,
    loadConversation,
    markConversationRead,
    newConversation,
  ]);

  if (newConversation && !conversation.users) {
    return <Redirect to="/messages" />;
  } else if (!newConversation && !conversations[conversationId]) {
    return <Redirect to="/messages" />;
  }

  if (!isLoaded) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="h5" component="h1" className={classes.headerText}>
          {conversation.users.join(", ")}
        </Typography>
      </div>
      <MessageList messages={conversation.messages} />
      <MessageForm sendMessage={sendMessage} />
    </div>
  );
};

export default MessagePane;
