using ParkingLot.Entities;

namespace ParkingLot.DataStore
{
	public class LogsData
	{
		public List<Logs> AllLogs { get; set; }
		public static LogsData Current { get; } = new LogsData();


		public LogsData()
		{
			AllLogs = new List<Logs>()
			{
				new Logs()
				{
					Id = 1,
					Code = "1",
					CheckIn = DateTime.Now,
					CheckOut = DateTime.Now.AddHours(7),
					IsDeleted = false,
				},
			};
		}
	}
}
