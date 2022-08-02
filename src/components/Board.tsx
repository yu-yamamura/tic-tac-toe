import { useState, useEffect, useCallback } from 'react';
import { Square } from './Square';

export type SquareValue = 'X' | 'O' | null;

export const Board = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null))
  const [xIsNext, setXISNext] = useState(true);
  const [winner, setWinner] = useState<SquareValue>(null);

  const status = winner !== null
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  type Squares = typeof squares;
  const calculateWinner = useCallback((squares: Squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const filledLIne = lines.find((line) => {
      const [a, b, c] = line;
      return squares[a] !== null
        && squares[a] === squares[b]
        && squares[a] === squares[c];
    });
    return filledLIne !== undefined ?
      squares[filledLIne[0]] : null;
  }, []);

  const handleClick = (i: number) => {
    if (winner !== null || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXISNext(!xIsNext);
  }
  const renderSquare = (i: number) =>
    <Square value={squares[i]} onClick={() => handleClick(i)} />;

  useEffect(() => {
    setWinner(calculateWinner(squares));
  }, [calculateWinner, squares])

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}