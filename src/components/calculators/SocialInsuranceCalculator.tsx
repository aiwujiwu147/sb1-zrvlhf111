import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatCurrency } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import SocialInsuranceCalculatorDocs from './SocialInsuranceCalculatorDocs';

interface CityBase {
  pension: {
    min: number;
    max: number;
    employeeRate: number;
    companyRate: number;
  };
  medical: {
    min: number;
    max: number;
    employeeRate: number;
    companyRate: number;
  };
  unemployment: {
    min: number;
    max: number;
    employeeRate: number;
    companyRate: number;
  };
  injury: {
    min: number;
    max: number;
    companyRate: number;
  };
  maternity: {
    min: number;
    max: number;
    companyRate: number;
  };
  fund: {
    min: number;
    max: number;
    minRate: number;
    maxRate: number;
  };
}

const cityBases: Record<string, CityBase> = {
  first: {
    pension: {
      min: 5975,
      max: 31884,
      employeeRate: 0.08,
      companyRate: 0.16
    },
    medical: {
      min: 5975,
      max: 31884,
      employeeRate: 0.02,
      companyRate: 0.095
    },
    unemployment: {
      min: 5975,
      max: 31884,
      employeeRate: 0.005,
      companyRate: 0.005
    },
    injury: {
      min: 5975,
      max: 31884,
      companyRate: 0.002
    },
    maternity: {
      min: 5975,
      max: 31884,
      companyRate: 0.01
    },
    fund: {
      min: 2320,
      max: 31884,
      minRate: 0.05,
      maxRate: 0.12
    }
  },
  second: {
    pension: {
      min: 4965,
      max: 25825,
      employeeRate: 0.08,
      companyRate: 0.16
    },
    medical: {
      min: 4965,
      max: 25825,
      employeeRate: 0.02,
      companyRate: 0.08
    },
    unemployment: {
      min: 4965,
      max: 25825,
      employeeRate: 0.005,
      companyRate: 0.005
    },
    injury: {
      min: 4965,
      max: 25825,
      companyRate: 0.002
    },
    maternity: {
      min: 4965,
      max: 25825,
      companyRate: 0.008
    },
    fund: {
      min: 2000,
      max: 25825,
      minRate: 0.05,
      maxRate: 0.12
    }
  },
  third: {
    pension: {
      min: 3955,
      max: 19775,
      employeeRate: 0.08,
      companyRate: 0.16
    },
    medical: {
      min: 3955,
      max: 19775,
      employeeRate: 0.02,
      companyRate: 0.07
    },
    unemployment: {
      min: 3955,
      max: 19775,
      employeeRate: 0.005,
      companyRate: 0.005
    },
    injury: {
      min: 3955,
      max: 19775,
      companyRate: 0.002
    },
    maternity: {
      min: 3955,
      max: 19775,
      companyRate: 0.007
    },
    fund: {
      min: 1800,
      max: 19775,
      minRate: 0.05,
      maxRate: 0.12
    }
  }
};

