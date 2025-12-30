
import React, { useState } from 'react';
import { Search, MapPin, Ticket, ShoppingCart, X } from 'lucide-react';
import { MOCK_TICKETS, MOCK_STORES } from '../constants';

const TicketsPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeBrand, setActiveBrand] = useState('全部');
  const [selectedStore, setSelectedStore] = useState(MOCK_STORES[0]);

  const brands = ['全部', '农夫山泉', '娃哈哈', '景田', '怡宝'];

  const filteredTickets = MOCK_TICKETS.filter(t => 
    (activeBrand === '全部' || t.category === activeBrand) &&
    (t.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 space-y-4">
      {/* Store Switcher */}
      <div className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm border border-gray-50">
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-blue-500" />
          <span className="text-sm font-bold truncate max-w-[180px]">{selectedStore.name}</span>
        </div>
        <button className="text-xs text-blue-500 font-bold border border-blue-100 px-3 py-1 rounded-full active:bg-blue-50 transition-colors">切换门店</button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="搜索套餐名称..."
          className="w-full bg-white rounded-full py-2.5 pl-10 pr-10 text-sm border border-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 active:text-gray-500"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Brand Category Filter */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
        {brands.map(brand => (
          <button 
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeBrand === brand ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-gray-500 border border-gray-100 active:bg-gray-50'}`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-4 pb-4">
        {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
          <div key={ticket.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50 flex flex-col hover:shadow-md transition-shadow">
            <div className="relative h-44">
              <img src={ticket.image} alt={ticket.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                <Ticket size={12} /> {ticket.category}专享
              </div>
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                节省 ¥{ticket.savings}
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-gray-800 text-sm">{ticket.name}</h3>
                <div className="flex gap-2 mt-2">
                   <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">送货上门</span>
                   <span className="text-[9px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded font-bold">极速配送</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-blue-600">¥{ticket.price}</span>
                  {ticket.packageDetail && (
                    <span className="text-[10px] text-gray-400 font-bold">/{ticket.packageDetail}</span>
                  )}
                  {ticket.originalPrice && (
                    <span className="text-xs text-gray-300 line-through ml-1 font-medium">¥{ticket.originalPrice}</span>
                  )}
                </div>
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-transform">
                  <ShoppingCart size={14} /> 立即购买
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center space-y-3">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Ticket size={32} className="text-gray-200" />
            </div>
            <p className="text-sm text-gray-400">暂无该分类套餐</p>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-3 py-4 bg-white/50 rounded-2xl border border-dashed border-gray-200">
        {[
          { label: '电子凭证', desc: '不怕丢失' },
          { label: '有效期长', desc: '安心订水' },
          { label: '量大优惠', desc: '多买多送' },
        ].map((benefit, i) => (
          <div key={i} className="text-center space-y-1">
            <div className="text-xs font-black text-gray-700">{benefit.label}</div>
            <div className="text-[10px] text-gray-400 font-medium">{benefit.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketsPage;
