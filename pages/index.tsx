import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../components/GlobalStyles';
import questions from '../questions.json';
import Poll from '../components/Poll';
import { GetServerSideProps } from 'next';
import { QandA } from '../types';

const IndexPage = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

type Props = {
  qanda: QandA;
};

export default ({ qanda }: Props) => (
  <IndexPage>
    <GlobalStyles />
    <h1>Decode React Poll Challenge</h1>
    <p>
      Here is some text that is on the page in a paragraph tag. The poll will
      appear within this context below.
    </p>
    <Poll qanda={qanda} />
    <p>
      Here is the rest of the text on the page. We just have something down here
      for context to see it in.
    </p>
  </IndexPage>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const index = Math.floor(Math.random() * questions.questions.length);
  const qanda = questions.questions[index];

  return { props: { qanda } };
};
