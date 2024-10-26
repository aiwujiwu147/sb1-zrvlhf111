interface ResultCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  className?: string;
}

export default function ResultCard({
  title,
  value,
  suffix,
  className = ''
}: ResultCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-xl font-semibold text-indigo-600 break-words">
        {value}
        {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
      </dd>
    </div>
  );
}