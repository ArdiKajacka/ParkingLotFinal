using ParkingLot.DbContexts;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkingLot.Entities
{
    public class complaints
    {
        [Required]
        [Key]
        public int id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public int Phone { get; set; }
        public string complaintDetails { get; set; }
        public complaintsType Type { get; set; }

    }

    public enum complaintsType
    {
        DamageToCar,
        SpotReservationProblems,
        Other
    }


}




