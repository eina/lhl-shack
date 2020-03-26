export const billInterval = [
  { label: "Once", value: "once" },
  { label: "Monthly", value: "monthly" },
  { label: "Every 2 Months", value: "2monthly" },
  { label: "Annually", value: "annually" }
];

export const draftJSKeys = [
  "guestPolicy",
  "spacesPolicy",
  "roomsPolicy",
  "choresPolicy",
  "vacationPolicy",
  "personalItemsPolicy",
  "smokingPolicy",
  "messagesPolicy",
  "petsPolicy"
];

// test draft js initial value
const testContent = {
  blocks: [
    {
      key: "cuuk8",
      text: "test test test test test",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        { offset: 5, length: 4, style: "BOLD" },
        { offset: 15, length: 4, style: "UNDERLINE" }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: "2dsb9",
      text: "test",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "dvui",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "20j44",
      text: "test",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 4, style: "ITALIC" }],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {}
};

export const stringDraftJS = JSON.stringify(testContent);
