import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { tsJWT } from "../helpers";

const socketController = async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const token = socket.handshake.headers['x-token']
    console.log(token)
    if(token) {
        const user = await tsJWT(token)
        if(!user) {
            return socket.disconnect()
        }
        console.log(`user: ${user.name} connected`)
    }
}
export {
    socketController
}