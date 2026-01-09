
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart,
  Phone,
  Crown,
  Headphones,
  Droplets,
  Ticket,
  Coffee
} from 'lucide-react';
import { CORPORATE_PRODUCTS } from '../constants';

const CorporatePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('全部');

  const gridItems = [
    { label: '桶装水', icon: <Droplets className="text-blue-500" size={24} />, category: '桶装水' },
    { label: '瓶装水', icon: <Droplets className="text-cyan-500" size={24} />, category: '瓶装水' },
    { label: '水票套餐', icon: <Ticket className="text-red-500" size={24} />, category: '水票套餐' },
    { label: '饮料', icon: <Coffee className="text-pink-500" size={24} />, category: '饮料' },
  ];

  const categories = ['全部', '桶装水', '瓶装水', '水票套餐', '饮料'];

  const filteredProducts = CORPORATE_PRODUCTS.filter(p => 
    activeCategory === '全部' || p.category === activeCategory
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-24 space-y-4">
      {/* Search Header */}
      <div className="bg-white p-4 sticky top-12 z-20 shadow-sm">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索企业商品、服务..."
              className="w-full bg-gray-100 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
      </div>

      {/* Banner */}
      <div className="px-4">
        <div className="w-full h-36 rounded-xl overflow-hidden relative shadow-sm group">
          <img src="https://picsum.photos/800/300?random=99" alt="Corporate Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex flex-col justify-center px-6">
             <div className="flex items-center gap-2 mb-2">
               <span className="bg-amber-400 text-blue-900 text-[10px] font-black px-1.5 py-0.5 rounded">企业VIP</span>
               <h2 className="text-xl font-bold text-white">企业采购专区</h2>
             </div>
             <p className="text-xs text-blue-100 mb-3 opacity-90 max-w-[200px]">
               大宗采购 · 专属折扣 · 增值税发票
             </p>
             <button className="bg-white text-blue-900 text-xs font-bold px-4 py-1.5 rounded-full self-start shadow-lg active:scale-95 transition-transform">
               立即认证开通
             </button>
          </div>
        </div>
      </div>

      {/* Grid Navigation (Replaced King Kong Area) */}
      <div className="px-4">
        <div className="grid grid-cols-4 gap-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           {gridItems.map((item, i) => (
             <div 
               key={i} 
               className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
               onClick={() => setActiveCategory(item.category)}
             >
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[11px] text-gray-600 font-medium">{item.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 pb-1">
         {categories.map(cat => (
           <button 
             key={cat}
             onClick={() => setActiveCategory(cat)}
             className={`pb-2 text-sm font-bold whitespace-nowrap relative transition-colors ${
               activeCategory === cat ? 'text-blue-600' : 'text-gray-400'
             }`}
           >
             {cat}
             {activeCategory === cat && (
               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300" />
             )}
           </button>
         ))}
      </div>

      {/* Product Grid (Home Style) */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-50 active:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
             <div className="relative aspect-square">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
               {product.tag && (
                 <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                   {product.tag}
                 </span>
               )}
             </div>
             <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
               <div>
                 <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                 <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{product.desc}</p>
               </div>
               
               <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-red-500">企</span>
                    <span className="text-base font-bold text-red-600">¥{product.price}</span>
                    <span className="text-[10px] text-gray-300 line-through ml-1">¥{product.originalPrice}</span>
                  </div>
                  <button className="w-full mt-2 bg-blue-50 text-blue-600 text-xs py-1.5 rounded-lg font-bold flex items-center justify-center gap-1">
                    <ShoppingCart size={12} /> 采购
                  </button>
               </div>
             </div>
          </div>
        ))}
        
        {filteredProducts.length === 0 && (
           <div className="col-span-2 py-10 text-center text-gray-400 text-xs">
             该分类暂无商品，请联系客服咨询
           </div>
        )}
      </div>
       
       {/* Floating Manager Bar */}
       <div className="fixed bottom-20 left-4 right-4 z-20">
        <div className="bg-gray-900/95 backdrop-blur-sm text-white p-3 rounded-xl shadow-2xl flex items-center justify-between border border-gray-800">
           <div className="flex items-center gap-3">
             <div className="bg-gray-800 p-2 rounded-full border border-gray-700">
               <Headphones size={18} className="text-blue-400"/>
             </div>
             <div>
               <p className="text-xs font-bold flex items-center gap-1">大客户经理 <Crown size={10} className="text-amber-400" /></p>
               <p className="text-[10px] text-gray-400">专属方案 / 议价 / 合同</p>
             </div>
           </div>
           <button className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-1 shadow-lg shadow-blue-900/50 active:scale-95 transition-transform">
             <Phone size={14} /> 立即咨询
           </button>
        </div>
      </div>
    </div>
  );
};

export default CorporatePage;
