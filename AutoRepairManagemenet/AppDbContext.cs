using AutoRepairManagemenet.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoRepairManagemenet
{
    public class AppDbContext : DbContext
    {

        public DbSet<Client> Clients { get; set; }
        public DbSet<Employee> Employers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<AutoPart> AutoParts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Document> Documents { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
             Database.EnsureCreated();   
        }

        public AppDbContext()
        : base(CreateOptions())
        {
            Database.EnsureCreated();
        }

        static DbContextOptions CreateOptions()
        {
            var connection = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetConnectionString("DefaultConnection");
            var b = new DbContextOptionsBuilder().UseSqlServer(connection);
            return b.Options;
        }




    }
}
