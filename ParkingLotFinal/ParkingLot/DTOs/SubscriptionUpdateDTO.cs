using System;

namespace ParkingLot.DTOs
{
    public class SubscriptionUpdateDTO
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int SubscriberId { get; set; }
    }
}
