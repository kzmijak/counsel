using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Counsel.Models
{
    public class Person
    {
        [Column("PersonId")]
        public int PersonId {get;set;}

        [Column("Image")]
        public string Image {get;set;}

        [Column("FName")]
        public string FName { get; set; }

        [Column("LName")]
        public string LName {get;set;}

        [Column("Role")]
        public string Role {get;set;}

        [Column("Email")]
        public string Email {get;set;}

        [Column("Password")]
        public string Password {get;set;}
 
        public Workplace Workplace {get;set;} 
        public ICollection<ChatPerson> Chats {get;set;}
    }
}