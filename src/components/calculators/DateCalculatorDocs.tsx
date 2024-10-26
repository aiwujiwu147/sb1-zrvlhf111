import React from 'react';

export default function DateCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">功能说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>计算日期差：计算两个日期之间的间隔</li>
                <li>日期加法：在指定日期上增加天数、周数等</li>
                <li>日期减法：从指定日期减去天数、周数等</li>
                <li>工作日计算：计算工作日天数，可排除周末和节假日</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">高级功能</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>包含/排除结束日期</li>
                <li>排除周末（周六日）</li>
                <li>排除自定义节假日</li>
                <li>多种时间单位转换</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：日期差计算</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>起始日期：2024-01-01</li>
                      <li>结束日期：2024-12-31</li>
                      <li>包含结束日期：是</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>相差天数：366天</li>
                      <li>相差周数：52周</li>
                      <li>相差月数：12月</li>
                      <li>相差年数：1年</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：工作日计算</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>起始日期：2024-02-01</li>
                      <li>结束日期：2024-02-29</li>
                      <li>排除周末：是</li>
                      <li>排除节假日：春节假期</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>日历天数：29天</li>
                      <li>工作日天数：19天</li>
                      <li>排除周末：8天</li>
                      <li>排除节假日：2天</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">常见应用</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">项目管理</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>计算项目工期</li>
                <li>确定里程碑日期</li>
                <li>计算实际工作天数</li>
                <li>排除法定节假日</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">人事管理</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>计算工龄</li>
                <li>计算年假天数</li>
                <li>计算实际出勤天数</li>
                <li>确定合同到期日</li>
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
              <span>月份和年份的计算结果为近似值，因为每月天数不同。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>工作日计算需要手动添加法定节假日。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>日期加减法会自动处理月末和闰年的情况。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>建议定期更新节假日数据以保证计算准确性。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}