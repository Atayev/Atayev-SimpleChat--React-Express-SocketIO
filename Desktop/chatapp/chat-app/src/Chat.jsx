import React, { useEffect, useState } from "react";

function Chat({ socket, room, user }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        msg: currentMessage,
        room: room,
        author: user,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setAllMessages((all) => [...all, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setAllMessages((all) => [...all, data]);
    });
  }, [socket]);

  return (
    <div className="card">
      <h3>Chat room : {room} </h3>
      <div className="sendedMessages">
        {allMessages?.map((item, index) => (
          <div key={index}>
            <p>
              {item.author}: {item.msg}
            </p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Write a message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          style={{
            height: "36px",
            marginRight: "5px",
            padding: "5px",
            borderRadius: "18px",
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}

export default Chat;
