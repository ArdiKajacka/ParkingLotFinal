using ParkingLot.Entities;

namespace ParkingLot.DataStore
{
	public class SubscriberData
	{
		public List<Subscriber> AllSubscribers { get; set; }
		public static SubscriberData Current { get; } = new SubscriberData();

		public SubscriberData()
		{
			AllSubscribers = new List<Subscriber>()
			{
				new Subscriber()
				{
					FirstName = "Ardi",
					LastName = "kkk",
					IdCard = 3,
					Email = "vv",
					Phone = 0695819901,
					PlateNumber = 1,
					isDeleted = false,
				},
				new Subscriber()
				{
					FirstName = "Endri",
					LastName = "Hoxha",
					IdCard = 5,
					Email = "vv",
					Phone = 066558885,
					PlateNumber = 1,
					isDeleted = false,
				},

			};
		}
	}
}
