using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Counsel.Models
{
    [Table("Chat")]
    public class Chat
    {
        [Column("ChatId")]
        public int ChatId {get;set;}

        public ICollection<ChatPerson> People {get;set;} 
        public ICollection<Message> Messages {get;set;}

    }
}