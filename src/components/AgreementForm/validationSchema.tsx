import * as Yup from "yup";

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
const yupName = Yup.string().min(1, tooShort);
const yupEmail = Yup.string()
  .email(email)
  .required(requiredMsg);
const yupCdnAddress = Yup.string()
  .matches(postalRegex, "Please enter a valid address (make sure to include your postal code)")
  .required(requiredMsg);
const yupCdnPhone = Yup.string()
  .matches(phoneRegex, "Please enter a valid phone number (eg. 604-111-1111)")
  .required(requiredMsg);

export default Yup.object().shape({
  landlord: Yup.object().shape({
    firstName: yupName.required(requiredMsg),
    lastName: yupName.required(requiredMsg),
    email: yupEmail,
    address: yupCdnAddress,
    phone: yupCdnPhone,
    company: yupName
  })
});
