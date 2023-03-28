import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
const socket = io("http://localhost:4000");

function App() {
  useEffect(() => {
    socket.on("connection", (sck) => {
      console.log(sck.id);
    });
    console.log(socket);
  }, []);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShow(true);
    }
  };
  return (
    <div className="App">
      {!show && (
        <div>
          <h3>Join to a chat</h3>
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            style={{
              marginRight: "5px",
            }}
          />
          <input
            type="text"
            placeholder="room id"
            onChange={(e) => setRoom(e.target.value)}
            style={{
              marginRight: "5px",
            }}
          />

          <button onClick={joinRoom}>Join a room</button>
        </div>
      )}

      {show && <Chat socket={socket} user={username} room={room} />}
    </div>
  );
}

export default App;
