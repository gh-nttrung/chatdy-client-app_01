import * as Icons from "react-bootstrap-icons";
interface ChatItemProps {
  chatItem: ChatItem;
  onSelected: (chat_id: string) => void;
}

export interface ChatItem {
  id: string;
  title: string;
  last_message: string;
  last_active_time: string;
  is_active: boolean;
  unread: number;
}

export default function ChatItemComponent({
  chatItem,
  onSelected,
}: ChatItemProps) {
  const handleSelect = () => {
    onSelected(chatItem.id);
  };

  return (
    <li className="p-2 border-top" onClick={handleSelect}>
      <a className="d-flex justify-content-between" style={{textDecoration: "none"}}>
        <div className="d-flex flex-row">
          <div>
            <span style={{ marginInline: "5px" }}>
              <Icons.Chat width={30} height={30} />
              {chatItem.is_active && (
                <span className="badge bg-success badge-dot"></span>
              )}
            </span>
          </div>
          <div className="pt-1">
            <p className="fw-bold mb-0">{chatItem.title}</p>
            <p className="small text-muted">{chatItem.last_message}</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">{chatItem.last_active_time}</p>
          <span className="badge bg-danger rounded-pill float-end">
            {chatItem.unread}
          </span>
        </div>
      </a>
    </li>
  );
}
