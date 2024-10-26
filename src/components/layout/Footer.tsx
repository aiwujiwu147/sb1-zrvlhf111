import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} 计算器中心. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}