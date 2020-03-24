import moment from 'moment';

const householdInitialValues = {
  landlord: {
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
    email: "",
    company: ""
  },
  household: {
    address: "",
    leaseDates: {
      startDate: moment(),
      endDate: moment()
    },
    pet_friendly: true,
    smoking_allowed: false,
    number_of_bedrooms: 2,
    number_of_bathrooms: 1,
    total_rent_amt: "",
    total_security_deposit_amt: ""
  },
};

export default householdInitialValues;