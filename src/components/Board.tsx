import { Square } from './Square';
import { BoardSquares } from '../types/BoardSquares';
import styles from './Board.module.css';

type Props = {
  squares: BoardSquares;
  handleClick: (i: number) => void;
  highlights: [number, number, number] | null;
};

export const Board = ({ squares, handleClick, highlights }: Props) => {
  const renderSquare = (i: number, isHighlighted: boolean) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      isHighlighted={isHighlighted}
    />
  );

  return (
    <>
      {[0, 3, 6].map((addition) => (
        <div key={addition} className={styles.boardRow}>
          {[0, 1, 2].map((numberOfTopRow) =>
            renderSquare(
              numberOfTopRow + addition,
              highlights?.includes(numberOfTopRow + addition) ?? false,
            ),
          )}
        </div>
      ))}
    </>
  );
};
