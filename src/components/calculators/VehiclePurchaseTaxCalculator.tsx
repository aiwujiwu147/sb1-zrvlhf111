import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import VehiclePurchaseTaxCalculatorDocs from './VehiclePurchaseTaxCalculatorDocs';

interface VehicleType {
  type: string;
  taxRate: number;
  exemption: boolean;
}

const vehicleTypes: VehicleType[] = [
  { type: '乘用车', taxRate: 0.10, exemption: false },
  { type: '商用车', taxRate: 0.10, exemption: false },
  { type: '新能源汽车', taxRate: 0, exemption: true },
  { type: '二手车', taxRate: 0.10, exemption: false },
  { type: '摩托车', taxRate: 0.10, exemption: false }
];

export default function VehiclePurchaseTaxCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [price, setPrice] = useState<number>(200000);
  const [vehicleType, setVehicleType] = useState<string>('乘用车');
  const [includeVAT, setIncludeVAT] = useState<boolean>(true);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [customTaxRate, setCustomTaxRate] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(10);
  const [otherFees, setOtherFees] = useState<number>(0);

  const calculateTax = () => {
    const selectedVehicle = vehicleTypes.find(v => v.type === vehicleType);
    if (!selectedVehicle) return { tax: 0, totalCost: price };

    if (selectedVehicle.exemption) {
      return {
        priceWithoutVAT: price,
        taxablePrice: 0,
        tax: 0,
        totalCost: price + otherFees,
        effectiveTaxRate: 0
      };
    }

    // 计算不含增值税的价格
    const priceWithoutVAT = includeVAT ? price / 1.13 : price;
    
    // 计算应纳税额
    const actualTaxRate = customTaxRate ? taxRate / 100 : selectedVehicle.taxRate;
    const tax = priceWithoutVAT * actualTaxRate;
    
    // 计算总成本
    const totalCost = price + tax + otherFees;
    
    // 计算实际税率
    const effectiveTaxRate = (tax / price) * 100;

    return {
      priceWithoutVAT,
      taxablePrice: priceWithoutVAT,
      tax,
      totalCost,
      effectiveTaxRate
    };
  };

  const result = calculateTax();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="车辆价格"
              value={price}
              onChange={setPrice}
              type="number"
              min={0}
              step={1000}
              suffix="元"
            />
            <SelectField
              label="车辆类型"
              value={vehicleType}
              onChange={setVehicleType}
              options={vehicleTypes.map(v => ({
                value: v.type,
                label: v.type
              }))}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeVAT}
                onChange={(e) => setIncludeVAT(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">价格包含增值税</span>
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={customTaxRate}
                    onChange={(e) => setCustomTaxRate(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-600">自定义税率</span>
                </div>

                {customTaxRate && (
                  <InputField
                    label="购置税税率"
                    value={taxRate}
                    onChange={setTaxRate}
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    suffix="%"
                  />
                )}

                <InputField
                  label="其他费用"
                  value={otherFees}
                  onChange={setOtherFees}
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
              title="不含税价格"
              value={formatCurrency(result.priceWithoutVAT)}
              className="bg-white"
            />
            <ResultCard
              title="应纳税额"
              value={formatCurrency(result.tax)}
              className="bg-white"
            />
            <ResultCard
              title="实际税率"
              value={`${result.effectiveTaxRate.toFixed(2)}%`}
              className="bg-white"
            />
            <ResultCard
              title="其他费用"
              value={formatCurrency(otherFees)}
              className="bg-white"
            />
            <ResultCard
              title="总成本"
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
                    <dt className="text-sm font-medium text-gray-500">含税价格</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(price)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">不含税价格</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.priceWithoutVAT)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">增值税</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(price - result.priceWithoutVAT)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">购置税</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.tax)}</dd>
                  </div>
                  {otherFees > 0 && (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">其他费用</dt>
                      <dd className="mt-1 text-sm text-gray-900">{formatCurrency(otherFees)}</dd>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">总成本</dt>
                    <dd className="mt-1 text-sm font-semibold text-indigo-600">{formatCurrency(result.totalCost)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <VehiclePurchaseTaxCalculatorDocs />
    </div>
  );
}