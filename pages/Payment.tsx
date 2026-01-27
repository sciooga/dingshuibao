
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, ChevronRight, Wallet, MessageCircle, ShieldCheck, TicketPercent } from 'lucide-react';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Safe destructuring with default empty object to avoid crash on direct access
  const { product, qty } = location.state || {};
  const [payMethod, setPayMethod] = useState<'balance' | 'wechat'>('balance');

  useEffect(() => {
    if (!product) {
      navigate('/', { replace: true });
    }
  }, [product, navigate]);

  if (!product) return null;

  // Price calculations
  const unitPrice = product.price;
  const unitOriginalPrice = product.originalPrice || unitPrice;
  
  const totalPrice = unitPrice * qty;
  const totalOriginalPrice = unitOriginalPrice * qty;
  const discount = totalOriginalPrice - totalPrice;
  
  const balance = 128.50; // Mock balance

  const handlePay = () => {
    // Mock payment processing
    alert('支付成功');
    navigate('/orders');
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24 flex flex-col relative">
       {/* Header */}
       <div className="bg-white px-4 py-3 flex items-center gap-4 sticky top-0 z-50 border-b border-gray-50 safe-top">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1"><ChevronLeft size={24} /></button>
          <h1 className="text-lg font-bold">确认订单</h1>
       </div>

       <div className="p-4 space-y-4 flex-1 overflow-y-auto hide-scrollbar">
          {/* Address */}
          <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                   <MapPin size={20} />
                </div>
                <div>
                   <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-sm">昆明市盘龙区...</span>
                   </div>
                   <p className="text-xs text-gray-500 mt-1">水源用户_8829 138****9988</p>
                   <p className="text-[10px] text-orange-500 mt-1 bg-orange-50 inline-block px-1.5 rounded">预计今日 16:00 前送达</p>
                </div>
             </div>
             <ChevronRight size={16} className="text-gray-300" />
          </div>

          {/* Product */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50">
             <div className="flex gap-4">
                <img src={product.image} className="w-20 h-20 rounded-xl object-cover bg-gray-100 shrink-0" alt={product.name} />
                <div className="flex-1 flex flex-col justify-between py-0.5">
                   <div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">{product.desc || '标准规格'}</p>
                   </div>
                   <div className="flex justify-between items-center">
                      <div className="flex items-baseline gap-1">
                        <span className="text-red-600 font-black">¥{product.price}</span>
                        {product.originalPrice && (
                           <span className="text-xs text-gray-300 line-through decoration-gray-300">¥{product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-800 font-medium">x{qty}</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Amount Detail */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">商品总额</span>
                <span className="font-medium text-gray-900">¥{totalOriginalPrice.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">配送费</span>
                <span className="font-medium text-gray-900">¥0.00</span>
             </div>
             {discount > 0 && (
               <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                     <TicketPercent size={14} className="text-red-500" />
                     <span>优惠立减</span>
                  </div>
                  <span className="font-bold text-red-500">-¥{discount.toFixed(2)}</span>
               </div>
             )}
             <div className="pt-3 border-t border-gray-50 flex justify-end items-center gap-2">
                <span className="text-xs text-gray-500">实付金额</span>
                <span className="text-lg font-black text-gray-900">¥{totalPrice.toFixed(2)}</span>
             </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-50">
             <div 
               className="p-4 flex justify-between items-center border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
               onClick={() => setPayMethod('balance')}
             >
                <div className="flex items-center gap-3">
                   <Wallet size={20} className="text-blue-500" />
                   <div>
                      <p className="text-sm font-bold text-gray-800">余额支付</p>
                      <p className="text-xs text-gray-400">可用余额 ¥{balance}</p>
                   </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${payMethod === 'balance' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                   {payMethod === 'balance' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
             </div>
             <div 
               className="p-4 flex justify-between items-center active:bg-gray-50 transition-colors cursor-pointer"
               onClick={() => setPayMethod('wechat')}
             >
                <div className="flex items-center gap-3">
                   <MessageCircle size={20} className="text-green-500" />
                   <span className="text-sm font-bold text-gray-800">微信支付</span>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${payMethod === 'wechat' ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                   {payMethod === 'wechat' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
             </div>
          </div>
          
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="text-[10px] text-gray-400">支付安全由中国银联提供技术支持</span>
          </div>
       </div>

       {/* Bottom Bar */}
       <div className="bg-white p-4 border-t border-gray-100 fixed bottom-0 left-0 right-0 safe-bottom z-50 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col">
             <div className="flex items-end gap-1">
               <span className="text-xs text-gray-500 mb-1">合计:</span>
               <span className="text-xl font-black text-red-600">¥{totalPrice.toFixed(2)}</span>
             </div>
             {discount > 0 && (
               <span className="text-[10px] text-red-500 font-medium">已优惠 ¥{discount.toFixed(2)}</span>
             )}
          </div>
          <button 
            onClick={handlePay}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            立即支付
          </button>
       </div>
    </div>
  );
};

export default PaymentPage;
