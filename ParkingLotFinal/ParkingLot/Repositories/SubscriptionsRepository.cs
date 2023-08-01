using System;
using System.Collections.Generic;
using System.Linq;
using ParkingLot.DataStore;
using ParkingLot.DbContexts;
using ParkingLot.Entities;
using ParkingLot.DTOs; // Include the namespace for DTOs

namespace ParkingLot.Repositories
{
    public class SubscriptionsRepository
    {
        private readonly ParkingContext _context;

        public SubscriptionsRepository(ParkingContext context)
        {
            _context = context;
        }

        private PricingPlans GetPricingPlan(DayOfWeek dayOfWeek)
        {
            return PricingPlansData.Current.AllPricingPlans.FirstOrDefault(plan =>
                plan.Type == PricingPlanType.Weekday && dayOfWeek >= DayOfWeek.Monday && dayOfWeek <= DayOfWeek.Friday)
                   ?? PricingPlansData.Current.AllPricingPlans.FirstOrDefault(plan =>
                plan.Type == PricingPlanType.Weekend && (dayOfWeek == DayOfWeek.Saturday || dayOfWeek == DayOfWeek.Sunday));
        }

        public void Create(SubscriptionCreateDTO newSubscriptionDTO) // Use the DTO for POST
        {
            // Check if all fields are provided
            if (newSubscriptionDTO == null ||
                newSubscriptionDTO.StartTime == DateTime.MinValue ||
                newSubscriptionDTO.EndTime == DateTime.MinValue)
            {
                throw new ArgumentException("All fields are required.");
            }

            // Check if a subscription with the same code already exists
            if (newSubscriptionDTO.Code != 0 && _context.Subscriptions.Any(sub => sub.Code == newSubscriptionDTO.Code))
            {
                throw new ArgumentException("A subscription with the same code already exists.");
            }

            // Validate the start and end time
            if (newSubscriptionDTO.StartTime >= newSubscriptionDTO.EndTime)
            {
                throw new ArgumentException("End time must be after start time.");
            }

            // Fetch the subscriber by ID if it exists
            Subscriber subscriber = null;
            if (newSubscriptionDTO.SubscriberId > 0)
            {
                subscriber = _context.Subscriber.FirstOrDefault(s => s.IdCard == newSubscriptionDTO.SubscriberId);
                if (subscriber == null)
                {
                    throw new ArgumentException("Subscriber not found with the given ID.");
                }
            }

            // Create a new Subscription entity from the DTO
            var newSubscription = new Subscriptions
            {
                Code = newSubscriptionDTO.Code,
                DiscountValue = newSubscriptionDTO.DiscountValue,
                StartTime = newSubscriptionDTO.StartTime,
                EndTime = newSubscriptionDTO.EndTime,
                SubscriberId = newSubscriptionDTO.SubscriberId,
                Subscriber = subscriber // Assign the fetched subscriber to the Subscription entity
            };

            // Calculate the price based on the number of days and pricing plan type
            decimal price = 0;
            TimeSpan subscriptionDuration = newSubscriptionDTO.EndTime - newSubscriptionDTO.StartTime;
            int totalDays = (int)Math.Ceiling(subscriptionDuration.TotalDays);
            PricingPlans pricingPlan = GetPricingPlan(newSubscriptionDTO.StartTime.DayOfWeek);

            if (pricingPlan != null)
            {
                price = totalDays * pricingPlan.DailyPricing;

                // Apply discount if available
                if (newSubscriptionDTO.DiscountValue > 0)
                {
                    price -= newSubscriptionDTO.DiscountValue;
                }
            }

            // Set the calculated price to the subscription
            newSubscription.Price = price;

            // Add the subscription to the DbSet
            _context.Subscriptions.Add(newSubscription);

            // Save changes to the database
            _context.SaveChanges();
        }

        public Subscriptions GetSubscriptionByCode(int code)
        {
            return _context.Subscriptions.FirstOrDefault(sub => sub.Code == code);
        }

        public IEnumerable<Subscriptions> GetSubscriptionsBySubscriberName(string subscriberName)
        {
            return _context.Subscriptions
                .Where(sub => sub.Subscriber != null &&
                               (sub.Subscriber.FirstName == subscriberName ||
                                sub.Subscriber.Email == subscriberName ||
                                sub.Subscriber.LastName == subscriberName))
                .Select(sub => new Subscriptions
                {
                    Id = sub.Id,
                    Code = sub.Code,
                    SubscriberId = sub.SubscriberId,
                    Price = sub.Price,
                    DiscountValue = sub.DiscountValue,
                    StartTime = sub.StartTime,
                    EndTime = sub.EndTime,
                    isDeleted = sub.isDeleted,
                    Subscriber = _context.Subscriber.FirstOrDefault(s => s.IdCard == sub.SubscriberId)
                })
                .ToList(); // Call ToList() to ensure that the Subscriber property is populated in the returned list.
        }


        public void Update(SubscriptionUpdateDTO subscriptionDTO) // Use the DTO for UPDATE
        {
            if (subscriptionDTO == null)
            {
                throw new ArgumentException("Subscription object cannot be null.");
            }

            var existingSubscription =
                _context.Subscriptions.FirstOrDefault(sub => sub.Code == subscriptionDTO.Code);
            if (existingSubscription == null)
            {
                throw new ArgumentException("Subscription not found.");
            }

            // Update the existing Subscription entity with the DTO values
            existingSubscription.StartTime = subscriptionDTO.StartTime;
            existingSubscription.EndTime = subscriptionDTO.EndTime;
            existingSubscription.DiscountValue = subscriptionDTO.DiscountValue;

            // Fetch the subscriber by ID if it exists
            Subscriber subscriber = null;
            if (subscriptionDTO.SubscriberId > 0)
            {
                subscriber = _context.Subscriber.FirstOrDefault(s => s.IdCard == subscriptionDTO.SubscriberId);
                if (subscriber == null)
                {
                    throw new ArgumentException("Subscriber not found with the given ID.");
                }
            }

            // Assign the fetched subscriber to the existing Subscription entity
            existingSubscription.SubscriberId = subscriptionDTO.SubscriberId;
            existingSubscription.Subscriber = subscriber;

            _context.SaveChanges();
        }

        public void SoftDelete(int code)
        {
            var subscription =
                _context.Subscriptions.FirstOrDefault(sub => sub.Code == code);
            if (subscription == null)
            {
                throw new ArgumentException("Subscription not found.");
            }

            subscription.isDeleted = true;
            _context.SaveChanges();
        }


        public IEnumerable<SubscriptionGetDTO> GetAllSubscriptions() // Use the SubscriptionGetDTO here
        {
            return _context.Subscriptions
                .Select(sub => new SubscriptionGetDTO // Use the SubscriptionGetDTO here
                {
                    Id = sub.Id,
                    Code = sub.Code,
                    SubscriberId = sub.SubscriberId,
                    Price = sub.Price,
                    DiscountValue = sub.DiscountValue,
                    StartTime = sub.StartTime,
                    EndTime = sub.EndTime,
                    isDeleted = sub.isDeleted,
                })
                .ToList(); // Call ToList() to materialize the query and return a list of DTOs.
        }
    }
}
