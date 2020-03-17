import React from "react";
import { Field } from "formik";
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import { string } from "yup";

export interface HousekeepingValues {
  rooms: string,
  privatespaces: string,
  vacations: string,
  smoking: string,
  chores: string,
  choresresolve: string
}  

const Housekeeping = () => {
  return (
  <div>
    <h4>Guests Policy</h4>
    Guests can include mutual friends, visitors, overnight guests, partners, and even parents. You should think about whether there should be any reasonable restrictions on how often roommates can have guests over, whether there should be special rules for overnight guests, if there should be rules about guests' conduct when they are visiting, and similar issues.
    We agree that the following applies to guests:
    <div>
    <Field type="text" name="guests" required/>
    </div>
    <h4>Noise Policy</h4>
    We agree that "quiet time" will be from <Field type="text" name="weekdaystart" required/>PM until <Field type="text" name="weekdayend" required/>AM during the week, and from <Field type="text" name="weekendstart" required/>PM until <Field type="text" name="weekendend" required/>AM on weekends and holidays.
    <h4>Private and Shared Spaces Policy</h4>
    We agree that the following persons shall occupy the following bedrooms during our tenancy:
    <div>
    <Field type="text" name="rooms" required/>
    </div>
    We agree to the following rules about accessing roommates' private spaces
    <div>
    <Field type="text" name="privatespaces" required/>
    </div>
    <h4>Chores</h4>
    We agree to share the following household responsibilities in the following manner:
    <div>
    <Field type="text" name="chores" required/>
    If any disputes arise about these household responsibilities, they will be resolved in the following way:
    <Field type="text" name="choresresolve" required/>
    </div>
    <h4>Vacations Policy</h4>
    We agree to the following rules regarding times some or all roommates will be living away from the shared property:
    <div>
    <Field type="text" name="vacations" required/>
    </div>
    <h4>Personal Items Policy</h4>
    You should think about what rules should be in place regarding roommates' personal belongings, both within their own private spaces and in shared common spaces in the rental unit.
    Regarding furniture and belongings in common and private areas, we agree that:
    <div>
    <Field type="text" name="personalitems" required/>
    </div>
    <h4>Smoking Policy</h4>
    If smoking is permitted, decide if roommates can smoke and if so, where. Also consider vapes and marijuana.
    <div>
    We agree to the following rules regarding the smoking of different substances on and around the premises:
    </div>
    <div>
    <Field type="text" name="smoking" required/>
    </div>
    <h4>Messages Policy</h4>
    It is always important to have good communicatin between roommates. Designate an area to leave messages for each other, and to leave messges from the landlord.
    We agree that any messages for o0ther roommates will:
    <div>
    <Field type="text" name="messages" required/>
    </div>
    <h4>Pets Policy</h4>
    If pets are allowed, decide whether visitors can bring pets in. Tenants, under the Residential Tenancy Act, have the right to determine the rules in the rental unit about pets, within what is allowed by the tenancy agreement. Be sure to determine in advance if any roommates have allergies to animals.
    <div>
      We agree to the following rules about pets:
    <Field type="text" name="pets" required/>
    </div>
  </div>
  )
};

export default Housekeeping;



