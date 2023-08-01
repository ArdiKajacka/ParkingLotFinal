using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ParkingLot.Entities;
using ParkingLot.Repositories;

[ApiController]
[EnableCors("_myAllowSpecificOrigins")] 
[Route("api/subscribers")]
public class SubscriberController : ControllerBase
{
	private readonly SubscriberRepository _subscriberRepository;

	public SubscriberController(SubscriberRepository subscriberRepository)
	{
		_subscriberRepository = subscriberRepository;
	}

	// POST api/subscribers
	[HttpPost]
	public IActionResult CreateSubscriber(Subscriber subscriber)
	{
		try
		{
			_subscriberRepository.CreateSubscriber(subscriber);
			return Ok("Subscriber created successfully.");
		}
		catch (Exception ex)
		{
			return BadRequest($"Failed to create subscriber: {ex.Message}");
		}
	}
	[HttpGet]
	public IActionResult GetAllSubscribers()
	{
		try
		{
			var subscribers = _subscriberRepository.GetAllSubscribers();
			return Ok(subscribers);
		}
		catch (Exception ex)
		{
			return BadRequest($"Failed to retrieve subscribers: {ex.Message}");
		}
	}
	// GET api/subscribers/{firstName}
	[HttpGet("{idCard}")]
	public IActionResult GetSubscriberById(int idCard)
	{
		try
		{
			var subscribers = _subscriberRepository.GetSubscriberByIdCard(idCard);
			return Ok(subscribers);

		}
		catch (Exception ex)
		{
			return BadRequest($"Failed to retrieve subscribers: {ex.Message}");
		}
	}

	// PUT api/subscribers/{idCard}
	[HttpPut("{idCard}")]
	public IActionResult UpdateSubscriber(int idCard, Subscriber updatedSubscriber)
	{
		try
		{
			var existingSubscriber = _subscriberRepository.GetSubscriberByIdCard(idCard);

			if (existingSubscriber == null)
			{
				return NotFound("Subscriber not found.");
			}

			existingSubscriber.FirstName = updatedSubscriber.FirstName;
			existingSubscriber.LastName = updatedSubscriber.LastName;
			existingSubscriber.Email = updatedSubscriber.Email;
			existingSubscriber.Phone = updatedSubscriber.Phone;
			existingSubscriber.PlateNumber = updatedSubscriber.PlateNumber;
			existingSubscriber.isDeleted = updatedSubscriber.isDeleted;

			_subscriberRepository.UpdateSubscriber(existingSubscriber);

			return Ok("Subscriber updated successfully.");
		}
		catch (Exception ex)
		{
			return BadRequest($"Failed to update subscriber: {ex.Message}");
		}
	}
	// DELETE api/subscribers/{idCard}
	[HttpDelete("{idCard}")]
	public IActionResult DeleteSubscriber(int idCard)
	{
		try
		{
			_subscriberRepository.SoftDeleteSubscriber(idCard);
			return Ok("Subscriber soft deleted successfully.");
		}
		catch (Exception ex)
		{
			return BadRequest($"Failed to soft delete subscriber: {ex.Message}");
		}
	}

}



