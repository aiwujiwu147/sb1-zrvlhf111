import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import DepositCalculatorDocs from './DepositCalculatorDocs';

interface DepositRate {
  type: string;
  rates: {
    [key: string]: number;
  };
}

const depositRates: DepositRate[] = [
  {
    type: 'demand',
    rates: {
      '活期': 0.25
    }
  },
  {
    type: 'time',
    rates: {
      '3个月': 1.1,
      '6个月': 1.3,
      '1年': 1.5,
      '2年': 2.1,
      '3年': 2.75,
      '5年': 2.75
    }
  },
  {
    type: 'notice',
    rates: {
      '7天通知': 1.1,
      '14天通知': 1.2,
      '1个月通知': 1.3
    }
  }
];

export default function DepositCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [amount, setAmount] = useState<number>(100000);
  const [depositType, setDepositType] = useState<'demand' | 'time' | 'notice'>('time');
  const [term, setTerm] = useState<string>('1年');
  const [customRate, setCustomRate] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(1.5);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [regularDeposit, setRegularDeposit] = useState<number>(0);
  const [regularFrequency, setRegularFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
  const [withdrawalFrequency, setWithdrawalFrequency] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const getTermMonths = (term: string): number => {
    if (term.includes('年')) {
      return parseInt(term) * 12;
    }
    if (term.includes('个月')) {
      return parseInt(term);
    }
    if (term.includes('天')) {
      return 1;
    }
    return 12; // 默认1年
  };

  const getCompoundingPeriods = (frequency: string): number => {
    switch (frequency) {
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'yearly': return 1;
      default: return 1;
    }
  };

  const calculateInterest = () => {
    const monthlyRate = (rate / 100) / 12;
    const totalMonths = getTermMonths(term);
    const compoundingPeriodsPerYear = getCompoundingPeriods(compoundingFrequency);
    const compoundingRate = (rate / 100) / compoundingPeriodsPerYear;
    const totalPeriods = (totalMonths / 12) * compoundingPeriodsPerYear;

    let finalAmount = amount;
    let totalInterest = 0;
    let regularDepositTotal = 0;
    let withdrawalTotal = 0;

    if (depositType === 'demand') {
      // 活期计算
      finalAmount = amount * (1 + monthlyRate) ** totalMonths;
      totalInterest = finalAmount - amount;
    } else {
      // 定期和通知存款计算
      finalAmount = amount * (1 + compoundingRate) ** totalPeriods;

      // 处理定期存入
      if (regularDeposit > 0) {
        const regularPeriodsPerYear = getCompoundingPeriods(regularFrequency);
        const regularRate = (rate / 100) / regularPeriodsPerYear;
        const totalRegularPeriods = (totalMonths / 12) * regularPeriodsPerYear;
        
        for (let i = 1; i <= totalRegularPeriods; i++) {
          const periodAmount = regularDeposit * (1 + regularRate) ** (totalRegularPeriods - i);
          finalAmount += periodAmount;
          regularDepositTotal += regularDeposit;
        }
      }

      // 处理定期支取
      if (withdrawalAmount > 0) {
        const withdrawalPeriodsPerYear = getCompoundingPeriods(withdrawalFrequency);
        const totalWithdrawalPeriods = (totalMonths / 12) * withdrawalPeriodsPerYear;
        
        for (let i = 1; i <= totalWithdrawalPeriods; i++) {
          finalAmount -= withdrawalAmount;
          withdrawalTotal += withdrawalAmount;
        }
      }

      totalInterest = finalAmount - amount - regularDepositTotal + withdrawalTotal;
    }

    return {
      finalAmount,
      totalInterest,
      regularDepositTotal,
      withdrawalTotal,
      effectiveRate: (totalInterest / amount) * (12 / totalMonths) * 100
    };
  };

  const result = calculateInterest();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="存款金额"
              value={amount}
              onChange={setAmount}
              type="number"
              min={0}
              step={1000}
              suffix="元"
            />
            <SelectField
              label="存款类型"
              value={depositType}
              onChange={(value) => {
                setDepositType(value as 'demand' | 'time' | 'notice');
                const defaultRate = depositRates.find(r => r.type === value)?.rates[Object.keys(depositRates.find(r => r.type === value)?.rates || {})[0]] || 0;
                setRate(defaultRate);
                setTerm(Object.keys(depositRates.find(r => r.type === value)?.rates || {})[0]);
              }}
              options={[
                { value: 'demand', label: '活期存款' },
                { value: 'time', label: '定期存款' },
                { value: 'notice', label: '通知存款' }
              ]}
            />

            {depositType !== 'demand' && (
              <SelectField
                label="存款期限"
                value={term}
                onChange={(value) => {
                  setTerm(value);
                  if (!customRate) {
                    setRate(depositRates.find(r => r.type === depositType)?.rates[value] || 0);
                  }
                }}
                options={Object.keys(depositRates.find(r => r.type === depositType)?.rates || {}).map(key => ({
                  value: key,
                  label: key
                }))}
              />
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={customRate}
                onChange={(e) => setCustomRate(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">自定义利率</span>
            </div>

            {customRate && (
              <InputField
                label="年利率"
                value={rate}
                onChange={setRate}
                type="number"
                min={0}
                step={0.01}
                suffix="%"
              />
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
              <div className="mt-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    label="计息周期"
                    value={compoundingFrequency}
                    onChange={(value) => setCompoundingFrequency(value as 'monthly' | 'quarterly' | 'yearly')}
                    options={[
                      { value: 'monthly', label: '每月' },
                      { value: 'quarterly', label: '每季' },
                      { value: 'yearly', label: '每年' }
                    ]}
                  />
                  <InputField
                    label="定期存入金额"
                    value={regularDeposit}
                    onChange={setRegularDeposit}
                    type="number"
                    min={0}
                    step={100}
                    suffix="元"
                  />
                  {regularDeposit > 0 && (
                    <SelectField
                      label="存入频率"
                      value={regularFrequency}
                      onChange={(value) => setRegularFrequency(value as 'monthly' | 'quarterly' | 'yearly')}
                      options={[
                        { value: 'monthly', label: '每月' },
                        { value: 'quarterly', label: '每季' },
                        { value: 'yearly', label: '每年' }
                      ]}
                    />
                  )}
                  <InputField
                    label="定期支取金额"
                    value={withdrawalAmount}
                    onChange={setWithdrawalAmount}
                    type="number"
                    min={0}
                    step={100}
                    suffix="元"
                  />
                  {withdrawalAmount > 0 && (
                    <SelectField
                      label="支取频率"
                      value={withdrawalFrequency}
                      onChange={(value) => setWithdrawalFrequency(value as 'monthly' | 'quarterly' | 'yearly')}
                      options={[
                        { value: 'monthly', label: '每月' },
                        { value: 'quarterly', label: '每季' },
                        { value: 'yearly', label: '每年' }
                      ]}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="本金"
              value={formatCurrency(amount)}
              className="bg-white"
            />
            <ResultCard
              title="利息收入"
              value={formatCurrency(result.totalInterest)}
              className="bg-white"
            />
            <ResultCard
              title="到期金额"
              value={formatCurrency(result.finalAmount)}
              className="bg-white"
            />
            <ResultCard
              title="实际年化收益率"
              value={`${result.effectiveRate.toFixed(2)}%`}
              className="bg-white"
            />
            {regularDeposit > 0 && (
              <ResultCard
                title="定存总额"
                value={formatCurrency(result.regularDepositTotal)}
                className="bg-white"
              />
            )}
            {withdrawalAmount > 0 && (
              <ResultCard
                title="支取总额"
                value={formatCurrency(result.withdrawalTotal)}
                className="bg-white"
              />
            )}
          </div>
        </div>

        {/* 收益明细 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏收益明细' : '查看收益明细'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">收益构成</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">存款类型</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {depositType === 'demand' ? '活期存款' : depositType === 'time' ? '定期存款' : '通知存款'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">年利率</dt>
                    <dd className="mt-1 text-sm text-gray-900">{rate}%</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">计息周期</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {compoundingFrequency === 'monthly' ? '每月' : compoundingFrequency === 'quarterly' ? '每季' : '每年'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">存款期限</dt>
                    <dd className="mt-1 text-sm text-gray-900">{term}</dd>
                  </div>
                  {regularDeposit > 0 && (
                    <>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">定期存入</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {formatCurrency(regularDeposit)}/{regularFrequency === 'monthly' ? '月' : regularFrequency === 'quarterly' ? '季' : '年'}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">定存总额</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.regularDepositTotal)}</dd>
                      </div>
                    </>
                  )}
                  {withdrawalAmount > 0 && (
                    <>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">定期支取</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {formatCurrency(withdrawalAmount)}/{withdrawalFrequency === 'monthly' ? '月' : withdrawalFrequency === 'quarterly' ? '季' : '年'}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">支取总额</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.withdrawalTotal)}</dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <DepositCalculatorDocs />
    </div>
  );
}