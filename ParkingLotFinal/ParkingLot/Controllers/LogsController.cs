using Microsoft.AspNetCore.Mvc;
using ParkingLot.Entities;
using ParkingLot.Repositories;
using ParkingLot.DTOs; // Include the namespace for DTOs
using System;
using System.Collections.Generic;

namespace ParkingLot.Controllers
{
    [ApiController]
    [Route("api/Logs")]
    public class LogsController : ControllerBase
    {
        private readonly LogsRepository _logsRepository;

        public LogsController(LogsRepository logsRepository)
        {
            _logsRepository = logsRepository;
        }

        [HttpGet]
        public IActionResult GetAllLogs()
        {
            try
            {
                IEnumerable<LogsGetDTO> logs = _logsRepository.GetAllLogs();
                return Ok(logs);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve logs: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult CreateLogs([FromBody] LogsPostDTO logsDTO)
        {
            try
            {
                // Call the renamed method in LogsRepository
                _logsRepository.CreateLogsEntity(logsDTO);
                return Ok("Log created successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to create log: {ex.Message}");
            }
        }

        [HttpGet("Date/{date}")]
        public IActionResult GetLogsByDate(DateTime date)
        {
            try
            {
                IEnumerable<Logs> logs = _logsRepository.GetLogsByDate(date);
                return Ok(logs);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to retrieve logs: {ex.Message}");
            }
        }

        [HttpGet("SubFname,Lname,Code/{searchQuery}")]
        public IActionResult SearchLogs(string searchQuery)
        {
            try
            {
                IEnumerable<Logs> logs = _logsRepository.SearchLogs(searchQuery);
                return Ok(logs);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to search logs: {ex.Message}");
            }
        }

        [HttpDelete("{logsId}")]
        public IActionResult DeleteLogs(int logsId)
        {
            try
            {
                _logsRepository.DeleteLogs(logsId);
                return Ok("Log deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete log: {ex.Message}");
            }
        }

        [HttpPatch("{logsId}/checkout time")]
        public IActionResult UpdateCheckoutTime(int logsId, [FromBody] DateTime newCheckOutTime)
        {
            _logsRepository.UpdateCheckoutTime(logsId, newCheckOutTime);
            return Ok();
        }
    }
}
