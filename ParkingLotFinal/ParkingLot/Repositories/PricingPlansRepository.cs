using ParkingLot.DataStore;
using ParkingLot.Entities;

namespace ParkingLot.Repositories
{
	public class PricingPlansRepository
	{
		private readonly PricingPlansData _pricingPlansData;

		public PricingPlansRepository()
		{

			_pricingPlansData = PricingPlansData.Current;
		}
		//metoda per te bere patch   hourlyPricing  dhe DailyPricing
		public void UpdatePricingPlan(int id, decimal hourlyPricing, decimal dailyPricing, int MinimumHours )
		{
			var pricingPlan = _pricingPlansData.AllPricingPlans.FirstOrDefault(p => p.Id == id);
			if (pricingPlan != null)
			{
				pricingPlan.HourlyPricing = hourlyPricing;
				pricingPlan.DailyPricing = dailyPricing;
                pricingPlan.MinimumHours = MinimumHours;
            }
		}
	}
	}

