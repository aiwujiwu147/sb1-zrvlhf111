import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import IncomeTaxCalculatorDocs from './IncomeTaxCalculatorDocs';

interface DeductionItem {
  id: string;
  name: string;
  amount: number;
  enabled: boolean;
}

export default function IncomeTaxCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000);
  const [cityType, setCityType] = useState<'first' | 'second' | 'third'>('first');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 社保公积金设置
  const [insuranceBase, setInsuranceBase] = useState<number>(monthlyIncome);
  const [fundBase, setFundBase] = useState<number>(monthlyIncome);
  const [fundRate, setFundRate] = useState<number>(12);
  const [customInsurance, setCustomInsurance] = useState<boolean>(false);

  // 专项附加扣除
  const [specialDeductions, setSpecialDeductions] = useState<DeductionItem[]>([
    { id: 'housing', name: '住房租金', amount: 1500, enabled: false },
    { id: 'education', name: '子女教育', amount: 1000, enabled: false },
    { id: 'continuing-education', name: '继续教育', amount: 400, enabled: false },
    { id: 'medical', name: '大病医疗', amount: 0, enabled: false },
    { id: 'mortgage', name: '住房贷款利息', amount: 1000, enabled: false },
    { id: 'elderly', name: '赡养老人', amount: 2000, enabled: false }
  ]);

  // 其他收入
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [yearEndBonus, setYearEndBonus] = useState<number>(0);

  // 社保基数范围
  const insuranceRanges = {
    first: { min: 5975, max: 31884 },
    second: { min: 4965, max: 25825 },
    third: { min: 3955, max: 19775 }
  };

  // 社保费率
  const insuranceRates = {
    pension: 0.08,
    medical: 0.02,
    unemployment: 0.005,
    injury: 0,
    maternity: 0
  };

  const calculateInsurance = () => {
    const range = insuranceRanges[cityType];
    const base = Math.min(Math.max(insuranceBase, range.min), range.max);
    return Object.values(insuranceRates).reduce((acc, rate) => acc + base * rate, 0);
  };

  const calculateFund = () => {
    const base = Math.min(fundBase, insuranceRanges[cityType].max);
    return base * (fundRate / 100);
  };

  const calculateTax = () => {
    const insurance = customInsurance ? calculateInsurance() : 0;
    const fund = calculateFund();
    const specialDeductionsTotal = specialDeductions
      .filter(item => item.enabled)
      .reduce((acc, item) => acc + item.amount, 0);

    const monthlyTaxableIncome = monthlyIncome - insurance - fund - 5000 - specialDeductionsTotal;
    const yearlyTaxableIncome = monthlyTaxableIncome * 12 + otherIncome;

    // 计算年终奖单独计税
    const bonusTax = calculateBonusTax(yearEndBonus);

    let tax = 0;
    if (yearlyTaxableIncome > 0) {
      if (yearlyTaxableIncome <= 36000) tax = yearlyTaxableIncome * 0.03;
      else if (yearlyTaxableIncome <= 144000) tax = yearlyTaxableIncome * 0.1 - 2520;
      else if (yearlyTaxableIncome <= 300000) tax = yearlyTaxableIncome * 0.2 - 16920;
      else if (yearlyTaxableIncome <= 420000) tax = yearlyTaxableIncome * 0.25 - 31920;
      else if (yearlyTaxableIncome <= 660000) tax = yearlyTaxableIncome * 0.3 - 52920;
      else if (yearlyTaxableIncome <= 960000) tax = yearlyTaxableIncome * 0.35 - 85920;
      else tax = yearlyTaxableIncome * 0.45 - 181920;
    }

    const monthlyTax = (tax + bonusTax) / 12;
    const netIncome = monthlyIncome - insurance - fund - monthlyTax;

    return {
      insurance,
      fund,
      monthlyTaxableIncome,
      yearlyTaxableIncome,
      monthlyTax,
      yearlyTax: tax + bonusTax,
      netIncome,
      bonusTax,
      deductions: {
        insurance,
        fund,
        special: specialDeductionsTotal
      }
    };
  };

  const calculateBonusTax = (bonus: number) => {
    if (bonus <= 0) return 0;
    const monthlyBonus = bonus / 12;
    let tax = 0;

    if (monthlyBonus <= 3000) tax = bonus * 0.03;
    else if (monthlyBonus <= 12000) tax = bonus * 0.1 - 210;
    else if (monthlyBonus <= 25000) tax = bonus * 0.2 - 1410;
    else if (monthlyBonus <= 35000) tax = bonus * 0.25 - 2660;
    else if (monthlyBonus <= 55000) tax = bonus * 0.3 - 4410;
    else if (monthlyBonus <= 80000) tax = bonus * 0.35 - 7160;
    else tax = bonus * 0.45 - 15160;

    return tax;
  };

  const result = calculateTax();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 主计算区域 */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="月收入"
              value={monthlyIncome}
              onChange={setMonthlyIncome}
              type="number"
              min={0}
              step={100}
              suffix="元"
              className="col-span-1"
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
              <div className="mt-4 space-y-6">
                {/* 社保公积金设置 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">社保公积金设置</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={customInsurance}
                        onChange={(e) => setCustomInsurance(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">自定义社保基数</span>
                    </div>
                    {customInsurance && (
                      <InputField
                        label="社保基数"
                        value={insuranceBase}
                        onChange={setInsuranceBase}
                        type="number"
                        min={insuranceRanges[cityType].min}
                        max={insuranceRanges[cityType].max}
                        step={100}
                        suffix="元"
                      />
                    )}
                    <InputField
                      label="公积金基数"
                      value={fundBase}
                      onChange={setFundBase}
                      type="number"
                      min={0}
                      max={insuranceRanges[cityType].max}
                      step={100}
                      suffix="元"
                    />
                    <InputField
                      label="公积金比例"
                      value={fundRate}
                      onChange={setFundRate}
                      type="number"
                      min={5}
                      max={12}
                      step={1}
                      suffix="%"
                    />
                  </div>
                </div>

                {/* 专项附加扣除 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">专项附加扣除</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specialDeductions.map((deduction) => (
                      <div key={deduction.id} className="flex items-start space-x-4">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            checked={deduction.enabled}
                            onChange={(e) => {
                              setSpecialDeductions(specialDeductions.map(item =>
                                item.id === deduction.id
                                  ? { ...item, enabled: e.target.checked }
                                  : item
                              ));
                            }}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <label className="block text-sm font-medium text-gray-700">
                            {deduction.name}
                          </label>
                          <input
                            type="number"
                            value={deduction.amount}
                            onChange={(e) => {
                              setSpecialDeductions(specialDeductions.map(item =>
                                item.id === deduction.id
                                  ? { ...item, amount: Number(e.target.value) }
                                  : item
                              ));
                            }}
                            disabled={!deduction.enabled}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
                            min={0}
                            step={100}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 其他收入 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">其他收入</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="年终奖"
                      value={yearEndBonus}
                      onChange={setYearEndBonus}
                      type="number"
                      min={0}
                      step={1000}
                      suffix="元"
                    />
                    <InputField
                      label="其他年收入"
                      value={otherIncome}
                      onChange={setOtherIncome}
                      type="number"
                      min={0}
                      step={1000}
                      suffix="元"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 计算结果区域 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="税后月收入"
              value={formatCurrency(result.netIncome)}
              className="bg-white"
            />
            <ResultCard
              title="月应纳税所得额"
              value={formatCurrency(result.monthlyTaxableIncome)}
              className="bg-white"
            />
            <ResultCard
              title="月个税"
              value={formatCurrency(result.monthlyTax)}
              className="bg-white"
            />
            <ResultCard
              title="年应纳税所得额"
              value={formatCurrency(result.yearlyTaxableIncome)}
              className="bg-white"
            />
            <ResultCard
              title="年个税"
              value={formatCurrency(result.yearlyTax)}
              className="bg-white"
            />
            {yearEndBonus > 0 && (
              <ResultCard
                title="年终奖个税"
                value={formatCurrency(result.bonusTax)}
                className="bg-white"
              />
            )}
          </div>
        </div>

        {/* 扣除明细 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏扣除明细' : '查看扣除明细'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">每月扣除明细</h4>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">社保费用</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.deductions.insurance)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">公积金</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.deductions.fund)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">专项附加扣除</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(result.deductions.special)}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">基本减除费用</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(5000)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <IncomeTaxCalculatorDocs />
    </div>
  );
}