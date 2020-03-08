using Counsel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Counsel.Controllers
{
    [Route("api/workplace")]
    public class WorkplaceController: Controller
    {
        private DataContext context;

        public WorkplaceController(DataContext ctx) => (context) = (ctx);

        [HttpGet]
        public IEnumerable<Workplace> GetWorkplaces()
        {
            var workplaces = context.Workplaces
                .Include(c => c.Employees)
                .ToList();
            workplaces.ForEach(m => {
                foreach (var person in m.Employees)
                {
                    person.Workplace = null;
                }
            });
            return workplaces;
        }

        [HttpGet("{id}")]
        public Workplace GetWorkplace(int id)
        {
           Workplace workplace = context.Workplaces
                .Where(c => c.WorkplaceId == id)
                .Include(c => c.Employees)
                .FirstOrDefault();

            foreach (var person in workplace.Employees)
            {
                person.Workplace = null;
            }
            return workplace;
        }
    }
}