export default function SocialInsuranceCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [salary, setSalary] = useState<number>(10000);
  const [cityType, setCityType] = useState<'first' | 'second' | 'third'>('first');
  const [fundRate, setFundRate] = useState<number>(12);
  const [customBase, setCustomBase] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 自定义基数
  const [pensionBase, setPensionBase] = useState<number>(salary);
  const [medicalBase, setMedicalBase] = useState<number>(salary);
  const [unemploymentBase, setUnemploymentBase] = useState<number>(salary);
  const [injuryBase, setInjuryBase] = useState<number>(salary);
  const [maternityBase, setMaternityBase] = useState<number>(salary);
  const [fundBase, setFundBase] = useState<number>(salary);

  const calculateInsurance = () => {
    const cityBase = cityBases[cityType];
    const actualSalary = customBase ? salary : Math.max(salary, cityBase.pension.min);

    // 计算各项保险基数
    const getBase = (type: keyof CityBase, customValue: number) => {
      if (customBase) {
        return Math.min(Math.max(customValue, cityBase[type].min), cityBase[type].max);
      }
      return Math.min(Math.max(actualSalary, cityBase[type].min), cityBase[type].max);
    };

    const bases = {
      pension: getBase('pension', pensionBase),
      medical: getBase('medical', medicalBase),
      unemployment: getBase('unemployment', unemploymentBase),
      injury: getBase('injury', injuryBase),
      maternity: getBase('maternity', maternityBase),
      fund: getBase('fund', fundBase)
    };

    // 计算个人缴费
    const personalPayment = {
      pension: bases.pension * cityBase.pension.employeeRate,
      medical: bases.medical * cityBase.medical.employeeRate,
      unemployment: bases.unemployment * cityBase.unemployment.employeeRate,
      fund: bases.fund * (fundRate / 100)
    };

    // 计算公司缴费
    const companyPayment = {
      pension: bases.pension * cityBase.pension.companyRate,
      medical: bases.medical * cityBase.medical.companyRate,
      unemployment: bases.unemployment * cityBase.unemployment.companyRate,
      injury: bases.injury * cityBase.injury.companyRate,
      maternity: bases.maternity * cityBase.maternity.companyRate,
      fund: bases.fund * (fundRate / 100)
    };

    // 计算总额
    const personalTotal = Object.values(personalPayment).reduce((a, b) => a + b, 0);
    const companyTotal = Object.values(companyPayment).reduce((a, b) => a + b, 0);
    const total = personalTotal + companyTotal;

    return {
      bases,
      personalPayment,
      companyPayment,
      personalTotal,
      companyTotal,
      total,
      takeHomePay: salary - personalTotal
    };
  };

  const result = calculateInsurance();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="月收入"
              value={salary}
              onChange={setSalary}
              type="number"
              min={1000}
              step={100}
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
              label="公积金缴存比例"
              value={fundRate}
              onChange={setFundRate}
              type="number"
              min={5}
              max={12}
              step={1}
              suffix="%"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={customBase}
                onChange={(e) => setCustomBase(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">自定义缴费基数</span>
            </div>

            {customBase && (
              <>
                <InputField
                  label="养老保险基数"
                  value={pensionBase}
                  onChange={setPensionBase}
                  type="number"
                  min={cityBases[cityType].pension.min}
                  max={cityBases[cityType].pension.max}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="医疗保险基数"
                  value={medicalBase}
                  onChange={setMedicalBase}
                  type="number"
                  min={cityBases[cityType].medical.min}
                  max={cityBases[cityType].medical.max}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="失业保险基数"
                  value={unemploymentBase}
                  onChange={setUnemploymentBase}
                  type="number"
                  min={cityBases[cityType].unemployment.min}
                  max={cityBases[cityType].unemployment.max}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="工伤保险基数"
                  value={injuryBase}
                  onChange={setInjuryBase}
                  type="number"
                  min={cityBases[cityType].injury.min}
                  max={cityBases[cityType].injury.max}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="生育保险基数"
                  value={maternityBase}
                  onChange={setMaternityBase}
                  type="number"
                  min={cityBases[cityType].maternity.min}
                  max={cityBases[cityType].maternity.max}
                  step={100}
                  suffix="元"
                />
                <InputField
                  label="公积金基数"
                  value={fundBase}
                  onChange={setFundBase}
                  type="number"
                  min={cityBases[cityType].fund.min}
                  max={cityBases[cityType].fund.max}
                  step={100}
                  suffix="元"
                />
              </>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="个人缴纳总额"
              value={formatCurrency(result.personalTotal)}
              className="bg-white"
            />
            <ResultCard
              title="公司缴纳总额"
              value={formatCurrency(result.companyTotal)}
              className="bg-white"
            />
            <ResultCard
              title="五险一金总额"
              value={formatCurrency(result.total)}
              className="bg-white"
            />
            <ResultCard
              title="税前工资"
              value={formatCurrency(salary)}
              className="bg-white"
            />
            <ResultCard
              title="实发工资"
              value={formatCurrency(result.takeHomePay)}
              className="bg-white"
            />
          </div>
        </div>

        {/* 缴费明细 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏缴费明细' : '查看缴费明细'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">项目</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">缴费基数</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">个人缴费</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">单位缴费</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">合计</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">养老保险</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.bases.pension)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.pension)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.pension)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.pension + result.companyPayment.pension)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">医疗保险</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.bases.medical)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.medical)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.medical)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.medical + result.companyPayment.medical)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">失业保险</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.bases.unemployment)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.unemployment)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.unemployment)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.unemployment + result.companyPayment.unemployment)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">工伤保险</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.bases.injury)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">0</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.injury)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.injury)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">生育保险</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.bases.maternity)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">0</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.maternity)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.maternity)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">住房公积金</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.bases.fund)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.fund)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyPayment.fund)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalPayment.fund + result.companyPayment.fund)}</td>
                    </tr>
                    <tr className="bg-gray-50 font-medium">
                      <td className="px-4 py-3 text-sm text-gray-900">合计</td>
                      <td className="px-4 py-3 text-sm text-gray-900">-</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.personalTotal)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.companyTotal)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <SocialInsuranceCalculatorDocs />
    </div>
  );
}