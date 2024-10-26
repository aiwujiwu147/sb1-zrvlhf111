import React from 'react';

export default function UnitConverterDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本功能</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>支持10种常用单位类型的转换</li>
                <li>可调整计算精度（0-10位小数）</li>
                <li>支持科学计数法显示</li>
                <li>提供常用单位快速换算</li>
                <li>实时计算结果更新</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">单位类型说明</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">支持单位</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">使用场景</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">长度</td>
                      <td className="px-6 py-4 text-sm text-gray-900">皮米到海里，包含公制和英制</td>
                      <td className="px-6 py-4 text-sm text-gray-900">工程测量、日常使用</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">面积</td>
                      <td className="px-6 py-4 text-sm text-gray-900">平方毫米到平方公里，亩、公顷等</td>
                      <td className="px-6 py-4 text-sm text-gray-900">土地测量、房产面积</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">体积</td>
                      <td className="px-6 py-4 text-sm text-gray-900">立方毫米到立方米，升、加仑等</td>
                      <td className="px-6 py-4 text-sm text-gray-900">容量测量、液体计量</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">重量</td>
                      <td className="px-6 py-4 text-sm text-gray-900">毫克到吨，磅、盎司等</td>
                      <td className="px-6 py-4 text-sm text-gray-900">物品称重、货物运输</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">温度</td>
                      <td className="px-6 py-4 text-sm text-gray-900">摄氏度、华氏度、开尔文</td>
                      <td className="px-6 py-4 text-sm text-gray-900">温度测量、科学计算</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">压力</td>
                      <td className="px-6 py-4 text-sm text-gray-900">帕斯卡、巴、标准大气压、磅力/平方英寸</td>
                      <td className="px-6 py-4 text-sm text-gray-900">气压测量、工程设计</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">能量</td>
                      <td className="px-6 py-4 text-sm text-gray-900">焦耳、卡路里、千瓦时、英热单位</td>
                      <td className="px-6 py-4 text-sm text-gray-900">能源计算、热量测量</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">速度</td>
                      <td className="px-6 py-4 text-sm text-gray-900">米/秒、千米/时、英里/时、节</td>
                      <td className="px-6 py-4 text-sm text-gray-900">交通速度、物理计算</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">数据存储</td>
                      <td className="px-6 py-4 text-sm text-gray-900">字节、千字节、兆字节、吉字节、太字节</td>
                      <td className="px-6 py-4 text-sm text-gray-900">数据大小、存储容量</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">时间</td>
                      <td className="px-6 py-4 text-sm text-gray-900">毫秒、秒、分钟、小时、天、周、月、年</td>
                      <td className="px-6 py-4 text-sm text-gray-900">时间计算、工期规划</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">常用换算关系</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">长度单位</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1米 = 100厘米 = 1000毫米</li>
                  <li>• 1千米 = 1000米</li>
                  <li>• 1英寸 = 2.54厘米</li>
                  <li>• 1英尺 = 12英寸 = 30.48厘米</li>
                  <li>• 1码 = 3英尺 = 91.44厘米</li>
                  <li>• 1英里 = 1.609344千米</li>
                  <li>• 1海里 = 1.852千米</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">面积单位</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1平方米 = 10000平方厘米</li>
                  <li>• 1公顷 = 10000平方米</li>
                  <li>• 1亩 = 666.67平方米</li>
                  <li>• 1平方英里 = 2.589988平方千米</li>
                  <li>• 1英亩 = 4046.86平方米</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">重量单位</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1千克 = 1000克</li>
                  <li>• 1磅 = 453.592克</li>
                  <li>• 1盎司 = 28.3495克</li>
                  <li>• 1吨 = 1000千克</li>
                  <li>• 1英担 = 50.8023千克</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">压力单位</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1巴 = 100000帕斯卡</li>
                  <li>• 1标准大气压 = 101325帕斯卡</li>
                  <li>• 1磅力/平方英寸 = 6894.76帕斯卡</li>
                  <li>• 1毫米汞柱 = 133.322帕斯卡</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">能量单位</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1千焦 = 1000焦耳</li>
                  <li>• 1卡路里 = 4.184焦耳</li>
                  <li>• 1千瓦时 = 3600000焦耳</li>
                  <li>• 1英热单位 = 1055.06焦耳</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">速度单位</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 1千米/时 = 0.277778米/秒</li>
                  <li>• 1英里/时 = 0.44704米/秒</li>
                  <li>• 1节 = 0.514444米/秒</li>
                  <li>• 1英尺/秒 = 0.3048米/秒</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">高级功能说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">精确度控制</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>可设置0-10位小数精度</li>
                <li>自动四舍五入处理</li>
                <li>科学计数法显示超大或超小数值</li>
                <li>保证计算过程中的精确度</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">特殊单位处理</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>温度单位使用专门的转换公式</li>
                <li>支持不同进制的数据存储单位转换</li>
                <li>处理压力、能量等复合单位</li>
                <li>考虑不同标准体系（如公制、英制）</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用技巧</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>使用合适的精度避免不必要的小数位显示。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>对于大数或小数，使用科学计数法显示更清晰。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>查看常用换算结果可快速了解多个单位的对应关系。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>温度转换时注意选择正确的单位，避免混淆。</span>
            </li>
          </ul>
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
              <span>部分单位转换可能存在微小的舍入误差，特别是在高精度要求时。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>温度单位转换使用特殊公式，不是简单的比例关系。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>数据存储单位可能使用1000或1024作为进制，需注意区分。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>某些单位可能有不同的标准定义，计算结果以国际标准单位为准。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}