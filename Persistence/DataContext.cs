using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Place> Places { get; set; }
        public DbSet<PlaceAttendee> PlacesAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<PlaceAttendee>(x => x.HasKey(  aa => new {aa.AppUserId, aa.PlaceId})); // tellin it about it's primary key

            builder.Entity<PlaceAttendee>()
            .HasOne(u => u.AppUser) 
            .WithMany(a => a.Places)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<PlaceAttendee>()
            .HasOne(u => u.Place)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.PlaceId);
        }
    }
}