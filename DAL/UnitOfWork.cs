using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Repositories;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly ApplicationDbContext _context;

        ILoanRepository _loans;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
        }

        public ILoanRepository Loans
        {
            get
            {
                if (_loans == null)
                    _loans = new LoanRepository(_context);

                return _loans;
            }
        }



        public int SaveChanges()
        {
            return _context.SaveChanges();
        }
    }
}
