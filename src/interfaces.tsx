// all the TSX interface here

export interface FormValues {
  roommates: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>;
}
