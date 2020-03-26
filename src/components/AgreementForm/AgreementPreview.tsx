import React, { useContext } from "react";
import { AppContext } from "../../Store";
import moment from "moment";

const AgreementPreview = (props: any) => {
  const {
    landlord,
    house,
    household,
    roommates,
    bills,
    housekeeping,
    formattedHousekeeping,
    signatures
  } = props;
  const [rent, securityDeposit, ...utilities] = bills;
  const { weekdayAM, weekdayPM, weekendAM, weekendPM } = housekeeping;
  const {
    guestPolicy,
    spacesPolicy,
    roomsPolicy,
    choresPolicy,
    vacationPolicy,
    personalItemsPolicy,
    smokingPolicy,
    messagesPolicy,
    petsPolicy
  } = formattedHousekeeping;

  return (
    <div>
      <h1>Roommate Agreement</h1>
      <p>Last updated on: {moment().toString()}</p>
      <section>
        <h2>Roommates</h2>
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
          We the roommates of {house.address} agree that this document represents a binding
          agreement between us with respect to our tenancy beginning on{" "}
          {moment(household.start_date).toString()}.
        </p>
        <p>
          We further agree that if this agreement conflicts with any of our rights and obligations
          under the Tenancy Agreement, with respect to the above rental unit or with the provisions4
          of any applicable laws, the said Tenancy Agreement and the applicable law(s) will prevail
          in all respects.
        </p>
      </section>
      <section>
        <h2>Landlord Contact Information</h2>
        <ul>
          <li>
            {landlord.first_name} {landlord.first_name}
          </li>
          <li>{landlord.address}</li>
          <li>{landlord.email}</li>
          <li>{landlord.phone_number}</li>
          {landlord.company && <li>{landlord.company}</li>}
        </ul>
      </section>
      <section>
        <h2>Rent and Security Deposit</h2>

        <p>We agree that the our rent obligations will be apportioned as follows:</p>
        <ul>
          <li>{rent.name}</li>
          <li>Total amount: ${rent.total_amount}</li>
          <li>Roommate amount: ${rent.user_amount}</li>
          <li>
            To be paid: {rent.interval.label} starting {moment(rent.due_date).toString()}
          </li>
        </ul>

        <p>We agree that the our security deposit obligations will be apportioned as follows:</p>
        <ul>
          <li>Total amount: ${securityDeposit.total_amount}</li>
          <li>Roommate amount: ${securityDeposit.user_amount}</li>
          <li>
            To be paid: {securityDeposit.interval.label} starting{" "}
            {moment(securityDeposit.due_date).toString()}
          </li>
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
                <li>
                  To be paid: {utility.interval.label} starting{" "}
                  {moment(utility.due_date).toString()}
                </li>
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

      <div dangerouslySetInnerHTML={{ __html: "<p>test test test</p>" }}></div>

      {guestPolicy && (
        <section>
          <h2>Guest Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: guestPolicy }} />
        </section>
      )}

      {spacesPolicy && (
        <section>
          <h2>Spaces Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: spacesPolicy }} />
        </section>
      )}

      {roomsPolicy && (
        <section>
          <h2>Rooms Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: roomsPolicy }} />
        </section>
      )}

      {choresPolicy && (
        <section>
          <h2>Chores Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: choresPolicy }} />
        </section>
      )}

      {vacationPolicy && (
        <section>
          <h2>Vacation Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: vacationPolicy }} />
        </section>
      )}

      {personalItemsPolicy && (
        <section>
          <h2>Personal Items Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: personalItemsPolicy }} />
        </section>
      )}

      {smokingPolicy && (
        <section>
          <h2>Smoking Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: smokingPolicy }} />
        </section>
      )}

      {messagesPolicy && (
        <section>
          <h2>Messages Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: messagesPolicy }} />
        </section>
      )}

      {petsPolicy && (
        <section>
          <h2>Pets Policy</h2>
          <div dangerouslySetInnerHTML={{ __html: petsPolicy }} />
        </section>
      )}

      <section>
        <p>
          Each of us has received a copy of and read our Tenancy Agreement. (Note that your landlord
          is required by law to provide each tenant with a copy of the Tenancy Agreement.)
        </p>
        <p>
          The signing of this agreement indicates our full understanding and acceptance of the above
          provisions and terms.
        </p>

        <ul>
          {signatures.map((roomie: any, index: number) => (
            <li key={index}>
              <p>
                {roomie.fullName} digitally signed this agreement on{" "}
                {moment(roomie.date).toString()}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AgreementPreview;
