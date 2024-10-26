import React from 'react';

export default function PregnancyCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">计算方式说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>末次月经：基于末次月经第一天计算（内盖勒法则）</li>
                <li>受孕日期：基于已知的受孕日期计算</li>
                <li>B超数据：根据B超检查时的胎儿大小计算</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">计算依据</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>正常妊娠时长：280天（40周）</li>
                <li>受孕日期：通常在末次月经后14天左右</li>
                <li>月经周期：标准28天，可根据实际情况调整</li>
                <li>B超检查：提供最准确的孕周判断</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">孕期阶段</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">第一孕期（1-12周）</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1-4周：胚胎着床</li>
                  <li>• 5-8周：主要器官开始发育</li>
                  <li>• 9-12周：胎儿基本成形</li>
                  <li>• 建议：补充叶酸，定期产检</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">第二孕期（13-27周）</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 13-16周：开始感受胎动</li>
                  <li>• 17-20周：详细B超检查</li>
                  <li>• 21-27周：胎儿快速生长</li>
                  <li>• 建议：保持适度运动，均衡饮食</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">第三孕期（28-40周）</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 28-32周：胎儿继续增重</li>
                  <li>• 33-36周：胎头开始下降</li>
                  <li>• 37-40周：准备分娩</li>
                  <li>• 建议：密切关注胎动，准备分娩</li>
                </ul>
              </div>
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
              <span>预产期计算结果仅供参考，实际分娩日期可能有1-2周的误差。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>B超检查提供的孕周数据最为准确，建议优先使用。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>如月经周期不规则，建议咨询医生获取更准确的预产期判断。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>定期产检对于监测胎儿发育情况非常重要。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}