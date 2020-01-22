import React from 'react';

import Header from '../../../components/Header'
import { Wrapper } from './styles';

export default function defaultLayout({ children }) {
  return (
    <Wrapper>
      <Header></Header>
        {children}
    </Wrapper>
  );
}
