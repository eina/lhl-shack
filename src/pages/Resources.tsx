import React from 'react';

import {
  Heading,
  Link,
  Icon,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from '@chakra-ui/core';

const Resources = () => {
  return (
    <div>
      <Heading as="h1" mb={3}>
        Resources
      </Heading>
      <Accordion>
        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Legal Information
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <p>
              The Tenant Survival Guide, produced by the Tenant Resource &
              Advisory Centre (TRAC), provides basic education on residential
              tenancy law in British Columbia. TRAC is a non-profit organization
              that promotes the legal protection of tenants by providing
              information, education, support, and research on residential
              tenancy matters.
            </p>
            <Link
              color="teal.500"
              href="https://wiki.clicklaw.bc.ca/index.php/Tenant_Survival_Guide"
              isExternal
            >
              Tenant Survival Guide <Icon name="external-link" mx="2px" />
            </Link>
            <Divider />
            <p>
              The Tenant Rights website has outlined the BC Residential Tenancy
              Act to help tenants navigate the details of the Act.
            </p>
            <Link
              color="teal.500"
              href="http://tenantrights.ca/facts/british-columbia"
              isExternal
            >
              Tenant Rights BC RTA Info <Icon name="external-link" mx="2px" />
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Template Letters
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <p>
              TRAC has also provided a library of template letters for tenants
              to fill out and customize. These range from a request for repairs
              to letter regarding loss of quiet enjoyment.
            </p>
            <Link
              color="teal.500"
              href="http://tenants.bc.ca/template-letters/"
              isExternal
            >
              Template Letters <Icon name="external-link" mx="2px" />
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Advocacy
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <p>
              Whether you are low income or not, tenants have access to legal
              representation. Here are some organizations that offer low-cost or
              pro bono advocacy services:
            </p>
            <ul>
              <li>
                <Link color="teal.500" href="http://www.povnet.org" isExternal>
                  PovNet <Icon name="external-link" mx="2px" />
                </Link>
              </li>
              <li>
                <Link
                  color="teal.500"
                  href="http://www.accessprobono.ca/residential-tenancy-program"
                  isExternal
                >
                  Access Pro Bono <Icon name="external-link" mx="2px" />
                </Link>
              </li>
              <li>
                <Link color="teal.500" href="http://www.bchrc.net/" isExternal>
                  BC Human Rights Clinic
                  <Icon name="external-link" mx="2px" />
                </Link>
              </li>
            </ul>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Courses
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <p>
              TRAC has created a FREE course, Renting It Right, to educate and
              inform tenants about the Residential Tenancy Act and Landlord
              obligations and duties.
            </p>
            <Link
              color="teal.500"
              href="http://tenants.bc.ca/renting-it-right/"
              isExternal
            >
              Renting It Right <Icon name="external-link" mx="2px" />
            </Link>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>
            <Box flex="1" textAlign="left">
              Info Line
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
            <p>
              TRAC has a free Info Line for tenants to call and speak to a TRAC
              representative to help advise on issues related to tenancy,
              landlords and housing.
            </p>
            <Link
              color="teal.500"
              href="http://tenants.bc.ca/tenant-infoline/"
              isExternal
            >
              TRAC Info Line <Icon name="external-link" mx="2px" />
            </Link>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Resources;
