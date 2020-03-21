import moment from "moment";
import { EditorState } from "draft-js";

const billShape = {
  name: null,
  totalAmt: 0,
  dueDate: moment(),
  interval: [] // once, monthly, every 2 months, annually
};

const initialValues = {
  landlord: {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
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
  roommates: [
    // { firstName: "Roommate", lastName: "One", email: "roomie1@email.com", phone: "6041234567" }
    { firstName: "", lastName: "", email: "", phone: "" }
  ],
  rent: {
    ...billShape,
    portion: [{ roommate: [], roommate_amt: 0, amt_type: [] }]
  },
  securityDeposit: {
    ...billShape,
    portion: [{ roommate: [], roommate_amt: 0, amt_type: [] }]
  },
  bills: [{ ...billShape }],
  housekeeping: {
    weekdayPM: "",
    weekdayAM: "",
    weekendPM: "",
    weekendAM: "",
    guestPolicy: EditorState.createEmpty(),
    spacesPolicy: EditorState.createEmpty(),
    roomsPolicy: EditorState.createEmpty(),
    choresPolicy: EditorState.createEmpty(),
    vacationPolicy: EditorState.createEmpty(),
    personalItemsPolicy: EditorState.createEmpty(),
    smokingPolicy: EditorState.createEmpty(),
    messagesPolicy: EditorState.createEmpty(),
    petsPolicy: EditorState.createEmpty()
  },
  signatures: [{ fullName: "", agreed: false, date: moment() }]
  // test values for TestDraft.tsx
  // textArea1: EditorState.createEmpty(),
  // textArea2: EditorState.createEmpty(),
  // status: [],
  // leaseDates: {
  //   startDate: null,
  //   endDate: null
  // },
  // billDate: moment()
};

export default initialValues;
