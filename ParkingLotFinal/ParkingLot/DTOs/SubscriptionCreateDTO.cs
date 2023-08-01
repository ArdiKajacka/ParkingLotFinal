using System;

namespace ParkingLot.DTOs
{
    public class SubscriptionCreateDTO
    {
        public int Code { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int SubscriberId { get; set; }
    }
}
