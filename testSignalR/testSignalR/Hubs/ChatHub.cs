using Microsoft.AspNetCore.SignalR;
using System.Security.Cryptography.X509Certificates;

namespace testSignalR.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user,string message)
        {
            await Clients.All.SendAsync("ReceiveMessage",user,message);
        }
    }
}
