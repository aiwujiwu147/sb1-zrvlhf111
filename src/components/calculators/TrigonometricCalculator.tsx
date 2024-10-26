import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import TrigonometricCalculatorDocs from './TrigonometricCalculatorDocs';

type AngleUnit = 'deg' | 'rad';
type TrigFunction = 'sin' | 'cos' | 'tan' | 'asin' | 'acos' | 'atan';

export default function TrigonometricCalculator({ calculator }: CalculatorProps) {
  const [angle, setAngle] = useState<number>(0);
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('deg');
  const [trigFunction, setTrigFunction] = useState<TrigFunction>('sin');
  const [precision, setPrecision] = useState<number>(6);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const toRadians = (degrees: number): number => {
    return degrees * Math.PI / 180;
  };

  const toDegrees = (radians: number): number => {
    return radians * 180 / Math.PI;
  };

  const calculateResult = () => {
    const inputAngle = angleUnit === 'deg' ? toRadians(angle) : angle;
    let result = 0;

    switch (trigFunction) {
      case 'sin':
        result = Math.sin(inputAngle);
        break;
      case 'cos':
        result = Math.cos(inputAngle);
        break;
      case 'tan':
        result = Math.tan(inputAngle);
        break;
      case 'asin':
        if (angle >= -1 && angle <= 1) {
          result = Math.asin(angle);
          if (angleUnit === 'deg') result = toDegrees(result);
        }
        break;
      case 'acos':
        if (angle >= -1 && angle <= 1) {
          result = Math.acos(angle);
          if (angleUnit === 'deg') result = toDegrees(result);
        }
        break;
      case 'atan':
        result = Math.atan(angle);
        if (angleUnit === 'deg') result = toDegrees(result);
        break;
    }

    // 计算其他三角函数值
    const rad = angleUnit === 'deg' ? toRadians(angle) : angle;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const tan = Math.tan(rad);

    return {
      result,
      sin,
      cos,
      tan,
      csc: sin !== 0 ? 1 / sin : undefined,
      sec: cos !== 0 ? 1 / cos : undefined,
      cot: tan !== 0 ? 1 / tan : undefined
    };
  };

  const result = calculateResult();

  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '未定义';
    return num.toFixed(precision);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="三角函数"
              value={trigFunction}
              onChange={(value) => setTrigFunction(value as TrigFunction)}
              options={[
                { value: 'sin', label: 'sin(x)' },
                { value: 'cos', label: 'cos(x)' },
                { value: 'tan', label: 'tan(x)' },
                { value: 'asin', label: 'arcsin(x)' },
                { value: 'acos', label: 'arccos(x)' },
                { value: 'atan', label: 'arctan(x)' }
              ]}
            />

            <SelectField
              label="角度单位"
              value={angleUnit}
              onChange={(value) => setAngleUnit(value as AngleUnit)}
              options={[
                { value: 'deg', label: '角度' },
                { value: 'rad', label: '弧度' }
              ]}
            />

            <InputField
              label="角度值"
              value={angle}
              onChange={setAngle}
              type="number"
              step="any"
              suffix={angleUnit === 'deg' ? '°' : 'rad'}
            />

            <InputField
              label="计算精度"
              value={precision}
              onChange={setPrecision}
              type="number"
              min={0}
              max={10}
              step={1}
              suffix="位小数"
            />
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title={`${trigFunction}(x) =`}
              value={formatNumber(result.result)}
              className="bg-white"
            />
            <ResultCard
              title="sin(x) ="
              value={formatNumber(result.sin)}
              className="bg-white"
            />
            <ResultCard
              title="cos(x) ="
              value={formatNumber(result.cos)}
              className="bg-white"
            />
            <ResultCard
              title="tan(x) ="
              value={formatNumber(result.tan)}
              className="bg-white"
            />
            <ResultCard
              title="csc(x) ="
              value={formatNumber(result.csc)}
              className="bg-white"
            />
            <ResultCard
              title="sec(x) ="
              value={formatNumber(result.sec)}
              className="bg-white"
            />
            <ResultCard
              title="cot(x) ="
              value={formatNumber(result.cot)}
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
                    <dt className="text-sm font-medium text-gray-500">输入角度</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {angle} {angleUnit === 'deg' ? '度' : '弧度'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">换算值</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {angleUnit === 'deg'
                        ? `${toRadians(angle).toFixed(precision)} 弧度`
                        : `${toDegrees(angle).toFixed(precision)} 度`}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">特殊角度说明</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {angle % 90 === 0 && angleUnit === 'deg' && '当前为特殊角度，结果可能为 0、1 或无穷大'}
                      {angle % (Math.PI / 2) === 0 && angleUnit === 'rad' && '当前为特殊角度，结果可能为 0、1 或无穷大'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <TrigonometricCalculatorDocs />
    </div>
  );
}