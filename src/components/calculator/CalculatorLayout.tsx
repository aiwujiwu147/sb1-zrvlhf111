import { ReactNode } from 'react';
import { Calculator } from '../../types/calculator';

interface CalculatorLayoutProps {
  calculator: Calculator;
  children: ReactNode;
}

export default function CalculatorLayout({ calculator, children }: CalculatorLayoutProps) {
  return (
    <div className="py-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          {calculator.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {calculator.description}
        </p>

        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          {children}
        </div>

        {calculator.features && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">功能特点</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {calculator.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {calculator.instructions && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">使用说明</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {calculator.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        )}

        {calculator.examples && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">计算示例</h2>
            <div className="space-y-6">
              {calculator.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">输入数据</h3>
                      <dl className="space-y-1">
                        {Object.entries(example.input).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <dt className="text-gray-600">{key}:</dt>
                            <dd className="font-medium text-gray-900">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">计算结果</h3>
                      <dl className="space-y-1">
                        {Object.entries(example.output).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <dt className="text-gray-600">{key}:</dt>
                            <dd className="font-medium text-gray-900">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                  {example.explanation && (
                    <p className="mt-4 text-sm text-gray-600">{example.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}