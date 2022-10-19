export class loan {
  constructor(firstName?: string, lastName?: string, idNumber?: string, loanTerm?: string, interestRate?: string, loanType?: string, amount?: string, totalAmount?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.loanTerm = loanTerm;
    this.interestRate = interestRate;
    this.loanType = loanType;
    this.amount = amount;
    this.totalAmount = totalAmount;
  }

  public id: number;
  public firstName: string;
  public lastName: string;
  public idNumber: string;
  public loanTerm: string;
  public interestRate: string;
  public loanType: string;
  public amount: string;
  public totalAmount: string; 
}
