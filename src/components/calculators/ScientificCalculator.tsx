import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import ScientificCalculatorDocs from './ScientificCalculatorDocs';

type Operation = '+' | '-' | '×' | '÷' | '^' | 'sqrt' | 'sin' | 'cos' | 'tan' | 'log' | 'ln' | '%' | null;

export default function ScientificCalculator({ calculator }: CalculatorProps) {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [operation, setOperation] = useState<Operation>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [newNumber, setNewNumber] = useState<boolean>(true);
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const clearDisplay = () => {
    setDisplay('0');
    setOperation(null);
    setFirstOperand(null);
    setNewNumber(true);
  };

  const clearEntry = () => {
    setDisplay('0');
    setNewNumber(true);
  };

  const toggleSign = () => {
    setDisplay(prev => {
      const num = parseFloat(prev);
      return (-num).toString();
    });
  };

  const addDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  };

  const addDigit = (digit: string) => {
    if (newNumber) {
      setDisplay(digit);
      setNewNumber(false);
    } else {
      setDisplay(prev => prev === '0' ? digit : prev + digit);
    }
  };

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const calculateResult = (op: Operation, num1: number, num2: number): number => {
    switch (op) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '×': return num1 * num2;
      case '÷': return num2 !== 0 ? num1 / num2 : NaN;
      case '^': return Math.pow(num1, num2);
      case '%': return num1 * (num2 / 100);
      default: return num2;
    }
  };

  const performUnaryOperation = (op: Operation) => {
    const num = parseFloat(display);
    let result: number;

    switch (op) {
      case 'sqrt':
        result = Math.sqrt(num);
        break;
      case 'sin':
        result = angleMode === 'DEG' ? Math.sin(toRadians(num)) : Math.sin(num);
        break;
      case 'cos':
        result = angleMode === 'DEG' ? Math.cos(toRadians(num)) : Math.cos(num);
        break;
      case 'tan':
        result = angleMode === 'DEG' ? Math.tan(toRadians(num)) : Math.tan(num);
        break;
      case 'log':
        result = Math.log10(num);
        break;
      case 'ln':
        result = Math.log(num);
        break;
      default:
        return;
    }

    const historyEntry = `${op}(${display}) = ${result}`;
    setHistory(prev => [...prev, historyEntry]);
    setDisplay(result.toString());
    setNewNumber(true);
  };

  const performOperation = (nextOp: Operation) => {
    const currentNumber = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(currentNumber);
      setOperation(nextOp);
      setNewNumber(true);
      return;
    }

    if (operation) {
      const result = calculateResult(operation, firstOperand, currentNumber);
      const historyEntry = `${firstOperand} ${operation} ${currentNumber} = ${result}`;
      setHistory(prev => [...prev, historyEntry]);
      setDisplay(result.toString());
      setFirstOperand(nextOp ? result : null);
      setOperation(nextOp);
      setNewNumber(true);
    }
  };

  const memoryOperation = (op: 'MC' | 'MR' | 'M+' | 'M-' | 'MS') => {
    const currentNumber = parseFloat(display);
    switch (op) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        setNewNumber(true);
        break;
      case 'M+':
        setMemory(memory + currentNumber);
        setNewNumber(true);
        break;
      case 'M-':
        setMemory(memory - currentNumber);
        setNewNumber(true);
        break;
      case 'MS':
        setMemory(currentNumber);
        setNewNumber(true);
        break;
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        {/* Display */}
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="text-right text-3xl font-mono">{display}</div>
          <div className="text-right text-sm text-gray-500">
            {firstOperand !== null && `${firstOperand} ${operation || ''}`}
          </div>
        </div>

        {/* Mode and Memory */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          <button
            onClick={() => setAngleMode(prev => prev === 'DEG' ? 'RAD' : 'DEG')}
            className="btn bg-indigo-500"
          >
            {angleMode}
          </button>
          <button onClick={() => memoryOperation('MC')} className="btn bg-red-500">MC</button>
          <button onClick={() => memoryOperation('MR')} className="btn bg-green-500">MR</button>
          <button onClick={() => memoryOperation('M+')} className="btn bg-blue-500">M+</button>
          <button onClick={() => memoryOperation('M-')} className="btn bg-blue-500">M-</button>
        </div>

        {/* Scientific Functions */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <button onClick={() => performUnaryOperation('sin')} className="btn bg-purple-500">sin</button>
          <button onClick={() => performUnaryOperation('cos')} className="btn bg-purple-500">cos</button>
          <button onClick={() => performUnaryOperation('tan')} className="btn bg-purple-500">tan</button>
          <button onClick={() => performUnaryOperation('sqrt')} className="btn bg-purple-500">√</button>
          <button onClick={() => performUnaryOperation('log')} className="btn bg-purple-500">log</button>
          <button onClick={() => performUnaryOperation('ln')} className="btn bg-purple-500">ln</button>
          <button onClick={() => performOperation('^')} className="btn bg-purple-500">xʸ</button>
          <button onClick={() => performOperation('%')} className="btn bg-purple-500">%</button>
        </div>

        {/* Number Pad and Basic Operations */}
        <div className="grid grid-cols-4 gap-2">
          <button onClick={clearDisplay} className="btn bg-red-500">C</button>
          <button onClick={clearEntry} className="btn bg-red-500">CE</button>
          <button onClick={toggleSign} className="btn bg-gray-500">±</button>
          <button onClick={() => performOperation('÷')} className="btn bg-orange-500">÷</button>

          {[7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => addDigit(num.toString())}
              className="btn bg-gray-700"
            >
              {num}
            </button>
          ))}
          <button onClick={() => performOperation('×')} className="btn bg-orange-500">×</button>

          {[4, 5, 6].map(num => (
            <button
              key={num}
              onClick={() => addDigit(num.toString())}
              className="btn bg-gray-700"
            >
              {num}
            </button>
          ))}
          <button onClick={() => performOperation('-')} className="btn bg-orange-500">-</button>

          {[1, 2, 3].map(num => (
            <button
              key={num}
              onClick={() => addDigit(num.toString())}
              className="btn bg-gray-700"
            >
              {num}
            </button>
          ))}
          <button onClick={() => performOperation('+')} className="btn bg-orange-500">+</button>

          <button onClick={() => addDigit('0')} className="btn bg-gray-700 col-span-2">0</button>
          <button onClick={addDecimal} className="btn bg-gray-700">.</button>
          <button onClick={() => performOperation(null)} className="btn bg-orange-500">=</button>
        </div>

        {/* History Toggle */}
        <div className="mt-4">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="btn bg-gray-500 w-full"
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>
        </div>

        {/* History Display */}
        {showHistory && (
          <div className="mt-4 max-h-40 overflow-y-auto">
            <div className="bg-gray-100 p-4 rounded-lg">
              {history.map((entry, index) => (
                <div key={index} className="text-sm text-gray-600 mb-1">{entry}</div>
              ))}
              {history.length === 0 && (
                <div className="text-sm text-gray-500">No calculation history</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Documentation */}
      <ScientificCalculatorDocs />
    </div>
  );
}