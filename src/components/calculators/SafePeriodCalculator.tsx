import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatDate } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import SafePeriodCalculatorDocs from './SafePeriodCalculatorDocs';

interface Period {
  start: Date;
  end: Date;
}

interface SafePeriodResult {
  menstrualPeriod: Period;
  follicularPhase: Period;
  ovulationDay: Date;
  lutealPhase: Period;
  safePeriodBefore: Period;
  safePeriodAfter: Period;
  fertileWindow: Period;
  nextPeriod: Date;
}

export default function SafePeriodCalculator({ calculator }: CalculatorProps) {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const calculateSafePeriod = (): SafePeriodResult => {
    const lastPeriod = new Date(lastPeriodDate);
    
    // 计算各个时期
    const menstrualEnd = new Date(lastPeriod);
    menstrualEnd.setDate(menstrualEnd.getDate() + periodLength - 1);

    // 排卵日（一般在下次月经前14天）
    const ovulationDay = new Date(lastPeriod);
    ovulationDay.setDate(ovulationDay.getDate() + cycleLength - 14);

    // 卵泡期（从月经结束到排卵前）
    const follicularStart = new Date(menstrualEnd);
    follicularStart.setDate(follicularStart.getDate() + 1);
    const follicularEnd = new Date(ovulationDay);
    follicularEnd.setDate(follicularEnd.getDate() - 1);

    // 黄体期（排卵后到下次月经前）
    const lutealStart = new Date(ovulationDay);
    lutealStart.setDate(lutealStart.getDate() + 1);
    const lutealEnd = new Date(lastPeriod);
    lutealEnd.setDate(lutealEnd.getDate() + cycleLength - 1);

    // 安全期计算
    // 前安全期：月经结束后到排卵前5天
    const safePeriodBeforeStart = new Date(menstrualEnd);
    safePeriodBeforeStart.setDate(safePeriodBeforeStart.getDate() + 1);
    const safePeriodBeforeEnd = new Date(ovulationDay);
    safePeriodBeforeEnd.setDate(safePeriodBeforeEnd.getDate() - 5);

    // 后安全期：排卵后第3天到下次月经前
    const safePeriodAfterStart = new Date(ovulationDay);
    safePeriodAfterStart.setDate(safePeriodAfterStart.getDate() + 3);
    const safePeriodAfterEnd = new Date(lastPeriod);
    safePeriodAfterEnd.setDate(safePeriodAfterEnd.getDate() + cycleLength - 1);

    // 易孕期：排卵前5天到排卵后2天
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(fertileEnd.getDate() + 2);

    // 下次月经
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    return {
      menstrualPeriod: { start: lastPeriod, end: menstrualEnd },
      follicularPhase: { start: follicularStart, end: follicularEnd },
      ovulationDay: ovulationDay,
      lutealPhase: { start: lutealStart, end: lutealEnd },
      safePeriodBefore: { start: safePeriodBeforeStart, end: safePeriodBeforeEnd },
      safePeriodAfter: { start: safePeriodAfterStart, end: safePeriodAfterEnd },
      fertileWindow: { start: fertileStart, end: fertileEnd },
      nextPeriod: nextPeriod
    };
  };

  const result = calculateSafePeriod();

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
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="排卵日"
              value={formatDate(result.ovulationDay)}
              className="bg-white"
            />
            <ResultCard
              title="易孕期"
              value={`${formatDate(result.fertileWindow.start)} - ${formatDate(result.fertileWindow.end)}`}
              className="bg-white text-yellow-600"
            />
            <ResultCard
              title="下次月经"
              value={formatDate(result.nextPeriod)}
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">周期详情</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">月经期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(result.menstrualPeriod.start)} - {formatDate(result.menstrualPeriod.end)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">卵泡期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(result.follicularPhase.start)} - {formatDate(result.follicularPhase.end)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">黄体期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatDate(result.lutealPhase.start)} - {formatDate(result.lutealPhase.end)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">前安全期</dt>
                    <dd className="mt-1 text-sm text-green-600">
                      {formatDate(result.safePeriodBefore.start)} - {formatDate(result.safePeriodBefore.end)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">后安全期</dt>
                    <dd className="mt-1 text-sm text-green-600">
                      {formatDate(result.safePeriodAfter.start)} - {formatDate(result.safePeriodAfter.end)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">易孕期</dt>
                    <dd className="mt-1 text-sm text-yellow-600">
                      {formatDate(result.fertileWindow.start)} - {formatDate(result.fertileWindow.end)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <SafePeriodCalculatorDocs />
    </div>
  );
}