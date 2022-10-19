export class Customer {

  constructor(name?: string, email?: string, phoneNumber?: string, address?: string, city?: string, idNumber?: string, intrestedIn?: string) {

      this.name = name;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
    this.city = city;
    this.idNumber = idNumber;
    this.intrestedIn = intrestedIn;
    }

  public id: number;
  public name: string;
  public email: string;
  public phoneNumber: string;
  public address: string;
  public city: string;
  public idNumber: string;
  public intrestedIn: string;
}
