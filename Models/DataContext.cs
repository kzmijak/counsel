using Counsel.Models;
using Microsoft.EntityFrameworkCore;

namespace DVDMovie.Models {
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> opts): base(opts){}

        public DbSet<ChatPerson> chatPersonCns {get;set;}
        public DbSet<Chat> Chats {get;set;}
        public DbSet<Message> Messages {get;set;}
        public DbSet<Person> People {get;set;}
        public DbSet<Workplace> Workplaces {get;set;}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChatPerson>((item)=>
            {
                item.HasKey(cp => new {cp.ChatId, cp.PersonId});
                item.HasOne(u => u.Person).WithMany(u => u.Chats).HasForeignKey(u => u.PersonId);
                item.HasOne(u => u.Chat).WithMany(u => u.People).HasForeignKey(u => u.ChatId);
            });

            modelBuilder.Entity<Chat>((item)=>{
                item.HasKey(p => p.ChatId);
                item.HasMany(u => u.People).WithOne(u => u.Chat).HasForeignKey(u => u.ChatId);
                item.HasMany<Message>(c => c.Messages).WithOne(cm => cm.Chat).OnDelete(DeleteBehavior.Cascade);
            });
            
            modelBuilder.Entity<Person>((item)=>{
                item.HasKey(p => p.PersonId);
                item.HasMany(u => u.Chats).WithOne(u => u.Person).HasForeignKey(u => u.PersonId);
                item.HasOne<Workplace>(p => p.Workplace).WithMany(w => w.Employees).OnDelete(DeleteBehavior.SetNull);
            });
            
            modelBuilder.Entity<Message>((item) => {
                item.HasKey(p => p.MessageId);
                item.HasOne<Chat>( m => m.Chat).WithMany(c => c.Messages).OnDelete(DeleteBehavior.SetNull);
            });
            
            modelBuilder.Entity<Workplace>((item)=>{
                item.HasKey(p => p.WorkplaceId);
                item.HasMany<Person>(w => w.Employees).WithOne(p => p.Workplace).OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}