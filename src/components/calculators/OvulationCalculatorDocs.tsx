import React from 'react';

export default function OvulationCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>排卵日：卵子从卵巢释放的日期</li>
                <li>易孕期：排卵日前后最容易受孕的时期</li>
                <li>月经周期：从本次月经第一天到下次月经第一天的间隔</li>
                <li>黄体期：排卵后到下次月经前的时期</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">生理周期阶段</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>卵泡期：月经结束后到排卵前的阶段</li>
                <li>排卵期：卵子排出时期，约1-2天</li>
                <li>黄体期：排卵后到下次月经前，约14天</li>
                <li>月经期：子宫内膜脱落的时期</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">科学依据</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">排卵规律</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 排卵一般发生在下次月经来潮前14天</li>
                  <li>• 卵子排出后存活时间约24小时</li>
                  <li>• 精子在女性体内可存活3-5天</li>
                  <li>• 排卵前体温会略有下降，排卵后升高</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">易孕期特点</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 排卵前5天到排卵后1天为易孕期</li>
                  <li>• 排卵日及前2天受孕几率最高</li>
                  <li>• 易孕期会出现排卵征兆</li>
                  <li>• 宫颈黏液变化明显</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">排卵征兆</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">主要征兆</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>基础体温变化：排卵前略降，排卵后升高0.3-0.5℃</li>
                <li>宫颈黏液：变得清亮、粘稠、有拉丝感</li>
                <li>轻微腹痛：部分女性会感觉到排卵痛</li>
                <li>乳房胀痛：可能出现轻微胀痛感</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">辅助观察</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>排卵试纸：检测尿液中的黄体生成素</li>
                <li>B超监测：观察卵泡发育和排卵情况</li>
                <li>基础体温表：记录体温变化曲线</li>
                <li>宫颈黏液观察：记录质地变化</li>
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
              <span>计算结果仅供参考，每个人的生理周期可能存在差异。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>月经不规律者不适合使用本计算器。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>建议结合多种方法观察排卵征兆，提高准确性。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>如有特殊情况或疑问，请咨询专业医生。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}