

const form = document.querySelector("form");
const alert = document.querySelector(".alert")
console.log(alert)
form.addEventListener("submit", (e) => {
  let formData = {};
  e.preventDefault();
  for (let el of form.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({msg, token}) => {
        if(msg) {
            alert.style.display = ""
        } else {
            console.log(token)
            alert.style.display = "none"
            localStorage.setItem("token", token)
            window.location = "chat.html"
        }
    })
    .catch((error) => console.log(error));
});

function handleCredentialResponse(response) {
  const googleAuth = { id_token: response.credential };
  //   console.log({ token, response }, response.credential);

  const apiCall = async () => {
    const call = await fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      body: JSON.stringify(googleAuth),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token } = await call.json();
    localStorage.setItem("token", token);
    window.location = "chat.html"
  };
  apiCall();
}
// const button = document.querySelector("#sign_out");
// button.addEventListener("click", handleSignOut);
// function handleSignOut() {
//   console.log(google.accounts.id);
//   google.accounts.id.disableAutoSelect();
//   google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
//     localStorage.clear();
//     location.reload();
//   });
// }
