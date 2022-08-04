import { Square } from './Square';
import { BoardSquares } from '../types/BoardSquares';

type Props = {
  squares: BoardSquares;
  handleClick: (i: number) => void; 
};

export const Board = ({ squares, handleClick }: Props) => {
  const renderSquare = (i: number) =>
    <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />;

  return (
    <>
      {[0, 3, 6].map((addition) => (
        <div key={addition} className="board-row">
          {[0, 1, 2].map((numberOfTopRow) => renderSquare(numberOfTopRow + addition))}
        </div>
      ))}
    </>
  );
};