using Counsel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Counsel.Controllers
{
    [Route("api/person")]
    public class PersonController: Controller
    {
        private DataContext context;
        public PersonController(DataContext ctx) => (context) = (ctx);

        [HttpGet]
        public IEnumerable<Person> GetPeople()
        {
            var people = context.People
                .Include(c => c.Workplace)
                .Include(c => c.Chats)
                .ToList();
            people.ForEach( person => {
                if(person.Workplace != null)
                {
                    Workplace newwork = new Workplace
                    {
                        WorkplaceId = person.Workplace.WorkplaceId
                        //EntryCode = person.Workplace.EntryCode,
                        //ConfirmationCode = person.Workplace.ConfirmationCode
                    };
                    person.Workplace = newwork;
                }
                if(person.Chats != null)
                {
                    List<Chat> chats = new List<Chat>();
                    ICollection<ChatPerson> cns = person.Chats;
                    foreach(var connection in cns)
                    {
                        connection.Person = null;
                        connection.Chat = null;
                        connection.PersonId = null;
                    }
                }
            });
            return people;

        }  

        [HttpGet("{id}")]
        public Person GetPerson(int id)
        {
            Person person = context.People
                .Where(c => c.PersonId == id)
                .Include(c => c.Workplace)
                .Include(c => c.Chats).ThenInclude(c => c.Chat)
                .First();

            if(person.Workplace != null)
            {
                Workplace newwork = new Workplace
                {
                    WorkplaceId = person.Workplace.WorkplaceId,
                    EntryCode = person.Workplace.EntryCode,
                    ConfirmationCode = person.Workplace.ConfirmationCode
                };
                person.Workplace = newwork;
            }
            if(person.Chats != null)
            {
                List<Chat> chats = new List<Chat>(100);
                ICollection<ChatPerson> cns = person.Chats;
                foreach(var connection in cns)
                {
                    chats.Add(connection.Chat);
                    connection.Person = null;
                    connection.Chat = null;
                    
                }
                person._Chats = chats;
                person.Chats = null;
            }
            return person;
        }

        [HttpPost]
        public IActionResult InsertPerson([FromBody] Person person)
        {
            if(ModelState.IsValid)
            {
                context.Attach(person.Workplace);
                context.Add(person);
                context.SaveChanges();
                return Ok(ModelState);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePerson(int id, [FromBody] Person person)
        {
            if(ModelState.IsValid)
            {
                var entity = context.People.Find(id);
                context.Entry(entity).CurrentValues.SetValues(person);
                context.SaveChanges();
                return Ok(entity);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePerson(int id)
        {
            if(ModelState.IsValid)
            {
                var entity = context.People.Find(id);
                context.Remove(entity);
                context.SaveChanges();
                return Ok(id);
            }
            return BadRequest();
        }
    }
}