import { UserInterface } from "../interfaces";

interface MessageInterface {
    uid: string
    name: string
    msg: string
}

class Message implements MessageInterface {
public uid;
public name;
public msg
    constructor(uid:string, name:string, msg:string) {
        this.uid = uid
        this.name = name
        this.msg = msg
    }
}

class ChatMessages {
    public messages: MessageInterface[]
    public users: any
    constructor() {
        this.messages = []
        this.users = {}
    }
    get lastMessages() {
       this.messages = this.messages.splice(0,10)
       return this.messages
    }
    get usersArr() {
        return Object.values(this.users)
    }
    sendMessage(uid: string, name: string, msg: string){
        this.messages.unshift( new Message(uid, name, msg))
    }
    connectUser(user: UserInterface){
        this.users[user._id] = user
    }
    disconnectUser(id: string) {
        delete this.users[id]
    }
}

export {
    ChatMessages
}