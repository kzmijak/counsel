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
                .Include(c => c.Chats).ThenInclude(c => c.Chat)
                .ToList();
            foreach(var person in people) 
            {
                if(person.Workplace != null)
                {
                    person.Workplace.Employees = null;
                }
                if(person.Chats != null)
                {
                    person._Chats = new List<Chat>();
                    foreach(var connection in person.Chats)
                    {
                        connection.Chat.People = null;
                        connection.Chat.Messages = null;
                        person._Chats.Add(connection.Chat);
                    }
                    person.Chats = null;
                }
            }
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
                person.Workplace.Employees = null;
            }
            if(person.Chats != null)
            {
                person._Chats = new List<Chat>();                
                foreach(var connection in person.Chats)
                {
                    connection.Chat.People = null;
                    connection.Chat.Messages = null;
                    person._Chats.Add(connection.Chat);
                }
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