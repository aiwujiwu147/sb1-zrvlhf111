import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import PowerCalculatorDocs from './PowerCalculatorDocs';

type CalculationType = 'power' | 'voltage' | 'current' | 'energy' | 'cost';

interface PowerResult {
  power: number;
  voltage?: number;
  current?: number;
  energy?: number;
  cost?: number;
  powerFactor?: number;
  apparentPower?: number;
  reactivePower?: number;
}

export default function PowerCalculator({ calculator }: CalculatorProps) {
  // 基础信息
  const [calculationType, setCalculationType] = useState<CalculationType>('power');
  const [voltage, setVoltage] = useState<number>(220);
  const [current, setCurrent] = useState<number>(10);
  const [powerFactor, setPowerFactor] = useState<number>(0.8);
  const [hours, setHours] = useState<number>(24);
  const [days, setDays] = useState<number>(30);
  const [ratePerKwh, setRatePerKwh] = useState<number>(0.5);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  // 高级选项
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [efficiency, setEfficiency] = useState<number>(90);
  const [phaseType, setPhaseType] = useState<'single' | 'three'>('single');
  const [lineVoltage, setLineVoltage] = useState<number>(380);

  const calculatePower = (): PowerResult => {
    let power = 0;
    let apparentPower = 0;
    let reactivePower = 0;

    if (phaseType === 'single') {
      apparentPower = voltage * current;
      power = apparentPower * powerFactor;
      reactivePower = apparentPower * Math.sin(Math.acos(powerFactor));
    } else {
      apparentPower = Math.sqrt(3) * lineVoltage * current;
      power = apparentPower * powerFactor;
      reactivePower = apparentPower * Math.sin(Math.acos(powerFactor));
    }

    // 考虑效率
    power = power * (efficiency / 100);
    
    // 计算能耗
    const energy = power * hours * days / 1000; // 转换为千瓦时
    
    // 计算成本
    const cost = energy * ratePerKwh;

    return {
      power,
      voltage,
      current,
      energy,
      cost,
      powerFactor,
      apparentPower,
      reactivePower
    };
  };

  const result = calculatePower();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="计算类型"
              value={calculationType}
              onChange={(value) => setCalculationType(value as CalculationType)}
              options={[
                { value: 'power', label: '功率计算' },
                { value: 'voltage', label: '电压计算' },
                { value: 'current', label: '电流计算' },
                { value: 'energy', label: '能耗计算' },
                { value: 'cost', label: '成本计算' }
              ]}
            />

            <InputField
              label="电压"
              value={voltage}
              onChange={setVoltage}
              type="number"
              min={0}
              step={1}
              suffix="V"
            />

            <InputField
              label="电流"
              value={current}
              onChange={setCurrent}
              type="number"
              min={0}
              step={0.1}
              suffix="A"
            />

            <InputField
              label="功率因数"
              value={powerFactor}
              onChange={setPowerFactor}
              type="number"
              min={0}
              max={1}
              step={0.01}
            />

            <InputField
              label="每日使用时间"
              value={hours}
              onChange={setHours}
              type="number"
              min={0}
              max={24}
              step={0.5}
              suffix="小时"
            />

            <InputField
              label="使用天数"
              value={days}
              onChange={setDays}
              type="number"
              min={1}
              step={1}
              suffix="天"
            />

            <InputField
              label="电价"
              value={ratePerKwh}
              onChange={setRatePerKwh}
              type="number"
              min={0}
              step={0.01}
              suffix="元/kWh"
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
              <div className="mt-4 space-y-4">
                <InputField
                  label="设备效率"
                  value={efficiency}
                  onChange={setEfficiency}
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                />

                <SelectField
                  label="相数"
                  value={phaseType}
                  onChange={(value) => setPhaseType(value as 'single' | 'three')}
                  options={[
                    { value: 'single', label: '单相' },
                    { value: 'three', label: '三相' }
                  ]}
                />

                {phaseType === 'three' && (
                  <InputField
                    label="线电压"
                    value={lineVoltage}
                    onChange={setLineVoltage}
                    type="number"
                    min={0}
                    step={1}
                    suffix="V"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="有功功率"
              value={result.power.toFixed(2)}
              suffix="W"
              className="bg-white"
            />
            <ResultCard
              title="视在功率"
              value={result.apparentPower.toFixed(2)}
              suffix="VA"
              className="bg-white"
            />
            <ResultCard
              title="无功功率"
              value={result.reactivePower.toFixed(2)}
              suffix="var"
              className="bg-white"
            />
            <ResultCard
              title="能耗"
              value={result.energy.toFixed(2)}
              suffix="kWh"
              className="bg-white"
            />
            <ResultCard
              title="电费"
              value={result.cost.toFixed(2)}
              suffix="元"
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">计算详情</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">相数</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {phaseType === 'single' ? '单相' : '三相'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">设备效率</dt>
                    <dd className="mt-1 text-sm text-gray-900">{efficiency}%</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">功率因数</dt>
                    <dd className="mt-1 text-sm text-gray-900">{powerFactor}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">每月用电时间</dt>
                    <dd className="mt-1 text-sm text-gray-900">{hours * days} 小时</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <PowerCalculatorDocs />
    </div>
  );
}