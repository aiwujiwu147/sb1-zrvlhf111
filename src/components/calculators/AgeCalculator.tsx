import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatDate } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import ResultCard from '../common/ResultCard';
import AgeCalculatorDocs from './AgeCalculatorDocs';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
  zodiacSign: string;
  chineseZodiac: string;
}

const zodiacSigns = [
  { name: '摩羯座', startMonth: 12, startDay: 22 },
  { name: '水瓶座', startMonth: 1, startDay: 20 },
  { name: '双鱼座', startMonth: 2, startDay: 19 },
  { name: '白羊座', startMonth: 3, startDay: 21 },
  { name: '金牛座', startMonth: 4, startDay: 20 },
  { name: '双子座', startMonth: 5, startDay: 21 },
  { name: '巨蟹座', startMonth: 6, startDay: 22 },
  { name: '狮子座', startMonth: 7, startDay: 23 },
  { name: '处女座', startMonth: 8, startDay: 23 },
  { name: '天秤座', startMonth: 9, startDay: 23 },
  { name: '天蝎座', startMonth: 10, startDay: 24 },
  { name: '射手座', startMonth: 11, startDay: 23 }
];

const chineseZodiac = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

export default function AgeCalculator({ calculator }: CalculatorProps) {
  const [birthDate, setBirthDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const getZodiacSign = (month: number, day: number): string => {
    for (let i = 0; i < zodiacSigns.length; i++) {
      const currentSign = zodiacSigns[i];
      const nextSign = zodiacSigns[(i + 1) % zodiacSigns.length];
      
      if (month === currentSign.startMonth && day >= currentSign.startDay) {
        return currentSign.name;
      }
      if (month === nextSign.startMonth && day < nextSign.startDay) {
        return currentSign.name;
      }
    }
    return zodiacSigns[0].name;
  };

  const getChineseZodiac = (year: number): string => {
    return chineseZodiac[(year - 4) % 12];
  };

  const calculateAge = (): AgeResult => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);
    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // 计算下次生日
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalMonths: years * 12 + months,
      totalWeeks: Math.floor(diffDays / 7),
      totalDays: diffDays,
      nextBirthday,
      daysUntilBirthday,
      zodiacSign: getZodiacSign(birth.getMonth() + 1, birth.getDate()),
      chineseZodiac: getChineseZodiac(birth.getFullYear())
    };
  };

  const result = calculateAge();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="出生日期"
              value={birthDate}
              onChange={setBirthDate}
              type="date"
            />
            <InputField
              label="目标日期"
              value={targetDate}
              onChange={setTargetDate}
              type="date"
            />
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="年龄"
              value={`${result.years}岁${result.months}月${result.days}天`}
              className="bg-white"
            />
            <ResultCard
              title="总月数"
              value={result.totalMonths}
              suffix="月"
              className="bg-white"
            />
            <ResultCard
              title="总天数"
              value={result.totalDays}
              suffix="天"
              className="bg-white"
            />
            <ResultCard
              title="距离下次生日"
              value={result.daysUntilBirthday}
              suffix="天"
              className="bg-white"
            />
            <ResultCard
              title="星座"
              value={result.zodiacSign}
              className="bg-white"
            />
            <ResultCard
              title="生肖"
              value={result.chineseZodiac}
              className="bg-white"
            />
          </div>
        </div>

        {/* 详细信息 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏详细信息' : '查看详细信息'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">详细年龄信息</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">总周数</dt>
                    <dd className="mt-1 text-sm text-gray-900">{result.totalWeeks} 周</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">下次生日</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatDate(result.nextBirthday)}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">生日特征</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.zodiacSign}（{result.chineseZodiac}）
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <AgeCalculatorDocs />
    </div>
  );
}