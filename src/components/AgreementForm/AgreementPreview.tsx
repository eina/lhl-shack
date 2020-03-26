import React from "react";
import moment from "moment";

const AgreementPreview = (props: any) => {
  const { roommates, bills, housekeeping, formattedHousekeeping } = props;
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

  console.log("what is here", guestPolicy);

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
    </div>
  );
};

export default AgreementPreview;
