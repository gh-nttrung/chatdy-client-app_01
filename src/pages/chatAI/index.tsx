import { useEffect, useState } from "react";
// import { openAiPost } from "../../common/api";
import { MessageAI } from "../../common/types";
import { MDBCol } from "mdb-react-ui-kit";
import * as Icons from "react-bootstrap-icons";

export default function ChatAIPage() {
    const [messageList, setMessageList] = useState<MessageAI[]>([]);
    const [textInput, setTextInput] = useState("");

    const handleSendMessage = async () => {
        if (textInput.trim() === "") {
            return;
        }

        const newMessage: MessageAI = {
            role: "user",
            content: textInput.trim(),
        };
        setMessageList([...messageList, newMessage]);
        setTextInput("");

        //post api
        // const res = await openAiPost([...messageList, newMessage]);
        // if (res.success) {
        //     const dataRes: MessageAI = {
        //         role: "assistant",
        //         content: "The system is maintenance!"
        //     }
        //     // setMessageList([...messageList, res.data]);
        //     setMessageList([...messageList, dataRes]);
        // }
        const dataRes: MessageAI = {
            role: "assistant",
            content: "The system is maintenance!"
        }
        setMessageList([...messageList, dataRes]);
    };

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            await handleSendMessage();
        }
    };

    useEffect(() => {
        setMessageList(messageList)
    }, [messageList]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <MDBCol md="6" lg="7" xl="8">
                <div className="header">
                    <h2 className="text-muted" style={{ marginInline: "30px" }}>
                        ASSISTANT AI
                    </h2>
                    <hr />
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
                    {messageList.map((message, index) =>
                        message.role === "user" ? (
                            <div key={index} className="d-flex flex-row justify-content-end">
                                <div>
                                    <p style={{ textAlign: "right", marginInline: "20px", fontWeight: "bolder" }}>Me</p>
                                    <p className="">
                                        {message.content}
                                    </p>
                                </div>
                                <i>
                                    <Icons.PersonCircle width={30} height={30} />
                                </i>
                            </div>
                        ) : (
                            <div key={index} className="d-flex flex-row justify-content-start">
                                <i>
                                    <Icons.PersonCircle width={30} height={30} />
                                </i>
                                <div>
                                    <p style={{ textAlign: "left", marginInline: "20px", fontWeight: "bolder" }}>AI</p>
                                    <p
                                        className="small p-2 ms-3 mb-1 rounded-3"
                                        style={{ backgroundColor: "#f5f6f7" }}
                                    >
                                        {message.content}
                                    </p>
                                </div>
                            </div>
                        )
                    )}
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
        </div>
    );
}
