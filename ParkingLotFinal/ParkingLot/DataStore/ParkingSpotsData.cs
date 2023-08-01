using ParkingLot.Entities;

namespace ParkingLot.DataStore
{
	public class ParkingSpotsData
	{
		public List<ParkingSpots> AllParkingSpots {  get; set; }
		public static ParkingSpotsData Current {get;} = new ParkingSpotsData();

		public ParkingSpotsData()
	{
			AllParkingSpots = new List<ParkingSpots>()
		{
			new ParkingSpots()
			{
				Id = 1,
				TotalSpots = 100,

			},
		};
	}
	}
}
