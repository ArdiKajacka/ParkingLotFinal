using System;

namespace ParkingLot.DTOs
{
    public class LogsGetDTO
    {
        public int Id { get; set; }
        public string? Code { get; set; }
        public int? SubscriptionId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public decimal Price { get; set; }
        public bool IsDeleted { get; set; }
    }
}
