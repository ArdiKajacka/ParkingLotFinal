using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using ParkingLot.DataStore;
using ParkingLot.Entities;
using ParkingLot.Repositories;

namespace ParkingLot.Controllers
{
	[ApiController]
	[Route("api/PricingPlans")]
	public class PricingPlansController : ControllerBase
	{
		private readonly PricingPlansRepository _pricingPlansRepository;

		public PricingPlansController(PricingPlansRepository pricingPlansRepository)
		{
			_pricingPlansRepository = pricingPlansRepository;
		}

		[HttpGet]
		public IActionResult GetPricingDetails()
		{
			return Ok(PricingPlansData.Current.AllPricingPlans);
		}

		[HttpPatch("{id}")]
		public IActionResult UpdatePricingPlan(int id, [FromBody] PricingPlans updatedPricingPlan)
		{
			if (updatedPricingPlan == null)
			{
				return BadRequest();
			}

			var pricingPlan = PricingPlansData.Current.AllPricingPlans.FirstOrDefault(p => p.Id == id);
			

			pricingPlan.HourlyPricing = updatedPricingPlan.HourlyPricing;
			pricingPlan.DailyPricing = updatedPricingPlan.DailyPricing;
            pricingPlan.MinimumHours = updatedPricingPlan.MinimumHours;

            _pricingPlansRepository.UpdatePricingPlan(id, pricingPlan.HourlyPricing, pricingPlan.DailyPricing, pricingPlan.MinimumHours);

			return NoContent();
		}

	}
}
