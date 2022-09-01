import React from 'react';
import { SquareValue } from '../types/SquareValue';
import styles from './Square.module.css';

type Props = {
  value: SquareValue;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isHighlighted: boolean;
};

export const Square = ({ value, onClick, isHighlighted }: Props) => (
  <button
    className={`${styles.square} ${isHighlighted && styles.highlighted}`}
    onClick={onClick}
  >
    {value}
  </button>
);
