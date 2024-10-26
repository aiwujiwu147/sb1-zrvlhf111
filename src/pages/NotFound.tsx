import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>页面未找到 - 计算器中心</title>
      </Helmet>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}