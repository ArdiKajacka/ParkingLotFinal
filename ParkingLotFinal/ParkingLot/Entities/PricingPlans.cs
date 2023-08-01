using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingLot.Entities
{
	public class PricingPlans
	{

		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public decimal HourlyPricing { get; set; }
		public decimal DailyPricing { get; set; }
		public int MinimumHours { get; set; }
		public PricingPlanType Type { get; set; }

	}
		public enum PricingPlanType
		{
			Weekday,
			Weekend
		}
	
	
	}
