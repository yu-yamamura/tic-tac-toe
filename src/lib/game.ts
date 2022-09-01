import { BoardSquares } from '../types/BoardSquares';
import { History } from '../types/History';

export const calculateWinnersLine = (squares: BoardSquares) => {
  const linesToWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return (
    linesToWin.find((line) => {
      const [a, b, c] = line;
      return (
        squares[a] !== null &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      );
    }) ?? null
  );
};

export const calculateWinner = (squares: BoardSquares) => {
  const lineCausedOfWin = calculateWinnersLine(squares);

  return lineCausedOfWin !== null ? squares[lineCausedOfWin[0]] : null;
};

export const calculateMoveLocation = (step: number, history: History) => {
  const previousSquares = history[step - 1].squares;
  const currentSquares = history[step].squares;
  const moveIndex = previousSquares.findIndex(
    (value, index) => value !== currentSquares[index],
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

  return moveIndex === -1 ? null : locations[moveIndex];
};
