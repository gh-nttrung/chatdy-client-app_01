import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { get, post } from "../../common/api";
import { MessageModel } from "../../common/types";
import { MDBCol } from "mdb-react-ui-kit";
import MessageComponent, { MessageItem } from "./Message";
import { ChatItem } from "./ChatItem";
import "./index.css";
import * as Icons from "react-bootstrap-icons";

import socket from "../../common/socket";

interface ChatBoxProps {
  chat: ChatItem;
}

export default function ChatBoxComponent({ chat }: ChatBoxProps) {
  const { authData } = useContext(AuthContext);
  const [messageList, setMessageList] = useState<MessageItem[]>([]);
  const [textInput, setTextInput] = useState("");

  const fetchData = async () => {
    const res = await get(`/message/get_message_list/${chat.id}`);
    if (res.success) {
      setMessageList(res.data);
    }
  };

  const handleSendMessage = async () => {
    if (textInput.trim() === "") {
      return;
    }

    const newMessage: MessageItem = {
      id: new Date().toLocaleString(),
      isMe: true,
      user_name: `${authData?.first_name} ${authData?.last_name}`,
      text: textInput.trim(),
      time: new Date().toLocaleString(),
    };

    setMessageList([...messageList, newMessage]);
    setTextInput("");

    //post api
    if (authData?.user_id) {
      const dataPost: MessageModel = {
        chat_id: chat.id,
        content: newMessage.text,
        sender_id: authData.user_id,
      };
      const res = await post("/message/create", dataPost);
      if (res.success) {
        //send message to socket
        socket?.emit("new_message", { chat_id: chat.id, message: newMessage });
      }
    }
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      await handleSendMessage();
    }
  };

  useEffect(() => {
    //join chat
    socket.emit("online", { chat_id: chat.id, user_id: authData?.user_id });

    // recieve mesage
    socket.on("new_message", (message: MessageItem) => {
      if (message) {
        setMessageList([...messageList, message]);
      }
    });
  }, [messageList]);

  useEffect(() => {
    if (chat.id) {
      fetchData();
    }
  }, [chat]);

  return (
    <>
      {chat && (
        <MDBCol md="6" lg="7" xl="8">
          <div className="header">
            <h3 className="text-muted" style={{ marginInline: "30px" }}>
              {chat.title}
            </h3>
            <i>
              <span className="bi bi-chat-left-quote"></span>
            </i>
          </div>

          <div
            style={{
              position: "relative",
              height: "65vh",
              overflow: "auto",
            }}
            className="pt-3 pe-3"
          >
            {messageList.map((message) => (
              <MessageComponent key={message.id} messageItem={message} />
            ))}
          </div>

          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
            <input
              type="text"
              className="form-control form-control-lg"
              id="exampleFormControlInput2"
              placeholder="Type message"
              value={textInput}
              onChange={(event) => setTextInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <i className="ms-1 text-muted" onClick={handleSendMessage}>
              <Icons.Send />
            </i>
          </div>
        </MDBCol>
      )}
    </>
  );
}
