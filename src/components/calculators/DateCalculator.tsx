import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatDate } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import DateCalculatorDocs from './DateCalculatorDocs';

type CalculationType = 'difference' | 'add' | 'subtract' | 'workdays';

interface DateResult {
  days: number;
  workdays: number;
  weeks: number;
  months: number;
  years: number;
  resultDate?: Date;
}

export default function DateCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [calculationType, setCalculationType] = useState<CalculationType>('difference');
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [duration, setDuration] = useState<number>(1);
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(false);
  const [excludeHolidays, setExcludeHolidays] = useState<boolean>(false);
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isHoliday = (date: Date): boolean => {
    const dateString = date.toISOString().split('T')[0];
    return customHolidays.includes(dateString);
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const calculateWorkdays = (start: Date, end: Date): number => {
    let days = 0;
    let current = new Date(start);
    
    while (current <= end) {
      if ((!excludeWeekends || !isWeekend(current)) && 
          (!excludeHolidays || !isHoliday(current))) {
        days++;
      }
      current = addDays(current, 1);
    }
    
    return days;
  };

  const calculateDateDifference = (start: Date, end: Date): DateResult => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWorkdays = calculateWorkdays(start, end);
    
    return {
      days: includeEndDate ? diffDays + 1 : diffDays,
      workdays: diffWorkdays,
      weeks: Math.floor(diffDays / 7),
      months: Math.floor(diffDays / 30.44), // 平均月长
      years: Math.floor(diffDays / 365.25) // 考虑闰年
    };
  };

  const calculateNewDate = (start: Date, amount: number, unitType: string): Date => {
    const result = new Date(start);
    
    switch (unitType) {
      case 'days':
        if (excludeWeekends || excludeHolidays) {
          let daysAdded = 0;
          let current = new Date(start);
          while (daysAdded < amount) {
            current = addDays(current, amount > 0 ? 1 : -1);
            if ((!excludeWeekends || !isWeekend(current)) && 
                (!excludeHolidays || !isHoliday(current))) {
              daysAdded++;
            }
          }
          return current;
        } else {
          result.setDate(result.getDate() + amount);
        }
        break;
      case 'weeks':
        result.setDate(result.getDate() + amount * 7);
        break;
      case 'months':
        result.setMonth(result.getMonth() + amount);
        break;
      case 'years':
        result.setFullYear(result.getFullYear() + amount);
        break;
    }
    return result;
  };

  const calculate = (): DateResult => {
    const start = new Date(startDate);
    
    switch (calculationType) {
      case 'difference':
        const end = new Date(endDate);
        return calculateDateDifference(start, end);
      
      case 'add':
      case 'subtract':
        const amount = calculationType === 'add' ? duration : -duration;
        const resultDate = calculateNewDate(start, amount, unit);
        return {
          ...calculateDateDifference(start, resultDate),
          resultDate
        };
      
      case 'workdays':
        const workEnd = new Date(endDate);
        return {
          ...calculateDateDifference(start, workEnd),
          workdays: calculateWorkdays(start, workEnd)
        };
      
      default:
        return {
          days: 0,
          workdays: 0,
          weeks: 0,
          months: 0,
          years: 0
        };
    }
  };

  const result = calculate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="计算类型"
              value={calculationType}
              onChange={(value) => setCalculationType(value as CalculationType)}
              options={[
                { value: 'difference', label: '计算日期差' },
                { value: 'add', label: '日期加法' },
                { value: 'subtract', label: '日期减法' },
                { value: 'workdays', label: '工作日计算' }
              ]}
            />

            <InputField
              label="起始日期"
              value={startDate}
              onChange={setStartDate}
              type="date"
            />

            {calculationType === 'difference' || calculationType === 'workdays' ? (
              <InputField
                label="结束日期"
                value={endDate}
                onChange={setEndDate}
                type="date"
              />
            ) : (
              <>
                <InputField
                  label="时间跨度"
                  value={duration}
                  onChange={setDuration}
                  type="number"
                  min={1}
                  step={1}
                />
                <SelectField
                  label="时间单位"
                  value={unit}
                  onChange={(value) => setUnit(value as 'days' | 'weeks' | 'months' | 'years')}
                  options={[
                    { value: 'days', label: '天' },
                    { value: 'weeks', label: '周' },
                    { value: 'months', label: '月' },
                    { value: 'years', label: '年' }
                  ]}
                />
              </>
            )}
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
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeEndDate}
                      onChange={(e) => setIncludeEndDate(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">包含结束日期</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={excludeWeekends}
                      onChange={(e) => setExcludeWeekends(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">排除周末</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={excludeHolidays}
                      onChange={(e) => setExcludeHolidays(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">排除节假日</span>
                  </label>
                </div>

                {excludeHolidays && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">自定义节假日</h4>
                    <div className="flex flex-wrap gap-2">
                      {customHolidays.map((holiday, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {holiday}
                          <button
                            onClick={() => setCustomHolidays(customHolidays.filter((_, i) => i !== index))}
                            className="ml-1 text-indigo-600 hover:text-indigo-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        type="date"
                        className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border border-gray-300"
                        onChange={(e) => {
                          if (e.target.value && !customHolidays.includes(e.target.value)) {
                            setCustomHolidays([...customHolidays, e.target.value]);
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(calculationType === 'add' || calculationType === 'subtract') && (
              <ResultCard
                title="计算结果"
                value={result.resultDate ? formatDate(result.resultDate) : '-'}
                className="bg-white"
              />
            )}
            <ResultCard
              title="相差天数"
              value={result.days}
              suffix="天"
              className="bg-white"
            />
            <ResultCard
              title="工作日天数"
              value={result.workdays}
              suffix="天"
              className="bg-white"
            />
            <ResultCard
              title="相差周数"
              value={result.weeks}
              suffix="周"
              className="bg-white"
            />
            <ResultCard
              title="相差月数"
              value={result.months}
              suffix="月"
              className="bg-white"
            />
            <ResultCard
              title="相差年数"
              value={result.years}
              suffix="年"
              className="bg-white"
            />
          </div>
        </div>

        {/* 详细信息 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏详细信息' : '查看详细信息'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">计算详情</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">起始日期</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(new Date(startDate))}</dd>
                  </div>
                  {(calculationType === 'difference' || calculationType === 'workdays') ? (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">结束日期</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatDate(new Date(endDate))}</dd>
                    </div>
                  ) : (
                    <>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">计算方式</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {calculationType === 'add' ? '加上' : '减去'} {duration} {
                            unit === 'days' ? '天' :
                            unit === 'weeks' ? '周' :
                            unit === 'months' ? '月' : '年'
                          }
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">结果日期</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {result.resultDate ? formatDate(result.resultDate) : '-'}
                        </dd>
                      </div>
                    </>
                  )}
                  {excludeWeekends && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">周末信息</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        已排除周末，仅计算工作日
                      </dd>
                    </div>
                  )}
                  {excludeHolidays && customHolidays.length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">节假日信息</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        已排除 {customHolidays.length} 个节假日
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <DateCalculatorDocs />
    </div>
  );
}