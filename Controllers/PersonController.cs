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

        [HttpGet("all")]
        public IEnumerable<Person> GetPeople()
        {
            var people = context.People
                .Include(c => c.Workplace)
                .Include(c => c.Chats)
                .ToList();
            people.ForEach( person => {
                if(person.Chats != null)
                {
                    person.Chats=null;
                }
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
            });
            return people;

        }  

        [HttpGet("{id}")]
        public Person GetPerson(int id)
        {
            Person person = context.People
                .Where(c => c.PersonId == id)
                .Include(c => c.Workplace)
                .Include(c => c.Chats)
                .FirstOrDefault();

            if(person.Workplace != null)
            {
                person.Workplace.Employees = null;
            }
            // chats may cause stack overflow in the future
            return person;
        }
    }
}