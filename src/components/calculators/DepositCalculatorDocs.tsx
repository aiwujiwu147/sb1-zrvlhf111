import React from 'react';

export default function DepositCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">存款类型说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>活期存款：随存随取，利率较低，按日计息</li>
                <li>定期存款：存期固定，利率较高，到期支取</li>
                <li>通知存款：提前通知取款，利率介于活期和定期之间</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">计息规则</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>活期存款：按日计息，每季度结息一次</li>
                <li>定期存款：整存整取，到期一次性还本付息</li>
                <li>通知存款：按实际存期计息，利率根据通知期限确定</li>
                <li>复利计算：利息再投资产生的收益</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：定期存款</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>存款金额：100,000元</li>
                      <li>存款类型：定期存款</li>
                      <li>存款期限：3年</li>
                      <li>年利率：2.75%</li>
                      <li>计息周期：每年</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>利息收入：8,250元</li>
                      <li>到期金额：108,250元</li>
                      <li>实际年化收益率：2.75%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：定期存入</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>初始存款：50,000元</li>
                      <li>存款类型：定期存款</li>
                      <li>存款期限：2年</li>
                      <li>年利率：2.1%</li>
                      <li>每月定存：2,000元</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>定存总额：48,000元</li>
                      <li>利息收入：3,276元</li>
                      <li>到期金额：101,276元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">存款技巧</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">收益最大化策略</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>大额资金优先选择定期存款</li>
                <li>临时闲置资金可选择通知存款</li>
                <li>日常备用金使用活期存款</li>
                <li>合理搭配不同期限的定期存款</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">存款组合建议</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>活期存款保持1-3个月的日常开支</li>
                <li>通知存款可存放近期可能使用的资金</li>
                <li>定期存款适合长期稳健理财</li>
                <li>可以采用阶梯式定期存款策略</li>
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
              <span>定期存款提前支取会降低利率，一般按活期利率计算。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>通知存款未按约定提前通知会影响利息计算。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>存款利率可能随市场变化调整，建议关注最新利率。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>大额存款可以考虑分散存放在不同银行，最大化存款保险保障。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}