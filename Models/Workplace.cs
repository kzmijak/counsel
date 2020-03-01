using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Counsel.Models
{
    [Table("Workplace")]
    public class Workplace
    {
        [Column("WorkplaceId")]
        public int WorkplaceId {get;set;}

        [Column("EntryCode")]
        public string EntryCode {get;set;}

        [Column("ConfirmationCode")]
        public string ConfirmationCode {get;set;}

        [Column("Employees")]
        public List<Person> Employees {get;set;}
    }
}