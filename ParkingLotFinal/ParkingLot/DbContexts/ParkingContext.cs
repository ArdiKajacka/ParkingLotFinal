using ParkingLot.Entities;
using Microsoft.EntityFrameworkCore;
using ParkingLot.Entities;

namespace ParkingLot.DbContexts
{
	public class ParkingContext : DbContext
	{
		public ParkingContext(DbContextOptions<ParkingContext> options) : base(options) { }

		

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Logs>()
				.Property(l => l.CheckOut)
				.HasDefaultValue(null);
            
			modelBuilder.Entity<Logs>()
                .Property(l => l.SubscriptionId)
                .HasDefaultValue(null)
                .IsRequired(false);

            modelBuilder.Entity<Subscriber>()
                .Property(s => s.isDeleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<Subscriptions>()
                .Property(s => s.isDeleted)
                .HasDefaultValue(false);

        }
		public DbSet<complaints> complaints { get; set; }
		public DbSet<ParkingSpots> ParkingSpots { get; set; }
		public DbSet<PricingPlans> PricingPlans { get; set; }
		public DbSet<Subscriber> Subscriber { get; set; }
		public DbSet<Subscriptions> Subscriptions { get; set; }
		public DbSet<Logs> Logs { get; set; }
	}
}
