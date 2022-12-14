import { useMemo } from 'react';
import { calculateWinnersLine } from '../lib/game';
import Square from './Square';
import { BoardSquares } from '../types/BoardSquares';
import styles from './Board.module.css';

type Props = {
  squares: BoardSquares;
  handleClick: (i: number) => void;
};

const Board = ({ squares, handleClick }: Props) => {
  const renderSquare = (i: number, isHighlighted: boolean) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      isHighlighted={isHighlighted}
    />
  );
  const winnersLine = useMemo(() => calculateWinnersLine(squares), [squares]);

  return (
    <>
      {[0, 3, 6].map((addition) => (
        <div key={addition} className={styles.boardRow}>
          {[0, 1, 2].map((numberOfTopRow) =>
            renderSquare(
              numberOfTopRow + addition,
              winnersLine?.includes(numberOfTopRow + addition) ?? false,
            ),
          )}
        </div>
      ))}
    </>
  );
};

export default Board;
