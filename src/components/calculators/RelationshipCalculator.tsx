import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import RelationshipCalculatorDocs from './RelationshipCalculatorDocs';
import { 
  relationships, 
  relationshipUtils, 
  specialRelations, 
  compoundRelations,
  Relationship 
} from '../../utils/relationshipUtils';

// 关系分组定义
const relationshipGroups = [
  {
    id: 'direct-up',
    name: '长辈',
    relations: relationships.filter(r => r.generation > 0 && ['f', 'm', 'ff', 'fm', 'mf', 'mm'].includes(r.id))
  },
  {
    id: 'uncles',
    name: '叔舅姑姨',
    relations: relationships.filter(r => r.generation === 1 && !['f', 'm'].includes(r.id))
  },
  {
    id: 'siblings',
    name: '兄弟姐妹',
    relations: relationships.filter(r => r.generation === 0 && !['h', 'w'].includes(r.id))
  },
  {
    id: 'spouse',
    name: '配偶',
    relations: relationships.filter(r => ['h', 'w'].includes(r.id))
  },
  {
    id: 'children',
    name: '子女',
    relations: relationships.filter(r => r.generation === -1)
  },
  {
    id: 'grandchildren',
    name: '孙辈',
    relations: relationships.filter(r => r.generation === -2)
  }
];

export default function RelationshipCalculator({ calculator }: CalculatorProps) {
  const [relationshipPath, setRelationshipPath] = useState<string[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const calculateRelationship = (path: string[]): string => {
    if (path.length === 0) return '自己';

    const generationDiff = relationshipUtils.getGenerationDiff(path);
    const resultGender = relationshipUtils.getGender(path);
    const isInLaw = relationshipUtils.isInLaw(path);
    const isDirect = relationshipUtils.isDirectRelative(path);
    const isCousin = relationshipUtils.isCousin(path);

    const pathString = path.join('');
    if (compoundRelations[pathString]) {
      return compoundRelations[pathString](gender);
    }

    if (path.length === 1) {
      const rel = relationships.find(r => r.id === path[0]);
      return rel?.appellation?.[gender] || rel?.name || '未知关系';
    }

    let result = '';
    let currentGender = gender;
    
    // 处理特殊关系
    for (let i = 0; i < path.length - 1; i++) {
      const rel = path[i];
      const nextRel = path[i + 1];
      
      if (specialRelations[rel] && specialRelations[rel][nextRel]) {
        result = specialRelations[rel][nextRel];
        currentGender = relationshipUtils.getGender(path.slice(0, i + 2)) || currentGender;
        break;
      }
    }

    if (!result) {
      result = generateRelationship(path, gender, generationDiff, isInLaw, isDirect, isCousin);
    }

    return result;
  };

  const generateRelationship = (
    path: string[], 
    gender: 'male' | 'female',
    generationDiff: number,
    isInLaw: boolean,
    isDirect: boolean,
    isCousin: boolean
  ): string => {
    let prefix = '';
    let suffix = '';
    
    if (generationDiff > 0) {
      if (generationDiff === 1) {
        prefix = isDirect ? '' : (isInLaw ? '姻' : isCousin ? '表' : '堂');
      } else if (generationDiff === 2) {
        prefix = isDirect ? '' : '外';
      } else if (generationDiff === 3) {
        prefix = '曾';
      } else if (generationDiff > 3) {
        prefix = '高' + '曾'.repeat(generationDiff - 3);
      }
    } else if (generationDiff < 0) {
      if (generationDiff === -1) {
        prefix = isDirect ? '' : (isInLaw ? '姻' : isCousin ? '表' : '堂');
      } else if (generationDiff === -2) {
        prefix = isDirect ? '' : '外';
      } else if (generationDiff === -3) {
        prefix = '曾';
      } else if (generationDiff < -3) {
        prefix = '玄' + '孙'.repeat(Math.abs(generationDiff) - 3);
      }
    }

    const lastRel = relationships.find(r => r.id === path[path.length - 1]);
    const baseName = lastRel?.name.replace(/[一二三四五]/, '') || '未知';

    return prefix + baseName + suffix;
  };

  const addRelation = (relation: string) => {
    setRelationshipPath([...relationshipPath, relation]);
  };

  const removeLastRelation = () => {
    setRelationshipPath(relationshipPath.slice(0, -1));
  };

  const clearRelations = () => {
    setRelationshipPath([]);
  };

  const result = calculateRelationship(relationshipPath);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="我的性别"
              value={gender}
              onChange={(value) => setGender(value as 'male' | 'female')}
              options={[
                { value: 'male', label: '男' },
                { value: 'female', label: '女' }
              ]}
            />

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                已选择的关系路径
              </label>
              <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 bg-gray-50 rounded-lg">
                {relationshipPath.map((rel, index) => {
                  const relationship = relationships.find(r => r.id === rel);
                  return (
                    <span
                      key={`${rel}-${index}`}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {relationship?.name || '未知'}
                      <button
                        onClick={() => setRelationshipPath(relationshipPath.slice(0, index))}
                        className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {relationshipGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-500">
                  {group.name}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.relations.map((rel) => (
                    <button
                      key={rel.id}
                      onClick={() => addRelation(rel.id)}
                      className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      {rel.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">计算结果</h2>
            <p className="text-3xl font-bold text-indigo-600">{result}</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex justify-center space-x-4">
            <button
              onClick={removeLastRelation}
              disabled={relationshipPath.length === 0}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              撤销
            </button>
            <button
              onClick={clearRelations}
              disabled={relationshipPath.length === 0}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              清空
            </button>
          </div>
        </div>
      </div>

      <RelationshipCalculatorDocs />
    </div>
  );
}