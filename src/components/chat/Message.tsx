
import * as Icons from "react-bootstrap-icons"
interface MessageProps {
  messageItem: MessageItem;
}

export interface MessageItem {
  id: string;
  isMe: boolean;
  text: string;
  time: string;
  user_name: string;
}

export default function MessageComponent({ messageItem }: MessageProps) {
  return messageItem.isMe ? (
    <div className="d-flex flex-row justify-content-end">
      <div>
        <p style={{ textAlign: "right", marginInline: "20px", fontWeight: "bolder" }}>{messageItem.user_name}</p>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
          {messageItem.text}
        </p>
        <p className="small me-3 mb-3 rounded-3 text-muted">
          {messageItem.time}
        </p>
      </div>
      <i>
        <Icons.PersonCircle width={30} height={30}/>
      </i>
    </div>
  ) : (
    <div className="d-flex flex-row justify-content-start">
      <i>
        <Icons.PersonCircle width={30} height={30}/>
      </i>
      <div>
      <p style={{ textAlign: "left", marginInline: "20px", fontWeight: "bolder" }}>{messageItem.user_name}</p>
        <p
          className="small p-2 ms-3 mb-1 rounded-3"
          style={{ backgroundColor: "#f5f6f7" }}
        >
          {messageItem.text}
        </p>
        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
          {messageItem.time}
        </p>
      </div>
    </div>
  );
}
