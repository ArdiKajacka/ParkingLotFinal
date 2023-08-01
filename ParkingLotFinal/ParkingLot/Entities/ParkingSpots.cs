using System.ComponentModel.DataAnnotations;

namespace ParkingLot.Entities
{
	public class ParkingSpots
	{
		[Key]
		public int Id { get; set; }
		public int TotalSpots { get; set; }
	}
	
}
