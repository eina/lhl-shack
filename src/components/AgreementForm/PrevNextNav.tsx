import React, { ReactElement } from 'react';
import { useHistory } from "react-router-dom";
import { Flex, Button } from '@chakra-ui/core';

import { brandButton } from '../../chakra/customTheme';

type PrevNextNavProps =  {
  before?: string;
  after?: string;
  children?: ReactElement;
}
const PrevNextNav = ({ before, after, children}: PrevNextNavProps) => {
  const history = useHistory();

  return (
    <Flex align="center" justify="space-between">
      {before && <Button onClick={() => history.push(before)} {...brandButton}>Previous Section</Button>}
      {after && <Button onClick={() => {
        history.push(after);
      }} {...brandButton}>Next Section</Button>}
      {children && children}
    </Flex>
  );
};

export default PrevNextNav;