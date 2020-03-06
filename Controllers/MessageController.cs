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
            int index = 0;
            foreach(var message in messages)
            {
                if(message.Chat != null)
                {
                    nmessages[index].Chat = new Chat{ ChatId = message.Chat.ChatId };
                }
                if(message.Sender != null)
                {
                    nmessages[index].Sender = new Person{ PersonId = message.Sender.PersonId};
                }
                index++;
            }
            return nmessages;
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
                context.Add(message);
                context.SaveChanges();
                return Ok(message);
            }
            return BadRequest(ModelState);
        }
    }
}