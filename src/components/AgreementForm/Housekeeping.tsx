import React from 'react';
import { Field } from 'formik';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';
import { string } from 'yup';
import FieldSet from '../FieldSet';

import { Button } from '@chakra-ui/core';

import { useHistory } from 'react-router-dom';

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

const Housekeeping = () => {
  const history = useHistory();
  return (
    <div>
      <h4>Guests Policy</h4>
      <p>
        Guests can include mutual friends, visitors, overnight guests, partners,
        and even parents. You should think about whether there should be any
        reasonable restrictions on how often roommates can have guests over,
        whether there should be special rules for overnight guests, if there
        should be rules about guests' conduct when they are visiting, and
        similar issues.
      </p>
      <div>
        <FieldSet
          type="text"
          label="We agree that the following applies to guests:"
          name="guests"
        />
      </div>
      We agree that "quiet time" will be from
      <FieldSet type="number" label="" name="weekdayPM" /> PM until
      <FieldSet type="number" label="" name="weekdayAM" /> AM during the week,
      and from
      <FieldSet type="number" label="" name="weekendPM" />
      PM until <FieldSet type="number" label="" name="weekendAM" />
      AM on weekends and holidays.
      <h4>Private and Shared Spaces Policy</h4>
      <p>
        We agree that the following persons shall occupy the following bedrooms
        during our tenancy:
      </p>
      <div>
        <FieldSet type="text" label="Bedroom Occupancy" name="rooms" />
      </div>
      <p>
        We agree to the following about accessing each roommates' private spaces
      </p>
      <div>
        <FieldSet type="text" label="Private Spaces Policy" name="privatespaces" />
      </div>
      <h4>Chores</h4>
      <p>
        We agree to share the following household responsibilities in the
        following manner:
      </p>
      <div>
        <FieldSet type="text" label="Household Obligations" name="chores" />
        <FieldSet
          type="text"
          label="If any disputes arise about these household responsibilities, they will
        be resolved in the following way:"
          name="choresresolve"
        />
      </div>
      <h4>Vacations Policy</h4>
      <p>
        We agree to the following rules regarding times some or all roommates
        will be living away from the shared property:
      </p>
      <div>
        <FieldSet type="text" label="Vacation Rules" name="vacations" />
      </div>
      <h4>Personal Items Policy</h4>
      <p>
        You should think about what rules should be in place regarding
        roommates' personal belongings, both within their own private spaces and
        in shared common spaces in the rental unit.
        <p>Regarding furniture and
        belongings in common and private areas, we agree that:
        </p>
      </p>
      <div>
        <FieldSet type="text" label="Personal Items Policy" name="personalitems" />
      </div>
      <h4>Smoking Policy</h4>
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
      <div>
        <FieldSet type="text" label="Smoking Rules:" name="smoking" />
      </div>
      <h4>Messages Policy</h4>
      <p>
        It is always important to have good communicatin between roommates.
        Designate an area to leave messages for each other, and to leave messges
        <p>
        from the landlord. We agree that any messages for other roommates will:
        </p>
      </p>
      <div>
        <FieldSet type="text" label="Messaging Protocol" name="messages" />
      </div>
      <h4>Pets Policy</h4>
      <p>
        If pets are allowed, decide whether visitors can bring pets in. Tenants,
        under the Residential Tenancy Act, have the right to determine the rules
        in the rental unit about pets, within what is allowed by the tenancy
        agreement. Be sure to determine in advance if any roommates have
        allergies to animals.
      </p>
      <div>
        <FieldSet
          type="text"
          label="We agree to the following rules about pets:"
          name="pets"
        />
      </div>
      <div>
      <Button
          variantColor="orange"
          onClick={() => {
            history.push('/agreement/bills/utilities');
          }}
        >
          Previous Section
        </Button>
        <Button
          variantColor="pink"
          onClick={() => {
            history.push('/agreement/signatures');
          }}
        >
          Next Section
        </Button>
      </div>
    </div>
  );
};

export default Housekeeping;
