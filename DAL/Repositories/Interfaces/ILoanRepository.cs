using DAL.Models;
using leave_management.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories.Interfaces
{
    public interface ILoanRepository : IRepository<Loan>
    {
        IEnumerable<Loan> GetTopActiveLoans(int count);
        IEnumerable<Loan> GetAllLoansData();
    }
}
