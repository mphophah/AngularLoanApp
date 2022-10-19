using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DAL;
using QuickApp.ViewModels;
using AutoMapper;
using Microsoft.Extensions.Logging;
using QuickApp.Helpers;
using DAL.Models;
using leave_management.Data;

namespace QuickApp.Controllers
{
    [Route("api/[controller]")]
    public class LoanController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;


        public LoanController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }



        [HttpGet("loans")]
        [ProducesResponseType(200, Type = typeof(List<LoanViewModel>))]
        public IActionResult Get()
        {
            var allLoans = _unitOfWork.Loans.GetAllLoansData();
            return Ok(_mapper.Map<IEnumerable<LoanViewModel>>(allLoans));
        }


        [HttpGet("loans/{id}")]
        [ProducesResponseType(200, Type = typeof(LoanViewModel))]
        [ProducesResponseType(403)]
        [ProducesResponseType(404)]
        public ActionResult<Loan> GetLoanById(int id)
        {
            var loan = _unitOfWork.Loans.Get(id);

            if (loan == null)
            {
                return NotFound();
            }
            return Ok(loan);
        }




        [HttpPost("loans")]
        [ProducesResponseType(201, Type = typeof(LoanViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(403)]
        public ActionResult<Loan> CreateLoan([FromBody] Loan loan)
        {
            double totalAmount = 0;
            string interestRate = "0";
            interestRate = " ";
            string loanType = " ";
            loanType = loan.LoanType;

            if (loanType == "personal") { 
            totalAmount = Convert.ToDouble(loan.Amount) + (0.25 * Convert.ToDouble(loan.Amount));
            interestRate = "25";
            }
                
            else if (loanType == "home") { 
            totalAmount = Convert.ToDouble(loan.Amount) + (0.10 * Convert.ToDouble(loan.Amount)); 
            interestRate = "10";
            }
                
            else if (loanType == "vehicle") { 
            totalAmount = Convert.ToDouble(loan.Amount) + (0.15 * Convert.ToDouble(loan.Amount)); 
            interestRate = "15";
            }
            else { 
            totalAmount = 0; 
            interestRate = "0";
            }


            if (loan == null)
            {
               return BadRequest("loan object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            loan.InterestRate = interestRate;
             loan.TotalAmount = totalAmount.ToString();
            _unitOfWork.Loans.Add(loan);
            _unitOfWork.SaveChanges();

            return Ok(loan);
        }

        [HttpPut("loans/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public void PutLoan(int id, [FromBody] LoanViewModel loan)
        {
            double totalAmount = 0;
            string interestRate = "0";
            interestRate = " ";
            string loanType = " ";
            loanType = loan.LoanType;

            if (ModelState.IsValid)
            {
                if (loan == null)
                    BadRequest($"{nameof(loan)} cannot be null");

                if (!string.IsNullOrWhiteSpace(loan.Id.ToString()) && id != loan.Id)
                    BadRequest("Conflicting loan id in parameter and model data");



            if (loanType == "personal") { 
            totalAmount = Convert.ToDouble(loan.Amount) + (0.25 * Convert.ToDouble(loan.Amount));
            interestRate = "25";
            }
                
            else if (loanType == "home") { 
            totalAmount = Convert.ToDouble(loan.Amount) + (0.10 * Convert.ToDouble(loan.Amount)); 
            interestRate = "10";
            }
                
            else if (loanType == "vehicle") { 
            totalAmount = Convert.ToDouble(loan.Amount) + (0.15 * Convert.ToDouble(loan.Amount)); 
            interestRate = "15";
            }
            else { 
            totalAmount = 0; 
            interestRate = "0";
            }
             loan.InterestRate = interestRate;
             loan.TotalAmount = totalAmount.ToString();
             
                Loan appLoan = _unitOfWork.Loans.Get(id);

                if (appLoan == null)
                    NotFound(id);

                _mapper.Map<LoanViewModel, Loan>(loan, appLoan);

                _unitOfWork.Loans.Update(appLoan);
                _unitOfWork.SaveChanges();

            }
        }



        [HttpDelete("loans/{id}")]
        [ProducesResponseType(200, Type = typeof(LoanViewModel))]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public void DeleteLoan(int id)
        {
            var loan = _unitOfWork.Loans.Get(id);

            if (loan == null)
                NotFound(id);

            _unitOfWork.Loans.Remove(loan);
            _unitOfWork.SaveChanges();

        }


    }
}
