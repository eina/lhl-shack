// all the TSX interface here

export interface FormValues {
  signatures: Array<{ fullName: ''; date: '' }>;
  RentAndDeposit: Array<{ rent: 0; deposit: 0 }>;
  bills: Array<{ name: ''; totalAmount: 0; due_date: ''; interval: '' }>;
  roommates: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>;
}
