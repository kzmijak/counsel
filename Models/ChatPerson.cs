
using System.ComponentModel.DataAnnotations.Schema;

namespace Counsel.Models
{
    [Table("ChatPerson")]
    public class ChatPerson
    {
        [Column("ChatId")]
        public int ChatId {get;set;}

        [Column("PersonId")]
        public int PersonId {get;set;}

        public Chat Chat {get;set;}
        public Person Person {get;set;}
    }
}