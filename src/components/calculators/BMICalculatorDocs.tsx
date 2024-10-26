import React from 'react';

export default function BMICalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>BMI（身体质量指数）：用于评估体重与身高的关系</li>
                <li>计算公式：体重(kg) / (身高(m))²</li>
                <li>正常范围：18.5-24.0</li>
                <li>评估标准：根据世界卫生组织标准划分</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">BMI分类标准</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BMI值</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">体重状态</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">健康建议</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">&lt; 18.5</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">偏瘦</td>
                      <td className="px-6 py-4 text-sm text-gray-900">适当增加营养摄入，注意均衡饮食</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">18.5 - 24.0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">正常</td>
                      <td className="px-6 py-4 text-sm text-gray-900">保持健康的生活方式</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24.0 - 28.0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">偏胖</td>
                      <td className="px-6 py-4 text-sm text-gray-900">控制饮食，增加运动量</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">&gt; 28.0</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">肥胖</td>
                      <td className="px-6 py-4 text-sm text-gray-900">建议咨询医生，制定减重计划</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">计算案例</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：标准体型</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入数据</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>身高：170 cm</li>
                      <li>体重：65 kg</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>BMI：22.5</li>
                      <li>体重状态：正常</li>
                      <li>建议：保持当前的健康状态</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：需要关注</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入数据</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>身高：165 cm</li>
                      <li>体重：75 kg</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>BMI：27.5</li>
                      <li>体重状态：偏胖</li>
                      <li>建议：适当控制饮食，增加运动量</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">健康建议</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">日常保健建议</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>保持均衡饮食，注意营养搭配</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>规律运动，每周至少进行3-5次中等强度运动</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>保持良好的作息习惯，确保充足的睡眠</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">注意事项</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      BMI值仅作为健康评估的参考指标之一，不同年龄、性别和体型的人可能存在差异。如有健康问题，请咨询专业医生。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}