// all the TSX interface here

export interface FormValues {
  bills: Array<{ name: ''; totalAmount: 0; dueDate: ''; interval: '' }>,
  roommates: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>;
}
