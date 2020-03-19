import React from 'react';
import { Field } from 'formik';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import { string } from 'yup';
import FieldSet from '../FieldSet';

import { FormValues } from "../../interfaces";

import RichEditor from "../RichEditor/RichEditor";
import FormikSelect from "../FormikSelect";

export interface HousekeepingValues {
  guests: string,
  weekdayPM: number,
  weekdayAM: number,
  weekendPM: number,
  weekendAM: number,
  rooms: string;
  privatespaces: string;
  vacations: string;
  personalitems: string,
  smoking: string;
  chores: string;
  choresresolve: string;
  messages: string,
  pets: string
}

const Housekeeping = (props: any) => {
  const { values, setFieldValue, handleBlur } = props;
  return (
    <div>
      <h4>Guests</h4>
      <p>
        Guests can include mutual friends, visitors, overnight guests, partners,
        and even parents. You should think about whether there should be any
        reasonable restrictions on how often roommates can have guests over,
        whether there should be special rules for overnight guests, if there
        should be rules about guests' conduct when they are visiting, and
        similar issues.
      </p>
      <div>
      <h5>Guest Policy</h5>
      <p>We agree that the following applies to guests:</p>
      <RichEditor
        editorState={values.guestPolicy}
        editorStateName="guestPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      We agree that "quiet time" will be from
      <FieldSet type="number" label="" name="weekdayPM" /> PM until
      <FieldSet type="number" label="" name="weekdayAM" /> AM during the week,
      and from
      <FieldSet type="number" label="" name="weekendPM" />
      PM until <FieldSet type="number" label="" name="weekendAM" />
      AM on weekends and holidays.
      <h4>Private and Shared Spaces</h4>
      <div>
      <h5>Room Occupancy Policy</h5>
      <p>1. We agree that the following persons shall occupy the following bedrooms
        during our tenancy</p>
      <RichEditor
        editorState={values.roomsPolicy}
        editorStateName="roomsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h5>Shared Spaces Policy</h5>
      <p>
        2. We agree to the following about accessing each roommates' private spaces and rules around shared spaces:
      </p>
      <div>
      <RichEditor
        editorState={values.spacesPolicy}
        editorStateName="spacesPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h4>Chores</h4>
      <p>
        We agree to share the following household responsibilities in the
        following manner:
      </p>
      <h5>Chores Policy</h5>
      <div>
      <RichEditor
        editorState={values.choresPolicy}
        editorStateName="choresPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h4>Vacations</h4>
      <p>
        We agree to the following rules regarding times some or all roommates
        will be living away from the shared property:
      </p>
      <h5>Vacations Policy</h5>
      <div>
      <RichEditor
        editorState={values.vacationPolicy}
        editorStateName="vacationPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h4>Personal Items</h4>
      <p>
        You should think about what rules should be in place regarding
        roommates' personal belongings, both within their own private spaces and
        in shared common spaces in the rental unit.
        <p>Regarding furniture and
        belongings in common and private areas, we agree that:
        </p>
      </p>
      <h5>Personal Items Policy</h5>
      <div>
      <RichEditor
        editorState={values.personalItemsPolicy}
        editorStateName="personalItemsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h4>Smoking</h4>
      <p>
        If smoking is permitted, decide if roommates can smoke and if so, where.
        Also consider vapes and marijuana.
      </p>
      <div>
        <p>
          We agree to the following rules regarding the smoking of different
          substances on and around the premises:
        </p>
      </div>
      <h5>Smoking Policy</h5>
      <div>
      <RichEditor
        editorState={values.smokingPolicy}
        editorStateName="smokingPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h4>Messages</h4>
      <p>
        It is always important to have good communicatin between roommates.
        Designate an area to leave messages for each other, and to leave messges
        <p>
        from the landlord. We agree that any messages for other roommates will:
        </p>
      </p>
      <h5>Messages Policy</h5>
      <div>
      <RichEditor
        editorState={values.messagesPolicy}
        editorStateName="messagesPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
      <h4>Pets</h4>
      <p>
        If pets are allowed, decide whether visitors can bring pets in. Tenants,
        under the Residential Tenancy Act, have the right to determine the rules
        in the rental unit about pets, within what is allowed by the tenancy
        agreement. Be sure to determine in advance if any roommates have
        allergies to animals.
      </p>
      <h5>Pets Policy</h5>
      <div>
      <RichEditor
        editorState={values.petsPolicy}
        editorStateName="petsPolicy"
        onChange={setFieldValue}
        onBlur={handleBlur}
        focus={() => {}}
      />
      </div>
    </div>
  );
};

export default Housekeeping;
