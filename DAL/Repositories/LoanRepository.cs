using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using DAL.Repositories.Interfaces;
using leave_management.Data;

namespace DAL.Repositories
{
    public class LoanRepository : Repository<Loan>, ILoanRepository
    {
        public LoanRepository(ApplicationDbContext context) : base(context)
        { }


        public IEnumerable<Loan> GetTopActiveLoans(int count)
        {
            throw new NotImplementedException();
        }


        public IEnumerable<Loan> GetAllLoansData()
        {
            return _appContext.Loans.ToList();
        }



        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
