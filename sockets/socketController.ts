import { Socket, Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { tsJWT } from "../helpers";
import { ChatMessages } from "../models/messages";

const chatMessages = new ChatMessages();

const socketController = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const token = socket.handshake.headers["x-token"];
  if (token) {
    const user = await tsJWT(token);
    if (!user) {
      return socket.disconnect();
    }
    chatMessages.connectUser(user);
    io.emit("active-users", chatMessages.usersArr);
    socket.emit("get-messages", chatMessages.lastMessages);

    // create room for the user
    socket.join(user._id.toString());

    socket.on("disconnect", () => {
      chatMessages.disconnectUser(user._id);
      io.emit("active-users", chatMessages.usersArr);
    });
    socket.on("send-message", ({msg, uid}) => {
      if (uid) {
        socket
          .to(uid)
          .emit("private-message", { from: user.name, msg });
      } else {
        chatMessages.sendMessage(user._id, user.name, msg);
        io.emit("get-messages", chatMessages.lastMessages);
      }
    });
  }
};
export { socketController };
