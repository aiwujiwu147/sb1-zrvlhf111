import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import HousingFundCalculatorDocs from './HousingFundCalculatorDocs';

interface CityLimit {
  min: number;
  max: number;
  rate: number;
}

const cityLimits: Record<string, CityLimit> = {
  first: { min: 2320, max: 31884, rate: 3.1 },
  second: { min: 2000, max: 25825, rate: 3.1 },
  third: { min: 1800, max: 19775, rate: 3.1 }
};

export default function HousingFundCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000);
  const [fundBalance, setFundBalance] = useState<number>(100000);
  const [housePrice, setHousePrice] = useState<number>(1000000);
  const [cityType, setCityType] = useState<'first' | 'second' | 'third'>('first');
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [paymentMethod, setPaymentMethod] = useState<'equal' | 'principal'>('equal');
  const [commercialAmount, setCommercialAmount] = useState<number>(0);
  const [commercialRate, setCommercialRate] = useState<number>(4.1);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const calculateLoan = () => {
    const cityLimit = cityLimits[cityType];
    
    // 计算最高可贷额度
    const maxLoanByIncome = monthlyIncome * 12 * loanTerm * 0.7; // 收入能贷额度
    const maxLoanByFund = fundBalance * 15; // 公积金余额能贷额度
    const maxLoanByHouse = housePrice * 0.8; // 房价能贷额度
    const maxLoanByPolicy = commercialAmount > 0 ? housePrice * 0.4 : housePrice * 0.8; // 政策限制

    // 取最小值作为最终可贷额度
    const maxLoan = Math.min(maxLoanByIncome, maxLoanByFund, maxLoanByHouse, maxLoanByPolicy);
    
    const totalMonths = loanTerm * 12;
    const monthlyRate = cityLimit.rate / 100 / 12;

    if (paymentMethod === 'equal') {
      // 等额本息
      const monthlyPayment = (maxLoan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      const totalPayment = monthlyPayment * totalMonths;
      const totalInterest = totalPayment - maxLoan;

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

      // 计算商业贷款部分
      let combinedResult = null;
      if (commercialAmount > 0) {
        const commercialMonthlyRate = commercialRate / 100 / 12;
        const commercialPayment = (commercialAmount * commercialMonthlyRate * 
          Math.pow(1 + commercialMonthlyRate, totalMonths)) /
          (Math.pow(1 + commercialMonthlyRate, totalMonths) - 1);
        const commercialTotalPayment = commercialPayment * totalMonths;
        const commercialTotalInterest = commercialTotalPayment - commercialAmount;

        combinedResult = {
          monthlyPayment: monthlyPayment + commercialPayment,
          totalPayment: totalPayment + commercialTotalPayment,
          totalInterest: totalInterest + commercialTotalInterest
        };
      }

      return {
        maxLoan,
        maxLoanByIncome,
        maxLoanByFund,
        maxLoanByHouse,
        monthlyPayment,
        totalInterest,
        totalPayment,
        paymentDetails,
        combinedResult
      };
    } else {
      // 等额本金
      const monthlyPrincipal = maxLoan / totalMonths;
      const firstMonthInterest = maxLoan * monthlyRate;
      const firstMonthPayment = monthlyPrincipal + firstMonthInterest;
      const lastMonthInterest = monthlyPrincipal * monthlyRate;
      const lastMonthPayment = monthlyPrincipal + lastMonthInterest;
      const totalInterest = ((firstMonthInterest + lastMonthInterest) * totalMonths) / 2;
      const totalPayment = maxLoan + totalInterest;

      // 计算还款明细
      const paymentDetails = Array.from({ length: Math.min(24, totalMonths) }, (_, index) => {
        const month = index + 1;
        const remaining = maxLoan - (monthlyPrincipal * month);
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

      // 计算商业贷款部分
      let combinedResult = null;
      if (commercialAmount > 0) {
        const commercialMonthlyRate = commercialRate / 100 / 12;
        const commercialPrincipal = commercialAmount / totalMonths;
        const commercialFirstInterest = commercialAmount * commercialMonthlyRate;
        const commercialFirstPayment = commercialPrincipal + commercialFirstInterest;
        const commercialLastInterest = commercialPrincipal * commercialMonthlyRate;
        const commercialLastPayment = commercialPrincipal + commercialLastInterest;
        const commercialTotalInterest = ((commercialFirstInterest + commercialLastInterest) * totalMonths) / 2;

        combinedResult = {
          firstMonthPayment: firstMonthPayment + commercialFirstPayment,
          lastMonthPayment: lastMonthPayment + commercialLastPayment,
          totalInterest: totalInterest + commercialTotalInterest,
          totalPayment: totalPayment + commercialAmount + commercialTotalInterest
        };
      }

      return {
        maxLoan,
        maxLoanByIncome,
        maxLoanByFund,
        maxLoanByHouse,
        firstMonthPayment,
        lastMonthPayment,
        totalInterest,
        totalPayment,
        paymentDetails,
        combinedResult
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
              label="月收入"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              type="number"
              min={1000}
              step={100}
              suffix="元"
            />
            <InputField
              label="公积金账户余额"
              value={fundBalance}
              onChange={setFundBalance}
              type="number"
              min={0}
              step={1000}
              suffix="元"
            />
            <InputField
              label="房屋总价"
              value={housePrice}
              onChange={setHousePrice}
              type="number"
              min={100000}
              step={10000}
              suffix="元"
            />
            <SelectField
              label="城市类型"
              value={cityType}
              onChange={(value) => setCityType(value as 'first' | 'second' | 'third')}
              options={[
                { value: 'first', label: '一线城市' },
                { value: 'second', label: '二线城市' },
                { value: 'third', label: '三线城市' }
              ]}
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
            <InputField
              label="商业贷款金额"
              value={commercialAmount}
              onChange={setCommercialAmount}
              type="number"
              min={0}
              step={10000}
              suffix="元"
            />
            <InputField
              label="商业贷款利率"
              value={commercialRate}
              onChange={setCommercialRate}
              type="number"
              min={0}
              step={0.01}
              suffix="%"
            />
          </div>
        </div>

        {/* 贷款额度说明 */}
        <div className="bg-yellow-50 p-6 border-t border-yellow-100">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">贷款额度说明</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-sm text-yellow-700">
              <span className="block font-medium">收入能贷：</span>
              <span>{formatCurrency(result.maxLoanByIncome)}</span>
            </div>
            <div className="text-sm text-yellow-700">
              <span className="block font-medium">余额能贷：</span>
              <span>{formatCurrency(result.maxLoanByFund)}</span>
            </div>
            <div className="text-sm text-yellow-700">
              <span className="block font-medium">房价能贷：</span>
              <span>{formatCurrency(result.maxLoanByHouse)}</span>
            </div>
            <div className="text-sm text-yellow-700">
              <span className="block font-medium">最终额度：</span>
              <span>{formatCurrency(result.maxLoan)}</span>
            </div>
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="公积金可贷额度"
              value={formatCurrency(result.maxLoan)}
              className="bg-white"
            />
            {result.combinedResult ? (
              paymentMethod === 'equal' ? (
                <>
                  <ResultCard
                    title="每月还款总额"
                    value={formatCurrency(result.combinedResult.monthlyPayment)}
                    className="bg-white"
                  />
                  <ResultCard
                    title="支付利息总额"
                    value={formatCurrency(result.combinedResult.totalInterest)}
                    className="bg-white"
                  />
                  <ResultCard
                    title="还款总额"
                    value={formatCurrency(result.combinedResult.totalPayment)}
                    className="bg-white"
                  />
                </>
              ) : (
                <>
                  <ResultCard
                    title="首月还款总额"
                    value={formatCurrency(result.combinedResult.firstMonthPayment)}
                    className="bg-white"
                  />
                  <ResultCard
                    title="末月还款总额"
                    value={formatCurrency(result.combinedResult.lastMonthPayment)}
                    className="bg-white"
                  />
                  <ResultCard
                    title="支付利息总额"
                    value={formatCurrency(result.combinedResult.totalInterest)}
                    className="bg-white"
                  />
                  <ResultCard
                    title="还款总额"
                    value={formatCurrency(result.combinedResult.totalPayment)}
                    className="bg-white"
                  />
                </>
              )
            ) : (
              paymentMethod === 'equal' ? (
                <>
                  <ResultCard
                    title="月供"
                    value={formatCurrency(result.monthlyPayment)}
                    className="bg-white"
                  />
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
                </>
              )
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

      {/* 使用说明和案例文档 */}
      <HousingFundCalculatorDocs />
    </div>
  );
}