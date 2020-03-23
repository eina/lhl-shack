import React from 'react';
import { useHistory } from "react-router-dom";
import { Flex, Button } from '@chakra-ui/core';

type PrevNextNavProps =  {
  before?: string;
  after?: string;
  children?: any;
}
const PrevNextNav = ({ before, after, children}: PrevNextNavProps) => {
  const history = useHistory();

  return (
    <Flex align="center" justify="space-between">
      {before && <Button onClick={() => history.push(before)}>Previous Section</Button>}
      {after && <Button onClick={() => history.push(after)}>Next Section</Button>}
      {children && children}
    </Flex>
  );
};

export default PrevNextNav;