import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import BusinessLoanCalculatorDocs from './BusinessLoanCalculatorDocs';

interface LoanConfig {
  amount: number;
  term: number;
  rate: number;
  paymentMethod: 'equal' | 'principal';
  startDate: string;
  compoundingFrequency: 'monthly' | 'quarterly' | 'yearly';
  prepaymentAmount: number;
  prepaymentFrequency: 'none' | 'monthly' | 'quarterly' | 'yearly';
  gracePeriod: number;
  serviceCharge: number;
}

export default function BusinessLoanCalculator({ calculator }: CalculatorProps) {
  const [config, setConfig] = useState<LoanConfig>({
    amount: 1000000,
    term: 3,
    rate: 4.35,
    paymentMethod: 'equal',
    startDate: new Date().toISOString().split('T')[0],
    compoundingFrequency: 'monthly',
    prepaymentAmount: 0,
    prepaymentFrequency: 'none',
    gracePeriod: 0,
    serviceCharge: 0
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const getCompoundingPeriods = () => {
    switch (config.compoundingFrequency) {
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'yearly': return 1;
    }
  };

  const calculateEffectiveRate = () => {
    const nominalRate = config.rate / 100;
    const periods = getCompoundingPeriods();
    return (Math.pow(1 + nominalRate / periods, periods) - 1) * 100;
  };

  const calculateBaseLoanPayments = (amount: number) => {
    const monthlyRate = (config.rate / 100) / 12;
    const totalMonths = config.term * 12;
    const gracePeriodMonths = config.gracePeriod;

    if (config.paymentMethod === 'equal') {
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = monthlyPayment * totalMonths;
      const totalInterest = totalPayment - amount;

      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        const isGracePeriod = month <= gracePeriodMonths;
        
        if (isGracePeriod) {
          const interest = amount * monthlyRate;
          return {
            month,
            payment: interest,
            principal: 0,
            interest,
            remaining: amount
          };
        }

        const remaining = (monthlyPayment * (Math.pow(1 + monthlyRate, totalMonths - month + 1) - 1)) /
          (monthlyRate * Math.pow(1 + monthlyRate, totalMonths - month + 1));
        const interest = remaining * monthlyRate;
        const principal = monthlyPayment - interest;

        return {
          month,
          payment: monthlyPayment,
          principal,
          interest,
          remaining: remaining - principal
        };
      });

      return {
        monthlyPayment,
        totalInterest,
        totalPayment: totalPayment + (config.serviceCharge * totalMonths),
        paymentDetails
      };
    } else {
      const monthlyPrincipal = amount / totalMonths;
      const firstMonthInterest = amount * monthlyRate;
      const firstMonthPayment = monthlyPrincipal + firstMonthInterest;
      const lastMonthInterest = monthlyPrincipal * monthlyRate;
      const lastMonthPayment = monthlyPrincipal + lastMonthInterest;
      const totalInterest = ((firstMonthInterest + lastMonthInterest) * totalMonths) / 2;

      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        const isGracePeriod = month <= gracePeriodMonths;
        
        if (isGracePeriod) {
          const interest = amount * monthlyRate;
          return {
            month,
            payment: interest,
            principal: 0,
            interest,
            remaining: amount
          };
        }

        const remaining = amount - (monthlyPrincipal * (month - gracePeriodMonths));
        const interest = remaining * monthlyRate;
        const payment = monthlyPrincipal + interest;

        return {
          month,
          payment,
          principal: monthlyPrincipal,
          interest,
          remaining: Math.max(0, remaining - monthlyPrincipal)
        };
      });

      return {
        firstMonthPayment,
        lastMonthPayment,
        totalInterest,
        totalPayment: amount + totalInterest + (config.serviceCharge * totalMonths),
        paymentDetails
      };
    }
  };

  const calculatePrepaymentSavings = () => {
    if (config.prepaymentAmount <= 0) return 0;
    
    const prepaymentFrequencyMonths = {
      none: 0,
      monthly: 1,
      quarterly: 3,
      yearly: 12
    }[config.prepaymentFrequency];

    if (prepaymentFrequencyMonths === 0) return 0;

    const totalPrepayments = Math.floor(config.term * 12 / prepaymentFrequencyMonths) * config.prepaymentAmount;
    const baseResult = calculateBaseLoanPayments(config.amount);
    const reducedResult = calculateBaseLoanPayments(config.amount - totalPrepayments);
    
    return baseResult.totalInterest - reducedResult.totalInterest;
  };

  const result = calculateBaseLoanPayments(config.amount);
  const prepaymentSavings = calculatePrepaymentSavings();
  const effectiveRate = calculateEffectiveRate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          {/* 基本设置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="贷款金额"
              value={config.amount}
              onChange={(value) => setConfig({ ...config, amount: value as number })}
              type="number"
              min={10000}
              step={10000}
              suffix="元"
            />
            <InputField
              label="贷款期限"
              value={config.term}
              onChange={(value) => setConfig({ ...config, term: value as number })}
              type="number"
              min={1}
              max={30}
              step={1}
              suffix="年"
            />
            <InputField
              label="年利率"
              value={config.rate}
              onChange={(value) => setConfig({ ...config, rate: value as number })}
              type="number"
              min={0}
              step={0.01}
              suffix="%"
            />
            <SelectField
              label="还款方式"
              value={config.paymentMethod}
              onChange={(value) => setConfig({ ...config, paymentMethod: value as 'equal' | 'principal' })}
              options={[
                { value: 'equal', label: '等额本息' },
                { value: 'principal', label: '等额本金' }
              ]}
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
              <div className="mt-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="起始日期"
                    value={config.startDate}
                    onChange={(value) => setConfig({ ...config, startDate: value as string })}
                    type="date"
                  />
                  <SelectField
                    label="计息周期"
                    value={config.compoundingFrequency}
                    onChange={(value) => setConfig({ ...config, compoundingFrequency: value as 'monthly' | 'quarterly' | 'yearly' })}
                    options={[
                      { value: 'monthly', label: '月复利' },
                      { value: 'quarterly', label: '季复利' },
                      { value: 'yearly', label: '年复利' }
                    ]}
                  />
                  <InputField
                    label="提前还款金额"
                    value={config.prepaymentAmount}
                    onChange={(value) => setConfig({ ...config, prepaymentAmount: value as number })}
                    type="number"
                    min={0}
                    step={1000}
                    suffix="元"
                  />
                  <SelectField
                    label="提前还款频率"
                    value={config.prepaymentFrequency}
                    onChange={(value) => setConfig({ ...config, prepaymentFrequency: value as 'none' | 'monthly' | 'quarterly' | 'yearly' })}
                    options={[
                      { value: 'none', label: '不提前还款' },
                      { value: 'monthly', label: '每月' },
                      { value: 'quarterly', label: '每季度' },
                      { value: 'yearly', label: '每年' }
                    ]}
                  />
                  <InputField
                    label="宽限期"
                    value={config.gracePeriod}
                    onChange={(value) => setConfig({ ...config, gracePeriod: value as number })}
                    type="number"
                    min={0}
                    max={12}
                    step={1}
                    suffix="月"
                  />
                  <InputField
                    label="月服务费"
                    value={config.serviceCharge}
                    onChange={(value) => setConfig({ ...config, serviceCharge: value as number })}
                    type="number"
                    min={0}
                    step={100}
                    suffix="元"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.paymentMethod === 'equal' ? (
              <ResultCard
                title="月供"
                value={formatCurrency(result.monthlyPayment)}
                className="bg-white"
              />
            ) : (
              <>
                <ResultCard
                  title="首月还款"
                  value={formatCurrency(result.firstMonthPayment)}
                  className="bg-white"
                />
                <ResultCard
                  title="末月还款"
                  value={formatCurrency(result.lastMonthPayment)}
                  className="bg-white"
                />
              </>
            )}
            <ResultCard
              title="支付利息"
              value={formatCurrency(result.totalInterest)}
              className="bg-white"
            />
            <ResultCard
              title="还款总额"
              value={formatCurrency(result.totalPayment)}
              className="bg-white"
            />
            <ResultCard
              title="实际年化利率"
              value={`${effectiveRate.toFixed(2)}%`}
              className="bg-white"
            />
            {prepaymentSavings > 0 && (
              <ResultCard
                title="提前还款节省利息"
                value={formatCurrency(prepaymentSavings)}
                className="bg-white text-green-600"
              />
            )}
          </div>
        </div>

        {/* 还款明细 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏还款明细' : '查看还款明细'}
          </button>

          {showDetail && (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期数</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">月供</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">本金</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">利息</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">剩余本金</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.paymentDetails.map((detail) => (
                    <tr key={detail.month} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">第 {detail.month} 期</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(detail.payment)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(detail.principal)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(detail.interest)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{formatCurrency(detail.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-center text-sm text-gray-500 mt-4">
                注：此处仅显示前24期还款明细
              </p>
            </div>
          )}
        </div>
      </div>

      <BusinessLoanCalculatorDocs />
    </div>
  );
}