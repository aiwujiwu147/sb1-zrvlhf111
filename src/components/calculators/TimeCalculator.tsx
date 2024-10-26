import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import TimeCalculatorDocs from './TimeCalculatorDocs';

type CalculationType = 'add' | 'subtract' | 'difference' | 'convert';
type TimeUnit = 'seconds' | 'minutes' | 'hours' | 'days';

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TimeCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [calculationType, setCalculationType] = useState<CalculationType>('add');
  const [time1, setTime1] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });
  const [time2, setTime2] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });
  const [duration, setDuration] = useState<number>(1);
  const [unit, setUnit] = useState<TimeUnit>('hours');
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [workHoursOnly, setWorkHoursOnly] = useState<boolean>(false);
  const [workStartTime, setWorkStartTime] = useState<string>('09:00');
  const [workEndTime, setWorkEndTime] = useState<string>('17:00');

  const timeToSeconds = (time: Time): number => {
    return time.hours * 3600 + time.minutes * 60 + time.seconds;
  };

  const secondsToTime = (totalSeconds: number): Time => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const calculateTime = () => {
    const seconds1 = timeToSeconds(time1);
    let result = 0;

    switch (calculationType) {
      case 'add':
        let addSeconds = 0;
        switch (unit) {
          case 'seconds': addSeconds = duration; break;
          case 'minutes': addSeconds = duration * 60; break;
          case 'hours': addSeconds = duration * 3600; break;
          case 'days': addSeconds = duration * 86400; break;
        }
        result = seconds1 + addSeconds;
        break;

      case 'subtract':
        let subtractSeconds = 0;
        switch (unit) {
          case 'seconds': subtractSeconds = duration; break;
          case 'minutes': subtractSeconds = duration * 60; break;
          case 'hours': subtractSeconds = duration * 3600; break;
          case 'days': subtractSeconds = duration * 86400; break;
        }
        result = seconds1 - subtractSeconds;
        break;

      case 'difference':
        const seconds2 = timeToSeconds(time2);
        result = Math.abs(seconds1 - seconds2);
        break;

      case 'convert':
        result = seconds1;
        break;
    }

    if (workHoursOnly && (calculationType === 'add' || calculationType === 'subtract')) {
      // 处理工作时间
      const workStart = workStartTime.split(':').map(Number);
      const workEnd = workEndTime.split(':').map(Number);
      const workStartSeconds = workStart[0] * 3600 + workStart[1] * 60;
      const workEndSeconds = workEnd[0] * 3600 + workEnd[1] * 60;
      const workDaySeconds = workEndSeconds - workStartSeconds;

      if (result < workStartSeconds) {
        result = workStartSeconds;
      } else if (result > workEndSeconds) {
        const extraSeconds = result - workEndSeconds;
        const extraWorkDays = Math.floor(extraSeconds / workDaySeconds);
        const remainingSeconds = extraSeconds % workDaySeconds;
        result = workStartSeconds + remainingSeconds;
      }
    }

    return {
      time: secondsToTime(result),
      totalSeconds: result,
      totalMinutes: result / 60,
      totalHours: result / 3600,
      totalDays: result / 86400
    };
  };

  const result = calculateTime();

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
                { value: 'add', label: '时间加法' },
                { value: 'subtract', label: '时间减法' },
                { value: 'difference', label: '时间差' },
                { value: 'convert', label: '时间转换' }
              ]}
            />

            <div className="grid grid-cols-3 gap-2">
              <InputField
                label="时"
                value={time1.hours}
                onChange={(value) => setTime1({ ...time1, hours: value as number })}
                type="number"
                min={0}
                step={1}
              />
              <InputField
                label="分"
                value={time1.minutes}
                onChange={(value) => setTime1({ ...time1, minutes: value as number })}
                type="number"
                min={0}
                max={59}
                step={1}
              />
              <InputField
                label="秒"
                value={time1.seconds}
                onChange={(value) => setTime1({ ...time1, seconds: value as number })}
                type="number"
                min={0}
                max={59}
                step={1}
              />
            </div>

            {calculationType === 'difference' && (
              <div className="grid grid-cols-3 gap-2">
                <InputField
                  label="时"
                  value={time2.hours}
                  onChange={(value) => setTime2({ ...time2, hours: value as number })}
                  type="number"
                  min={0}
                  step={1}
                />
                <InputField
                  label="分"
                  value={time2.minutes}
                  onChange={(value) => setTime2({ ...time2, minutes: value as number })}
                  type="number"
                  min={0}
                  max={59}
                  step={1}
                />
                <InputField
                  label="秒"
                  value={time2.seconds}
                  onChange={(value) => setTime2({ ...time2, seconds: value as number })}
                  type="number"
                  min={0}
                  max={59}
                  step={1}
                />
              </div>
            )}

            {(calculationType === 'add' || calculationType === 'subtract') && (
              <>
                <InputField
                  label="时间跨度"
                  value={duration}
                  onChange={setDuration}
                  type="number"
                  min={0}
                  step={1}
                />
                <SelectField
                  label="时间单位"
                  value={unit}
                  onChange={(value) => setUnit(value as TimeUnit)}
                  options={[
                    { value: 'seconds', label: '秒' },
                    { value: 'minutes', label: '分钟' },
                    { value: 'hours', label: '小时' },
                    { value: 'days', label: '天' }
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
                      checked={workHoursOnly}
                      onChange={(e) => setWorkHoursOnly(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">仅计算工作时间</span>
                  </label>
                </div>

                {workHoursOnly && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="工作开始时间"
                      value={workStartTime}
                      onChange={setWorkStartTime}
                      type="time"
                    />
                    <InputField
                      label="工作结束时间"
                      value={workEndTime}
                      onChange={setWorkEndTime}
                      type="time"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="计算结果"
              value={`${result.time.hours}时${result.time.minutes}分${result.time.seconds}秒`}
              className="bg-white"
            />
            <ResultCard
              title="总秒数"
              value={result.totalSeconds}
              suffix="秒"
              className="bg-white"
            />
            <ResultCard
              title="总分钟"
              value={result.totalMinutes.toFixed(2)}
              suffix="分"
              className="bg-white"
            />
            <ResultCard
              title="总小时"
              value={result.totalHours.toFixed(2)}
              suffix="时"
              className="bg-white"
            />
            <ResultCard
              title="总天数"
              value={result.totalDays.toFixed(2)}
              suffix="天"
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
                    <dt className="text-sm font-medium text-gray-500">输入时间</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {time1.hours}时{time1.minutes}分{time1.seconds}秒
                    </dd>
                  </div>
                  {calculationType === 'difference' && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">比较时间</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {time2.hours}时{time2.minutes}分{time2.seconds}秒
                      </dd>
                    </div>
                  )}
                  {(calculationType === 'add' || calculationType === 'subtract') && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">时间跨度</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {duration} {unit}
                      </dd>
                    </div>
                  )}
                  {workHoursOnly && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">工作时间</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {workStartTime} - {workEndTime}
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
      <TimeCalculatorDocs />
    </div>
  );
}