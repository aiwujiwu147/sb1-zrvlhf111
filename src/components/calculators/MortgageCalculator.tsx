import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import MortgageCalculatorDocs from './MortgageCalculatorDocs';

interface LoanType {
  type: 'commercial' | 'fund' | 'combined';
  commercialRate: number;
  fundRate: number;
  fundRatio?: number;
}

export default function MortgageCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [totalPrice, setTotalPrice] = useState<number>(1000000);
  const [downPaymentRate, setDownPaymentRate] = useState<number>(30);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [paymentMethod, setPaymentMethod] = useState<'equal' | 'principal'>('equal');
  
  // 贷款类型相关
  const [loanType, setLoanType] = useState<LoanType>({
    type: 'commercial',
    commercialRate: 4.1,
    fundRate: 3.1,
    fundRatio: 0
  });

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [extraPaymentStart, setExtraPaymentStart] = useState<number>(13);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const calculateMortgage = () => {
    const loanAmount = totalPrice * (1 - downPaymentRate / 100);
    const totalMonths = loanTerm * 12;

    // 计算商贷和公积金贷款的金额
    const fundAmount = loanType.type === 'combined' 
      ? loanAmount * (loanType.fundRatio! / 100)
      : loanType.type === 'fund' ? loanAmount : 0;
    const commercialAmount = loanAmount - fundAmount;

    // 月利率
    const commercialMonthlyRate = loanType.commercialRate / 100 / 12;
    const fundMonthlyRate = loanType.fundRate / 100 / 12;

    if (paymentMethod === 'equal') {
      // 等额本息计算
      const getMonthlyPayment = (principal: number, rate: number) => {
        return (principal * rate * Math.pow(1 + rate, totalMonths)) /
          (Math.pow(1 + rate, totalMonths) - 1);
      };

      const commercialMonthly = getMonthlyPayment(commercialAmount, commercialMonthlyRate);
      const fundMonthly = getMonthlyPayment(fundAmount, fundMonthlyRate);
      const monthlyPayment = commercialMonthly + fundMonthly;

      // 计算还款明细
      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        let remaining = 0;
        let principal = 0;
        let interest = 0;

        // 商业贷款部分
        if (commercialAmount > 0) {
          const commercialRemaining = (commercialMonthly * (Math.pow(1 + commercialMonthlyRate, totalMonths - month) - 1)) /
            (commercialMonthlyRate * Math.pow(1 + commercialMonthlyRate, totalMonths - month));
          const commercialInterest = commercialRemaining * commercialMonthlyRate;
          remaining += commercialRemaining;
          interest += commercialInterest;
          principal += commercialMonthly - commercialInterest;
        }

        // 公积金贷款部分
        if (fundAmount > 0) {
          const fundRemaining = (fundMonthly * (Math.pow(1 + fundMonthlyRate, totalMonths - month) - 1)) /
            (fundMonthlyRate * Math.pow(1 + fundMonthlyRate, totalMonths - month));
          const fundInterest = fundRemaining * fundMonthlyRate;
          remaining += fundRemaining;
          interest += fundInterest;
          principal += fundMonthly - fundInterest;
        }

        // 考虑额外还款
        if (extraPayment > 0 && month >= extraPaymentStart) {
          principal += extraPayment;
          remaining = Math.max(0, remaining - extraPayment);
        }

        return {
          month,
          payment: monthlyPayment + (month >= extraPaymentStart ? extraPayment : 0),
          principal,
          interest,
          remaining
        };
      });

      // 计算总利息和总还款额
      const totalPayment = monthlyPayment * totalMonths + 
        (extraPayment * Math.max(0, totalMonths - extraPaymentStart + 1));
      const totalInterest = totalPayment - loanAmount;

      return {
        loanAmount,
        monthlyPayment,
        totalInterest,
        totalPayment,
        paymentDetails,
        commercialAmount,
        fundAmount,
        commercialMonthly,
        fundMonthly
      };
    } else {
      // 等额本金计算
      const commercialPrincipal = commercialAmount / totalMonths;
      const fundPrincipal = fundAmount / totalMonths;
      
      const firstMonthInterest = commercialAmount * commercialMonthlyRate + 
        fundAmount * fundMonthlyRate;
      const firstMonthPayment = commercialPrincipal + fundPrincipal + firstMonthInterest;

      const lastMonthInterest = (commercialPrincipal * commercialMonthlyRate) +
        (fundPrincipal * fundMonthlyRate);
      const lastMonthPayment = commercialPrincipal + fundPrincipal + lastMonthInterest;

      // 计算还款明细
      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        const commercialRemaining = commercialAmount - (commercialPrincipal * month);
        const fundRemaining = fundAmount - (fundPrincipal * month);
        
        const commercialInterest = commercialRemaining * commercialMonthlyRate;
        const fundInterest = fundRemaining * fundMonthlyRate;
        
        const payment = commercialPrincipal + fundPrincipal + commercialInterest + fundInterest +
          (month >= extraPaymentStart ? extraPayment : 0);

        return {
          month,
          payment,
          principal: commercialPrincipal + fundPrincipal + 
            (month >= extraPaymentStart ? extraPayment : 0),
          interest: commercialInterest + fundInterest,
          remaining: Math.max(0, commercialRemaining + fundRemaining - 
            (month >= extraPaymentStart ? extraPayment : 0))
        };
      });

      // 计算总利息和总还款额
      const totalInterest = ((firstMonthInterest + lastMonthInterest) * totalMonths) / 2;
      const totalPayment = loanAmount + totalInterest;

      return {
        loanAmount,
        firstMonthPayment,
        lastMonthPayment,
        totalInterest,
        totalPayment,
        paymentDetails,
        commercialAmount,
        fundAmount
      };
    }
  };

  const result = calculateMortgage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 主计算区域 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="房屋总价"
              value={totalPrice}
              onChange={setTotalPrice}
              type="number"
              min={100000}
              step={10000}
              suffix="元"
              className="col-span-1"
            />
            <InputField
              label="首付比例"
              value={downPaymentRate}
              onChange={setDownPaymentRate}
              type="number"
              min={20}
              max={90}
              step={1}
              suffix="%"
              className="col-span-1"
            />
            <InputField
              label="贷款年限"
              value={loanTerm}
              onChange={setLoanTerm}
              type="number"
              min={1}
              max={30}
              step={1}
              suffix="年"
              className="col-span-1"
            />
            <SelectField
              label="贷款方式"
              value={loanType.type}
              onChange={(value) => setLoanType({
                ...loanType,
                type: value as 'commercial' | 'fund' | 'combined'
              })}
              options={[
                { value: 'commercial', label: '商业贷款' },
                { value: 'fund', label: '公积金贷款' },
                { value: 'combined', label: '组合贷款' }
              ]}
              className="col-span-1"
            />

            {loanType.type === 'commercial' && (
              <InputField
                label="商贷利率"
                value={loanType.commercialRate}
                onChange={(value) => setLoanType({ ...loanType, commercialRate: value as number })}
                type="number"
                min={0}
                step={0.01}
                suffix="%"
                className="col-span-1"
              />
            )}

            {loanType.type === 'fund' && (
              <InputField
                label="公积金利率"
                value={loanType.fundRate}
                onChange={(value) => setLoanType({ ...loanType, fundRate: value as number })}
                type="number"
                min={0}
                step={0.01}
                suffix="%"
                className="col-span-1"
              />
            )}

            {loanType.type === 'combined' && (
              <>
                <InputField
                  label="商贷利率"
                  value={loanType.commercialRate}
                  onChange={(value) => setLoanType({ ...loanType, commercialRate: value as number })}
                  type="number"
                  min={0}
                  step={0.01}
                  suffix="%"
                  className="col-span-1"
                />
                <InputField
                  label="公积金利率"
                  value={loanType.fundRate}
                  onChange={(value) => setLoanType({ ...loanType, fundRate: value as number })}
                  type="number"
                  min={0}
                  step={0.01}
                  suffix="%"
                  className="col-span-1"
                />
                <InputField
                  label="公积金占比"
                  value={loanType.fundRatio}
                  onChange={(value) => setLoanType({ ...loanType, fundRatio: value as number })}
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                  className="col-span-1"
                />
              </>
            )}

            <SelectField
              label="还款方式"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value as 'equal' | 'principal')}
              options={[
                { value: 'equal', label: '等额本息' },
                { value: 'principal', label: '等额本金' }
              ]}
              className="col-span-1"
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
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="每月额外还款"
                  value={extraPayment}
                  onChange={setExtraPayment}
                  type="number"
                  min={0}
                  step={100}
                  suffix="元"
                  className="col-span-1"
                />
                <InputField
                  label="从第几期开始额外还款"
                  value={extraPaymentStart}
                  onChange={setExtraPaymentStart}
                  type="number"
                  min={1}
                  max={loanTerm * 12}
                  step={1}
                  suffix="期"
                  className="col-span-1"
                />
              </div>
            )}
          </div>
        </div>

        {/* 计算结果区域 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="贷款金额"
              value={formatCurrency(result.loanAmount)}
              className="bg-white"
            />
            {result.commercialAmount > 0 && (
              <ResultCard
                title="商贷金额"
                value={formatCurrency(result.commercialAmount)}
                className="bg-white"
              />
            )}
            {result.fundAmount > 0 && (
              <ResultCard
                title="公积金金额"
                value={formatCurrency(result.fundAmount)}
                className="bg-white"
              />
            )}
            {paymentMethod === 'equal' ? (
              <>
                <ResultCard
                  title="月供"
                  value={formatCurrency(result.monthlyPayment)}
                  className="bg-white"
                />
                {result.commercialAmount > 0 && (
                  <ResultCard
                    title="商贷月供"
                    value={formatCurrency(result.commercialMonthly)}
                    className="bg-white"
                  />
                )}
                {result.fundAmount > 0 && (
                  <ResultCard
                    title="公积金月供"
                    value={formatCurrency(result.fundMonthly)}
                    className="bg-white"
                  />
                )}
              </>
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
                注：此处仅显示前24期还款明细，完整还款计划请咨询银行
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <MortgageCalculatorDocs />
    </div>
  );
}