import * as React from 'react';
import styled from 'styled-components';
import { Answer, UserChoice } from '../types';

type Props = {
  answer: Answer;
  totalVotes: number;
  isMostVoted: boolean;
  userChoice: UserChoice;
  onClick: (answer: string) => void;
};

type PollItemWrapperProps = {
  isMostVoted: boolean;
  percentage: string;
  userHasChoosen: boolean;
};

const PollItemWrapper = styled.div<PollItemWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 2px #cbcbcb;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-weight: ${({ isMostVoted, userHasChoosen }) =>
    isMostVoted && userHasChoosen ? 800 : 500};
  font-size: 1.5rem;
  position: relative;

  .answer-text {
    display: flex;
    gap: 1rem;

    & > img {
      width: 1.75rem;
    }
  }

  .progress-bar {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    width: ${({ percentage }) => percentage};

    &::after {
      content: '';
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: absolute;
      background-color: ${({ isMostVoted }) =>
        isMostVoted ? '#a2fff4' : '#e8e8e8'};
      z-index: -5;
      animation: progressBar 500ms ease-in-out;
      animation-fill-mode: both;
    }
  }

  @keyframes progressBar {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }

  @media (max-width: 425px) {
    font-size: 1rem;

    .answer-text {
      gap: 0.2rem;

      & > img {
        width: 1rem;
      }
    }
  }
`;

export default function PollItem({
  answer,
  totalVotes,
  isMostVoted,
  userChoice,
  onClick,
}: Props) {
  const isItemChoosenByUser = userChoice.text === answer.text;
  const itemVotes = answer.votes + (isItemChoosenByUser ? 1 : 0);
  const percentage = getPartialAmountPercentage(itemVotes, totalVotes);

  return (
    <PollItemWrapper
      onClick={() => onClick(answer.text)}
      isMostVoted={isMostVoted}
      percentage={percentage}
      userHasChoosen={userChoice.userHasChoosen}
    >
      <div className="answer-text">
        <span>{answer.text}</span>

        {isItemChoosenByUser && (
          <img src={require('../static/check-circle.svg')} />
        )}
      </div>

      <span>{userChoice.userHasChoosen && percentage}</span>

      {userChoice.userHasChoosen && <div className="progress-bar" />}
    </PollItemWrapper>
  );
}

function getPartialAmountPercentage(partial: number, total: number) {
  return `${((partial * 100) / total).toFixed(0)}%`;
}
