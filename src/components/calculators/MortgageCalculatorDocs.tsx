import React from 'react';

export default function MortgageCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>等额本息：每月还款金额固定，但其中本金与利息的比例逐月变化</li>
                <li>等额本金：每月还款本金固定，因利息逐月减少，月供会逐月降低</li>
                <li>首付比例：一般不低于30%，部分城市对首套、二套房有不同要求</li>
                <li>贷款年限：一般最长30年，年限越长，月供越少，但总利息越多</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">操作步骤</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>输入房屋总价（单位：元）</li>
                <li>选择首付比例（一般为30%-80%）</li>
                <li>设置贷款年限（1-30年）</li>
                <li>输入年利率（当前基准利率为4.1%）</li>
                <li>选择还款方式（等额本息或等额本金）</li>
                <li>查看计算结果和还款明细</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">计算案例</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：首套房贷款</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>房屋总价：100万元</li>
                      <li>首付比例：30%</li>
                      <li>贷款年限：30年</li>
                      <li>年利率：4.1%</li>
                      <li>还款方式：等额本息</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>贷款金额：70万元</li>
                      <li>月供：3,386元</li>
                      <li>支付利息：549,896元</li>
                      <li>还款总额：1,249,896元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：短期贷款</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>房屋总价：80万元</li>
                      <li>首付比例：40%</li>
                      <li>贷款年限：10年</li>
                      <li>年利率：4.1%</li>
                      <li>还款方式：等额本金</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>贷款金额：48万元</li>
                      <li>首月还款：5,264元</li>
                      <li>末月还款：4,016元</li>
                      <li>支付利息：98,880元</li>
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
              <span>实际贷款利率可能因银行、地区、房产类型等因素有所不同，建议咨询银行确认具体利率。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>本计算器结果仅供参考，实际贷款方案以银行审批为准。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>提前还款可能会产生违约金，具体政策请咨询贷款银行。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}