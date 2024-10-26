import React from 'react';

export default function SubnetCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>IP地址：网络中设备的唯一标识符，由32位二进制数组成</li>
                <li>子网掩码：用于划分网络和主机部分的32位二进制数</li>
                <li>CIDR：无类别域间路由，用斜线表示法表示子网前缀长度</li>
                <li>网络地址：子网中的第一个地址，主机部分全为0</li>
                <li>广播地址：子网中的最后一个地址，主机部分全为1</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">功能特点</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>支持单一子网和VLSM计算</li>
                <li>提供二进制和十进制表示</li>
                <li>计算可用主机数量</li>
                <li>显示网络类别信息</li>
                <li>支持通配符掩码计算</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：C类网络子网划分</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>IP地址：192.168.1.0</li>
                      <li>CIDR前缀：24</li>
                      <li>计算类型：单一子网</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>网络地址：192.168.1.0</li>
                      <li>广播地址：192.168.1.255</li>
                      <li>可用主机数：254</li>
                      <li>子网掩码：255.255.255.0</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：VLSM子网划分</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>IP地址：172.16.0.0</li>
                      <li>CIDR前缀：16</li>
                      <li>计算类型：VLSM</li>
                      <li>子网数量：3</li>
                      <li>每个子网主机数：100</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>子网1：172.16.0.0/25 (126台主机)</li>
                      <li>子网2：172.16.0.128/25 (126台主机)</li>
                      <li>子网3：172.16.1.0/25 (126台主机)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">IP地址分类</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类别</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">第一个八位组</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">默认掩码</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">地址范围</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A类</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0-127</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">255.0.0.0</td>
                  <td className="px-6 py-4 text-sm text-gray-900">1.0.0.0 - 126.255.255.255</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">B类</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">128-191</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">255.255.0.0</td>
                  <td className="px-6 py-4 text-sm text-gray-900">128.0.0.0 - 191.255.255.255</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">C类</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">192-223</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">255.255.255.0</td>
                  <td className="px-6 py-4 text-sm text-gray-900">192.0.0.0 - 223.255.255.255</td>
                </tr>
              </tbody>
            </table>
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
              <span>网络地址和广播地址不能分配给主机使用。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>VLSM划分时需要考虑每个子网的实际需求。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>子网划分时要注意地址空间是否足够。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>实际可用主机数比总主机数少2个（网络地址和广播地址）。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}