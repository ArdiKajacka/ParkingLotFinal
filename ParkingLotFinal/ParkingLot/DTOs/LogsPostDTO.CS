using System;

namespace ParkingLot.DTOs
{
    public class LogsPostDTO
    {
        public int? SubscriptionId { get; set; } // Optional SubscriptionId
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
    }
}
