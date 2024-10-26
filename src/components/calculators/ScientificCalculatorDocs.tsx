import React from 'react';

export default function ScientificCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本功能</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>基础运算：加、减、乘、除、百分比</li>
                <li>高级运算：幂运算、平方根、对数</li>
                <li>三角函数：正弦、余弦、正切</li>
                <li>内存功能：存储、调用、累加、累减</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">特色功能</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>角度/弧度切换：支持不同角度单位</li>
                <li>历史记录：查看之前的计算过程</li>
                <li>科学记数法：处理大数和小数</li>
                <li>复杂表达式：支持括号和运算符优先级</li>
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
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：复杂表达式</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入表达式</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>表达式：(2 + 3) × 4²</li>
                      <li>步骤：</li>
                      <li>1. 输入 (2 + 3)</li>
                      <li>2. 按乘号</li>
                      <li>3. 输入 4 并计算平方</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算过程</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>2 + 3 = 5</li>
                      <li>4² = 16</li>
                      <li>5 × 16 = 80</li>
                      <li>最终结果：80</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：三角函数</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">输入条件</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>计算：sin(30°) × cos(60°)</li>
                      <li>步骤：</li>
                      <li>1. 选择角度模式</li>
                      <li>2. 计算 sin(30°)</li>
                      <li>3. 乘以 cos(60°)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算过程</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>sin(30°) = 0.5</li>
                      <li>cos(60°) = 0.5</li>
                      <li>0.5 × 0.5 = 0.25</li>
                      <li>最终结果：0.25</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">快捷键说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本操作</h3>
              <ul className="space-y-2 text-gray-600">
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">0</kbd> - <kbd className="px-2 py-1 bg-gray-100 rounded">9</kbd> 数字输入</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">.</kbd> 小数点</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">Enter</kbd> 计算结果</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">Esc</kbd> 清除</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">高级功能</h3>
              <ul className="space-y-2 text-gray-600">
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">s</kbd> 正弦函数</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">c</kbd> 余弦函数</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">t</kbd> 正切函数</li>
                <li><kbd className="px-2 py-1 bg-gray-100 rounded">r</kbd> 平方根</li>
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
              <span>使用括号确保复杂表达式的计算顺序正确。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>三角函数计算前确认角度/弧度模式。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>定期清除历史记录以提高性能。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>注意处理除零等特殊情况。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}