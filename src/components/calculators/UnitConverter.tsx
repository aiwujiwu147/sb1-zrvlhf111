import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import UnitConverterDocs from './UnitConverterDocs';

const formatNumber = (num: number): string => {
  if (Math.abs(num) >= 1e9) {
    return num.toExponential(6);
  }
  if (Math.abs(num) < 0.000001) {
    return num.toExponential(6);
  }
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6
  });
};

const unitTypes = [
  { value: 'length', label: '长度' },
  { value: 'area', label: '面积' },
  { value: 'volume', label: '体积' },
  { value: 'weight', label: '重量' },
  { value: 'temperature', label: '温度' },
  { value: 'pressure', label: '压力' },
  { value: 'energy', label: '能量' },
  { value: 'speed', label: '速度' },
  { value: 'data', label: '数据存储' },
  { value: 'time', label: '时间' }
];

const units = {
  length: [
    { value: 'pm', label: '皮米 (pm)', factor: 1e-12 },
    { value: 'nm', label: '纳米 (nm)', factor: 1e-9 },
    { value: 'um', label: '微米 (μm)', factor: 1e-6 },
    { value: 'mm', label: '毫米 (mm)', factor: 0.001 },
    { value: 'cm', label: '厘米 (cm)', factor: 0.01 },
    { value: 'dm', label: '分米 (dm)', factor: 0.1 },
    { value: 'm', label: '米 (m)', factor: 1 },
    { value: 'km', label: '千米 (km)', factor: 1000 },
    { value: 'in', label: '英寸 (in)', factor: 0.0254 },
    { value: 'ft', label: '英尺 (ft)', factor: 0.3048 },
    { value: 'yd', label: '码 (yd)', factor: 0.9144 },
    { value: 'mi', label: '英里 (mi)', factor: 1609.344 },
    { value: 'nmi', label: '海里 (nmi)', factor: 1852 }
  ],
  area: [
    { value: 'mm2', label: '平方毫米 (mm²)', factor: 0.000001 },
    { value: 'cm2', label: '平方厘米 (cm²)', factor: 0.0001 },
    { value: 'dm2', label: '平方分米 (dm²)', factor: 0.01 },
    { value: 'm2', label: '平方米 (m²)', factor: 1 },
    { value: 'a', label: '公亩 (a)', factor: 100 },
    { value: 'ha', label: '公顷 (ha)', factor: 10000 },
    { value: 'km2', label: '平方千米 (km²)', factor: 1000000 },
    { value: 'in2', label: '平方英寸 (in²)', factor: 0.00064516 },
    { value: 'ft2', label: '平方英尺 (ft²)', factor: 0.092903 },
    { value: 'yd2', label: '平方码 (yd²)', factor: 0.836127 },
    { value: 'ac', label: '英亩 (ac)', factor: 4046.86 },
    { value: 'mi2', label: '平方英里 (mi²)', factor: 2589988.11 }
  ],
  volume: [
    { value: 'mm3', label: '立方毫米 (mm³)', factor: 0.000001 },
    { value: 'cm3', label: '立方厘米 (cm³)', factor: 0.001 },
    { value: 'ml', label: '毫升 (ml)', factor: 0.001 },
    { value: 'l', label: '升 (l)', factor: 1 },
    { value: 'm3', label: '立方米 (m³)', factor: 1000 },
    { value: 'in3', label: '立方英寸 (in³)', factor: 0.016387 },
    { value: 'ft3', label: '立方英尺 (ft³)', factor: 28.3168 },
    { value: 'gal', label: '加仑 (gal)', factor: 3.78541 },
    { value: 'bbl', label: '桶 (bbl)', factor: 158.987 }
  ],
  weight: [
    { value: 'mg', label: '毫克 (mg)', factor: 0.001 },
    { value: 'g', label: '克 (g)', factor: 1 },
    { value: 'kg', label: '千克 (kg)', factor: 1000 },
    { value: 't', label: '吨 (t)', factor: 1000000 },
    { value: 'gr', label: '格令 (gr)', factor: 0.0648 },
    { value: 'oz', label: '盎司 (oz)', factor: 28.3495 },
    { value: 'lb', label: '磅 (lb)', factor: 453.592 },
    { value: 'st', label: '英石 (st)', factor: 6350.29 },
    { value: 'cwt', label: '英担 (cwt)', factor: 50802.3 }
  ],
  temperature: [
    { value: 'c', label: '摄氏度 (°C)' },
    { value: 'f', label: '华氏度 (°F)' },
    { value: 'k', label: '开尔文 (K)' }
  ],
  pressure: [
    { value: 'pa', label: '帕斯卡 (Pa)', factor: 1 },
    { value: 'kpa', label: '千帕 (kPa)', factor: 1000 },
    { value: 'mpa', label: '兆帕 (MPa)', factor: 1000000 },
    { value: 'bar', label: '巴 (bar)', factor: 100000 },
    { value: 'atm', label: '标准大气压 (atm)', factor: 101325 },
    { value: 'mmhg', label: '毫米汞柱 (mmHg)', factor: 133.322 },
    { value: 'psi', label: '磅力/平方英寸 (psi)', factor: 6894.76 }
  ],
  energy: [
    { value: 'j', label: '焦耳 (J)', factor: 1 },
    { value: 'kj', label: '千焦 (kJ)', factor: 1000 },
    { value: 'cal', label: '卡路里 (cal)', factor: 4.184 },
    { value: 'kcal', label: '千卡 (kcal)', factor: 4184 },
    { value: 'wh', label: '瓦时 (Wh)', factor: 3600 },
    { value: 'kwh', label: '千瓦时 (kWh)', factor: 3600000 },
    { value: 'btu', label: '英热单位 (BTU)', factor: 1055.06 }
  ],
  speed: [
    { value: 'mps', label: '米/秒 (m/s)', factor: 1 },
    { value: 'kph', label: '千米/时 (km/h)', factor: 0.277778 },
    { value: 'mph', label: '英里/时 (mph)', factor: 0.44704 },
    { value: 'fps', label: '英尺/秒 (ft/s)', factor: 0.3048 },
    { value: 'knot', label: '节 (knot)', factor: 0.514444 }
  ],
  data: [
    { value: 'b', label: '字节 (B)', factor: 1 },
    { value: 'kb', label: '千字节 (KB)', factor: 1024 },
    { value: 'mb', label: '兆字节 (MB)', factor: 1048576 },
    { value: 'gb', label: '吉字节 (GB)', factor: 1073741824 },
    { value: 'tb', label: '太字节 (TB)', factor: 1099511627776 }
  ],
  time: [
    { value: 'ms', label: '毫秒 (ms)', factor: 0.001 },
    { value: 's', label: '秒 (s)', factor: 1 },
    { value: 'min', label: '分钟 (min)', factor: 60 },
    { value: 'h', label: '小时 (h)', factor: 3600 },
    { value: 'd', label: '天 (d)', factor: 86400 },
    { value: 'w', label: '周 (w)', factor: 604800 },
    { value: 'mo', label: '月 (mo)', factor: 2592000 },
    { value: 'y', label: '年 (y)', factor: 31536000 }
  ]
};

