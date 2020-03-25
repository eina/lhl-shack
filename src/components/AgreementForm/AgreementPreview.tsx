import React from "react";
import moment from 'moment';
import { displayFullName } from '../../helpers/functions';
import { draftJSKeys } from '../../helpers/data';
import { Editor, EditorState, convertFromRaw } from "draft-js";

const formatHousekeepingForPreview = (housekeeping: any) => {
  const result: any = {};

  // update housekeeping draft js to better saveable values
  for (const housekeepingKey in housekeeping) {
    if (draftJSKeys.includes(housekeepingKey)) {
      const draftJSValue = housekeeping[housekeepingKey];
      console.log("draftJSValue", draftJSValue);
      // result[housekeepingKey] = formatDraftJSForDB(draftJSValue);
    }
  }

  return result;
};


const AgreementPreview = (props: any) => {
  const { roommates, bills, housekeeping } = props;
  const [ rent, securityDeposit, ...utilities] = bills;
  const { weekdayAM, weekdayPM, weekendAM, weekendPM, guestPolicy, spacesPolicy, roomsPolicy, choresPolicy, vacationPolicy, personalItemsPolicy,smokingPolicy, messagesPolicy, petsPolicy } = housekeeping;

  console.log("test", formatHousekeepingForPreview(housekeeping));

  console.log(props);

  return (
    <div>
      <section>
        <h1>Roommates</h1>
        <p>
          <strong>This agreement is entered into by:</strong>
        </p>
        <ul>
          {roommates.map((roommie: any, index: number) => (
            <li key={index}>
              {roommie.first_name} {roommie.last_name}
            </li>
          ))}
        </ul>
        <p>
          We the roommates of (insert address here) agree that this document represents a binding
          agreement between us with respect to our tenancy beginning on________________, 20___. We
          further agree that if this agreement conflicts with any of our rights and obligations
          under the Tenancy Agreement dated_________________, with respect to the above rental unit
          or with the provisions of any applicable laws, the said Tenancy Agreement and the
          applicable law(s) will prevail in all respects.
        </p>
      </section>
      {/* insert landlord & household shit here */}
      <section>
        <h2>Rent and Security Deposit</h2>

        <p>We agree that the our rent obligations will be apportioned as follows:</p>
        <ul>
          <li>{rent.name}</li>
          <li>Total amount: ${rent.total_amount}</li>
          <li>Roommate amount: ${rent.user_amount}</li>
          <li>To be paid: ${rent.interval.label}</li>
        </ul>

        <p>We agree that the our security deposit obligations will be apportioned as follows:</p>
        <ul>
          <li>Total amount: ${securityDeposit.total_amount}</li>
          <li>Roommate amount: ${securityDeposit.user_amount}</li>
          <li>To be paid: {securityDeposit.interval.label}</li>
        </ul>
      </section>
      {utilities.length ? (
        <section>
          <h2>Other Charges</h2>
          {utilities.map((utility: any, index: any) => (
            <div key={index}>
              <h3>{utility.name}</h3>
              <ul>
                <li>Total amount: ${utility.total_amount}</li>
                <li>Roommate amount: ${utility.user_amount}</li>
                <li>To be paid: {utility.interval.label}</li>
              </ul>
            </div>
          ))}
        </section>
      ) : null}

      <section>
        <h2>Noise</h2>
        <p>
          Early morning or late night noise can have a significant effect on a living
          arrangementbetween roommates. It is important to think about what restrictions on noise
          make sense for yourliving arrangement, and to check your municipal noise bylaws to ensure
          no roommates are puttingthe tenancy at risk by violating them.
        </p>
        <p>
          We agree that “quiet time” will be from <strong>{weekdayPM} pm</strong> until{" "}
          <strong>{weekdayAM} am</strong> during the week, and from <strong>{weekendPM} pm</strong>{" "}
          until <strong>{weekendAM} am</strong> on weekends and holidays.
        </p>
      </section>
    </div>
  );
};

export default AgreementPreview;