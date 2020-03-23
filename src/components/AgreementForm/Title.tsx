import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/core";

const Title = () => {
  const history = useHistory();
  return (
    <Box as="section">
      <Heading as="h1">Roommate Agreement</Heading>
      <Text>
        This Roommate Agreement was originally derived from Tenant Resource Advocacy Centre, also
        known as TRAC. The intention with this Agreement is to help you and your new roommates
        establish some ground and expectations when you live together. Even the best of friends can
        run into challenges and difficulties with living together, and this Agreement is to help you
        talk out everything beforehand to avoid arguments.
      </Text>
      <Text>
        This form should only be signed after each and every party to the Agreement has had time to
        think and consider to the terms they are agreeing to. That being said, the information
        contained in this Agreement is for informational purposes only. Shack and TRAC cannot act as
        your lawyer, and its staff members are not necessarily lawyers. This is not a legally
        binding Agreement, but it does help to establish conditions and expectations around living
        with others, and to make your roomie life less stressful.
      </Text>
      <Text>
        Please visit <Link href="http//www.tenants.bc.ca">www.tenants.bc.ca</Link> to inform
        yourself about tenants&rsquo; rights and obligations in Britsh Columbia before discussing and
        agreeing to terms with any roommates.
      </Text>

      <Box as="footer">
        <Button onClick={() => history.push('/agreement/household')}>Start Roommate Agreement Form</Button>
      </Box>
    </Box>
  );
};

export default Title;
