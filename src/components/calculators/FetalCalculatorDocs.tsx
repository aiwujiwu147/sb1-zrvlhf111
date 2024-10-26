import React from 'react';

export default function FetalCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">计算方式说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>按孕周计算：根据孕周估算胎儿体重</li>
                <li>按B超数据计算：根据B超测量数据精确计算</li>
                <li>体重百分位：反映胎儿在同孕周中的相对大小</li>
                <li>生长速度：预估每周体重增长量</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">B超参数说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>双顶径(BPD)：胎儿头部最宽处的直径</li>
                <li>头围(HC)：胎儿头部最大周长</li>
                <li>腹围(AC)：胎儿腹部最大周长</li>
                <li>股骨长(FL)：胎儿大腿骨的长度</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">发育标准</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">胎儿体重参考标准</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">孕周</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标准体重(g)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">正常范围(g)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">20周</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">320</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">250-390</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24周</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">600</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">500-700</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28周</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">800-1200</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">32周</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1700</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1400-2000</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">36周</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2200-2800</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">40周</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3300</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2900-3700</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">生长速度参考</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>20-28周：约每周增重15%</li>
                <li>28-32周：约每周增重12%</li>
                <li>32-36周：约每周增重10%</li>
                <li>36周后：约每周增重8%</li>
              </ul>
            </div>
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
              <span>计算结果仅供参考，具体情况请以医生诊断为准。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>B超数据需要由专业医生测量，自行测量可能不准确。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>胎儿生长受多种因素影响，实际生长速度可能有所不同。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>如发现胎儿生长异常，请及时就医。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}