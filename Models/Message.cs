
using System.ComponentModel.DataAnnotations.Schema;

namespace Counsel.Models
{
    [Table("Message")]
    public class Message
    {
        [Column("MessageId")]
        public int? MessageId {get;set;}
        [Column("Sender")]
        public Person Sender {get;set;}

        [Column("Content")]
        public string Content {get;set;}
        
        [Column("Timestamp")]
        public System.DateTime? Timestamp {get;set;}

        public Chat Chat {get;set;}
    }
}