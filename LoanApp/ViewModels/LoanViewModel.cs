using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace QuickApp.ViewModels
{
    public class LoanViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdNumber { get; set; }
        public string LoanTerm { get; set; }
        public string InterestRate { get; set; }
        public string LoanType { get; set; }
        public string Amount { get; set; }
        public string TotalAmount { get; set; }
    }


    public class LoanViewModelValidator : AbstractValidator<LoanViewModel>
    {
        public LoanViewModelValidator()
        {
            RuleFor(register => register.Id).NotEmpty().WithMessage("Loan Id cannot be empty");
            RuleFor(register => register.FirstName).NotEmpty().WithMessage("First Name cannot be empty");
            RuleFor(register => register.LastName).NotEmpty().WithMessage("LastName cannot be empty");
            RuleFor(register => register.IdNumber).NotEmpty().WithMessage("Id Number cannot be empty");
            RuleFor(register => register.LoanTerm).NotEmpty().WithMessage("Loan Term cannot be empty");
            RuleFor(register => register.InterestRate).NotEmpty().WithMessage("Loan Interest Rate cannot be empty");
            RuleFor(register => register.LoanType).NotEmpty().WithMessage("Loan Type cannot be empty");
            RuleFor(register => register.Amount).NotEmpty().WithMessage("Loan Amount cannot be empty");
        }
    }
}
