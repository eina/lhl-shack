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
    smokingAllowed: false,
    petFriendly: true,
    bedroomsAmt: 2,
    bathroomsAmt: 1,
    rentAmt: "",
    securityDepositAmt: ""
  },
};

export default householdInitialValues;