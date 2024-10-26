import React from 'react';

export default function MenstrualCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>月经周期：从本次月经第一天到下次月经第一天的间隔</li>
                <li>正常周期：一般在21-35天之间</li>
                <li>月经持续时间：通常为3-7天</li>
                <li>周期规律性：反映月经是否规律</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">记录要点</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>准确记录月经第一天的日期</li>
                <li>记录月经持续天数</li>
                <li>观察每次月经的间隔时间</li>
                <li>注意月经量和症状变化</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">月经规律</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">正常月经特征</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 周期相对固定，浮动不超过7天</li>
                  <li>• 出血量适中，一般3-80ml</li>
                  <li>• 持续时间稳定，通常3-7天</li>
                  <li>• 经期症状轻微或可耐受</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">异常情况</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 周期过短（＜21天）或过长（＞35天）</li>
                  <li>• 出血量过多或过少</li>
                  <li>• 经期持续时间异常</li>
                  <li>• 伴有剧烈疼痛或其他不适</li>
                </ul>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：规律月经</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>末次月经：2024-02-01</li>
                      <li>月经周期：28天</li>
                      <li>持续天数：5天</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>下次月经：2024-02-29</li>
                      <li>周期规律性：规律</li>
                      <li>经期：2024-02-29 - 2024-03-04</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：不规律月经</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">历史周期</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>第一次：25天</li>
                      <li>第二次：32天</li>
                      <li>第三次：28天</li>
                      <li>第四次：35天</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">分析结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>平均周期：30天</li>
                      <li>周期规律性：不规律</li>
                      <li>建议：咨询医生</li>
                    </ul>
                  </div>
                </div>
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
              <span>预测结果仅供参考，实际月经日期可能会有偏差。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>建议长期记录月经情况，有助于了解自己的生理规律。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>如果月经出现明显异常，请及时就医。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>特殊情况（如服用避孕药、更年期等）可能影响月经规律。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}