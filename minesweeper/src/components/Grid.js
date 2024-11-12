import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import '../css/Grid.css';

function Grid({ rows, cols, mines, gameOver, onGameOver, onFlagChange, revealAllOnGameOver }) {
    const [grid, setGrid] = useState([]);
    const [flagCount, setFlagCount] = useState(0);

    useEffect(() => {
        const newGrid = createGrid(rows, cols, mines);
        setGrid(newGrid);
        setFlagCount(0);
    }, [rows, cols, mines]);

    useEffect(() => {
        onFlagChange(flagCount);
    }, [flagCount, onFlagChange]);

    useEffect(() => {
        if (revealAllOnGameOver) {
            revealAllCells();
        }
    }, [revealAllOnGameOver]);

    const createGrid = (rows, cols, mines) => {
        const grid = Array(rows).fill().map(() =>
            Array(cols).fill().map(() => ({
                isMine: false,
                nearbyMines: 0,
                revealed: false,
                flagged: false,
            }))
        );

        let placedMines = 0;
        while (placedMines < mines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (!grid[row][col].isMine) {
                grid[row][col].isMine = true;
                placedMines++;
            }
        }

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                grid[row][col].nearbyMines = calculateNearbyMines(grid, row, col);
            }
        }

        return grid;
    };

    const calculateNearbyMines = (grid, row, col) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];

        let mineCount = 0;
        for (let [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                grid[newRow][newCol].isMine
            ) {
                mineCount++;
            }
        }
        return mineCount;
    };

    const revealCell = (row, col) => {
        // Check if it's a mine
        if (grid[row][col].isMine) {
            onGameOver('lose');
            revealAllCells();
        } else {
            setGrid(prevGrid => {
                const newGrid = prevGrid.map((gridRow, r) =>
                    gridRow.map((cell, c) =>
                        r === row && c === col ? { ...cell, revealed: true } : cell
                    )
                );
                if (grid[row][col].nearbyMines === 0) {
                    revealAdjacentCells(row, col, newGrid);
                }
                return newGrid;
            });
        }

        checkWin();
    };

    const revealAdjacentCells = (row, col, prevGrid) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];

        const stack = [[row, col]];
        const newGrid = [...prevGrid];

        while (stack.length > 0) {
            const [r, c] = stack.pop();
            newGrid[r][c].revealed = true;

            if (newGrid[r][c].nearbyMines === 0) {
                for (let [dx, dy] of directions) {
                    const newRow = r + dx;
                    const newCol = c + dy;
                    if (
                        newRow >= 0 && newRow < rows &&
                        newCol >= 0 && newCol < cols &&
                        !newGrid[newRow][newCol].revealed &&
                        !newGrid[newRow][newCol].flagged
                    ) {
                        stack.push([newRow, newCol]);
                    }
                }
            }
        }

        setGrid(newGrid);
    };

    const revealAllCells = () => {
        setGrid(prevGrid =>
            prevGrid.map(row =>
                row.map(cell => ({
                    ...cell,
                    revealed: true,
                }))
            )
        );
    };

    const flagCell = (row, col) => {
        setGrid(prevGrid => {
            const newGrid = prevGrid.map((gridRow, r) =>
                gridRow.map((cell, c) => {
                    if (r === row && c === col) {
                        const newFlagged = !cell.flagged;
                        if (newFlagged) {
                            setFlagCount(flagCount + 1);
                        } else {
                            setFlagCount(flagCount - 1);
                        }
                        return { ...cell, flagged: newFlagged };
                    }
                    return cell;
                })
            );

            checkWin();
            return newGrid;
        });
    };

    const checkWin = () => {
        let flaggedMines = 0;
        let revealedCells = 0;
        let totalCells = rows * cols;
        grid.forEach((row) => {
            row.forEach((cell) => {
                if (cell.isMine && cell.flagged) flaggedMines++;
                if (cell.revealed && !cell.isMine) revealedCells++;
            });
        });

        if (flaggedMines === mines && revealedCells === totalCells - mines) {
            onGameOver('win');
        }
    };

    return (
        <div
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${cols}, 40px)`,
                gridTemplateRows: `repeat(${rows}, 40px)`,
            }}
        >
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <Cell
                        key={`${rowIndex}-${colIndex}`}
                        isMine={cell.isMine}
                        revealed={cell.revealed}
                        flagged={cell.flagged}
                        nearbyMines={cell.nearbyMines}
                        onReveal={() => revealCell(rowIndex, colIndex)}
                        onFlag={() => flagCell(rowIndex, colIndex)}
                    />
                ))
            )}
        </div>
    );
}

export default Grid;