export default function UnitConverter({ calculator }: CalculatorProps) {
  const [unitType, setUnitType] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');
  const [value, setValue] = useState<number>(1);
  const [precision, setPrecision] = useState<number>(6);
  const [showCommonConversions, setShowCommonConversions] = useState<boolean>(false);

  const convert = () => {
    if (unitType === 'temperature') {
      if (fromUnit === 'c' && toUnit === 'f') return value * 9/5 + 32;
      if (fromUnit === 'f' && toUnit === 'c') return (value - 32) * 5/9;
      if (fromUnit === 'c' && toUnit === 'k') return value + 273.15;
      if (fromUnit === 'k' && toUnit === 'c') return value - 273.15;
      if (fromUnit === 'f' && toUnit === 'k') return (value - 32) * 5/9 + 273.15;
      if (fromUnit === 'k' && toUnit === 'f') return (value - 273.15) * 9/5 + 32;
      return value;
    }

    const fromFactor = units[unitType as keyof typeof units].find(u => u.value === fromUnit)?.factor || 1;
    const toFactor = units[unitType as keyof typeof units].find(u => u.value === toUnit)?.factor || 1;
    return (value * fromFactor) / toFactor;
  };

  const getCommonConversions = () => {
    if (!units[unitType as keyof typeof units]) return [];
    
    const currentUnit = units[unitType as keyof typeof units].find(u => u.value === fromUnit);
    if (!currentUnit) return [];

    return units[unitType as keyof typeof units]
      .filter(u => u.value !== fromUnit)
      .map(u => ({
        unit: u,
        value: (value * currentUnit.factor) / u.factor
      }));
  };

  const result = convert();
  const commonConversions = getCommonConversions();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SelectField
          label="单位类型"
          value={unitType}
          onChange={(value) => {
            setUnitType(value);
            setFromUnit(units[value as keyof typeof units][0].value);
            setToUnit(units[value as keyof typeof units][1].value);
          }}
          options={unitTypes}
        />

        <InputField
          label="数值"
          value={value}
          onChange={setValue}
          type="number"
          step="any"
        />

        <SelectField
          label="从"
          value={fromUnit}
          onChange={setFromUnit}
          options={units[unitType as keyof typeof units]}
        />

        <SelectField
          label="到"
          value={toUnit}
          onChange={setToUnit}
          options={units[unitType as keyof typeof units]}
        />

        <InputField
          label="精确度"
          value={precision}
          onChange={setPrecision}
          type="number"
          min={0}
          max={10}
          step={1}
          suffix="位小数"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900">
            {formatNumber(value)} {units[unitType as keyof typeof units].find(u => u.value === fromUnit)?.label.split(' ')[0]} = 
          </div>
          <div className="text-3xl font-bold text-indigo-600 break-words mt-2">
            {formatNumber(result)} {units[unitType as keyof typeof units].find(u => u.value === toUnit)?.label.split(' ')[0]}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowCommonConversions(!showCommonConversions)}
          className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
        >
          {showCommonConversions ? '隐藏常用换算' : '显示常用换算'}
        </button>

        {showCommonConversions && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonConversions.map(({ unit, value }) => (
              <ResultCard
                key={unit.value}
                title={unit.label}
                value={formatNumber(value)}
                className="bg-white"
              />
            ))}
          </div>
        )}
      </div>

      <UnitConverterDocs />
    </div>
  );
}