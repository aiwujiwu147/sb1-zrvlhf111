// 关系类型定义
export interface Relationship {
  id: string;
  name: string;
  generation: number;
  appellation?: {
    male: string;
    female: string;
  };
}

// 基本关系定义
export const relationships: Relationship[] = [
  // 直系长辈
  { id: 'f', name: '父亲', generation: 1, appellation: { male: '爸爸', female: '爸爸' } },
  { id: 'm', name: '母亲', generation: 1, appellation: { male: '妈妈', female: '妈妈' } },
  { id: 'ff', name: '爷爷', generation: 2, appellation: { male: '爷爷', female: '爷爷' } },
  { id: 'fm', name: '奶奶', generation: 2, appellation: { male: '奶奶', female: '奶奶' } },
  { id: 'mf', name: '外公', generation: 2, appellation: { male: '外公', female: '外公' } },
  { id: 'mm', name: '外婆', generation: 2, appellation: { male: '外婆', female: '外婆' } },

  // 平辈
  { id: 'h', name: '丈夫', generation: 0, appellation: { male: '丈夫', female: '老公' } },
  { id: 'w', name: '妻子', generation: 0, appellation: { male: '老婆', female: '妻子' } },
  { id: 'ob', name: '哥哥', generation: 0, appellation: { male: '哥哥', female: '哥哥' } },
  { id: 'lb', name: '弟弟', generation: 0, appellation: { male: '弟弟', female: '弟弟' } },
  { id: 'os', name: '姐姐', generation: 0, appellation: { male: '姐姐', female: '姐姐' } },
  { id: 'ls', name: '妹妹', generation: 0, appellation: { male: '妹妹', female: '妹妹' } },

  // 直系晚辈
  { id: 's', name: '儿子', generation: -1, appellation: { male: '儿子', female: '儿子' } },
  { id: 'd', name: '女儿', generation: -1, appellation: { male: '女儿', female: '女儿' } },
  { id: 'ss', name: '孙子', generation: -2, appellation: { male: '孙子', female: '孙子' } },
  { id: 'sd', name: '孙女', generation: -2, appellation: { male: '孙女', female: '孙女' } },
  { id: 'ds', name: '外孙', generation: -2, appellation: { male: '外孙', female: '外孙' } },
  { id: 'dd', name: '外孙女', generation: -2, appellation: { male: '外孙女', female: '外孙女' } }
];

// 特殊关系组合
export const specialRelations: Record<string, Record<string, string>> = {
  'f': {
    'f': '爷爷',
    'm': '奶奶',
    'ob': '伯父',
    'lb': '叔父',
    'os': '姑姑',
    'ls': '姑姑'
  },
  'm': {
    'f': '外公',
    'm': '外婆',
    'ob': '舅父',
    'lb': '舅父',
    'os': '姨妈',
    'ls': '姨妈'
  },
  'h': {
    'f': '公公',
    'm': '婆婆',
    'ob': '大伯',
    'lb': '小叔',
    'os': '大姑',
    'ls': '小姑'
  },
  'w': {
    'f': '岳父',
    'm': '岳母',
    'ob': '大舅',
    'lb': '小舅',
    'os': '大姨',
    'ls': '小姨'
  }
};

// 复合关系
export const compoundRelations: Record<string, (gender: string) => string> = {
  'sw': (gender: string) => '儿媳',
  'dh': (gender: string) => '女婿',
  'ss': (gender: string) => '孙子',
  'sd': (gender: string) => '孙女',
  'ds': (gender: string) => '外孙',
  'dd': (gender: string) => '外孙女'
};

// 工具函数
export const relationshipUtils = {
  // 获取代际差异
  getGenerationDiff: (path: string[]): number => {
    return path.reduce((acc, rel) => {
      const relationship = relationships.find(r => r.id === rel);
      return acc + (relationship?.generation || 0);
    }, 0);
  },

  // 获取性别
  getGender: (path: string[]): string | undefined => {
    const lastRel = path[path.length - 1];
    const relationship = relationships.find(r => r.id === lastRel);
    if (!relationship) return undefined;
    return relationship.id === 'h' || relationship.id === 's' || relationship.id === 'ss' || relationship.id === 'ds'
      ? 'male'
      : 'female';
  },

  // 判断是否姻亲
  isInLaw: (path: string[]): boolean => {
    return path.some(rel => rel === 'h' || rel === 'w');
  },

  // 判断是否直系亲属
  isDirectRelative: (path: string[]): boolean => {
    const directIds = ['f', 'm', 's', 'd', 'ss', 'sd', 'ds', 'dd'];
    return path.every(rel => directIds.includes(rel));
  },

  // 判断是否表亲
  isCousin: (path: string[]): boolean => {
    const cousinPattern = /^[fm][osl][bsd]/;
    return cousinPattern.test(path.join(''));
  }
};