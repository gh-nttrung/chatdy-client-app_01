import * as Icons from "react-bootstrap-icons"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import ChatItemComponent, { ChatItem } from "./ChatItem";
import { MDBCol, MDBTypography, MDBInputGroup } from "mdb-react-ui-kit";
import { get } from "../../common/api";

interface ChatListProps {
  onSelected: (chat_id: string) => void;
}

export default function ChatListComponent({ onSelected }: ChatListProps) {
  const { authData } = useContext(AuthContext);
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [userNameInput, setUserNameInput] = useState("");

  const fetchListItems = async () => {
    if (authData?.user_id) {
      const res = await get(`/chat/get_chat_list/${authData.user_id}`);
      if (res.success) {
        setChatList(res.data);
      }
    }
  };

  const handleSeach = async () => {
    if (userNameInput === "") {
      return;
    }

    const res = await get(`/chat/get_chat_detail/${userNameInput}`);
    if (res.success) {
      const chatData: ChatItem = res.data;
      if (chatData && chatData.id !== "") {
        onSelected(`${chatData.id}`);
      } else {
        alert("System error!!");
      }
    } else {
      alert("Not found");
    }
    setUserNameInput("");
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      await handleSeach();
    }
  };

  useEffect(() => {
    fetchListItems();
  }, [authData]);

  return (
    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
      <div className="p-3">
        <div style={{ height: "65px" }}>
          <MDBInputGroup className="mb-3">
            <input
              className="form-control rounded"
              placeholder="Enter your friend's username to chat"
              type="text"
              value={userNameInput}
              onChange={(event) => setUserNameInput(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <span style={{ marginInline: "5px" }}>
              <i onClick={handleSeach}>
                <Icons.Send/>
              </i>
            </span>
          </MDBInputGroup>
        </div>
        <div
          style={{
            position: "relative",
            height: "65vh",
            overflow: "auto",
          }}
        >
          <MDBTypography listUnStyled className="mb-0">
            {chatList.map((item) => (
              <ChatItemComponent
                key={item.id}
                chatItem={item}
                onSelected={onSelected}
              />
            ))}
          </MDBTypography>
        </div>
      </div>
    </MDBCol>
  );
}
