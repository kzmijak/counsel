using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using DVDMovie.Models;
using Counsel.Models;

namespace Counsel
{
    public class SeedData
    {
        public static void SeedDatabase(DataContext context) 
        {
            if (context.Database.GetMigrations().Count() > 0
                    && context.Database.GetPendingMigrations().Count() == 0
                    && context.People.Count() == 0) 
            {
                var w1 = new Workplace
                {
                    EntryCode = "1111",
                    ConfirmationCode = "1111"  
                };

                context.People.AddRange(
                    new Person
                    {
                        Image = "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        FName = "Spencer",
                        LName = "Sullivan",
                        Role = "Chief Executive Officer",
                        Email = "ssullivan@w1.com",
                        Password = "ps111s",
                        Workplace = w1
                    },
                    new Person
                    {
                        Image = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        FName = "Brian",
                        LName = "Walter",
                        Role = "Project Manager",
                        Email = "bwalter@w1.com",
                        Password = "pb111w",
                        Workplace = w1
                    },
                    new Person
                    {
                        Image = "https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        FName = "Samantha",
                        LName = "Portland",
                        Role = "Quality Assurance Engineer",
                        Email = "sportland@w1.com",
                        Password = "ps111p",
                        Workplace = w1
                    },
                    new Person
                    {
                        Image = "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                        FName = "Justin",
                        LName = "Shaifer",
                        Role = "Scientist",
                        Email = "jshaifer@w1.com",
                        Password = "pj111s",
                        Workplace = w1
                    },
                    new Person
                    {
                        Image = "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                        FName = "Juan Pablo",
                        LName = "Serrano",
                        Role = "CEO's Personal Mechanic",
                        Email = "jpserrano@w1.com",
                        Password = "pjp111s",
                        Workplace = w1
                    }
                );
            }
            context.SaveChanges();
        }
    }
}