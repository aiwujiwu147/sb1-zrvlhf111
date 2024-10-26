import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { calculateBMI, getBMICategory } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import SelectField from '../common/SelectField';
import BMICalculatorDocs from './BMICalculatorDocs';

interface BMIStandard {
  type: string;
  ranges: {
    min: number;
    max: number;
    category: string;
    description: string;
    color: string;
  }[];
}

const bmiStandards: Record<string, BMIStandard> = {
  china: {
    type: '中国标准',
    ranges: [
      { min: 0, max: 18.5, category: '偏瘦', description: '体重过轻，需要适当增重', color: 'text-blue-600' },
      { min: 18.5, max: 24, category: '正常', description: '体重正常，继续保持', color: 'text-green-600' },
      { min: 24, max: 28, category: '偏胖', description: '超重，需要注意控制体重', color: 'text-yellow-600' },
      { min: 28, max: 100, category: '肥胖', description: '肥胖，建议咨询医生', color: 'text-red-600' }
    ]
  },
  who: {
    type: 'WHO标准',
    ranges: [
      { min: 0, max: 18.5, category: '偏瘦', description: '体重过轻，需要适当增重', color: 'text-blue-600' },
      { min: 18.5, max: 25, category: '正常', description: '体重正常，继续保持', color: 'text-green-600' },
      { min: 25, max: 30, category: '超重', description: '超重，需要注意控制体重', color: 'text-yellow-600' },
      { min: 30, max: 35, category: '轻度肥胖', description: '肥胖，建议咨询医生', color: 'text-orange-600' },
      { min: 35, max: 40, category: '中度肥胖', description: '肥胖，需要积极干预', color: 'text-red-600' },
      { min: 40, max: 100, category: '重度肥胖', description: '严重肥胖，需要立即就医', color: 'text-red-800' }
    ]
  }
};

export default function BMICalculator({ calculator }: CalculatorProps) {
  const [weight, setWeight] = useState<number>(65);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [standard, setStandard] = useState<'china' | 'who'>('china');
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const bmi = calculateBMI(weight, height);
  const selectedStandard = bmiStandards[standard];
  const bmiRange = selectedStandard.ranges.find(
    range => bmi >= range.min && bmi < range.max
  );

  // 计算理想体重范围
  const calculateIdealWeight = () => {
    const minBMI = selectedStandard.ranges[1].min; // 正常范围的最小值
    const maxBMI = selectedStandard.ranges[1].max; // 正常范围的最大值
    const heightInMeters = height / 100;
    
    return {
      min: Math.round(minBMI * heightInMeters * heightInMeters),
      max: Math.round(maxBMI * heightInMeters * heightInMeters)
    };
  };

  // 计算基础代谢率 (BMR)
  const calculateBMR = () => {
    if (gender === 'male') {
      return Math.round(66 + (13.7 * weight) + (5 * height) - (6.8 * age));
    } else {
      return Math.round(655 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
    }
  };

  const idealWeight = calculateIdealWeight();
  const bmr = calculateBMR();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="体重"
              value={weight}
              onChange={setWeight}
              type="number"
              min={20}
              max={200}
              step={0.1}
              suffix="kg"
            />
            <InputField
              label="身高"
              value={height}
              onChange={setHeight}
              type="number"
              min={100}
              max={250}
              step={1}
              suffix="cm"
            />
            <SelectField
              label="性别"
              value={gender}
              onChange={(value) => setGender(value as 'male' | 'female')}
              options={[
                { value: 'male', label: '男' },
                { value: 'female', label: '女' }
              ]}
            />
            <InputField
              label="年龄"
              value={age}
              onChange={setAge}
              type="number"
              min={1}
              max={120}
              step={1}
              suffix="岁"
            />
            <SelectField
              label="评估标准"
              value={standard}
              onChange={(value) => setStandard(value as 'china' | 'who')}
              options={[
                { value: 'china', label: '中国标准' },
                { value: 'who', label: 'WHO标准' }
              ]}
            />
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="BMI 指数"
              value={bmi.toFixed(1)}
              className={`bg-white ${bmiRange?.color}`}
            />
            <ResultCard
              title="体重状态"
              value={bmiRange?.category || '未知'}
              className={`bg-white ${bmiRange?.color}`}
            />
            <ResultCard
              title="基础代谢率"
              value={`${bmr}`}
              suffix="kcal/天"
              className="bg-white"
            />
          </div>
        </div>

        {/* 详细信息 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏详细信息' : '查看详细信息'}
          </button>

          {showDetail && (
            <div className="mt-4 space-y-6">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">评估结果</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">体重状态</dt>
                    <dd className="mt-1 text-sm text-gray-900">{bmiRange?.description}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">理想体重范围</dt>
                    <dd className="mt-1 text-sm text-gray-900">{idealWeight.min} - {idealWeight.max} kg</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">建议调整</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {weight < idealWeight.min && `需要增重 ${(idealWeight.min - weight).toFixed(1)} kg`}
                      {weight > idealWeight.max && `需要减重 ${(weight - idealWeight.max).toFixed(1)} kg`}
                      {weight >= idealWeight.min && weight <= idealWeight.max && '体重正常，继续保持'}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">每日能量消耗估算</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="space-y-1">
                        <li>基础代谢：{bmr} kcal</li>
                        <li>轻度活动：{Math.round(bmr * 1.375)} kcal（每周运动1-3次）</li>
                        <li>中度活动：{Math.round(bmr * 1.55)} kcal（每周运动3-5次）</li>
                        <li>重度活动：{Math.round(bmr * 1.725)} kcal（每周运动6-7次）</li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">BMI 分级标准</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BMI范围</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">健康建议</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedStandard.ranges.map((range, index) => (
                        <tr key={index} className={bmi >= range.min && bmi < range.max ? 'bg-indigo-50' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {range.min === 0 ? '< ' + range.max : range.max === 100 ? '≥ ' + range.min : `${range.min} - ${range.max}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{range.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{range.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <BMICalculatorDocs />
    </div>
  );
}