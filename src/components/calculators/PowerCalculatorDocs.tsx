import React from 'react';

export default function PowerCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>有功功率：实际消耗的电能功率，单位为瓦特(W)</li>
                <li>视在功率：电压与电流的乘积，单位为伏安(VA)</li>
                <li>无功功率：不产生有用功的功率，单位为乏(var)</li>
                <li>功率因数：有功功率与视在功率的比值</li>
                <li>电能：功率与时间的乘积，单位为千瓦时(kWh)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">计算功能</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>功率计算：根据电压、电流计算各类功率</li>
                <li>能耗计算：计算设备在指定时间内的用电量</li>
                <li>电费计算：根据电价计算用电成本</li>
                <li>三相功率：支持三相电力系统计算</li>
                <li>效率考虑：计入设备效率因素</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：家用电器功率计算</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>电压：220V</li>
                      <li>电流：5A</li>
                      <li>功率因数：0.85</li>
                      <li>每日使用：6小时</li>
                      <li>使用天数：30天</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>有功功率：935W</li>
                      <li>月耗电量：168.3kWh</li>
                      <li>月电费：84.15元</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：三相电机功率计算</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>线电压：380V</li>
                      <li>电流：10A</li>
                      <li>功率因数：0.8</li>
                      <li>效率：90%</li>
                      <li>每日运行：8小时</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>有功功率：4.7kW</li>
                      <li>视在功率：6.58kVA</li>
                      <li>无功功率：4.93kvar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">功率计算公式</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">单相电路</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>有功功率 P = U × I × cosφ</li>
                <li>视在功率 S = U × I</li>
                <li>无功功率 Q = U × I × sinφ</li>
                <li>功率因数 cosφ = P ÷ S</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">三相电路</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>有功功率 P = √3 × UL × I × cosφ</li>
                <li>视在功率 S = √3 × UL × I</li>
                <li>无功功率 Q = √3 × UL × I × sinφ</li>
                <li>UL为线电压，I为线电流</li>
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
              <span>功率因数对电能利用效率有重要影响，应尽量接近1。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>三相负载应尽量保持平衡，避免相间负载不均。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>设备效率会影响实际消耗的电能，计算时应考虑在内。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>电价可能因时段、用电类型不同而变化，计算时应使用实际电价。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}