import { Calculator } from '../types/calculator';

export const calculators: Calculator[] = [
  // 贷款与税务类
  {
    id: 'fangdai',
    title: '房贷计算器',
    description: '计算房贷的月供、总利息和还款期数',
    category: 'loan-tax',
    path: '/calculators/fangdai',
    icon: 'HomeIcon',
    features: [
      '支持等额本息和等额本金两种还款方式',
      '自动计算月供和总利息',
      '支持提前还款计算',
      '显示还款明细'
    ],
    instructions: [
      '输入房屋总价',
      '选择首付比例',
      '设置贷款年限',
      '输入年利率',
      '选择还款方式'
    ]
  },
  {
    id: 'shangyedaikuan',
    title: '商业贷款计算器',
    description: '计算商业贷款的还款金额和利息',
    category: 'loan-tax',
    path: '/calculators/shangyedaikuan',
    icon: 'BanknotesIcon',
    features: [
      '支持多种还款方式',
      '计算每月还款金额',
      '显示利息明细',
      '支持提前还款分析'
    ],
    instructions: [
      '输入贷款金额',
      '设置贷款期限',
      '输入年利率',
      '选择还款方式'
    ]
  },
  {
    id: 'chedai',
    title: '车贷计算器',
    description: '计算汽车贷款的月供和利息',
    category: 'loan-tax',
    path: '/calculators/chedai',
    icon: 'TruckIcon',
    features: [
      '计算首付金额',
      '显示月供明细',
      '计算总利息',
      '支持不同还款方式'
    ],
    instructions: [
      '输入车辆价格',
      '选择首付比例',
      '设置贷款期限',
      '输入年利率'
    ]
  },
  {
    id: 'gongjijin',
    title: '公积金贷款计算器',
    description: '计算公积金贷款额度及还款金额',
    category: 'loan-tax',
    path: '/calculators/gongjijin',
    icon: 'BuildingOfficeIcon',
    features: [
      '计算最高可贷额度',
      '显示月供明细',
      '支持组合贷款计算',
      '提供政策说明'
    ],
    instructions: [
      '输入公积金账户余额',
      '填写月收入',
      '选择贷款期限',
      '查看贷款额度'
    ]
  },
  {
    id: 'gerensuodeshui',
    title: '个人所得税计算器',
    description: '计算个人所得税金额',
    category: 'loan-tax',
    path: '/calculators/gerensuodeshui',
    icon: 'ReceiptPercentIcon',
    features: [
      '支持专项附加扣除',
      '自动计算应纳税所得额',
      '显示月度和年度个税',
      '计算税后实际收入'
    ],
    instructions: [
      '输入月收入金额',
      '填写社保和公积金金额',
      '输入专项附加扣除金额',
      '系统自动计算个税'
    ]
  },
  {
    id: 'wuxianyijin',
    title: '五险一金计算器',
    description: '计算社保和公积金的缴纳金额',
    category: 'loan-tax',
    path: '/calculators/wuxianyijin',
    icon: 'ShieldCheckIcon'
  },
  {
    id: 'cunkuan',
    title: '存款计算器',
    description: '计算不同存款利率下的收益',
    category: 'loan-tax',
    path: '/calculators/cunkuan',
    icon: 'BanknotesIcon'
  },
  {
    id: 'gouzhishui',
    title: '车辆购置税计算器',
    description: '计算购车所需的购置税',
    category: 'loan-tax',
    path: '/calculators/gouzhishui',
    icon: 'TruckIcon'
  },

  // 健康与生育类
  {
    id: 'bmi',
    title: 'BMI计算器',
    description: '根据身高和体重计算BMI指数',
    category: 'health-fertility',
    path: '/calculators/bmi',
    icon: 'HeartIcon'
  },
  {
    id: 'taier',
    title: '胎儿体重计算器',
    description: '估算不同孕周的胎儿体重',
    category: 'health-fertility',
    path: '/calculators/taier',
    icon: 'UserGroupIcon'
  },
  {
    id: 'yuqijisuanqi',
    title: '预产期计算器',
    description: '计算预产期和孕周',
    category: 'health-fertility',
    path: '/calculators/yuqijisuanqi',
    icon: 'CalendarDaysIcon',
    features: [
      '根据末次月经计算预产期',
      '显示当前孕周',
      '计算预计受孕日期',
      '显示距离预产期天数'
    ],
    instructions: [
      '选择最后一次月经的日期',
      '系统自动计算相关日期',
      '实时更新孕周信息'
    ]
  },
  {
    id: 'paiyun',
    title: '排卵期计算器',
    description: '预测女性的排卵期和生育期',
    category: 'health-fertility',
    path: '/calculators/paiyun',
    icon: 'HeartIcon'
  },
  {
    id: 'yuejing',
    title: '月经计算器',
    description: '根据月经周期预测下次月经日期',
    category: 'health-fertility',
    path: '/calculators/yuejing',
    icon: 'CalendarIcon'
  },
  {
    id: 'anquanqi',
    title: '安全期计算器',
    description: '计算女性的安全期',
    category: 'health-fertility',
    path: '/calculators/anquanqi',
    icon: 'ShieldCheckIcon'
  },

  // 时间与日期类
  {
    id: 'riqi',
    title: '日期计算器',
    description: '计算两个日期之间的天数差',
    category: 'time-date',
    path: '/calculators/riqi',
    icon: 'CalendarDaysIcon'
  },
  {
    id: 'shijian',
    title: '时间计算器',
    description: '计算时间的加减运算及时间差',
    category: 'time-date',
    path: '/calculators/shijian',
    icon: 'ClockIcon'
  },
  {
    id: 'nianling',
    title: '年龄计算器',
    description: '根据出生日期计算实际年龄',
    category: 'time-date',
    path: '/calculators/nianling',
    icon: 'UserIcon'
  },

  // 数学与科学类
  {
    id: 'kexue',
    title: '科学计算器',
    description: '支持基本运算和高级数学运算',
    category: 'math-science',
    path: '/calculators/kexue',
    icon: 'CalculatorIcon',
    features: [
      '基础运算功能',
      '科学计算功能',
      '统计计算功能',
      '单位转换功能'
    ],
    instructions: [
      '选择计算模式',
      '输入计算表达式',
      '查看计算结果',
      '使用高级功能'
    ]
  },
  {
    id: 'fangcheng',
    title: '解方程计算器',
    description: '解一元或多元方程',
    category: 'math-science',
    path: '/calculators/fangcheng',
    icon: 'AcademicCapIcon',
    features: [
      '一元方程求解',
      '二元方程组求解',
      '三元方程组求解',
      '方程组解的验证'
    ],
    instructions: [
      '选择方程类型',
      '输入方程系数',
      '设置求解精度',
      '查看计算结果'
    ]
  },
  {
    id: 'sanjiao',
    title: '三角函数计算器',
    description: '计算三角函数值',
    category: 'math-science',
    path: '/calculators/sanjiao',
    icon: 'CalculatorIcon',
    features: [
      '基本三角函数计算',
      '反三角函数计算',
      '角度弧度转换',
      '三角恒等式验证'
    ],
    instructions: [
      '选择三角函数类型',
      '输入角度或弧度',
      '选择计算精度',
      '查看计算结果'
    ]
  },

  // 网络与单位转换类
  {
    id: 'ziwang',
    title: '子网掩码计算器',
    description: '计算子网掩码及网络地址信息',
    category: 'network-conversion',
    path: '/calculators/ziwang',
    icon: 'GlobeAltIcon'
  },
  {
    id: 'danweihuansuan',
    title: '单位换算计算器',
    description: '各类单位间的转换计算',
    category: 'network-conversion',
    path: '/calculators/danweihuansuan',
    icon: 'ArrowsRightLeftIcon',
    features: [
      '支持长度、面积、体积单位转换',
      '支持重量单位转换',
      '支持温度单位转换',
      '高精度计算结果'
    ],
    instructions: [
      '选择要转换的单位类型',
      '输入数值',
      '选择起始单位和目标单位',
      '查看转换结果'
    ]
  },
  {
    id: 'gonglv',
    title: '电源功率计算器',
    description: '根据电器参数计算功率消耗',
    category: 'network-conversion',
    path: '/calculators/gonglv',
    icon: 'BoltIcon'
  },

  // 其他类
  {
    id: 'maifang',
    title: '买房计算器',
    description: '评估购房成本，包括首付、月供和总利息',
    category: 'others',
    path: '/calculators/maifang',
    icon: 'HomeModernIcon'
  }
];