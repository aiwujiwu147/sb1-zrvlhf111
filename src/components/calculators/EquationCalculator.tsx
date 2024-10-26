import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import SelectField from '../common/SelectField';
import EquationCalculatorDocs from './EquationCalculatorDocs';

type EquationType = 'linear' | 'quadratic' | 'system2' | 'system3';

interface Solution {
  x?: number;
  y?: number;
  z?: number;
  x1?: number;
  x2?: number;
}

export default function EquationCalculator({ calculator }: CalculatorProps) {
  const [equationType, setEquationType] = useState<EquationType>('linear');
  const [coefficients, setCoefficients] = useState({
    a: 1,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0
  });
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [precision, setPrecision] = useState<number>(4);

  const solveLinear = (): Solution => {
    // ax + b = 0
    const { a, b } = coefficients;
    if (a === 0) return {};
    return { x: -b / a };
  };

  const solveQuadratic = (): Solution => {
    // ax² + bx + c = 0
    const { a, b, c } = coefficients;
    if (a === 0) return {};
    
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return {};
    
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return { x1, x2 };
  };

  const solveSystem2 = (): Solution => {
    // ax + by = c
    // dx + ey = f
    const { a, b, c, d, e, f } = coefficients;
    const determinant = a * e - b * d;
    if (determinant === 0) return {};
    
    const x = (c * e - b * f) / determinant;
    const y = (a * f - c * d) / determinant;
    return { x, y };
  };

  const solveSystem3 = (): Solution => {
    // ax + by + cz = d
    // ex + fy + gz = h
    // ix + jy + kz = l
    const { a, b, c, d, e, f, g, h, i, j, k, l } = coefficients;
    
    const det = a * (f * k - g * j) - b * (e * k - g * i) + c * (e * j - f * i);
    if (det === 0) return {};
    
    const x = (d * (f * k - g * j) - b * (h * k - g * l) + c * (h * j - f * l)) / det;
    const y = (a * (h * k - g * l) - d * (e * k - g * i) + c * (e * l - h * i)) / det;
    const z = (a * (f * l - h * j) - b * (e * l - h * i) + d * (e * j - f * i)) / det;
    
    return { x, y, z };
  };

  const solve = (): Solution => {
    switch (equationType) {
      case 'linear': return solveLinear();
      case 'quadratic': return solveQuadratic();
      case 'system2': return solveSystem2();
      case 'system3': return solveSystem3();
      default: return {};
    }
  };

  const formatNumber = (num: number | undefined): string => {
    if (num === undefined) return '无解';
    return num.toFixed(precision);
  };

  const result = solve();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="方程类型"
              value={equationType}
              onChange={(value) => setEquationType(value as EquationType)}
              options={[
                { value: 'linear', label: '一元一次方程' },
                { value: 'quadratic', label: '一元二次方程' },
                { value: 'system2', label: '二元一次方程组' },
                { value: 'system3', label: '三元一次方程组' }
              ]}
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

            {equationType === 'linear' && (
              <>
                <InputField
                  label="系数 a (ax + b = 0)"
                  value={coefficients.a}
                  onChange={(value) => setCoefficients({ ...coefficients, a: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 b"
                  value={coefficients.b}
                  onChange={(value) => setCoefficients({ ...coefficients, b: value as number })}
                  type="number"
                  step="any"
                />
              </>
            )}

            {equationType === 'quadratic' && (
              <>
                <InputField
                  label="系数 a (ax² + bx + c = 0)"
                  value={coefficients.a}
                  onChange={(value) => setCoefficients({ ...coefficients, a: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 b"
                  value={coefficients.b}
                  onChange={(value) => setCoefficients({ ...coefficients, b: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 c"
                  value={coefficients.c}
                  onChange={(value) => setCoefficients({ ...coefficients, c: value as number })}
                  type="number"
                  step="any"
                />
              </>
            )}

            {equationType === 'system2' && (
              <>
                <InputField
                  label="系数 a (ax + by = c)"
                  value={coefficients.a}
                  onChange={(value) => setCoefficients({ ...coefficients, a: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 b"
                  value={coefficients.b}
                  onChange={(value) => setCoefficients({ ...coefficients, b: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 c"
                  value={coefficients.c}
                  onChange={(value) => setCoefficients({ ...coefficients, c: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 d (dx + ey = f)"
                  value={coefficients.d}
                  onChange={(value) => setCoefficients({ ...coefficients, d: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 e"
                  value={coefficients.e}
                  onChange={(value) => setCoefficients({ ...coefficients, e: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 f"
                  value={coefficients.f}
                  onChange={(value) => setCoefficients({ ...coefficients, f: value as number })}
                  type="number"
                  step="any"
                />
              </>
            )}

            {equationType === 'system3' && (
              <>
                <InputField
                  label="系数 a (ax + by + cz = d)"
                  value={coefficients.a}
                  onChange={(value) => setCoefficients({ ...coefficients, a: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 b"
                  value={coefficients.b}
                  onChange={(value) => setCoefficients({ ...coefficients, b: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 c"
                  value={coefficients.c}
                  onChange={(value) => setCoefficients({ ...coefficients, c: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 d"
                  value={coefficients.d}
                  onChange={(value) => setCoefficients({ ...coefficients, d: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 e (ex + fy + gz = h)"
                  value={coefficients.e}
                  onChange={(value) => setCoefficients({ ...coefficients, e: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 f"
                  value={coefficients.f}
                  onChange={(value) => setCoefficients({ ...coefficients, f: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 g"
                  value={coefficients.g}
                  onChange={(value) => setCoefficients({ ...coefficients, g: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 h"
                  value={coefficients.h}
                  onChange={(value) => setCoefficients({ ...coefficients, h: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 i (ix + jy + kz = l)"
                  value={coefficients.i}
                  onChange={(value) => setCoefficients({ ...coefficients, i: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 j"
                  value={coefficients.j}
                  onChange={(value) => setCoefficients({ ...coefficients, j: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 k"
                  value={coefficients.k}
                  onChange={(value) => setCoefficients({ ...coefficients, k: value as number })}
                  type="number"
                  step="any"
                />
                <InputField
                  label="系数 l"
                  value={coefficients.l}
                  onChange={(value) => setCoefficients({ ...coefficients, l: value as number })}
                  type="number"
                  step="any"
                />
              </>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(equationType === 'linear' || equationType === 'system2' || equationType === 'system3') && (
              <ResultCard
                title="x ="
                value={formatNumber(result.x)}
                className="bg-white"
              />
            )}
            {(equationType === 'system2' || equationType === 'system3') && (
              <ResultCard
                title="y ="
                value={formatNumber(result.y)}
                className="bg-white"
              />
            )}
            {equationType === 'system3' && (
              <ResultCard
                title="z ="
                value={formatNumber(result.z)}
                className="bg-white"
              />
            )}
            {equationType === 'quadratic' && (
              <>
                <ResultCard
                  title="x₁ ="
                  value={formatNumber(result.x1)}
                  className="bg-white"
                />
                <ResultCard
                  title="x₂ ="
                  value={formatNumber(result.x2)}
                  className="bg-white"
                />
              </>
            )}
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
                <h3 className="text-lg font-medium text-gray-900 mb-4">方程详情</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">方程类型</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {equationType === 'linear' && '一元一次方程 (ax + b = 0)'}
                      {equationType === 'quadratic' && '一元二次方程 (ax² + bx + c = 0)'}
                      {equationType === 'system2' && '二元一次方程组 (ax + by = c, dx + ey = f)'}
                      {equationType === 'system3' && '三元一次方程组'}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">解的情况</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {Object.values(result).some(v => v !== undefined)
                        ? '方程有解'
                        : '方程无解或有无穷多解'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <EquationCalculatorDocs />
    </div>
  );
}