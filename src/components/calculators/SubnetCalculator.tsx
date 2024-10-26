import { useState } from 'react';
import { CalculatorProps } from '../../types/calculator';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import ResultCard from '../common/ResultCard';
import SubnetCalculatorDocs from './SubnetCalculatorDocs';

interface IPAddress {
  octets: number[];
  cidr: number;
}

interface SubnetInfo {
  networkAddress: string;
  broadcastAddress: string;
  firstHost: string;
  lastHost: string;
  subnetMask: string;
  wildcardMask: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  binary: {
    address: string;
    subnetMask: string;
    networkAddress: string;
    broadcastAddress: string;
  };
}

export default function SubnetCalculator({ calculator }: CalculatorProps) {
  const [ipInput, setIpInput] = useState<string>('192.168.1.0');
  const [cidr, setCidr] = useState<number>(24);
  const [showBinary, setShowBinary] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [calculationType, setCalculationType] = useState<'single' | 'vlsm'>('single');
  const [requiredSubnets, setRequiredSubnets] = useState<number>(0);
  const [hostsPerSubnet, setHostsPerSubnet] = useState<number>(0);

  const parseIPAddress = (ip: string): IPAddress | null => {
    const parts = ip.split('.');
    if (parts.length !== 4) return null;

    const octets = parts.map(part => parseInt(part, 10));
    if (octets.some(octet => isNaN(octet) || octet < 0 || octet > 255)) return null;

    return { octets, cidr };
  };

  const toBinary = (num: number, padding: number = 8): string => {
    return num.toString(2).padStart(padding, '0');
  };

  const toDecimal = (binary: string): number => {
    return parseInt(binary, 2);
  };

  const getIPClass = (firstOctet: number): string => {
    if (firstOctet < 128) return 'A';
    if (firstOctet < 192) return 'B';
    if (firstOctet < 224) return 'C';
    if (firstOctet < 240) return 'D';
    return 'E';
  };

  const calculateSubnet = (ip: IPAddress): SubnetInfo => {
    // 生成子网掩码二进制
    const maskBinary = '1'.repeat(ip.cidr) + '0'.repeat(32 - ip.cidr);
    const maskOctets = maskBinary.match(/.{8}/g)!.map(octet => toDecimal(octet));
    
    // 生成通配符掩码
    const wildcardOctets = maskOctets.map(octet => 255 - octet);

    // 计算网络地址
    const networkOctets = ip.octets.map((octet, i) => octet & maskOctets[i]);
    
    // 计算广播地址
    const broadcastOctets = networkOctets.map((octet, i) => octet | wildcardOctets[i]);

    // 计算第一个和最后一个可用主机地址
    const firstHostOctets = [...networkOctets];
    firstHostOctets[3] += 1;

    const lastHostOctets = [...broadcastOctets];
    lastHostOctets[3] -= 1;

    // 计算可用主机数
    const totalHosts = Math.pow(2, 32 - ip.cidr);
    const usableHosts = Math.max(totalHosts - 2, 0);

    // 生成二进制表示
    const addressBinary = ip.octets.map(octet => toBinary(octet)).join('');
    const networkBinary = networkOctets.map(octet => toBinary(octet)).join('');
    const broadcastBinary = broadcastOctets.map(octet => toBinary(octet)).join('');

    return {
      networkAddress: networkOctets.join('.'),
      broadcastAddress: broadcastOctets.join('.'),
      firstHost: firstHostOctets.join('.'),
      lastHost: lastHostOctets.join('.'),
      subnetMask: maskOctets.join('.'),
      wildcardMask: wildcardOctets.join('.'),
      totalHosts,
      usableHosts,
      ipClass: getIPClass(ip.octets[0]),
      binary: {
        address: addressBinary,
        subnetMask: maskBinary,
        networkAddress: networkBinary,
        broadcastAddress: broadcastBinary
      }
    };
  };

  const calculateVLSM = () => {
    const baseIp = parseIPAddress(ipInput);
    if (!baseIp) return [];

    const subnets = [];
    let currentNetwork = [...baseIp.octets];
    let remainingBits = 32 - cidr;

    for (let i = 0; i < requiredSubnets; i++) {
      const hostsNeeded = hostsPerSubnet;
      const bitsNeeded = Math.ceil(Math.log2(hostsNeeded + 2));
      const newCidr = 32 - bitsNeeded;

      const subnet = calculateSubnet({
        octets: currentNetwork,
        cidr: newCidr
      });

      subnets.push({
        ...subnet,
        requiredHosts: hostsNeeded,
        allocatedHosts: Math.pow(2, bitsNeeded) - 2
      });

      // 计算下一个子网的起始地址
      const nextNetwork = subnet.broadcastAddress.split('.').map(Number);
      nextNetwork[3] += 1;
      currentNetwork = nextNetwork;
    }

    return subnets;
  };

  const ip = parseIPAddress(ipInput);
  const subnetInfo = ip ? calculateSubnet(ip) : null;
  const vlsmResults = calculationType === 'vlsm' ? calculateVLSM() : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="计算类型"
              value={calculationType}
              onChange={(value) => setCalculationType(value as 'single' | 'vlsm')}
              options={[
                { value: 'single', label: '单一子网' },
                { value: 'vlsm', label: '可变长子网掩码(VLSM)' }
              ]}
            />

            <InputField
              label="IP地址"
              value={ipInput}
              onChange={(value) => setIpInput(value as string)}
              type="text"
            />

            <InputField
              label="CIDR前缀"
              value={cidr}
              onChange={setCidr}
              type="number"
              min={0}
              max={32}
              step={1}
              suffix="位"
            />

            {calculationType === 'vlsm' && (
              <>
                <InputField
                  label="所需子网数量"
                  value={requiredSubnets}
                  onChange={setRequiredSubnets}
                  type="number"
                  min={1}
                  step={1}
                />
                <InputField
                  label="每个子网所需主机数"
                  value={hostsPerSubnet}
                  onChange={setHostsPerSubnet}
                  type="number"
                  min={1}
                  step={1}
                />
              </>
            )}
          </div>
        </div>

        {/* 计算结果 */}
        {calculationType === 'single' && subnetInfo && (
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResultCard
                title="网络地址"
                value={subnetInfo.networkAddress}
                className="bg-white"
              />
              <ResultCard
                title="广播地址"
                value={subnetInfo.broadcastAddress}
                className="bg-white"
              />
              <ResultCard
                title="子网掩码"
                value={subnetInfo.subnetMask}
                className="bg-white"
              />
              <ResultCard
                title="可用主机数"
                value={subnetInfo.usableHosts.toLocaleString()}
                className="bg-white"
              />
              <ResultCard
                title="IP地址类别"
                value={`Class ${subnetInfo.ipClass}`}
                className="bg-white"
              />
              <ResultCard
                title="通配符掩码"
                value={subnetInfo.wildcardMask}
                className="bg-white"
              />
            </div>

            <div className="mt-4">
              <button
                onClick={() => setShowBinary(!showBinary)}
                className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
              >
                {showBinary ? '隐藏二进制表示' : '显示二进制表示'}
              </button>

              {showBinary && (
                <div className="mt-4 space-y-2 font-mono text-sm">
                  <div>IP地址: {subnetInfo.binary.address.match(/.{8}/g)?.join('.')}</div>
                  <div>子网掩码: {subnetInfo.binary.subnetMask.match(/.{8}/g)?.join('.')}</div>
                  <div>网络地址: {subnetInfo.binary.networkAddress.match(/.{8}/g)?.join('.')}</div>
                  <div>广播地址: {subnetInfo.binary.broadcastAddress.match(/.{8}/g)?.join('.')}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VLSM结果 */}
        {calculationType === 'vlsm' && vlsmResults.length > 0 && (
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">VLSM子网划分结果</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">子网</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">网络地址</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">子网掩码</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">可用主机数</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">广播地址</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vlsmResults.map((subnet, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-900">子网 {index + 1}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{subnet.networkAddress}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{subnet.subnetMask}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{subnet.usableHosts}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{subnet.broadcastAddress}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 详细信息 */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="w-full md:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
          >
            {showDetail ? '隐藏详细信息' : '查看详细信息'}
          </button>

          {showDetail && subnetInfo && (
            <div className="mt-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">详细信息</h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">第一个可用主机</dt>
                    <dd className="mt-1 text-sm text-gray-900">{subnetInfo.firstHost}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">最后一个可用主机</dt>
                    <dd className="mt-1 text-sm text-gray-900">{subnetInfo.lastHost}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">总主机数</dt>
                    <dd className="mt-1 text-sm text-gray-900">{subnetInfo.totalHosts.toLocaleString()}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">CIDR表示法</dt>
                    <dd className="mt-1 text-sm text-gray-900">{ipInput}/{cidr}</dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 使用说明和案例文档 */}
      <SubnetCalculatorDocs />
    </div>
  );
}