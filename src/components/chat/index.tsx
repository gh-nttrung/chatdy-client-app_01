import { useEffect, useState } from "react";

import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import ChatListComponent from "./ChatList";
import ChatBoxComponent from "./ChatBox";
import { ChatItem } from "./ChatItem";
import { get } from "../../common/api";

export default function ChatWindow() {
  const [currentChat, setCurrentChat] = useState<ChatItem>();

  const handleSelectChat = async (chat_id: string) => {
    if (chat_id && chat_id !== "") {
      const res = await get(`/chat/get_by_id/${chat_id}`);
      if (res.success) {
        setCurrentChat(res.data);
      }
    }
  };

  useEffect(() => {}, [currentChat]);

  return (
    <div style={{ margin: "10px" }}>
      <MDBCard id="chat3">
        <MDBCardBody>
          <MDBRow>
            <ChatListComponent onSelected={handleSelectChat} />
            {currentChat ? (
              <ChatBoxComponent chat={currentChat} />
            ) : (
              <MDBCol md="6" lg="7" xl="8">
                <div
                  className="text-muted"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1>Welcome</h1>
                  <span>Let's select a chat</span>
                </div>
              </MDBCol>
            )}
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}
