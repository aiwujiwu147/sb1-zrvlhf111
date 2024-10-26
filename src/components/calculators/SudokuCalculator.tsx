import { useState, useEffect } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { SudokuSolver } from '../../utils/sudokuUtils';
import SudokuCalculatorDocs from './SudokuCalculatorDocs';

export default function SudokuCalculator({ calculator }: CalculatorProps) {
  const [grid, setGrid] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<number[][][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [notes, setNotes] = useState<Set<number>[][][]>(
    Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => new Set())
    )
  );
  const [isNotesMode, setIsNotesMode] = useState<boolean>(false);

  // 初始化数独
  const initializeSudoku = () => {
    const newGrid = SudokuSolver.generate(difficulty);
    setGrid(newGrid);
    setHistory([newGrid]);
    setHistoryIndex(0);
    setError('');
    setNotes(Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => new Set())
    ));
  };

  // 处理单元格点击
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  // 处理数字输入
  const handleNumberInput = (num: number) => {
    if (!selectedCell) return;
    
    const [row, col] = selectedCell;
    
    if (isNotesMode) {
      const newNotes = notes.map(r => r.map(c => new Set(c)));
      if (newNotes[row][col].has(num)) {
        newNotes[row][col].delete(num);
      } else {
        newNotes[row][col].add(num);
      }
      setNotes(newNotes);
      return;
    }
    
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = num;
    
    const solver = new SudokuSolver(newGrid);
    if (!solver.isValidSudoku()) {
      setError('无效的数字放置');
      return;
    }
    
    setGrid(newGrid);
    setHistory([...history.slice(0, historyIndex + 1), newGrid]);
    setHistoryIndex(historyIndex + 1);
    setError('');
    
    // 清除该单元格的笔记
    const newNotes = notes.map(r => r.map(c => new Set(c)));
    newNotes[row][col].clear();
    setNotes(newNotes);
    
    // 检查完成情况
    checkCompletion(newGrid);
  };

  // 撤销操作
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setGrid(history[historyIndex - 1]);
      setError('');
    }
  };

  // 重做操作
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setGrid(history[historyIndex + 1]);
      setError('');
    }
  };

  // 获取提示
  const getHint = () => {
    const solver = new SudokuSolver(grid);
    const hint = solver.getHint();
    if (hint) {
      const { row, col, value } = hint;
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = value;
      setGrid(newGrid);
      setHistory([...history.slice(0, historyIndex + 1), newGrid]);
      setHistoryIndex(historyIndex + 1);
      setError('');
      setSelectedCell([row, col]);
    }
  };

  // 求解数独
  const solveSudoku = () => {
    const solver = new SudokuSolver(grid);
    if (solver.solve()) {
      setGrid(solver.getGrid());
      setHistory([...history.slice(0, historyIndex + 1), solver.getGrid()]);
      setHistoryIndex(historyIndex + 1);
      setError('');
    } else {
      setError('此数独无解');
    }
  };

  // 检查是否完成
  const checkCompletion = (currentGrid: number[][]) => {
    const solver = new SudokuSolver(currentGrid);
    if (!solver.isValidSudoku()) {
      setError('数独填写有误');
      return;
    }
    
    if (!currentGrid.some(row => row.includes(0))) {
      setError('恭喜！数独已完成！');
    }
  };

  // 清除单元格
  const clearCell = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = 0;
    setGrid(newGrid);
    setHistory([...history.slice(0, historyIndex + 1), newGrid]);
    setHistoryIndex(historyIndex + 1);
    setError('');
    
    // 清除笔记
    const newNotes = notes.map(r => r.map(c => new Set(c)));
    newNotes[row][col].clear();
    setNotes(newNotes);
  };

  // 清除所有笔记
  const clearAllNotes = () => {
    setNotes(Array(9).fill(null).map(() => 
      Array(9).fill(null).map(() => new Set())
    ));
  };

  useEffect(() => {
    initializeSudoku();
  }, [difficulty]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          {/* 控制面板 */}
          <div className="mb-6 flex flex-wrap gap-4">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
            
            <button
              onClick={initializeSudoku}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              新游戏
            </button>
            
            <button
              onClick={getHint}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              提示
            </button>
            
            <button
              onClick={solveSudoku}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              求解
            </button>
            
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              撤销
            </button>
            
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              重做
            </button>
            
            <button
              onClick={() => setIsNotesMode(!isNotesMode)}
              className={`px-4 py-2 rounded-md ${
                isNotesMode 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              笔记模式
            </button>
            
            <button
              onClick={clearCell}
              disabled={!selectedCell}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              清除
            </button>
            
            <button
              onClick={clearAllNotes}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              清除所有笔记
            </button>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className={`mb-4 p-4 rounded-md ${
              error.includes('恭喜') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {error}
            </div>
          )}

          {/* 数独网格 */}
          <div className="grid grid-cols-9 gap-px bg-gray-300 p-px">
            {grid.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
                const isRelated = selectedCell && (
                  rowIndex === selectedCell[0] || 
                  colIndex === selectedCell[1] || 
                  (Math.floor(rowIndex / 3) === Math.floor(selectedCell[0] / 3) && 
                   Math.floor(colIndex / 3) === Math.floor(selectedCell[1] / 3))
                );
                const isSameNumber = selectedCell && cell !== 0 && cell === grid[selectedCell[0]][selectedCell[1]];
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`
                      relative aspect-square flex items-center justify-center text-2xl font-bold 
                      cursor-pointer select-none transition-colors
                      ${isSelected ? 'bg-indigo-200' : 
                        isRelated ? 'bg-indigo-50' : 
                        isSameNumber ? 'bg-indigo-100' : 
                        'bg-white'}
                      ${rowIndex % 3 === 2 && rowIndex !== 8 ? 'border-b-2 border-gray-400' : ''}
                      ${colIndex % 3 === 2 && colIndex !== 8 ? 'border-r-2 border-gray-400' : ''}
                    `}
                  >
                    {cell !== 0 ? cell : (
                      notes[rowIndex][colIndex].size > 0 && (
                        <div className="grid grid-cols-3 gap-px absolute inset-0 p-1">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <div key={num} className="flex items-center justify-center">
                              <span className="text-xs text-gray-500">
                                {notes[rowIndex][colIndex].has(num) ? num : ''}
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                );
              })
            ))}
          </div>

          {/* 数字键盘 */}
          <div className="mt-6 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="p-4 text-xl font-bold bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {num === 0 ? '清除' : num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <SudokuCalculatorDocs />
    </div>
  );
}