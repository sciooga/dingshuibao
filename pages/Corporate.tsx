
import React from 'react';
import { 
  Building2, 
  FileText, 
  Truck, 
  Settings2, 
  CreditCard, 
  Headphones,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const CorporatePage: React.FC = () => {
  const services = [
    { label: '桶装水', icon: <Truck className="text-blue-500" /> },
    { label: '免押金', icon: <ShieldCheck className="text-green-500" /> },
    { label: '瓶装水', icon: <Truck className="text-cyan-500" /> },
    { label: '饮水机', icon: <Building2 className="text-indigo-500" /> },
    { label: '申请发票', icon: <FileText className="text-orange-500" /> },
    { label: '押金管理', icon: <Settings2 className="text-gray-500" /> },
    { label: '对公支付', icon: <CreditCard className="text-purple-500" /> },
    { label: '专属定制', icon: <FileText className="text-pink-500" /> },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Hero */}
      <div className="h-48 bg-blue-600 relative flex flex-col justify-center px-6 overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Building2 size={120} />
        </div>
        <h2 className="text-2xl font-bold text-white relative z-10">企业专属订水服务</h2>
        <p className="text-blue-100 mt-2 text-sm relative z-10 max-w-[240px]">
          极速配送、对公结算、增值税发票，为您提供一站式商用饮水解决方案。
        </p>
        <button className="mt-4 bg-white text-blue-600 self-start px-6 py-2 rounded-full font-bold text-xs shadow-xl active:scale-95 transition-all">
          立即咨询
        </button>
      </div>

      {/* Service Grid */}
      <div className="px-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-4 gap-y-6">
          {services.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60">
              <div className="bg-gray-50 p-3 rounded-xl">{s.icon}</div>
              <span className="text-[11px] font-medium text-gray-600">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Packages */}
      <div className="px-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">企业优惠套餐</h3>
          <span className="text-xs text-blue-500 flex items-center">查看全部 <ChevronRight size={14} /></span>
        </div>
        <div className="space-y-3">
          {[
            { name: '中型初创礼包 (50桶/月)', price: '888', desc: '赠送高端立式饮水机 * 1' },
            { name: '大型名企礼包 (100桶/月)', price: '1688', desc: '赠送台式冰热饮水机 * 2 + 纸杯' },
          ].map((pkg, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-50">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800">{pkg.name}</h4>
                <p className="text-[10px] text-gray-400">{pkg.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold">¥{pkg.price}</p>
                <button className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full mt-1">详情</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Banner */}
      <div className="px-4">
        <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-lg text-white">
              <Headphones size={20} />
            </div>
            <div>
              <p className="text-white text-sm font-bold">企服管家：陈经理</p>
              <p className="text-gray-400 text-[10px]">工作日 08:30 - 18:00 为您服务</p>
            </div>
          </div>
          <button className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">拨号</button>
        </div>
      </div>
    </div>
  );
};

export default CorporatePage;
