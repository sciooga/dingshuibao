
import React from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const TransactionHistoryPage: React.FC = () => {
  const transactions = [
    { id: 1, title: '余额充值', type: 'income', amount: '100.00', date: '2024-10-22 14:30:25', balance: '128.50' },
    { id: 2, title: '充值赠送', type: 'income', amount: '20.00', date: '2024-10-22 14:30:25', balance: '28.50' },
    { id: 3, title: '商品消费', type: 'expense', amount: '36.00', date: '2024-10-21 09:15:00', balance: '8.50' },
    { id: 4, title: '余额充值', type: 'income', amount: '50.00', date: '2024-10-15 18:20:11', balance: '44.50' },
    { id: 5, title: '退款收入', type: 'income', amount: '18.00', date: '2024-10-10 11:05:33', balance: '-5.50' },
    { id: 6, title: '商品消费', type: 'expense', amount: '22.00', date: '2024-10-01 10:00:00', balance: '-23.50' },
  ];

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="p-4 space-y-4">
        {transactions.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-50 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.type === 'income' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
                 {item.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-800">{item.title}</p>
                 <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
               </div>
             </div>
             <div className="text-right">
               <p className={`text-base font-bold ${item.type === 'income' ? 'text-blue-600' : 'text-gray-900'}`}>
                 {item.type === 'income' ? '+' : '-'}{item.amount}
               </p>
               <p className="text-[10px] text-gray-400 mt-0.5 flex items-center justify-end gap-1">
                 <Wallet size={10} /> 余额: {item.balance}
               </p>
             </div>
          </div>
        ))}
        
        <div className="py-8 text-center text-xs text-gray-400">
          仅展示最近半年的收支明细
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
