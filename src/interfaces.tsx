// all the TSX interface here

export interface FormValues {
  signatures: Array<{ fullName: ''; date: 'YYYY-MM-DD' }>;
  RentAndDeposit: Array<{ rent: 0; deposit: 0 }>;
  bills: Array<{ name: ''; totalAmount: 0; dueDate: ''; interval: '' }>;
  roommates: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>;
}
