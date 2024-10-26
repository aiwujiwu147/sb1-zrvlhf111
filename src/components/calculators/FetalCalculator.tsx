import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import FetalCalculatorDocs from './FetalCalculatorDocs';

interface FetalMeasurements {
  bpd: number; // 双顶径
  hc: number;  // 头围
  ac: number;  // 腹围
  fl: number;  // 股骨长
}

export default function FetalCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [method, setMethod] = useState<'weeks' | 'measurements'>('weeks');
  const [gestationalWeeks, setGestationalWeeks] = useState<number>(20);
  const [gestationalDays, setGestationalDays] = useState<number>(0);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // B超测量数据
  const [measurements, setMeasurements] = useState<FetalMeasurements>({
    bpd: 0,
    hc: 0,
    ac: 0,
    fl: 0
  });

  // 根据孕周计算预估体重
  const calculateWeightByWeeks = (weeks: number, days: number): number => {
    const totalWeeks = weeks + days / 7;
    if (totalWeeks < 20) return 0;
    if (totalWeeks > 42) return 0;

    // 基于临床数据的标准体重估算公式
    let weight = 0;
    
    if (totalWeeks <= 24) {
      weight = Math.exp(4.917 + 0.151 * totalWeeks);
    } else if (totalWeeks <= 28) {
      weight = Math.exp(5.084 + 0.145 * totalWeeks);
    } else if (totalWeeks <= 32) {
      weight = Math.exp(5.257 + 0.141 * totalWeeks);
    } else if (totalWeeks <= 36) {
      weight = Math.exp(5.429 + 0.137 * totalWeeks);
    } else {
      weight = Math.exp(5.597 + 0.133 * totalWeeks);
    }

    return Math.round(weight);
  };

  // Hadlock公式计算胎儿体重
  const calculateWeightByMeasurements = (measurements: FetalMeasurements): number => {
    const { ac, fl, hc, bpd } = measurements;
    if (!ac || !fl) return 0;

    // 使用改进的Hadlock公式
    const weight = Math.exp(1.304 + 0.05281 * ac + 0.1938 * fl - 0.004 * fl * ac);
    return Math.round(weight * 1000); // 转换为克
  };

  const calculateResults = () => {
    let weight = 0;
    if (method === 'measurements') {
      weight = calculateWeightByMeasurements(measurements);
    } else {
      weight = calculateWeightByWeeks(gestationalWeeks, gestationalDays);
    }

    // 计算体重百分位数
    const standardWeight = calculateWeightByWeeks(gestationalWeeks, gestationalDays);
    const percentile = ((weight - standardWeight) / standardWeight) * 100 + 50;

    // 计算预产期体重
    const remainingWeeks = 40 - (gestationalWeeks + gestationalDays / 7);
    let estimatedBirthWeight = weight;
    
    if (remainingWeeks > 0) {
      // 根据不同孕周阶段使用不同的生长速率
      if (gestationalWeeks < 28) {
        estimatedBirthWeight = weight * (1 + remainingWeeks * 0.15);
      } else if (gestationalWeeks < 32) {
        estimatedBirthWeight = weight * (1 + remainingWeeks * 0.12);
      } else if (gestationalWeeks < 36) {
        estimatedBirthWeight = weight * (1 + remainingWeeks * 0.10);
      } else {
        estimatedBirthWeight = weight * (1 + remainingWeeks * 0.08);
      }
    }

    // 计算每周生长速度
    let weeklyGrowth = 0;
    if (gestationalWeeks < 28) {
      weeklyGrowth = weight * 0.15;
    } else if (gestationalWeeks < 32) {
      weeklyGrowth = weight * 0.12;
    } else if (gestationalWeeks < 36) {
      weeklyGrowth = weight * 0.10;
    } else {
      weeklyGrowth = weight * 0.08;
    }

    return {
      currentWeight: weight,
      percentile: Math.round(percentile),
      estimatedBirthWeight: Math.round(estimatedBirthWeight),
      weeklyGrowth: Math.round(weeklyGrowth)
    };
  };

  const result = calculateResults();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="计算方式"
              value={method}
              onChange={(value) => setMethod(value as 'weeks' | 'measurements')}
              options={[
                { value: 'weeks', label: '按孕周计算' },
                { value: 'measurements', label: '按B超数据计算' }
              ]}
            />

            {method === 'weeks' ? (
              <>
                <InputField
                  label="孕周"
                  value={gestationalWeeks}
                  onChange={setGestationalWeeks}
                  type="number"
                  min={20}
                  max={42}
                  step={1}
                  suffix="周"
                />
                <InputField
                  label="天数"
                  value={gestationalDays}
                  onChange={setGestationalDays}
                  type="number"
                  min={0}
                  max={6}
                  step={1}
                  suffix="天"
                />
              </>
            ) : (
              <>
                <InputField
                  label="双顶径(BPD)"
                  value={measurements.bpd}
                  onChange={(value) => setMeasurements({ ...measurements, bpd: value as number })}
                  type="number"
                  min={0}
                  step={0.1}
                  suffix="mm"
                />
                <InputField
                  label="头围(HC)"
                  value={measurements.hc}
                  onChange={(value) => setMeasurements({ ...measurements, hc: value as number })}
                  type="number"
                  min={0}
                  step={0.1}
                  suffix="mm"
                />
                <InputField
                  label="腹围(AC)"
                  value={measurements.ac}
                  onChange={(value) => setMeasurements({ ...measurements, ac: value as number })}
                  type="number"
                  min={0}
                  step={0.1}
                  suffix="mm"
                />
                <InputField
                  label="股骨长(FL)"
                  value={measurements.fl}
                  onChange={(value) => setMeasurements({ ...measurements, fl: value as number })}
                  type="number"
                  min={0}
                  step={0.1}
                  suffix="mm"
                />
              </>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="当前体重"
              value={result.currentWeight}
              suffix="克"
              className="bg-white"
            />
            <ResultCard
              title="体重百分位"
              value={`${result.percentile}`}
              suffix="%"
              className="bg-white"
            />
            <ResultCard
              title="预计每周增重"
              value={result.weeklyGrowth}
              suffix="克"
              className="bg-white"
            />
            <ResultCard
              title="预计出生体重"
              value={result.estimatedBirthWeight}
              suffix="克"
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
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">发育评估</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">体重状态</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.percentile < 10 && '体重偏低，建议咨询医生'}
                      {result.percentile >= 10 && result.percentile <= 90 && '体重正常，继续保持'}
                      {result.percentile > 90 && '体重偏大，需要关注'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">生长速度评估</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      预计每周增重约 {result.weeklyGrowth} 克
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">出生体重预测</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      预计 {result.estimatedBirthWeight} 克
                      {result.estimatedBirthWeight < 2500 && ' (可能偏低)'}
                      {result.estimatedBirthWeight > 4000 && ' (可能偏大)'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <FetalCalculatorDocs />
    </div>
  );
}