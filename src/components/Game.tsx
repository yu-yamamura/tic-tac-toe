import { useState, useCallback, useMemo } from 'react';
import { BoardSquares } from '../types/BoardSquares';
import { History } from '../types/History';
import { SortOrder } from '../types/SortOrder';
import { Board } from './Board';
import { conditionsToWin } from '../contracts';
import ToggleSortOrderButton from './ToggleSortOrderButton';

export const Game = () => {
  const [history, setHistory] = useState<History>([
    { squares: Array(9).fill(null) as BoardSquares },
  ]);
  const [xIsNext, setXISNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascending');

  const calculateWinnersLine = useCallback((squares: BoardSquares) => {
    const lineCausedOfWin = conditionsToWin.find((wayOfWinning) => {
      const [a, b, c] = wayOfWinning;
      return (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      );
    });

    return lineCausedOfWin ?? null;
  }, []);

  const calculateWinner = useCallback(
    (squares: BoardSquares) => {
      const lineCausedOfWin = calculateWinnersLine(squares);

      return lineCausedOfWin !== null ? squares[lineCausedOfWin[0]] : null;
    },
    [calculateWinnersLine],
  );

  const handleClick = (i: number) => {
    if (winner !== null || current.squares[i] !== null) return;

    const newSquares = current.squares.slice() as BoardSquares;
    newSquares[i] = xIsNext ? 'X' : 'O';
    // The second parameter of Array.prototype.slice() doesn't include its element, so add 1 to stepNumber.
    const newHistory = history.slice(0, stepNumber + 1);

    setHistory(newHistory.concat([{ squares: newSquares }]));
    setXISNext(!xIsNext);
    setStepNumber(newHistory.length);
  };

  const jumpTo = (stepNumber: number) => {
    setStepNumber(stepNumber);
    setXISNext(stepNumber % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = useMemo(
    () => calculateWinner(current.squares),
    [calculateWinner, current.squares],
  );

  const getMoveLocation = (step: number) => {
    const previous = history[step - 1].squares;
    const target = history[step].squares;
    const movedIndex = previous.findIndex(
      (value, index) => value !== target[index],
    );
    const locations = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3],
    ] as const;

    return movedIndex === -1 ? null : locations[movedIndex];
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          handleClick={handleClick}
          highlights={calculateWinnersLine(current.squares)}
        />
      </div>
      <div className="game-info">
        <div>
          {winner !== null
            ? `Winner: ${winner}`
            : current.squares.every((square) => square !== null)
            ? 'Result: Draw'
            : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </div>
        <ToggleSortOrderButton
          sortOrder={sortOrder}
          onClick={
            sortOrder === 'ascending'
              ? () => setSortOrder('descending')
              : () => setSortOrder('ascending')
          }
        />
        <ol>
          {Array.from(history.keys())
            .sort((a, b) => (sortOrder === 'ascending' ? a - b : b - a))
            .map((move) => (
              <li key={move}>
                <button
                  className={stepNumber === move ? 'move-selected' : undefined}
                  onClick={() => jumpTo(move)}
                >
                  {move !== 0 ? `Go to move #${move}` : 'Go to game start'}
                  {move !== 0 && ` (${getMoveLocation(move)})`}
                </button>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};
