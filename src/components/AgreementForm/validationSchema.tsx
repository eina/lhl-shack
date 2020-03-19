import { string, object, array, number, boolean } from "yup";

// regex pattern for canadian addresses, by checking postal code
// valid: 401 W Georgia St, Vancouver, BC V6B 5A1 || V6B 5A1 || v6b5a1
const postalRegex = /^.*[ABCEGHJKLMNPRSTVXY][0-9][A-Z]\s?[0-9][A-Z][0-9].*$/gim;
// validates North American phone numbers
// https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

/* string/message helpers */
const requiredMsg = "This field is required";
const tooShort = "Please enter a value with more than 1 character";
const email = "Please enter a valid email address";

/* function helpers */
const yupName = string().min(1, tooShort);
const yupEmail = string()
  .email(email)
  .required(requiredMsg);
const yupCdnAddress = string()
  .matches(postalRegex, "Please enter a valid address (make sure to include your postal code)")
  .required(requiredMsg);
const yupCdnPhone = string()
  .matches(phoneRegex, "Please enter a valid phone number (eg. 604-111-1111)")
  .required(requiredMsg);
const yupMin1 = number().min(1, "Please enter a value bigger than 0");
const yupReactSelect = object().shape({
  label: string().required(),
  value: string().required(requiredMsg)
});

export default object().shape({
  landlord: object().shape({
    firstName: yupName.required(requiredMsg),
    lastName: yupName.required(requiredMsg),
    email: yupEmail,
    address: yupCdnAddress,
    phone: yupCdnPhone,
    company: yupName
  }),
  household: object().shape({
    address: yupCdnAddress,
    petFriendly: boolean().required(requiredMsg),
    smokingAllowed: boolean().required(requiredMsg),
    bedroomsAmt: yupMin1.required(requiredMsg),
    bathroomsAmt: yupMin1.required(requiredMsg),
    rentAmt: yupMin1.required(requiredMsg),
    securityDepositAmt: yupMin1.required(requiredMsg)
  }),
  roommates: array()
    // .min(2, `You must have at least 2 two people in a household`)
    .of(
      object().shape({
        firstName: yupName.required(requiredMsg),
        lastName: yupName.required(requiredMsg),
        email: yupEmail.required(requiredMsg),
        phone: yupCdnPhone.required(requiredMsg)
      })
    ),
  rent: object().shape({
    name: yupName.nullable().required(requiredMsg),
    totalAmt: yupMin1.required(requiredMsg),
    dueDate: object().required(requiredMsg),
    interval: yupReactSelect,
    portion: array().of(
      object().shape({
        roommate: yupReactSelect,
        roommate_amt: yupMin1,
        amt_type: yupReactSelect
      })
    )
  }),
  securityDeposit: object().shape({
    name: yupName.nullable().required(requiredMsg),
    totalAmt: yupMin1.required(requiredMsg),
    dueDate: object().required(requiredMsg),
    interval: yupReactSelect,
    portion: array().of(
      object().shape({
        roommate: yupReactSelect,
        roommate_amt: yupMin1,
        amt_type: yupReactSelect
      })
    )
  }),
  bills: array().of(
    object().shape({
      name: yupName.nullable().required(requiredMsg),
      totalAmt: yupMin1.required(requiredMsg),
      dueDate: object().required(requiredMsg),
      interval: yupReactSelect
    })
  ),
  housekeeping: object().shape({}),
  signatures: array().of(
    object().shape({
      fullName: yupName.required(requiredMsg)
    })
  )
});
