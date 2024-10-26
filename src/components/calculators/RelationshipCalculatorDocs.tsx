import React from 'react';

export default function RelationshipCalculatorDocs() {
  return (
    <div className="mt-8 space-y-8">
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">基本概念</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>直系亲属：父母、子女等具有血缘关系的直系亲属</li>
                <li>旁系亲属：兄弟姐妹等具有血缘关系的旁系亲属</li>
                <li>姻亲关系：通过婚姻形成的亲属关系</li>
                <li>称谓规则：根据辈分、性别和关系类型确定称谓</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">操作步骤</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>选择自己的性别（男/女）</li>
                <li>依次选择关系链中的每个角色</li>
                <li>系统自动计算最终称谓</li>
                <li>可以随时撤销或清空重新选择</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">称谓规则</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">直系亲属称谓</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 父系：爷爷、奶奶、父亲、儿子、孙子等</li>
                  <li>• 母系：外公、外婆、母亲、女儿、外孙等</li>
                  <li>• 配偶：丈夫、妻子</li>
                  <li>• 子女配偶：儿媳、女婿</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">旁系亲属称谓</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 兄弟姐妹：哥哥、弟弟、姐姐、妹妹</li>
                  <li>• 叔伯姑姨：叔叔、伯伯、姑姑、姨妈</li>
                  <li>• 堂表亲：堂兄弟姐妹、表兄弟姐妹</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">姻亲称谓</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-600">
                  <li>• 配偶父母：公公、婆婆、岳父、岳母</li>
                  <li>• 配偶兄弟姐妹：大伯、小叔、大姑、小姑等</li>
                  <li>• 子女配偶：儿媳、女婿</li>
                  <li>• 子女配偶父母：亲家</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">计算案例</h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例一：直系亲属</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">关系路径</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>自己 → 父亲 → 父亲</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>称谓：爷爷</li>
                      <li>关系：父系直系长辈</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">案例二：姻亲关系</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">关系路径</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>自己 → 妻子 → 父亲</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">计算结果</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>称谓：岳父</li>
                      <li>关系：配偶父母</li>
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
              <span>选择关系时要注意顺序，从自己开始逐步选择目标关系。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>同一关系可能有多种不同的称谓，系统会显示最常用的称谓。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>部分复杂关系可能无法准确计算，建议参考其他权威资料。</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-indigo-500 mr-2">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
              <span>不同地区可能有不同的称谓习惯，本计算器采用最通用的称谓。</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}