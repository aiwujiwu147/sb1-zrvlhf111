import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { calculators } from '../data/calculators';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const calculatorsByCategory = categories.map(category => ({
    ...category,
    calculators: calculators.filter(calc => calc.category === category.id)
  }));

  return (
    <>
      <Helmet>
        <title>计算器中心 - 专业在线计算工具</title>
        <meta name="description" content="提供各类专业计算工具，包括贷款计算、健康计算、时间计算等多种实用计算器。" />
        <meta name="keywords" content="在线计算器,房贷计算器,BMI计算器,工资计算器" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            专业的在线计算工具
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            提供全面的计算服务，让复杂的计算变得简单
          </p>
        </motion.div>

        <div className="mt-16">
          {calculatorsByCategory.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.calculators.map((calculator) => (
                  <motion.div
                    key={calculator.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={calculator.path}
                      className="block h-full p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {calculator.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {calculator.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}