const txtUid = document.querySelector("#txtUid")
const txtMsg = document.querySelector("#txtMsg")
const ulUsers = document.querySelector("#ulUsers")
const allMsg = document.querySelector("#allMsg")
const btnExit = document.querySelector("#btnExit")

let user = null
let socket = null

const validateJWT = async () => {
const token  = localStorage.getItem("token") || ""
if(token.length <= 10) {
    window.location = "index.html"
 }
 const resp = await fetch("http://localhost:8080/api/auth/", {
    headers: { "x-token": token }
 })
 const { user: userDB, token: tokenDB} = await resp.json()
 localStorage.setItem("token", tokenDB)
 user = userDB
 document.title = user.name
 await connectSocket()
}

const connectSocket = async () => {
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem("token")
        }
    })
    socket.on('connect', () => {
        console.log('socket online')
    })
    socket.on('disconnect', () => {
        console.log('socket offline')
    })
    socket.on('get-messages', () => {
        //todo
    })
    socket.on('active-users', () => {
        //todo
    })
    socket.on('private-message', () => {
        ///todo
    })
}

const main = async () => {
    await validateJWT()
}
main()


// const socket = io()