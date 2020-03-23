import React from 'react';

import { Heading, Link } from '@chakra-ui/core';

const Resources = () => {
  return (
    <div>
      <Heading as="h1">Resources</Heading>
      <div>
        {/* <Heading as="h3"></Heading> */}
        <Link color="teal.500" href="https://wiki.clicklaw.bc.ca/index.php/Tenant_Survival_Guide" isExternal>Tenant Survival Guide Wikibook</Link>
      </div>
      <div>
        <Link color="teal.500" href="http://tenants.bc.ca/template-letters/" isExternal>Template Letters</Link>
      </div>
      <div>
        <Link color="teal.500" href="http://www.accessprobono.ca/residential-tenancy-program" isExternal>Access Pro Bono – Residential Tenancy Program</Link>
      </div>
      <div>
        <Link color="teal.500" href="http://tenants.bc.ca/tenant-infoline/" isExternal>Tenant Info Line</Link>
      </div>
      <div>
        <Link color="teal.500" href="http://tenants.bc.ca/renting-it-right/" isExternal>FREE! Renting It Right Course</Link>
      </div>
      <div>
        <Link color="teal.500" href="http://tenants.bc.ca/am-i-covered-by-the-law/" isExternal>Residential Tenancy Act Info</Link>
      </div>
    </div>
  );
};

export default Resources;
