using System;

namespace ParkingLot.DTOs
{
    public class SubscriptionGetDTO
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public int SubscriberId { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountValue { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool isDeleted { get; set; }
    }
}
