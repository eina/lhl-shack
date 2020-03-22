import moment from "moment";
import { EditorState } from "draft-js";
import { stringEditorStateToContent } from "../../helpers/functions";

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
  account: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: ""
  },
  roommates: [
    // { firstName: "Roommate", lastName: "One", email: "roomie1@email.com", phone: "6041234567" }
    { firstName: "", lastName: "", email: "", phone: "" },
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
    guestPolicy: stringEditorStateToContent(""),
    spacesPolicy: stringEditorStateToContent(""),
    roomsPolicy: stringEditorStateToContent(""),
    choresPolicy: stringEditorStateToContent(""),
    vacationPolicy: stringEditorStateToContent(""),
    personalItemsPolicy: stringEditorStateToContent(""),
    smokingPolicy: stringEditorStateToContent(""),
    messagesPolicy: stringEditorStateToContent(""),
    petsPolicy: stringEditorStateToContent("")
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
