import { Category } from '../types/calculator';

export const categories: Category[] = [
  {
    id: 'loan-tax',
    name: '贷款与税务',
    description: '房贷、商业贷款、个税等计算工具',
    icon: 'CurrencyYenIcon'
  },
  {
    id: 'health-fertility',
    name: '健康与生育',
    description: 'BMI、孕期等健康相关计算',
    icon: 'HeartIcon'
  },
  {
    id: 'time-date',
    name: '时间与日期',
    description: '日期计算、年龄计算等工具',
    icon: 'CalendarIcon'
  },
  {
    id: 'math-science',
    name: '数学与科学',
    description: '科学计算、方程式计算等',
    icon: 'CalculatorIcon'
  },
  {
    id: 'network-conversion',
    name: '网络与单位转换',
    description: '网络计算、单位换算工具',
    icon: 'GlobeAltIcon'
  },
  {
    id: 'others',
    name: '其他工具',
    description: '亲戚称呼、数独等其他计算工具',
    icon: 'WrenchIcon'
  }
];