using System.Collections.Generic;
using System.Linq;
using Counsel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Counsel.Controllers
{
    [Route("api/chat")]
    public class ChatController : Controller
    {
        private DataContext context;
        public ChatController(DataContext ctx) => (context) = (ctx);

        [HttpGet]
        public IEnumerable<Chat> GetChats()
        {
            var chats = context.Chats
                .Include(c => c.People).ThenInclude( p => p.Person)
                .Include(c => c.Messages).ThenInclude(m => m.Sender)
                .ToList();
            foreach (var chat in chats)
            {
                if (chat.Messages != null)
                {
                    foreach (var message in chat.Messages)
                    {
                        message.Chat = null;
                        message.Sender.Chats = null;
                        message.Sender.Workplace = null;
                    }
                }

                if (chat.People != null)
                {
                    chat._People = new List<Person>();
                    foreach (var person in chat.People)
                    {
                        chat._People.Add(person.Person);
                        person.Person.Chats = null;
                        person.Person.Workplace = null;
                    }
                    chat.People = null;
                }
            }
            return chats;
        }

        [HttpGet("{id}")]
        public Chat GetChat(int id)
        {
            var chat = context.Chats
                .Include(c => c.People).ThenInclude(c => c.Person)
                .Include(c => c.Messages)
                .Where(c => c.ChatId == id)
                .FirstOrDefault();

            if (chat.Messages != null)
            {
                foreach (var message in chat.Messages)
                {
                    message.Chat = null;
                    message.Sender.Chats = null;
                    message.Sender.Workplace = null;
                }
            }

            if (chat.People != null)
                {
                    chat._People = new List<Person>();                    
                    foreach (var person in chat.People)
                    {
                        person.Person.Chats = null;
                        person.Person.Workplace = null;
                        chat._People.Add(person.Person);
                    }
                    chat.People = null;
                }

            return chat;
        }

        [HttpPost]
        public IActionResult InsertChat([FromBody] Chat chat)
        {
            if (ModelState.IsValid)
            {
                context.Add(chat);
                context.SaveChanges();
                return Ok(chat);
            }
            return BadRequest(ModelState);
        }

        [HttpGet("cp")]
        public IEnumerable<ChatPerson> GetChatPerson()
        {
            var cp = context.chatPersonCns
                .Include(c => c.Person)
                .Include(c => c.Chat)
                .ToList();

            foreach (var c in cp)
            {
                if (c.Person != null)
                {
                    c.Person.Workplace = null;
                    c.Person.Chats = null;
                }
                if (c.Chat != null)
                {
                    c.Chat.Messages = null;
                    c.Chat.People = null;
                }
            }
            return cp;
        }


        [HttpPost("cp")]
        public IActionResult InsertChatPerson([FromBody] ChatPerson chatPerson)
        {
            if (ModelState.IsValid)
            {
                context.Attach(chatPerson.Chat);
                context.Attach(chatPerson.Person);
                context.AddRange(chatPerson);
                context.SaveChanges();
                return Ok(chatPerson.ChatId);
            }
            return BadRequest(ModelState);
        }


        [HttpPatch("{id}")]
        public IActionResult UpdateChat(int id, [FromBody] Chat chat)
        {
            if (ModelState.IsValid)
            {
                var old = context.Chats.Find(id);
                old.Title = chat.Title;
                context.SaveChanges();
                return Ok(chat);
            }
            return BadRequest(ModelState);
        }
    }
}