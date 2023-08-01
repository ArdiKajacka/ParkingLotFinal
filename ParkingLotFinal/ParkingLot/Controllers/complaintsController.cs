using Microsoft.AspNetCore.Mvc;
using ParkingLot.Entities;
using ParkingLot.Repositories;

namespace ParkingLot.Controllers
{
    [ApiController]
    [Route("api/complaints")]
    public class complaintsController : ControllerBase
    {
        private readonly complaintsRepository _complaintsRepository;

        public complaintsController(complaintsRepository complaintsRepository)
        {
            _complaintsRepository = complaintsRepository;
        }

        [HttpPost] 
        public IActionResult CreateComplaints(complaints newcomplaints)
        {
            try
            {
                _complaintsRepository.CreateComplaints(newcomplaints);
                return Ok("Complaint created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to create complaint: {ex.Message}");
            }
        }
        [HttpGet]
        public IActionResult GetComplaints()
        {
            try
            {
                var subscribers = _complaintsRepository.GetAllcomplaints();
                return Ok(subscribers);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve complaints: {ex.Message}");
            }
        }

    }
    
}
