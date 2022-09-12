import * as React from 'react';
import styled from 'styled-components';
import { Answer, QandA, UserChoice } from '../types';
import PollItem from './PollItem';

type Props = {
  qanda: QandA;
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

  @media (max-width: 425px) {
    h1 {
      font-size: 1.25rem;
    }
  }
`;

export default function Poll({ qanda }: Props) {
  const [userChoice, setUserChoice] = React.useState(USER_CHOICE_BLANK);
  const { answers, question } = qanda;

  const totalVotes = answers.reduce((acc, cur) => acc + cur.votes, 0);
  const mostVoted = answers.reduce(
    (most, cur) => (most.votes > cur.votes ? most : cur),
    ANSWER_BLANK
  );
  const currentTotalVotes = totalVotes + (userChoice.userHasChoosen ? 1 : 0);

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
          totalVotes={currentTotalVotes}
          isMostVoted={answer.text === mostVoted.text}
          onClick={handlePollItemClick}
          userChoice={userChoice}
        />
      ))}

      <p className="vote-amount">{currentTotalVotes} votes</p>
    </PollWrapper>
  );
}

const USER_CHOICE_BLANK: UserChoice = {
  text: '',
  userHasChoosen: false,
};

const ANSWER_BLANK: Answer = { votes: 0, text: '' };
