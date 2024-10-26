import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';

export default function SalaryCalculator({ calculator }: CalculatorProps) {
  const [salary, setSalary] = useState<number>(10000);
  const [socialBase, setSocialBase] = useState<number>(8000);
  const [fundRate, setFundRate] = useState<number>(12);
  const [specialDeduction, setSpecialDeduction] = useState<number>(0);

  const calculateSalary = () => {
    // 社保比例（示例数据）
    const socialRates = {
      pension: 0.08,
      medical: 0.02,
      unemployment: 0.005,
      injury: 0,
      maternity: 0
    };

    // 计算社保
    const socialTotal = Object.values(socialRates).reduce((acc, rate) => acc + socialBase * rate, 0);
    
    // 计算公积金
    const fund = salary * (fundRate / 100);
    
    // 计算应纳税所得额
    const taxBase = salary - socialTotal - fund - 5000 - specialDeduction;
    
    // 计算个税
    let tax = 0;
    if (taxBase > 0) {
      if (taxBase <= 3000) tax = taxBase * 0.03;
      else if (taxBase <= 12000) tax = taxBase * 0.1 - 210;
      else if (taxBase <= 25000) tax = taxBase * 0.2 - 1410;
      else if (taxBase <= 35000) tax = taxBase * 0.25 - 2660;
      else if (taxBase <= 55000) tax = taxBase * 0.3 - 4410;
      else if (taxBase <= 80000) tax = taxBase * 0.35 - 7160;
      else tax = taxBase * 0.45 - 15160;
    }

    const netSalary = salary - socialTotal - fund - tax;

    return {
      grossSalary: salary.toFixed(2),
      socialInsurance: socialTotal.toFixed(2),
      housingFund: fund.toFixed(2),
      tax: tax.toFixed(2),
      netSalary: netSalary.toFixed(2)
    };
  };

  const result = calculateSalary();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">税前工资（元）</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">社保基数（元）</label>
          <input
            type="number"
            value={socialBase}
            onChange={(e) => setSocialBase(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">公积金比例（%）</label>
          <input
            type="number"
            value={fundRate}
            onChange={(e) => setFundRate(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">专项附加扣除（元）</label>
          <input
            type="number"
            value={specialDeduction}
            onChange={(e) => setSpecialDeduction(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {result && (
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">计算结果</h3>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-sm font-medium text-gray-500">税前工资</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                ¥{result.grossSalary}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">社保金额</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                ¥{result.socialInsurance}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">公积金</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                ¥{result.housingFund}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">个人所得税</dt>
              <dd className="mt-1 text-lg font-semibold text-indigo-600">
                ¥{result.tax}
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-sm font-medium text-gray-500">税后工资</dt>
              <dd className="mt-1 text-xl font-semibold text-indigo-600">
                ¥{result.netSalary}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}