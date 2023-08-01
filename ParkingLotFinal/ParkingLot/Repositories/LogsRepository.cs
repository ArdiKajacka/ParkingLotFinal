using System;
using System.Collections.Generic;
using System.Linq;
using ParkingLot.DataStore;
using ParkingLot.DbContexts;
using ParkingLot.Entities;
using ParkingLot.DTOs; // Include the namespace for DTOs

namespace ParkingLot.Repositories
{
    public class LogsRepository
    {
        private readonly ParkingContext _context;

        public LogsRepository(ParkingContext context)
        {
            _context = context;
        }

        public void CreateLogsEntity(LogsPostDTO logsDTO)
        {
            Logs logs = new Logs
            {
                SubscriptionId = logsDTO.SubscriptionId,
                CheckIn = logsDTO.CheckIn,
                CheckOut = logsDTO.CheckOut
            };

            TimeSpan duration = logs.CheckOut - logs.CheckIn;

            // Check if the duration is less than 15 minutes
            if (duration.TotalMinutes < 15)
            {
                logs.Price = 0;
            }
            else
            {
                PricingPlans pricingPlan = PricingPlansData.Current.AllPricingPlans.FirstOrDefault(plan => plan.Type == GetPricingPlanType(logs.CheckIn));

                // Check if subscription Id is present
                if (logs.SubscriptionId > 0)
                {
                    logs.Price = 0;
                }
                else
                {
                    decimal totalHours = (decimal)duration.TotalHours;

                    // Check if it hasn't exceeded the minimum hours for the daily rate
                    if (totalHours <= pricingPlan.MinimumHours)
                    {
                        logs.Price = totalHours * pricingPlan.HourlyPricing;
                    }
                    else
                    {
                        int totalDays = (int)Math.Floor(totalHours / 24);
                        decimal remainingHours = totalHours % 24;

                        // Check if the remaining hours haven't exceeded the minimum hours and add to the hourly rate
                        if (remainingHours <= pricingPlan.MinimumHours)
                        {
                            logs.Price = (totalDays * pricingPlan.DailyPricing) + (remainingHours * pricingPlan.HourlyPricing);
                        }
                        else
                        {
                            // If the remaining hours have exceeded the minimum hours, add a day to the daily rate
                            logs.Price = ((totalDays + 1) * pricingPlan.DailyPricing);
                        }
                    }
                }
            }

            _context.Logs.Add(logs);
            _context.SaveChanges();
        }

        private PricingPlanType GetPricingPlanType(DateTime date)
        {
            return date.DayOfWeek switch
            {
                DayOfWeek.Saturday or DayOfWeek.Sunday => PricingPlanType.Weekend,
                _ => PricingPlanType.Weekday,
            };
        }

        public IEnumerable<LogsGetDTO> GetAllLogs()
        {
            return _context.Logs
                .Select(logs => new LogsGetDTO
                {
                    Id = logs.Id,
                    Code = logs.Code,
                    SubscriptionId = (int)logs.SubscriptionId,
                    CheckIn = logs.CheckIn,
                    CheckOut = logs.CheckOut,
                    Price = logs.Price,
                    IsDeleted = logs.IsDeleted
                });
        }

        public IEnumerable<Logs> GetLogsByDate(DateTime date)
        {
            return _context.Logs.Where(logs => logs.CheckIn.Date == date.Date);
        }

        public IEnumerable<Logs> SearchLogs(string searchQuery)
        {
            return _context.Logs
                .Where(logs => logs.Code.ToString() == searchQuery ||
                               logs.Subscription.Subscriber.FirstName.Contains(searchQuery) ||
                               logs.Subscription.Subscriber.LastName.Contains(searchQuery));
        }

        public void DeleteLogs(int logsId)
        {
            var logs = _context.Logs.Find(logsId);
            if (logs != null)
            {
                logs.IsDeleted = true;
                _context.SaveChanges();
            }
        }

        public void UpdateCheckoutTime(int logsId, DateTime newCheckOutTime)
        {
            var logs = _context.Logs.Find(logsId);
            if (logs != null)
            {
                logs.CheckOut = newCheckOutTime;
                _context.SaveChanges();
            }
        }
    }
}
