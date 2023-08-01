// SubscriptionData.cs
using System;
using System.Collections.Generic;
using ParkingLot.Entities;

namespace ParkingLot.DataStore
{
	public class SubscriptionData
	{
		public List<Subscriptions> AllSubscriptions { get; set; }
		public static SubscriptionData Current { get; } = new SubscriptionData();

		private SubscriptionData()
		{
			AllSubscriptions = new List<Subscriptions>();
			PopulateSubscriptions();
		}

		private void PopulateSubscriptions()
		{
			AllSubscriptions.AddRange(new List<Subscriptions>()
			{
				new Subscriptions()
				{
					Id = 1,
					Code = 123456,
					SubscriberId = 1,
					Price = 100,
					DiscountValue = 10,
					StartTime = DateTime.Now.AddDays(-7),
					EndTime = DateTime.Now.AddDays(7),
					isDeleted = false
				},
				new Subscriptions()
				{
					Id = 2,
					Code = 789012,
					SubscriberId = 2,
					Price = 200,
					DiscountValue = 20,
					StartTime = DateTime.Now.AddDays(-14),
					EndTime = DateTime.Now.AddDays(14),
					isDeleted = false
				}
			});
		}
	}
}
