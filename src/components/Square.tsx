import React from "react";
import { SquareValue } from './Board';

type Props = {
  value: SquareValue;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Square = ({ value, onClick }: Props) =>
  <button
    className='square'
    onClick={onClick}
  >
    {value}
  </button>