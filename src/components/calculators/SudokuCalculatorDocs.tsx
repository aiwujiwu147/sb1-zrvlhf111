import React from 'react';

export default function SudokuCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本功能</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>数独求解：自动解决任何有效的数独谜题</li>
                <li>提示功能：在解题过程中提供下一步建议</li>
                <li>笔记模式：记录可能的数字选项</li>
                <li>难度评估：评估数独谜题的难度级别</li>
                <li>生成谜题：创建不同难度的数独谜题</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">操作说明</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>点击单元格选择要填写的位置</li>
                <li>使用数字键盘输入1-9的数字</li>
                <li>使用笔记模式记录可能的数字</li>
                <li>使用提示功能获取帮助</li>
                <li>可以随时撤销或重做操作</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">数独规则</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">基本规则</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 在9×9的格子中填入1-9的数字</li>
                  <li>• 每行的数字不能重复</li>
                  <li>• 每列的数字不能重复</li>
                  <li>• 每个3×3小方格内的数字不能重复</li>
                  <li>• 每个谜题只有一个唯一解</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">难度级别</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 简单：适合初学者，使用基本解题技巧</li>
                  <li>• 中等：需要一些进阶技巧</li>
                  <li>• 困难：需要复杂的解题策略</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">解题技巧</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基础技巧</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>扫描法：逐行逐列排除已有数字</li>
                <li>唯一数法：找出只能填一个数字的格子</li>
                <li>区块法：利用3×3方格间的关系</li>
                <li>候选数法：记录每个空格可能的数字</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">进阶技巧</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>隐性数对：两个格子共享两个可能的数字</li>
                <li>显性数对：两个数字只能出现在两个格子中</li>
                <li>链式推理：通过一系列关联推导结果</li>
                <li>鱼形技巧：利用多行或多列间的关系</li>
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
              <span>填写数字前仔细检查行、列和3×3方格。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>遇到困难时善用笔记功能记录可能的数字。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>不确定时可以使用提示功能，避免出错。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>建议从简单难度开始，逐步提高难度级别。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}