interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  type?: 'text' | 'number' | 'date';
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  className?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  type = 'text',
  min,
  max,
  step,
  suffix,
  className = ''
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (type === 'number') {
      // 如果输入为空，传递空字符串给父组件
      if (newValue === '') {
        onChange('');
        return;
      }
      
      // 否则转换为数字
      const numValue = parseFloat(newValue);
      if (!isNaN(numValue)) {
        onChange(numValue);
      }
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type === 'number' ? 'text' : type} // 将 number 类型改为 text
          inputMode={type === 'number' ? 'decimal' : undefined} // 为数字输入优化移动键盘
          pattern={type === 'number' ? '[0-9]*[.]?[0-9]*' : undefined} // 限制只能输入数字和小数点
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm touch-manipulation"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}