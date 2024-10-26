import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatDate } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import MenstrualCalculatorDocs from './MenstrualCalculatorDocs';

interface Period {
  start: Date;
  end: Date;
}

interface MenstrualResult {
  nextPeriods: Period[];
  averageCycle: number;
  cycleRegularity: string;
  daysUntilNext: number;
  periodLength: number;
}

export default function MenstrualCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [previousCycles, setPreviousCycles] = useState<number[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const calculateMenstrualCycle = (): MenstrualResult => {
    const lastPeriod = new Date(lastPeriodDate);
    const today = new Date();
    
    // 计算下一次月经日期
    const nextPeriods: Period[] = [];
    for (let i = 0; i < 6; i++) {
      const startDate = new Date(lastPeriod);
      startDate.setDate(startDate.getDate() + cycleLength * (i + 1));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + periodLength - 1);
      
      nextPeriods.push({
        start: startDate,
        end: endDate
      });
    }

    // 计算距离下次月经的天数
    const nextPeriod = nextPeriods[0].start;
    const daysUntilNext = Math.ceil((nextPeriod.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // 计算周期规律性
    let cycleRegularity = '规律';
    if (previousCycles.length > 0) {
      const maxDiff = Math.max(...previousCycles) - Math.min(...previousCycles);
      if (maxDiff > 7) {
        cycleRegularity = '不规律';
      } else if (maxDiff > 3) {
        cycleRegularity = '较规律';
      }
    }

    // 计算平均周期
    const averageCycle = previousCycles.length > 0
      ? previousCycles.reduce((a, b) => a + b, 0) / previousCycles.length
      : cycleLength;

    return {
      nextPeriods,
      averageCycle,
      cycleRegularity,
      daysUntilNext,
      periodLength
    };
  };

  const result = calculateMenstrualCycle();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="末次月经日期"
              value={lastPeriodDate}
              onChange={setLastPeriodDate}
              type="date"
            />
            <InputField
              label="月经周期"
              value={cycleLength}
              onChange={setCycleLength}
              type="number"
              min={21}
              max={35}
              step={1}
              suffix="天"
            />
            <InputField
              label="月经持续天数"
              value={periodLength}
              onChange={setPeriodLength}
              type="number"
              min={3}
              max={7}
              step={1}
              suffix="天"
            />
          </div>

          {/* 高级选项 */}
          <div className="mt-6">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium flex items-center"
            >
              {showAdvanced ? '隐藏高级选项' : '显示高级选项'}
              <svg
                className={`ml-2 h-5 w-5 transform ${showAdvanced ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showAdvanced && (
              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">记录历史周期</h4>
                  <div className="flex flex-wrap gap-2">
                    {previousCycles.map((cycle, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {cycle}天
                        <button
                          onClick={() => setPreviousCycles(previousCycles.filter((_, i) => i !== index))}
                          className="ml-1 text-indigo-600 hover:text-indigo-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => setPreviousCycles([...previousCycles, cycleLength])}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      + 添加周期
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="下次月经"
              value={formatDate(result.nextPeriods[0].start)}
              className="bg-white"
            />
            <ResultCard
              title="距离天数"
              value={result.daysUntilNext}
              suffix="天"
              className="bg-white"
            />
            <ResultCard
              title="周期规律性"
              value={result.cycleRegularity}
              className="bg-white"
            />
          </div>
        </div>

        {/* 详细预测 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏详细预测' : '查看详细预测'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">未来6个月预测</h3>
                <div className="space-y-4">
                  {result.nextPeriods.map((period, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        第 {index + 1} 次月经
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(period.start)} - {formatDate(period.end)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <MenstrualCalculatorDocs />
    </div>
  );
}