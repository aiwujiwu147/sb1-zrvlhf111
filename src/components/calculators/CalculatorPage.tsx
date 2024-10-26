import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { calculators } from '../data/calculators';
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import BusinessLoanCalculator from '../components/calculators/BusinessLoanCalculator';
import CarLoanCalculator from '../components/calculators/CarLoanCalculator';
import IncomeTaxCalculator from '../components/calculators/IncomeTaxCalculator';
import PregnancyCalculator from '../components/calculators/PregnancyCalculator';
import UnitConverter from '../components/calculators/UnitConverter';
import BMICalculator from '../components/calculators/BMICalculator';
import FetalCalculator from '../components/calculators/FetalCalculator';
import SafePeriodCalculator from '../components/calculators/SafePeriodCalculator';
import OvulationCalculator from '../components/calculators/OvulationCalculator';
import MenstrualCalculator from '../components/calculators/MenstrualCalculator';
import DateCalculator from '../components/calculators/DateCalculator';
import TimeCalculator from '../components/calculators/TimeCalculator';
import AgeCalculator from '../components/calculators/AgeCalculator';
import VehiclePurchaseTaxCalculator from '../components/calculators/VehiclePurchaseTaxCalculator';
import SocialInsuranceCalculator from '../components/calculators/SocialInsuranceCalculator';
import DepositCalculator from '../components/calculators/DepositCalculator';
import ScientificCalculator from '../components/calculators/ScientificCalculator';
import EquationCalculator from '../components/calculators/EquationCalculator';
import TrigonometricCalculator from '../components/calculators/TrigonometricCalculator';
import SubnetCalculator from '../components/calculators/SubnetCalculator';
import PowerCalculator from '../components/calculators/PowerCalculator';
import HousePurchaseCalculator from '../components/calculators/HousePurchaseCalculator';
import NotFound from './NotFound';

const calculatorComponents: Record<string, React.ComponentType<any>> = {
  fangdai: MortgageCalculator,
  shangyedaikuan: BusinessLoanCalculator,
  chedai: CarLoanCalculator,
  gerensuodeshui: IncomeTaxCalculator,
  yuqijisuanqi: PregnancyCalculator,
  danweihuansuan: UnitConverter,
  bmi: BMICalculator,
  taier: FetalCalculator,
  anquanqi: SafePeriodCalculator,
  paiyun: OvulationCalculator,
  yuejing: MenstrualCalculator,
  riqi: DateCalculator,
  shijian: TimeCalculator,
  nianling: AgeCalculator,
  gouzhishui: VehiclePurchaseTaxCalculator,
  wuxianyijin: SocialInsuranceCalculator,
  cunkuan: DepositCalculator,
  kexue: ScientificCalculator,
  fangcheng: EquationCalculator,
  sanjiao: TrigonometricCalculator,
  ziwang: SubnetCalculator,
  gonglv: PowerCalculator,
  maifang: HousePurchaseCalculator
};

export default function CalculatorPage() {
  const { id } = useParams<{ id: string }>();
  const calculator = calculators.find(calc => calc.id === id);
  
  if (!calculator) {
    return <NotFound />;
  }

  const CalculatorComponent = calculatorComponents[calculator.id];

  if (!CalculatorComponent) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">计算器开发中</h2>
          <p className="mt-2 text-gray-600">此计算器正在开发中，敬请期待。</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{calculator.title} - 计算器中心</title>
        <meta name="description" content={calculator.description} />
      </Helmet>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{calculator.title}</h1>
              <p className="mt-2 text-gray-600">{calculator.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <CalculatorComponent calculator={calculator} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}