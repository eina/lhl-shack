import moment from "moment";
import { v4 as uuidV4 } from "uuid";
import { stringEditorStateToContent } from "../../helpers/functions";

const billShape = {
  name: "",
  total_amount: 0,
  due_date: moment(),
  interval: [], // once, monthly, every 2 months, annually
  user_amount: 0
  // portion: [
  //   { roommate: [], roommate_amt: 0 },
  //   { roommate: [], roommate_amt: 0 }
  // ]
};

const initialValues = {
  leaseDates: {
    start_date: moment(),
    end_date: moment().add(1, 'y')
  },
  roommates: [
    // { first_name: "Roommate", last_name: "One", email: "roomie1@email.com", phone: "6041234567" }
    { first_name: "", last_name: "", email: "", phone_number: "" },
    { first_name: "", last_name: "", email: "", phone_number: "" }
  ],
  // rent: {
  //   ...billShape,
  //   portion: [
  //     { roommate: [], roommate_amt: 0 },
  //     { roommate: [], roommate_amt: 0 }
  //   ]
  //   // portion: [{ roommate: [], roommate_amt: 0, amt_type: [] }, { roommate: [], roommate_amt: 0, amt_type: [] }]
  // },
  // securityDeposit: {
  //   ...billShape,
  //   portion: [
  //     { roommate: [], roommate_amt: 0 },
  //     { roommate: [], roommate_amt: 0 }
  //   ]
  //   // portion: [{ roommate: [], roommate_amt: 0, amt_type: [] }, { roommate: [], roommate_amt: 0, amt_type: [] }]
  // },
  bills: [
    { ...billShape, name: "Rent", bill_uuid: uuidV4() },
    { ...billShape, name: "Security Deposit", bill_uuid: uuidV4() }
  ],
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
  signatures: [
    { fullName: "", agreed: false, date: moment() },
    { fullName: "", agreed: false, date: moment() }
  ]
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

// format values from DB to be usable in Formik form
export const formatDBInitialValues = (dbInitValsObj: any) => {
  return {
    ...dbInitValsObj,
    leaseDates: {
      start_date: moment(dbInitValsObj.leaseDates.start_date),
      end_date: moment(dbInitValsObj.leaseDates.end_date)
    },
    bills: dbInitValsObj.bills.map((bill: any) => ({
      ...bill,
      due_date: moment(bill.due_date)
    })),
    housekeeping: {
      ...dbInitValsObj.housekeeping,
      guestPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.guestPolicy),
      spacesPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.spacesPolicy),
      roomsPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.roomsPolicy),
      choresPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.choresPolicy),
      vacationPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.vacationPolicy),
      personalItemsPolicy: stringEditorStateToContent(
        dbInitValsObj.housekeeping.personalItemsPolicy
      ),
      smokingPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.smokingPolicy),
      messagesPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.messagesPolicy),
      petsPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.petsPolicy)
    },
    signatures: dbInitValsObj.signatures.map((sig: any) => ({
      ...sig,
      date: moment(sig.dueDate)
    }))
  };
};

export default initialValues;
