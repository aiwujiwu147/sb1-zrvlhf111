import React from 'react';

export default function HousingFundCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>公积金贷款：使用住房公积金账户资金发放的住房贷款</li>
                <li>可贷额度：由收入、公积金余额和房价三个因素共同决定</li>
                <li>组合贷款：公积金贷款和商业贷款的组合使用方式</li>
                <li>等额本息：每月还款固定，但本金与利息比例逐月变化</li>
                <li>等额本金：每月还款本金固定，总还款额逐月递减</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">贷款额度计算规则</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>收入能贷额度 = 月收入 × 70% × 12个月 × 贷款年限</li>
                <li>公积金余额能贷额度 = 公积金账户余额 × 15</li>
                <li>房价能贷额度 = 房屋总价 × 80%</li>
                <li>组合贷款时公积金最高额度 = 房屋总价 × 40%</li>
                <li>最终贷款额度 = 以上三项的最小值</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：纯公积金贷款</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>月收入：15,000元</li>
                      <li>公积金余额：200,000元</li>
                      <li>房屋总价：1,500,000元</li>
                      <li>贷款年限：30年</li>
                      <li>还款方式：等额本息</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>可贷额度：1,200,000元</li>
                      <li>月供：5,138元</li>
                      <li>支付利息：649,680元</li>
                      <li>还款总额：1,849,680元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：组合贷款</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>月收入：20,000元</li>
                      <li>公积金余额：150,000元</li>
                      <li>房屋总价：2,000,000元</li>
                      <li>商业贷款：800,000元</li>
                      <li>贷款年限：25年</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>公积金贷款：800,000元</li>
                      <li>商业贷款：800,000元</li>
                      <li>月供总额：8,246元</li>
                      <li>总支付利息：1,173,800元</li>
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
              <span>公积金贷款额度和政策可能因地区而异，建议咨询当地公积金中心。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>申请组合贷款时，需同时满足公积金和商业贷款的审批条件。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>公积金贷款利率一般低于商业贷款，建议优先使用公积金贷款额度。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>提前还款政策和违约金规定请咨询经办银行和公积金中心。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}