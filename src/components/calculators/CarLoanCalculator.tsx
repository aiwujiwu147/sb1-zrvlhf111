import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import CarLoanCalculatorDocs from './CarLoanCalculatorDocs';

export default function CarLoanCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [carPrice, setCarPrice] = useState<number>(200000);
  const [downPaymentRate, setDownPaymentRate] = useState<number>(30);
  const [loanTerm, setLoanTerm] = useState<number>(3);
  const [annualRate, setAnnualRate] = useState<number>(5.6);
  const [paymentMethod, setPaymentMethod] = useState<'equal' | 'principal'>('equal');

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [purchaseTax, setPurchaseTax] = useState<number>(carPrice * 0.075);
  const [insurance, setInsurance] = useState<number>(8000);
  const [licenseFee, setLicenseFee] = useState<number>(500);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const calculateLoan = () => {
    const downPayment = carPrice * (downPaymentRate / 100);
    const loanAmount = carPrice - downPayment;
    const totalMonths = loanTerm * 12;
    const monthlyRate = annualRate / 100 / 12;

    if (paymentMethod === 'equal') {
      // 等额本息
      const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = monthlyPayment * totalMonths;
      const totalInterest = totalPayment - loanAmount;

      // 计算还款明细
      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        const remaining = (monthlyPayment * (Math.pow(1 + monthlyRate, totalMonths - month) - 1)) /
          (monthlyRate * Math.pow(1 + monthlyRate, totalMonths - month));
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
        downPayment,
        loanAmount,
        monthlyPayment,
        totalInterest,
        totalPayment,
        totalCost: totalPayment + downPayment + purchaseTax + insurance + licenseFee,
        paymentDetails
      };
    } else {
      // 等额本金
      const monthlyPrincipal = loanAmount / totalMonths;
      const firstMonthInterest = loanAmount * monthlyRate;
      const firstMonthPayment = monthlyPrincipal + firstMonthInterest;
      const lastMonthInterest = monthlyPrincipal * monthlyRate;
      const lastMonthPayment = monthlyPrincipal + lastMonthInterest;
      const totalInterest = ((firstMonthInterest + lastMonthInterest) * totalMonths) / 2;
      const totalPayment = loanAmount + totalInterest;

      // 计算还款明细
      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        const remaining = loanAmount - (monthlyPrincipal * month);
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
        downPayment,
        loanAmount,
        firstMonthPayment,
        lastMonthPayment,
        totalInterest,
        totalPayment,
        totalCost: totalPayment + downPayment + purchaseTax + insurance + licenseFee,
        paymentDetails
      };
    }
  };

  const result = calculateLoan();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="车辆价格"
              value={carPrice}
              onChange={(value) => {
                setCarPrice(value as number);
                setPurchaseTax((value as number) * 0.075);
              }}
              type="number"
              min={10000}
              step={1000}
              suffix="元"
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
            />
            <InputField
              label="贷款年限"
              value={loanTerm}
              onChange={setLoanTerm}
              type="number"
              min={1}
              max={5}
              step={1}
              suffix="年"
            />
            <InputField
              label="年利率"
              value={annualRate}
              onChange={setAnnualRate}
              type="number"
              min={0}
              step={0.01}
              suffix="%"
            />
            <SelectField
              label="还款方式"
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value as 'equal' | 'principal')}
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
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="购置税"
                  value={purchaseTax}
                  onChange={setPurchaseTax}
                  type="number"
                  min={0}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="保险费"
                  value={insurance}
                  onChange={setInsurance}
                  type="number"
                  min={0}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="上牌费用"
                  value={licenseFee}
                  onChange={setLicenseFee}
                  type="number"
                  min={0}
                  step={100}
                  suffix="元"
                />
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="首付金额"
              value={formatCurrency(result.downPayment)}
              className="bg-white"
            />
            <ResultCard
              title="贷款金额"
              value={formatCurrency(result.loanAmount)}
              className="bg-white"
            />
            {paymentMethod === 'equal' ? (
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
              title="购车总成本"
              value={formatCurrency(result.totalCost)}
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
                注：此处仅显示前24期还款明细
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <CarLoanCalculatorDocs />
    </div>
  );
}