import moment from 'moment';

const householdInitialValues = {
  landlord: {
    first_name: "test",
    last_name: "test",
    address: "123 something street v3m 5v3",
    phone_number: "6041234567",
    email: "something@email.com",
    company: ""
  },
  household: {
    address: "401 w georgia v3m 5v3",
    leaseDates: {
      startDate: moment(),
      endDate: moment()
    },
    pet_friendly: true,
    smoking_allowed: false,
    number_of_bedrooms: 2,
    number_of_bathrooms: 1,
    total_rent_amt: "2000",
    total_security_deposit_amt: "1000"
  },
};

export default householdInitialValues;