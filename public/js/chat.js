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
    socket = io({
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
    socket.on('get-messages', addMessages)
    socket.on('active-users',addUser)
    socket.on('private-message', (payload) => {
        console.log(payload)
    })
}

btnExit.addEventListener("click", () => {
    socket.emit("remove-user", user.uid)
    localStorage.removeItem("token")
    window.location = 'index.html'
})

txtMsg.addEventListener("keyup", (e) => {

    const msg = txtMsg.value
    const uid = txtUid.value

    if( e.keyCode === 13) { 
        socket.emit('send-message', {msg, uid})
    }
})


const addUser = (users = []) => {
    let userHTML = ""
    users.forEach( user => {
        userHTML += `
        <li>
             <p>
              <h5>${user.name}</h5>
              <span>${user.uid}</span>
            </p>
        </li>
        `
    })
    ulUsers.innerHTML = userHTML
}
const addMessages = (mensajes) => {
    let msgHTML = ""
    mensajes.forEach( user => {
        msgHTML += `
        <li>
             <p>
              <h5>${user.name}</h5>
              <span>${user.uid}</span>
              <span>${user.msg}</span>
            </p>
        </li>
        `
    })
    allMsg.innerHTML = msgHTML
}

const main = async () => {
    await validateJWT()
}
main()


// const socket = io()