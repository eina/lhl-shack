import moment from "moment";
import { stringEditorStateToContent } from "../../helpers/functions";

const billShape = {
  name: null,
  total_amount: 0,
  due_date: moment(),
  interval: [] // once, monthly, every 2 months, annually
};

const initialValues = {
  roommates: [
    // { first_name: "Roommate", last_name: "One", email: "roomie1@email.com", phone: "6041234567" }
    { first_name: "", last_name: "", email: "", phone_number: "" },
    { first_name: "", last_name: "", email: "", phone_number: "" }
  ],
  rent: {
    ...billShape,
    portion: [
      { roommate: [], roommate_amt: 0 },
      { roommate: [], roommate_amt: 0 }
    ]
    // portion: [{ roommate: [], roommate_amt: 0, amt_type: [] }, { roommate: [], roommate_amt: 0, amt_type: [] }]
  },
  securityDeposit: {
    ...billShape,
    portion: [
      { roommate: [], roommate_amt: 0 },
      { roommate: [], roommate_amt: 0 }
    ]
    // portion: [{ roommate: [], roommate_amt: 0, amt_type: [] }, { roommate: [], roommate_amt: 0, amt_type: [] }]
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
export const formatDBInitialValues = (dbInitValsObj: any) => ({
  ...dbInitValsObj,
  // household: {
  //   ...dbInitValsObj.household,
  //   leaseDates: {
  //     startDate: moment(dbInitValsObj.household.leaseDates.startDate),
  //     endDate: moment(dbInitValsObj.household.leaseDates.endDate)
  //   }
  // },
  rent: {
    ...dbInitValsObj.rent,
    due_date: moment(dbInitValsObj.rent.due_date)
  },
  securityDeposit: {
    ...dbInitValsObj.securityDeposit,
    due_date: moment(dbInitValsObj.securityDeposit.due_date)
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
    personalItemsPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.personalItemsPolicy),
    smokingPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.smokingPolicy),
    messagesPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.messagesPolicy),
    petsPolicy: stringEditorStateToContent(dbInitValsObj.housekeeping.petsPolicy)
  },
  signatures: dbInitValsObj.signatures.map((sig: any) => ({
    ...sig,
    date: moment(sig.dueDate)
  }))
});

export const finishedAgreement = formatDBInitialValues(
  JSON.parse(
    '{"rent":{"name":null,"total_amount":"2020-03-23T02:53:46.709Z","portion":[{"amt_type":{"label":"$","value":"fixed"},"roommate":{"label":"Andy Lindsay","value":{"email":"test@test.com","phone_number":"876-237-2519","last_name":"Lindsay","first_name":"Andy"}},"roommate_amt":"1000"},{"amt_type":[],"roommate":{"label":"Travis Borsa","value":{"email":"test2@test.com","phone_number":"964-545-9893","last_name":"Borsa","first_name":"Travis"}},"roommate_amt":"1000"}],"interval":{"label":"Monthly","value":"monthly"},"total_amount":0},"bills":[{"name":"Hydro","total_amount":"2020-03-27T19:00:00.000Z","interval":{"label":"Every 2 Months","value":"2monthly"},"total_amount":"120"},{"name":"Netflix","total_amount":"2020-03-23T07:05:59.109Z","interval":{"label":"Monthly","value":"monthly"},"total_amount":"18","totalAmount":0},{"name":"Renter\'s Insurance","total_amount":"2020-03-24T19:00:00.000Z","interval":{"label":"Annually","value":"annually"},"total_amount":"500","totalAmount":0}],"account":{"email":"","last_name":"","first_name":"","phone_number_number":""},"roommates":[{"email":"test@test.com","phone_number":"876-237-2519","last_name":"Lindsay","first_name":"Andy"},{"email":"test2@test.com","phone_number":"964-545-9893","last_name":"Borsa","first_name":"Travis"}],"signatures":[{"date":"2020-03-23T08:09:42.851Z","agreed":true,"fullName":"Andy Lindsay"},{"date":"2020-03-23T08:09:42.851Z","agreed":true,"fullName":"Travis Borsa"}],"housekeeping":{"weekdayAM":"6","weekdayPM":"10","weekendAM":"6","weekendPM":"12","petsPolicy":"{\\"blocks\\":[{\\"key\\":\\"1ubk0\\",\\"text\\":\\"pet them\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","guestPolicy":"{\\"blocks\\":[{\\"key\\":\\"8s74i\\",\\"text\\":\\"Macaroon  bonbon bear claw halvah. Oat cake bonbon chocolate cake chocolate cake  chocolate cake. Chocolate soufflé pie carrot cake chupa chups soufflé  bear claw topping. Cookie fruitcake marshmallow candy canes tiramisu  marshmallow apple pie danish.\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[{\\"offset\\":0,\\"length\\":33,\\"style\\":\\"BOLD\\"},{\\"offset\\":171,\\"length\\":29,\\"style\\":\\"ITALIC\\"},{\\"offset\\":223,\\"length\\":11,\\"style\\":\\"UNDERLINE\\"}],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","roomsPolicy":"{\\"blocks\\":[{\\"key\\":\\"b7099\\",\\"text\\":\\"\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","choresPolicy":"{\\"blocks\\":[{\\"key\\":\\"25m8l\\",\\"text\\":\\"\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","spacesPolicy":"{\\"blocks\\":[{\\"key\\":\\"5eh4b\\",\\"text\\":\\"\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","smokingPolicy":"{\\"blocks\\":[{\\"key\\":\\"1n48q\\",\\"text\\":\\"\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","messagesPolicy":"{\\"blocks\\":[{\\"key\\":\\"dd3lf\\",\\"text\\":\\"carrier pigeon\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","vacationPolicy":"{\\"blocks\\":[{\\"key\\":\\"7kb7n\\",\\"text\\":\\"\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}","personalItemsPolicy":"{\\"blocks\\":[{\\"key\\":\\"867qu\\",\\"text\\":\\"\\",\\"type\\":\\"unstyled\\",\\"depth\\":0,\\"inlineStyleRanges\\":[],\\"entityRanges\\":[],\\"data\\":{}}],\\"entityMap\\":{}}"},"securityDeposit":{"name":null,"total_amount":"2020-03-23T02:53:46.709Z","portion":[{"amt_type":[],"roommate":{"label":"Andy Lindsay","value":{"email":"test@test.com","phone_number":"876-237-2519","last_name":"Lindsay","first_name":"Andy"}},"roommate_amt":"500"},{"amt_type":[],"roommate":{"label":"Travis Borsa","value":{"email":"test2@test.com","phone":"964-545-9893","last_name":"Borsa","first_name":"Travis"}},"roommate_amt":"500"}],"interval":{"label":"Once","value":"once"},"total_amount":0}}'
  )
);

export default initialValues;
