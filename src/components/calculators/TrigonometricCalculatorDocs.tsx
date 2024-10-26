import React from 'react';

export default function TrigonometricCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">支持的函数</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>基本三角函数：sin、cos、tan</li>
                <li>反三角函数：arcsin、arccos、arctan</li>
                <li>余割函数：sec、csc、cot</li>
                <li>角度和弧度自动转换</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">计算规则</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>支持角度和弧度输入</li>
                <li>精度可调整（0-10位小数）</li>
                <li>自动处理特殊角度</li>
                <li>显示所有相关函数值</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">计算案例</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：特殊角度</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>角度：45°</li>
                      <li>函数：sin</li>
                      <li>单位：角度</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>sin(45°) = 0.7071</li>
                      <li>cos(45°) = 0.7071</li>
                      <li>tan(45°) = 1.0000</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：反三角函数</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>值：0.5</li>
                      <li>函数：arcsin</li>
                      <li>单位：角度</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>arcsin(0.5) = 30°</li>
                      <li>等于 π/6 弧度</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">特殊角度值</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角度</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">sin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">cos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">tan</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0°</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30°</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1/2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">√3/2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1/√3</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45°</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1/√2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1/√2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">60°</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">√3/2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1/2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">√3</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">90°</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">∞</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">注意事项</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>反三角函数的输入值必须在[-1, 1]范围内。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>tan、sec、csc 在特定角度下可能无定义。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>角度和弧度转换可能存在微小误差。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>建议使用合适的精度避免显示过多小数位。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}