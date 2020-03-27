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
export const formatDBInitialValues = (dbInitValsObj: any) => ({
  ...dbInitValsObj,
  // household: {
  //   ...dbInitValsObj.household,
  //   leaseDates: {
  //     startDate: moment(dbInitValsObj.household.leaseDates.startDate),
  //     endDate: moment(dbInitValsObj.household.leaseDates.endDate)
  //   }
  // },
  // rent: {
  //   ...dbInitValsObj.rent,
  //   due_date: moment(dbInitValsObj.rent.due_date)
  // },
  // securityDeposit: {
  //   ...dbInitValsObj.securityDeposit,
  //   due_date: moment(dbInitValsObj.securityDeposit.due_date)
  // },
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
    JSON.stringify({
      rent: {
        name: null,
        portion: [
          {
            roommate: {
              label: "Andy Lindsay",
              value: {
                email: "test@test.com",
                last_name: "Lindsay",
                first_name: "Andy",
                phone_number: "876-237-2519"
              }
            },
            roommate_amt: "1000"
          },
          {
            roommate: {
              label: "Travis Borsa",
              value: {
                email: "test2@test.com",
                last_name: "Borsa",
                first_name: "Travis",
                phone_number: "6048596732"
              }
            },
            roommate_amt: "1000"
          }
        ],
        due_date: "2020-03-24T07:15:17.741Z",
        interval: {
          label: "Monthly",
          value: "monthly"
        },
        total_amount: "2000"
      },
      bills: [
        {
          name: "Test",
          due_date: "2020-03-24T07:15:17.741Z",
          interval: {
            label: "Monthly",
            value: "monthly"
          },
          total_amount: "200"
        }
      ],
      roommates: [
        {
          email: "test@test.com",
          last_name: "Lindsay",
          first_name: "Andy",
          phone_number: "876-237-2519"
        },
        {
          email: "test2@test.com",
          last_name: "Borsa",
          first_name: "Travis",
          phone_number: "6048596732"
        }
      ],
      signatures: [
        {
          date: "2020-03-24T07:28:59.775Z",
          agreed: true,
          fullName: "Andy Lindsay"
        },
        {
          date: "2020-03-24T07:28:59.775Z",
          agreed: true,
          fullName: "Travis Borsa"
        }
      ],
      housekeeping: {
        weekdayAM: "6",
        weekdayPM: "12",
        weekendAM: "6",
        weekendPM: "12",
        petsPolicy:
          '{"blocks":[{"key":"6r0h3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        guestPolicy:
          '{"blocks":[{"key":"13dm7","text":"Marshmallow  halvah gummi bears dragée candy. Pie marzipan muffin fruitcake. Topping  dessert halvah sweet topping. Chupa chups icing ice cream caramels.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":11,"style":"BOLD"},{"offset":20,"length":5,"style":"ITALIC"},{"offset":77,"length":7,"style":"UNDERLINE"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        roomsPolicy:
          '{"blocks":[{"key":"al2i6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        choresPolicy:
          '{"blocks":[{"key":"16rh6","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        spacesPolicy:
          '{"blocks":[{"key":"7q3cn","text":"aaaaaaaaaaaaaaaaaaa","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        smokingPolicy:
          '{"blocks":[{"key":"70o8m","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        messagesPolicy:
          '{"blocks":[{"key":"11hkg","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        vacationPolicy:
          '{"blocks":[{"key":"1067p","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        personalItemsPolicy:
          '{"blocks":[{"key":"104ap","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}'
      },
      securityDeposit: {
        name: null,
        portion: [
          {
            roommate: {
              label: "Andy Lindsay",
              value: {
                email: "test@test.com",
                last_name: "Lindsay",
                first_name: "Andy",
                phone_number: "876-237-2519"
              }
            },
            roommate_amt: "500"
          },
          {
            roommate: {
              label: "Travis Borsa",
              value: {
                email: "test2@test.com",
                last_name: "Borsa",
                first_name: "Travis",
                phone_number: "6048596732"
              }
            },
            roommate_amt: "500"
          }
        ],
        due_date: "2020-03-24T07:15:17.741Z",
        interval: {
          label: "Once",
          value: "once"
        },
        total_amount: "1000"
      }
    })
  )
);

export default initialValues;
