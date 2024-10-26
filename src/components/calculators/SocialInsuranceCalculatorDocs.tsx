import React from 'react';

export default function SocialInsuranceCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>五险：养老保险、医疗保险、失业保险、工伤保险、生育保险</li>
                <li>一金：住房公积金</li>
                <li>缴费基数：计算五险一金时的基准工资</li>
                <li>缴费比例：个人和单位分别需要缴纳的比例</li>
                <li>最低基数：不同城市规定的最低缴费工资标准</li>
                <li>最高基数：不同城市规定的最高缴费工资限额</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">缴费规则</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>养老保险：个人8%，单位16%</li>
                <li>医疗保险：个人2%，单位7%-9.5%</li>
                <li>失业保险：个人0.5%，单位0.5%</li>
                <li>工伤保险：仅单位缴纳，0.2%-1.9%</li>
                <li>生育保险：仅单位缴纳，0.7%-1%</li>
                <li>住房公积金：个人和单位相同，5%-12%</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：标准缴费</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>月收入：10,000元</li>
                      <li>城市类型：一线城市</li>
                      <li>公积金比例：12%</li>
                      <li>使用默认基数</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>个人缴纳：2,250元</li>
                      <li>单位缴纳：3,815元</li>
                      <li>五险一金总额：6,065元</li>
                      <li>实发工资：7,750元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：自定义基数</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>月收入：20,000元</li>
                      <li>城市类型：二线城市</li>
                      <li>公积金比例：8%</li>
                      <li>自定义各项基数</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>个人缴纳：3,100元</li>
                      <li>单位缴纳：5,240元</li>
                      <li>五险一金总额：8,340元</li>
                      <li>实发工资：16,900元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">常见问题</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">缴费基数问题</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>如果工资低于最低基数，需要按最低基数缴纳</li>
                <li>如果工资高于最高基数，按最高基数封顶</li>
                <li>缴费基数一般按上年度月平均工资确定</li>
                <li>不同险种可能使用不同的缴费基数</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">特殊情况说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>试用期期间通常也需要缴纳五险一金</li>
                <li>兼职工作一般只缴纳工伤保险</li>
                <li>退休人员返聘只需缴纳工伤保险</li>
                <li>个人自愿提高公积金比例需要单位同意</li>
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
              <span>缴费基数和比例可能随政策调整而变化，建议以当地社保部门公布为准。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>工伤保险费率与企业行业类别和工伤风险等级相关。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>医疗保险可能包含大病医疗保险费，具体金额以当地规定为准。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>公积金缴存基数调整一般在每年7月，建议及时关注政策变化。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}