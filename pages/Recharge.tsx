
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ShieldCheck, CheckCircle, ChevronRight } from 'lucide-react';
import { RECHARGE_PACKAGES } from '../constants';

const RechargePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(RECHARGE_PACKAGES[1].id);
  const [customAmount, setCustomAmount] = useState('');
  const [agree, setAgree] = useState(true);

  const handleSelectPackage = (id: string) => {
    setSelectedId(id);
    if (id !== 'custom') {
      setCustomAmount('');
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex justify-between items-start">
          <p className="text-sm opacity-80">当前账户余额 (元)</p>
          <button 
            onClick={() => navigate('/transaction-history')}
            className="flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm active:scale-95 transition-transform"
          >
            <History size={14} /> 交易明细
          </button>
        </div>
        <h2 className="text-4xl font-bold mt-2">128.50</h2>
        <div className="flex gap-6 mt-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-[10px] opacity-60">本金余额</p>
            <p className="font-bold">¥100.00</p>
          </div>
          <div>
            <p className="text-[10px] opacity-60">赠送余额</p>
            <p className="font-bold">¥28.50</p>
          </div>
        </div>
      </div>

      {/* Recharge Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">充值金额</h3>
          <span className="text-xs text-blue-500 flex items-center cursor-pointer">
            充值规则说明 <ChevronRight size={14} />
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {RECHARGE_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              onClick={() => handleSelectPackage(pkg.id)}
              className={`p-4 rounded-xl border-2 transition-all relative cursor-pointer h-[84px] flex flex-col justify-center ${selectedId === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-50 bg-white'}`}
            >
              {pkg.isRecommended && (
                <div className="absolute -top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">商家推荐</div>
              )}
              <div className="text-lg font-bold">¥{pkg.amount}</div>
              <div className="text-xs text-gray-500 mt-1">送 ¥{pkg.bonus} 赠额</div>
            </div>
          ))}
          
          {/* Custom Amount Input Field */}
          <div 
            onClick={() => handleSelectPackage('custom')}
            className={`p-4 rounded-xl border-2 transition-all relative cursor-pointer h-[84px] flex flex-col justify-center ${selectedId === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-50 bg-white'}`}
          >
            <div className="flex items-center">
              <span className={`text-lg font-bold mr-1 ${selectedId === 'custom' ? 'text-blue-600' : 'text-gray-400'}`}>¥</span>
              <input
                type="number"
                placeholder="自定义金额"
                className="w-full bg-transparent text-lg font-bold outline-none placeholder:text-gray-400 placeholder:font-normal"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedId('custom');
                }}
              />
            </div>
            {selectedId === 'custom' && (
              <div className="text-[10px] text-blue-500 mt-1">请输入充值金额</div>
            )}
          </div>
        </div>
      </div>

      {/* Rules Info */}
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
        <Info size={20} className="text-orange-500 shrink-0 mt-0.5" />
        <div className="text-xs text-orange-700 leading-relaxed">
          温馨提示：电子余额仅限订购单品水及配件，不可用于直接购买优惠水票套餐或其它组合产品。
        </div>
      </div>

      {/* Agreement & Action */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => setAgree(!agree)}>
          <CheckCircle 
            size={18} 
            className={`shrink-0 transition-colors ${agree ? 'text-blue-500' : 'text-gray-300'}`} 
          />
          <p className="text-xs text-gray-500 whitespace-nowrap">
            我已阅读并同意 <span className="text-blue-500">《交易条款及用户服务协议》</span>
          </p>
        </div>
        
        <button 
          disabled={!agree || (selectedId === 'custom' && !customAmount)}
          className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${agree && !(selectedId === 'custom' && !customAmount) ? 'bg-blue-600 text-white active:scale-95 shadow-blue-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
        >
          立即充值
        </button>

        <div className="flex items-center justify-center gap-1 text-gray-400 text-[10px]">
          <ShieldCheck size={14} /> 账户资金由平台存管系统加密保障
        </div>
      </div>
    </div>
  );
};

const Info = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default RechargePage;
