using System.Collections.Generic;
using System.Linq;
using Counsel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Counsel.Controllers
{
    [Route("api/chat")]
    public class ChatController: Controller
    {
        private DataContext context;
        public ChatController(DataContext ctx) => (context)=(ctx);

        [HttpGet]
        public IEnumerable<Chat> GetChats()
        {
            var chats = context.Chats
                .Include(c => c.People)
                .Include(c => c.Messages)
                .ToList();
            var newchat = new List<Chat>();
            newchat = chats;
            var newmessages = new List<Message>();
            var newpeople = new List<ChatPerson>();
            int index = 0;
            foreach(var c in chats)
            {
                if(c.Messages != null)
                {
                    newmessages = c.Messages.Select(c => new Message{MessageId = c.MessageId}).ToList();
                }
                newchat[index].Messages = newmessages;

                if(c.People != null)
                {
                    newpeople = c.People.Select(c => new ChatPerson{ PersonId = c.PersonId }).ToList();
                }
                newchat[index].People = newpeople;
                
                index++;
            }
            return newchat;
        }

        [HttpGet("{id}")]
        public Chat GetChat(int id)
        {
            var chat = context.Chats
                .Include(c => c.People).ThenInclude(c => c.Person)
                .Include(c => c.Messages)
                .Where( c => c.ChatId == id)
                .FirstOrDefault();
            
            if(chat.Messages != null)
            {
                chat.Messages = chat.Messages.Select( c => new Message{
                    Sender = new Person{
                        PersonId = c.Sender.PersonId
                    },
                    MessageId = c.MessageId,
                    Content = c.Content,
                    Timestamp = c.Timestamp
                }).ToList();
            }

            List<Person> people = new List<Person>();
            if(chat.People != null)
            {
                foreach(var person in chat.People)
                {
                    person.Person.Chats = null;
                    person.Person.Workplace = null;
                    people.Add(person.Person);
                }
                chat.People = null;
            } 
            chat._People = people;

            return chat;
        }

        [HttpPost]
        public IActionResult InsertChat([FromBody] Chat chat)
        {
            if(ModelState.IsValid)
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

            foreach( var c in cp)
            {
                if(c.Person != null)
                {
                    c.Person.Workplace = null;
                    c.Person.Chats = null;
                }
                if(c.Chat != null)
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
            if(ModelState.IsValid)
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
            if(ModelState.IsValid)
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