using ParkingLot.DbContexts;
using ParkingLot.Entities;

namespace ParkingLot.Repositories
{
    public class complaintsRepository
    {
        private readonly ParkingContext _context;

        public complaintsRepository(ParkingContext context)
        {
            _context = context;
        }
        public void CreateComplaints(complaints newcomplaints)
        {
            _context.complaints.Add(newcomplaints);
            _context.SaveChanges();

        }

        public IEnumerable<complaints> GetAllcomplaints()
        {
            return _context.complaints.ToList();
        }

    }

}
