import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import { formatDate } from '../../utils/calculatorUtils';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import PregnancyCalculatorDocs from './PregnancyCalculatorDocs';

interface PregnancyMilestone {
  week: number;
  description: string;
}

const pregnancyMilestones: PregnancyMilestone[] = [
  { week: 4, description: '胚胎着床' },
  { week: 8, description: '主要器官开始形成' },
  { week: 12, description: '胎儿基本成形' },
  { week: 16, description: '可能开始感受到胎动' },
  { week: 20, description: '详细B超检查' },
  { week: 24, description: '胎儿存活率显著提高' },
  { week: 28, description: '进入第三孕期' },
  { week: 32, description: '胎儿快速增重' },
  { week: 36, description: '胎头开始下降' },
  { week: 37, description: '足月' },
  { week: 40, description: '预产期' }
];

export default function PregnancyCalculator({ calculator }: CalculatorProps) {
  const [method, setMethod] = useState<'lastPeriod' | 'conception' | 'ultrasound'>('lastPeriod');
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [conceptionDate, setConceptionDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [ultrasoundDate, setUltrasoundDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number>(8);
  const [ultrasoundDays, setUltrasoundDays] = useState<number>(0);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const calculateDueDate = () => {
    let dueDate = new Date();
    let conceptionEstimate = new Date();
    
    switch (method) {
      case 'lastPeriod':
        // Naegele's rule with cycle length adjustment
        const cycleAdjustment = cycleLength - 28;
        dueDate = new Date(lastPeriodDate);
        dueDate.setDate(dueDate.getDate() + 280 + cycleAdjustment);
        conceptionEstimate = new Date(lastPeriodDate);
        conceptionEstimate.setDate(conceptionEstimate.getDate() + 14 + cycleAdjustment);
        break;
        
      case 'conception':
        dueDate = new Date(conceptionDate);
        dueDate.setDate(dueDate.getDate() + 266);
        conceptionEstimate = new Date(conceptionDate);
        break;
        
      case 'ultrasound':
        const ultrasoundDateObj = new Date(ultrasoundDate);
        const totalDays = (ultrasoundWeeks * 7) + ultrasoundDays;
        const daysToAdd = 280 - totalDays;
        dueDate = new Date(ultrasoundDate);
        dueDate.setDate(dueDate.getDate() + daysToAdd);
        conceptionEstimate = new Date(ultrasoundDate);
        conceptionEstimate.setDate(conceptionEstimate.getDate() - totalDays + 14);
        break;
    }

    const today = new Date();
    const gestationalAge = {
      weeks: Math.floor((today.getTime() - conceptionEstimate.getTime() + (14 * 24 * 60 * 60 * 1000)) / (7 * 24 * 60 * 60 * 1000)),
      days: Math.floor(((today.getTime() - conceptionEstimate.getTime() + (14 * 24 * 60 * 60 * 1000)) % (7 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000))
    };

    const remainingDays = Math.ceil((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
    
    // 计算当前孕期阶段
    const currentMilestone = pregnancyMilestones.find(m => m.week >= gestationalAge.weeks) || pregnancyMilestones[pregnancyMilestones.length - 1];
    const nextMilestone = pregnancyMilestones.find(m => m.week > gestationalAge.weeks);

    // 计算三孕期
    const trimester = gestationalAge.weeks < 13 ? 1 : gestationalAge.weeks < 27 ? 2 : 3;

    return {
      dueDate,
      conceptionDate: conceptionEstimate,
      gestationalAge,
      remainingDays,
      currentMilestone,
      nextMilestone,
      trimester
    };
  };

  const result = calculateDueDate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="计算方式"
              value={method}
              onChange={(value) => setMethod(value as 'lastPeriod' | 'conception' | 'ultrasound')}
              options={[
                { value: 'lastPeriod', label: '末次月经' },
                { value: 'conception', label: '受孕日期' },
                { value: 'ultrasound', label: 'B超数据' }
              ]}
            />

            {method === 'lastPeriod' && (
              <>
                <InputField
                  label="末次月经日期"
                  value={lastPeriodDate}
                  onChange={setLastPeriodDate}
                  type="date"
                />
                <InputField
                  label="月经周期"
                  value={cycleLength}
                  onChange={setCycleLength}
                  type="number"
                  min={21}
                  max={35}
                  step={1}
                  suffix="天"
                />
              </>
            )}

            {method === 'conception' && (
              <InputField
                label="受孕日期"
                value={conceptionDate}
                onChange={setConceptionDate}
                type="date"
              />
            )}

            {method === 'ultrasound' && (
              <>
                <InputField
                  label="B超检查日期"
                  value={ultrasoundDate}
                  onChange={setUltrasoundDate}
                  type="date"
                />
                <InputField
                  label="胎儿孕周"
                  value={ultrasoundWeeks}
                  onChange={setUltrasoundWeeks}
                  type="number"
                  min={6}
                  max={40}
                  step={1}
                  suffix="周"
                />
                <InputField
                  label="额外天数"
                  value={ultrasoundDays}
                  onChange={setUltrasoundDays}
                  type="number"
                  min={0}
                  max={6}
                  step={1}
                  suffix="天"
                />
              </>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ResultCard
              title="预产期"
              value={formatDate(result.dueDate)}
              className="bg-white"
            />
            <ResultCard
              title="当前孕周"
              value={`${result.gestationalAge.weeks}周${result.gestationalAge.days}天`}
              className="bg-white"
            />
            <ResultCard
              title="距离预产期"
              value={`${result.remainingDays}`}
              suffix="天"
              className="bg-white"
            />
            <ResultCard
              title="受孕日期"
              value={formatDate(result.conceptionDate)}
              className="bg-white"
            />
            <ResultCard
              title="当前孕期"
              value={`第${result.trimester}孕期`}
              className="bg-white"
            />
          </div>
        </div>

        {/* 发育里程碑 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏发育里程碑' : '查看发育里程碑'}
          </button>

          {showDetail && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">发育里程碑</h3>
                <div className="relative">
                  <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
                  <ul className="space-y-4 relative">
                    {pregnancyMilestones.map((milestone, index) => (
                      <li
                        key={index}
                        className={`flex items-center space-x-4 ${
                          milestone.week <= result.gestationalAge.weeks ? 'text-indigo-600' : 'text-gray-500'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.week <= result.gestationalAge.weeks
                              ? 'bg-indigo-100 text-indigo-600'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {milestone.week}
                        </div>
                        <div>
                          <span className="font-medium">{milestone.week}周：</span>
                          <span>{milestone.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <PregnancyCalculatorDocs />
    </div>
  );
}