import { useState, useMemo } from 'react';
import { calculateMoveLocation, calculateWinner } from '../lib/game';
import Board from './Board';
import SortOrderToggle from './SortOrderToggle';
import { BoardSquares } from '../types/BoardSquares';
import { History } from '../types/History';
import { SortOrder } from '../types/SortOrder';
import styles from './Game.module.css';

const Game = () => {
  const [history, setHistory] = useState<History>([
    { squares: Array(9).fill(null) as BoardSquares },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascending');
  const current = history[stepNumber];
  const winner = useMemo(
    () => calculateWinner(current.squares),
    [current.squares],
  );

  const handleClick = (i: number) => {
    if (winner !== null || current.squares[i] !== null) return;

    const newSquares = current.squares.slice() as BoardSquares;
    newSquares[i] = xIsNext ? 'X' : 'O';
    const newHistory = history.slice(0, stepNumber + 1);

    setHistory(newHistory.concat([{ squares: newSquares }]));
    setXIsNext(!xIsNext);
    setStepNumber(newHistory.length);
  };

  const jumpTo = (stepNumber: number) => {
    setStepNumber(stepNumber);
    setXIsNext(stepNumber % 2 === 0);
  };

  return (
    <div className={styles.game}>
      <div>
        <Board squares={current.squares} handleClick={handleClick} />
      </div>
      <div className={styles.gameInfo}>
        <div>
          {winner !== null
            ? `Winner: ${winner}`
            : current.squares.every((square) => square !== null)
            ? 'Result: Draw'
            : `Next player: ${xIsNext ? 'X' : 'O'}`}
        </div>
        <SortOrderToggle
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
                  className={
                    stepNumber === move ? styles.moveSelected : undefined
                  }
                  onClick={() => jumpTo(move)}
                >
                  {move !== 0 ? `Go to move #${move}` : 'Go to game start'}
                  {move !== 0 && ` (${calculateMoveLocation(move, history)})`}
                </button>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Game;
