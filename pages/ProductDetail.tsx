
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, ShoppingCart, Minus, Plus, Heart, MessageCircle, Store, ShieldCheck } from 'lucide-react';
import { MOCK_PRODUCTS, CORPORATE_PRODUCTS, MOCK_TICKETS } from '../constants';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Combine all products to find the match
  const allProducts = [...MOCK_PRODUCTS, ...CORPORATE_PRODUCTS, ...MOCK_TICKETS];
  // Helper to normalize ID because some might be numbers or strings
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
        <p className="text-gray-400">商品不存在或已下架</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold"
        >
          返回上一页
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24 relative">
      {/* Navbar (Transparent -> White on scroll) */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-sm pointer-events-auto active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <button className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-sm pointer-events-auto active:scale-90 transition-transform">
          <Share2 size={18} />
        </button>
      </div>

      {/* Product Image */}
      <div className="w-full aspect-square bg-white relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Info Card */}
      <div className="bg-white p-4 -mt-4 rounded-t-2xl relative z-10 space-y-3 shadow-sm border-b border-gray-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2 text-red-600">
              <span className="text-xs font-bold">¥</span>
              <span className="text-2xl font-black">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-300 line-through font-normal">¥{product.originalPrice}</span>
              )}
            </div>
            {product.savings && (
              <span className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-full font-bold mt-1 inline-block">
                立省 ¥{product.savings}
              </span>
            )}
          </div>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Heart size={20} fill={isFavorite ? "#ef4444" : "none"} className={isFavorite ? "text-red-500" : ""} />
            <span className="text-[10px]">收藏</span>
          </button>
        </div>

        <h1 className="text-lg font-bold text-gray-900 leading-snug">{product.name}</h1>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {['极速配送', '正品保障', '送货上门'].map((tag, i) => (
            <div key={i} className="flex items-center gap-1 text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              <ShieldCheck size={12} className="text-green-500" />
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Selection */}
      <div className="mt-2 bg-white p-4 space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-800">购买数量</span>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 active:bg-gray-100"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center font-bold text-sm">{qty}</span>
            <button 
              onClick={() => setQty(qty + 1)}
              className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 active:bg-gray-200"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-2 bg-white p-4 pb-8 space-y-4 shadow-sm min-h-[300px]">
        <h3 className="text-sm font-bold border-l-4 border-blue-600 pl-2">商品详情</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-500 leading-relaxed space-y-2">
            <p>1. 本商品由品牌直供，保证正品。</p>
            <p>2. 昆明市区内免费送货上门 (部分偏远地区除外)。</p>
            <p>3. 桶装水需自备空桶，如无空桶需支付押金。</p>
            <p>4. 图片仅供参考，请以实物为准。</p>
          </div>
          <img src="https://picsum.photos/600/400?random=100" className="w-full rounded-xl" alt="Detail 1" />
          <img src="https://picsum.photos/600/600?random=101" className="w-full rounded-xl" alt="Detail 2" />
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-2 safe-bottom z-50 flex items-center gap-2">
        <div className="flex items-center gap-4 px-4">
           <button className="flex flex-col items-center gap-0.5 text-gray-500">
             <Store size={20} />
             <span className="text-[10px]">店铺</span>
           </button>
           <button className="flex flex-col items-center gap-0.5 text-gray-500">
             <MessageCircle size={20} />
             <span className="text-[10px]">客服</span>
           </button>
           <div className="relative">
              <button className="flex flex-col items-center gap-0.5 text-gray-500">
                <ShoppingCart size={20} />
                <span className="text-[10px]">购物车</span>
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center font-bold border border-white">
                1
              </span>
           </div>
        </div>
        <div className="flex-1 flex gap-2 h-10">
          <button className="flex-1 bg-blue-50 text-blue-600 rounded-full font-bold text-sm active:scale-[0.98] transition-transform">
            加入购物车
          </button>
          <button className="flex-1 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform">
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
