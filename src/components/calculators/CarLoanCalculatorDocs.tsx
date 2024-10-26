import React from 'react';

export default function CarLoanCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>车贷总额：车辆价格减去首付款的部分</li>
                <li>首付比例：一般为车价的20%-30%，部分车型可能要求更高</li>
                <li>贷款期限：通常为1-5年，期限越长月供越少但总利息越多</li>
                <li>还款方式：等额本息每月还款固定，等额本金每月递减</li>
                <li>购置税：一般为车价（不含税）的10%</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">高级功能说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>计息周期：影响实际年化利率的计算方式</li>
                <li>提前还款：可设置固定金额定期提前还款</li>
                <li>宽限期：前几个月只还利息不还本金</li>
                <li>服务费：部分贷款机构可能收取月服务费</li>
                <li>保险费：包括交强险和商业险</li>
                <li>上牌费：各地区收费标准不同</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：标准车贷</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>车辆价格：20万元</li>
                      <li>首付比例：30%</li>
                      <li>贷款期限：3年</li>
                      <li>年利率：5.6%</li>
                      <li>还款方式：等额本息</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>首付金额：6万元</li>
                      <li>贷款金额：14万元</li>
                      <li>月供：4,238元</li>
                      <li>支付利息：12,568元</li>
                      <li>购置总成本：22.26万元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：提前还款方案</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>车辆价格：30万元</li>
                      <li>首付比例：40%</li>
                      <li>贷款期限：5年</li>
                      <li>年利率：5.8%</li>
                      <li>还款方式：等额本息</li>
                      <li>每年提前还款：2万元</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>首付金额：12万元</li>
                      <li>贷款金额：18万元</li>
                      <li>月供：3,468元</li>
                      <li>节省利息：15,624元</li>
                      <li>购置总成本：33.25万元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">费用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">购车相关费用</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">费用项目</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">计算方式</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">说明</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">购置税</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">车价（不含税）× 10%</td>
                      <td className="px-6 py-4 text-sm text-gray-900">新能源车可能享受减免</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">交强险</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">固定费率</td>
                      <td className="px-6 py-4 text-sm text-gray-900">必须购买，全国统一标准</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">商业险</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">根据保险种类确定</td>
                      <td className="px-6 py-4 text-sm text-gray-900">建议选择适合的险种</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">上牌费</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">地区标准</td>
                      <td className="px-6 py-4 text-sm text-gray-900">各地收费标准不同</td>
                    </tr>
                  </tbody>
                </table>
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
              <span>实际贷款利率可能因个人信用、车型等因素有所不同，建议咨询多家金融机构。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>提前还款可能需要支付违约金，具体政策请查看贷款合同。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>选择还款方式时要考虑个人收入情况和现金流规划。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>购车总成本除了车款外，还要考虑保险、保养等后续支出。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}