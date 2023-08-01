

using System.Linq;
using ParkingLot.DbContexts;
using ParkingLot.Entities;
using ParkingLot.DataStore;

namespace ParkingLot.Repositories
{
	public class SubscriberRepository
	{
		private readonly ParkingContext _context;

		public SubscriberRepository(ParkingContext context)
		{
			_context = context;
		}
		//metoda per te gjetur counterin e subsciberave,perdoret ne get reserved ne parkingspots
		public int GetActiveSubscriberCount()
		{
			return _context.Subscriber.Count(subscriber => !subscriber.isDeleted);
		}
		public void CreateSubscriber(Subscriber newSubscriber)
		{
			// kontrollon nese nje subscriber me card ID te njejte ekziston,per tu perdorur ne patch ne subscriber
			bool exists = _context.Subscriber.Any(subscriber => subscriber.IdCard == newSubscriber.IdCard);

			if (exists)
			{
				throw new Exception("A subscriber with the same ID card number already exists.");
			}

			_context.Subscriber.Add(newSubscriber);
			_context.SaveChanges();
		}
		public IEnumerable<Subscriber> GetAllSubscribers()
		{
			return _context.Subscriber.ToList();
		}
		//public IEnumerable<Subscriber> GetSubscriberByFirstName(string firstName)
		//{
			//return _context.Subscriber.Where(subscriber => subscriber.FirstName == firstName);
		//}



		//metoda per te update subscibers
		public void UpdateSubscriber(Subscriber updatedSubscriber)
		{
			var existingSubscriber = _context.Subscriber.FirstOrDefault(subscriber => subscriber.IdCard == updatedSubscriber.IdCard);

			if (existingSubscriber == null)
			{
				throw new Exception("Subscriber not found.");
			}

			// Update  properties e nje subscriberi ekzistues
			existingSubscriber.FirstName = updatedSubscriber.FirstName;
			existingSubscriber.LastName = updatedSubscriber.LastName;
			existingSubscriber.Email = updatedSubscriber.Email;
			existingSubscriber.Phone = updatedSubscriber.Phone;
			existingSubscriber.PlateNumber = updatedSubscriber.PlateNumber;
			existingSubscriber.isDeleted = updatedSubscriber.isDeleted;

			_context.SaveChanges();
		}

		public Subscriber GetSubscriberByIdCard(int idCard)
		{
			return _context.Subscriber.FirstOrDefault(subscriber => subscriber.IdCard == idCard);
		}
		//metoda qe kthen isdeleted ne true nese ekziston idcard
		public void SoftDeleteSubscriber(int idCard)
		{
			var subscriber = _context.Subscriber.FirstOrDefault(sub => sub.IdCard == idCard);

			if (subscriber != null)
			{
				subscriber.isDeleted = true;
				_context.SaveChanges();
			}
			else
			{
				throw new Exception("Subscriber not found.");
			}
		}


	}
}
