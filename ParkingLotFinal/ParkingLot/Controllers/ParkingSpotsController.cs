using Microsoft.AspNetCore.Mvc;
using ParkingLot.DataStore;
using ParkingLot.Entities;
using ParkingLot.Repositories;

namespace ParkingLot.Controllers
{
	[ApiController]
	[Route("api/ParkingSpots")]
	public class ParkingSpotsController : ControllerBase
	{
		private readonly ParkingSpotRepository _parkingSpotRepository;

		public ParkingSpotsController(ParkingSpotRepository parkingSpotRepository)
		{
			_parkingSpotRepository = parkingSpotRepository;
		}
		// request qe kthen numrin e subsciberave ose vendet e rezervuara
		[HttpGet("Reserved")]
		public IActionResult GetReservedSpots()
		{
			int activeSubscriberCount = _parkingSpotRepository.GetReservedSpots();

			var reservedSpots = new ReservedSpotsDTO
			{
				subscriberSpots = activeSubscriberCount
			};

			return Ok(reservedSpots);
		}

		[HttpGet("Total")]
		public IActionResult GetParkingSpots()
		{
			int totalSpots = _parkingSpotRepository.GetTotalSpots();

			var parkingSpots = new ParkingSpotsDTO
			{
				TotalSpots = totalSpots
			};

			return Ok(parkingSpots);
		}
		//request qe kthen vendet e lira = total - reserved
		[HttpGet("Free")]
		public IActionResult GetFreeSpots()
		{
			int freeSpots = _parkingSpotRepository.GetFreeSpots();

			var freeSpotsDto = new FreeSpotsDTO
			{
				FreeSpots = freeSpots
			};

			return Ok(freeSpotsDto);
		}
		//Rrequest qe BEN update ParkingSpot qe merr si parameter ID

		[HttpPut("{Id}")]
		public IActionResult UpdateParkingSpot(int Id,  ParkingSpotsDTO updatedParkingSpot)
		{
			var parkingSpot = new ParkingSpots
			{
				Id = Id,
				TotalSpots = updatedParkingSpot.TotalSpots
			};

			_parkingSpotRepository.UpdateParkingSpot(parkingSpot);

			return Ok();
		}

		[HttpGet("Occupied/Reserved")]
		public IActionResult GetOccupiedReservedSpots()
		{
			int occupiedReservedSpots = _parkingSpotRepository.GetOccupiedReservedSpots();

			var response = new OccupiedReserverdSpotsDTO
			{
				OccupiedReservedSpots = occupiedReservedSpots
			};

			return Ok(response);
		}

		[HttpGet("Occupied/Regular")]
		public IActionResult GetOccupiedRegularSpots()
		{
			int occupiedRegularSpots = _parkingSpotRepository.GetOccupiedRegularSpots();

			var response = new OccupiedRegularSpotsDTO
			{
				OccupiedRegularSpots = occupiedRegularSpots
			};

			return Ok(response);
		}
	}

}
	public class OccupiedReserverdSpotsDTO
	{
	public int OccupiedReservedSpots { get; set; }
	}
	public class OccupiedRegularSpotsDTO
	{
		public int OccupiedRegularSpots { get; set; }
	}

	public class ParkingSpotsDTO
	{
		public int TotalSpots { get; set; }
	}

	public class ReservedSpotsDTO
	{
		public int subscriberSpots { get; set; }
	}

	public class FreeSpotsDTO
	{
		public int FreeSpots { get; set; }
	}

