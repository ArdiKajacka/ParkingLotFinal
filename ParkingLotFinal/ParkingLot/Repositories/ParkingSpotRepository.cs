using System.Linq;
using ParkingLot.DataStore;
using ParkingLot.Entities;

namespace ParkingLot.Repositories
{
	public class ParkingSpotRepository
	{
		private readonly ParkingSpotsData _parkingSpotsData;
		private readonly SubscriberData _subscriberData;
		private readonly LogsData _logsData;

		public ParkingSpotRepository()
		{
			_subscriberData = SubscriberData.Current;
			_parkingSpotsData = ParkingSpotsData.Current;
			_logsData = LogsData.Current;
		}



		public void UpdateParkingSpot(ParkingSpots updatedParkingSpot)
		{
			var existingParkingSpot = _parkingSpotsData.AllParkingSpots.FirstOrDefault(p => p.Id == updatedParkingSpot.Id);
			if (existingParkingSpot != null)
			{
				existingParkingSpot.TotalSpots = updatedParkingSpot.TotalSpots;
			}
		}
		public int GetReservedSpots()
		{
			var activeSubscriberCount = _subscriberData.AllSubscribers.Count(subscriber => !subscriber.isDeleted);
			return activeSubscriberCount;
		}
		public int GetFreeSpots()
		{
			int totalSpots = GetTotalSpots();
			int reservedSpots = GetReservedSpots();
			int freeSpots = totalSpots - reservedSpots;
			return freeSpots;
		}
		public int GetTotalSpots()
		{
			var totalSpots = _parkingSpotsData.AllParkingSpots.Sum(p => p.TotalSpots);
			return totalSpots;
		}
		public int GetOccupiedRegularSpots()
		{
			var checkedInRegularSpots = _logsData.AllLogs.Count(log => log.CheckIn != null && log.CheckOut == null && log.SubscriptionId == null);
			return checkedInRegularSpots;
		}

		public int GetOccupiedReservedSpots()
		{
			var checkedInReservedSpots = _logsData.AllLogs.Count(log => log.CheckIn != null && log.CheckOut == null && log.SubscriptionId != null);
			return checkedInReservedSpots;
		}
	}
}
