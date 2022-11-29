// connect hub 
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// get method receiveMessage
connection.on("ReceiveMessage", (user, message) => {
    const _content = "User: " + user + " || Message: " + message;  
    const li = document.createElement("li");  
    li.textContent = _content;
    document.getElementById("messagesList").appendChild(li);  
});  


connection.start().catch(err => console.error(err.toString()));  
  
 // send data 
document.getElementById("sendMessage").addEventListener("click", event => {  
    const _userName = document.getElementById("userName");
    const _message = document.getElementById("userMessage");
    const username = _userName.value;
    const message = _message.value;
    
    connection.invoke("SendMessage", username, message).catch(err => console.error(err.toString()));  
    _userName.value = "";
    _message.value = "";
    event.preventDefault();  
});  