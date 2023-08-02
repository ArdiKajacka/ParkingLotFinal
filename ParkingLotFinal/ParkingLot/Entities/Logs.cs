using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingLot.Entities
{
	public class Logs
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
        public string? Code { get; set; }  
		public int? SubscriptionId { get; set; }
		public Subscriptions? Subscription { get; set; }

		public DateTime CheckIn { get; set; } = DateTime.Now;
		public DateTime CheckOut { get; set; }
		
		[Column(TypeName = "decimal(18, 2)")]
		public decimal Price { get; set; } 

		public bool IsDeleted { get; set; } = false;
	}
}
