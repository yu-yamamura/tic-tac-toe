import React from 'react';
import { SquareValue } from '../types/SquareValue';

type Props = {
  value: SquareValue;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isHighlighted: boolean;
};

export const Square = ({ value, onClick, isHighlighted }: Props) => (
  <button
    className={`square ${isHighlighted && 'highlighted'}`}
    onClick={onClick}
  >
    {value}
  </button>
);
