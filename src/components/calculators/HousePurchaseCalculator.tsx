import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import HousePurchaseCalculatorDocs from './HousePurchaseCalculatorDocs';

interface CostBreakdown {
  totalPrice: number;
  downPayment: number;
  loanAmount: number;
  deedTax: number;
  agencyFee: number;
  mortgageRegistration: number;
  evaluationFee: number;
  maintenanceFund: number;
  totalCost: number;
}

export default function HousePurchaseCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [housePrice, setHousePrice] = useState<number>(3000000);
  const [area, setArea] = useState<number>(90);
  const [downPaymentRate, setDownPaymentRate] = useState<number>(30);
  const [isFirstHouse, setIsFirstHouse] = useState<boolean>(true);
  const [isFirstLoan, setIsFirstLoan] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [includeAgencyFee, setIncludeAgencyFee] = useState<boolean>(true);
  const [agencyFeeRate, setAgencyFeeRate] = useState<number>(2);
  const [includeMaintenance, setIncludeMaintenance] = useState<boolean>(true);
  const [maintenanceRate, setMaintenanceRate] = useState<number>(3);
  const [includeEvaluation, setIncludeEvaluation] = useState<boolean>(true);

  const calculateCosts = (): CostBreakdown => {
    // 首付和贷款金额
    const downPayment = housePrice * (downPaymentRate / 100);
    const loanAmount = housePrice - downPayment;

    // 契税（首套1%，非首套3%）
    const deedTaxRate = isFirstHouse ? 0.01 : 0.03;
    const deedTax = housePrice * deedTaxRate;

    // 中介费
    const agencyFee = includeAgencyFee ? housePrice * (agencyFeeRate / 100) : 0;

    // 抵押登记费
    const mortgageRegistration = 550;

    // 评估费
    const evaluationFee = includeEvaluation ? 3000 : 0;

    // 维修基金
    const maintenanceFund = includeMaintenance ? 
      area * (maintenanceRate / 100) * 3000 : 0;

    // 总成本
    const totalCost = housePrice + deedTax + agencyFee + 
      mortgageRegistration + evaluationFee + maintenanceFund;

    return {
      totalPrice: housePrice,
      downPayment,
      loanAmount,
      deedTax,
      agencyFee,
      mortgageRegistration,
      evaluationFee,
      maintenanceFund,
      totalCost
    };
  };

  const result = calculateCosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="房屋总价"
              value={housePrice}
              onChange={setHousePrice}
              type="number"
              min={100000}
              step={10000}
              suffix="元"
            />
            <InputField
              label="建筑面积"
              value={area}
              onChange={setArea}
              type="number"
              min={1}
              step={0.1}
              suffix="平方米"
            />
            <InputField
              label="首付比例"
              value={downPaymentRate}
              onChange={setDownPaymentRate}
              type="number"
              min={30}
              max={100}
              step={1}
              suffix="%"
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isFirstHouse}
                  onChange={(e) => setIsFirstHouse(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">首套房</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isFirstLoan}
                  onChange={(e) => setIsFirstLoan(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">首次贷款</span>
              </label>
            </div>
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
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeAgencyFee}
                      onChange={(e) => setIncludeAgencyFee(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">包含中介费</span>
                  </label>
                  {includeAgencyFee && (
                    <InputField
                      label="中介费率"
                      value={agencyFeeRate}
                      onChange={setAgencyFeeRate}
                      type="number"
                      min={0}
                      max={5}
                      step={0.1}
                      suffix="%"
                      className="w-32"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeMaintenance}
                      onChange={(e) => setIncludeMaintenance(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">包含维修基金</span>
                  </label>
                  {includeMaintenance && (
                    <InputField
                      label="维修基金比例"
                      value={maintenanceRate}
                      onChange={setMaintenanceRate}
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      suffix="%"
                      className="w-32"
                    />
                  )}
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeEvaluation}
                      onChange={(e) => setIncludeEvaluation(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">包含评估费</span>
                  </label>
                </div>
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
            <ResultCard
              title="契税"
              value={formatCurrency(result.deedTax)}
              className="bg-white"
            />
            <ResultCard
              title="其他费用"
              value={formatCurrency(
                result.agencyFee +
                result.mortgageRegistration +
                result.evaluationFee +
                result.maintenanceFund
              )}
              className="bg-white"
            />
            <ResultCard
              title="总费用"
              value={formatCurrency(result.totalCost)}
              className="bg-white"
            />
          </div>
        </div>

        {/* 费用明细 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏费用明细' : '查看费用明细'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">费用构成</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">房屋总价</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.totalPrice)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">首付金额</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.downPayment)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">贷款金额</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.loanAmount)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">契税</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.deedTax)}</dd>
                  </div>
                  {result.agencyFee > 0 && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">中介费</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.agencyFee)}</dd>
                    </div>
                  )}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">抵押登记费</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.mortgageRegistration)}</dd>
                  </div>
                  {result.evaluationFee > 0 && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">评估费</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.evaluationFee)}</dd>
                    </div>
                  )}
                  {result.maintenanceFund > 0 && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">维修基金</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.maintenanceFund)}</dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">总费用</dt>
                    <dd className="mt-1 text-sm font-semibold text-indigo-600">{formatCurrency(result.totalCost)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      <HousePurchaseCalculatorDocs />
    </div>
  );
}