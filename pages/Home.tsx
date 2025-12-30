
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ChevronRight, ShoppingCart, X, ArrowLeft } from 'lucide-react';
import { NAV_ITEMS, MOCK_STORES, MOCK_PRODUCTS } from '../constants';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStore, setSelectedStore] = useState(MOCK_STORES[0]);
  const [showStorePicker, setShowStorePicker] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const lastStore = localStorage.getItem('last_store');
    if (lastStore) {
      setSelectedStore(JSON.parse(lastStore));
    }
  }, []);

  const handleStoreChange = (store: typeof MOCK_STORES[0]) => {
    setSelectedStore(store);
    localStorage.setItem('last_store', JSON.stringify(store));
    setShowStorePicker(false);
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    (activeCategory === '全部' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['全部', '桶装水', '免押金', '瓶装水', '饮料', '压水器'];

  return (
    <div className="px-4 py-2 space-y-4 relative">
      {/* Top Bar: Store Switcher & Search Button */}
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-1 text-gray-800 font-semibold cursor-pointer"
          onClick={() => setShowStorePicker(true)}
        >
          <MapPin size={18} className="text-blue-500" />
          <span className="truncate max-w-[150px]">{selectedStore.name}</span>
          <ChevronRight size={16} />
        </div>
        
        {/* New Search Button in the Top Right */}
        <button 
          onClick={() => setShowSearchOverlay(true)}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-500 active:scale-90 transition-transform"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Banner - Reduced height to h-20 (half of h-40) */}
      <div className="w-full h-20 rounded-xl overflow-hidden relative group shadow-sm border border-gray-100">
        <img src="https://picsum.photos/800/200?random=10" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent flex items-center px-5">
          <div className="text-white flex justify-between items-center w-full">
            <div className="space-y-0.5">
              <h2 className="text-base font-bold">豪华会员限时开启</h2>
              <p className="text-[10px] opacity-90">配送费减免 + 9.6折优惠</p>
            </div>
            <button 
              onClick={() => navigate('/recharge')}
              className="bg-white text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold active:scale-95 transition-transform whitespace-nowrap"
            >
              立即开通
            </button>
          </div>
        </div>
      </div>

      {/* Grid Navigation */}
      <div className="grid grid-cols-4 gap-y-4 bg-white p-4 rounded-xl shadow-sm border border-gray-50">
        {NAV_ITEMS.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform"
            onClick={() => {
              if (item.category === '余额充值') navigate('/recharge');
              else if (item.category === '水票套餐') navigate('/tickets');
              else setActiveCategory(item.category);
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
              {item.icon}
            </div>
            <span className="text-[11px] text-gray-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Product Categories Filter - Updated to Tab Mode */}
      <div className="flex gap-8 overflow-x-auto hide-scrollbar border-b border-gray-100 pt-1">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-3 text-sm font-bold whitespace-nowrap relative transition-colors ${
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

      {/* Product List */}
      <div className="grid grid-cols-2 gap-4 pb-4">
        {filteredProducts.length > 0 ? filteredProducts.map(p => (
          <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col border border-gray-50 hover:shadow-md transition-shadow">
            <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" />
            <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-blue-600 font-bold">¥{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">¥{p.originalPrice}</span>
                  )}
                </div>
              </div>
              <button className="w-full bg-blue-50 text-blue-600 text-xs py-2 rounded-lg font-bold flex items-center justify-center gap-1 active:bg-blue-100">
                <ShoppingCart size={14} /> 立即订购
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-2 py-20 text-center text-gray-400">
            没有找到匹配的商品
          </div>
        )}
      </div>

      {/* Full-Screen Search Overlay */}
      {showSearchOverlay && (
        <div className="fixed inset-0 bg-white z-[100] animate-in fade-in duration-200">
          <div className="p-4 safe-top flex items-center gap-3 border-b border-gray-50">
            <button onClick={() => setShowSearchOverlay(false)} className="text-gray-500">
              <ArrowLeft size={24} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                autoFocus
                type="text" 
                placeholder="搜索品牌、桶装水、水票..."
                className="w-full bg-gray-50 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="p-4 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">热门搜索</h4>
            <div className="flex flex-wrap gap-2">
              {['轿子山泉', '农夫山泉', '免押金', '水票套餐', '饮水机'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-1.5 bg-gray-50 rounded-full text-xs text-gray-600 active:bg-blue-50 active:text-blue-600 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {searchQuery && (
              <div className="mt-8">
                <p className="text-xs text-gray-400 mb-4">搜索 "{searchQuery}" 的结果：</p>
                <div className="space-y-3">
                  {filteredProducts.slice(0, 5).map(p => (
                    <div 
                      key={p.id} 
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      onClick={() => setShowSearchOverlay(false)}
                    >
                      <img src={p.image} className="w-12 h-12 rounded object-cover" alt="" />
                      <div className="flex-1">
                        <div className="text-sm font-bold">{p.name}</div>
                        <div className="text-xs text-blue-600">¥{p.price}</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setShowSearchOverlay(false)}
                  className="w-full mt-4 py-3 text-sm text-blue-600 font-bold border border-blue-100 rounded-xl"
                >
                  查看全部结果
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Store Picker Modal */}
      {showStorePicker && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-6 space-y-4 max-h-[70vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold">切换门店</h3>
              <button onClick={() => setShowStorePicker(false)} className="text-gray-400 p-2"><X size={24} /></button>
            </div>
            {MOCK_STORES.map(store => (
              <div 
                key={store.id}
                onClick={() => handleStoreChange(store)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedStore.id === store.id ? 'border-blue-500 bg-blue-50' : 'border-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{store.name}</span>
                  <span className="text-xs text-gray-400">{store.distance}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{store.address}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
