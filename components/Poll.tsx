import * as React from 'react';
import styled from 'styled-components';
import { Answer, QandA, QandAsDocument, UserChoice } from '../types';
import PollItem from './PollItem';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  padding: 0.5rem 2rem;
  border-radius: 6px;
  box-shadow: 0 0 1.5rem #c6c6c6;

  > * {
    margin-top: 1rem;
  }

  .vote-amount {
    color: gray;
    font-size: 1.25rem;
  }
`;

export default function Poll({ qandas }: Props) {
  const [userChoice, setUserChoice] = React.useState(USER_CHOICE_BLANK);
  const { answers, question } = React.useMemo(
    () => getCurrentQuestion(qandas.questions),
    []
  );

  const totalVotes = answers.reduce((acc, cur) => acc + cur.votes, 0);
  const mostVoted = answers.reduce(
    (most, cur) => (most.votes > cur.votes ? most : cur),
    ANSWER_BLANK
  );

  const handlePollItemClick = (text: string) => {
    if (userChoice.userHasChoosen) return;
    setUserChoice({ text, userHasChoosen: true });
  };

  return (
    <PollWrapper>
      <h1>{question.text}</h1>

      {answers.map((answer) => (
        <PollItem
          key={answer.text}
          answer={answer}
          totalVotes={totalVotes}
          isMostVoted={answer.text === mostVoted.text}
          onClick={handlePollItemClick}
          userChoice={userChoice}
        />
      ))}

      <p className="vote-amount">
        {totalVotes + (userChoice.userHasChoosen ? 1 : 0)} votes
      </p>
    </PollWrapper>
  );
}

const USER_CHOICE_BLANK: UserChoice = {
  text: '',
  userHasChoosen: false,
};

const ANSWER_BLANK: Answer = { votes: 0, text: '' };

const getCurrentQuestion = (questions: Array<QandA>): QandA => {
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
};
