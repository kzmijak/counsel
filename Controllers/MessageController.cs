using System.Collections.Generic;
using System.Linq;
using Counsel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Counsel.Controllers
{
    [Route("api/message")]
    public class MessageController: Controller
    {
        private DataContext context;
        public MessageController(DataContext ctx) => context = ctx;

        [HttpGet]
        public IEnumerable<Message> GetMessages()
        {
            var messages = context.Messages
                .Include(c => c.Chat)
                .Include(c => c.Sender)
                .ToList();
            var nmessages = messages;

            foreach(var message in messages)
            {
                if(message.Sender != null)
                {
                    message.Sender.Chats = null;
                    message.Sender.Workplace = null;
                }
                if(message.Chat != null)
                {
                    message.Chat.Messages = null;
                    message.Chat.People = null;
                }
            }
            return messages;
        }

        [HttpGet("{id}")]
        public Message GetMessage(int id)
        {
            var message = context.Messages
                .Include(c => c.Sender)
                .Include(c => c.Chat)
                .Where( c => c.MessageId == id)
                .FirstOrDefault();
            
            if(message.Sender != null)
            {
                message.Sender.Chats = null;
                message.Sender.Workplace = null;
            }

            if(message.Chat != null)
            {
                message.Chat.Messages = null;
                message.Chat.People = null;
            }

            return message;
        }

        [HttpPost]
        public IActionResult InsertMessage([FromBody] Message message)
        {
            if(ModelState.IsValid)
            {
                message.Sender = context.People.Find(message.Sender.PersonId);
                message.Chat = context.Chats.Find(message.Chat.ChatId);
                context.Add(message);
                context.SaveChanges();
                return Ok(message.MessageId);
            }
            return BadRequest(message);
        }
    }
}