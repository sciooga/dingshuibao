
import React from 'react';
import { ShieldCheck, Info, ChevronRight, Package, ArrowLeftRight } from 'lucide-react';

const DepositPage: React.FC = () => {
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-full">
      {/* Deposit Overview Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between border border-gray-50">
        <div>
          <p className="text-xs text-gray-400">当前持桶数量</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-bold text-gray-800">2</span>
            <span className="text-sm text-gray-400">个</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">冻结押金</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-blue-600">¥100.00</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <ArrowLeftRight className="text-blue-500" />
          <span className="text-sm font-bold text-gray-700">退桶退款</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex flex-col items-center gap-2 active:scale-95 transition-transform">
          <Package className="text-orange-500" />
          <span className="text-sm font-bold text-gray-700">押金充值</span>
        </button>
      </div>

      {/* History */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50">
        <div className="p-4 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-sm">押金明细</h3>
          <Info size={16} className="text-gray-300" />
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { type: '订水押金', date: '2024-10-15', amount: '-50.00', status: '已支付', note: '农夫山泉 19L' },
            { type: '押金退回', date: '2024-09-20', amount: '+50.00', status: '已退回', note: '轿子山泉' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-800">{item.type}</p>
                <p className="text-[10px] text-gray-400">{item.date} | {item.note}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${item.amount.startsWith('+') ? 'text-green-500' : 'text-gray-800'}`}>{item.amount}</p>
                <p className="text-[10px] text-gray-400">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Policy */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
        <ShieldCheck size={20} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-[11px] text-blue-700 leading-relaxed">
          <strong>退款说明：</strong> 申请退桶后，配送员将在24小时内上门回收空桶。回收完成后，押金将原路退回至您的支付账号或账户余额。
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
