
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, RotateCcw, MessageSquare, Star, Image as ImageIcon, X } from 'lucide-react';
import { OrderStatus } from '../types';

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('全部');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  
  const tabs = ['全部', '待付款', '待发货', '待收货', '待评价', '售后'];

  const mockOrders = [
    {
      id: '2410210001',
      date: '2024-10-21 14:22',
      store: '昆明旗舰店',
      items: [{ name: '轿子山泉 18.9L', qty: 2, price: 36 }],
      status: OrderStatus.DELIVERING,
      total: 36,
      img: 'https://picsum.photos/100/100?random=1'
    },
    {
      id: '2410200055',
      date: '2024-10-20 09:12',
      store: '翠湖分店',
      items: [{ name: '电子水票 - 20桶装', qty: 1, price: 360 }],
      status: OrderStatus.COMPLETED,
      total: 360,
      img: 'https://picsum.photos/100/100?random=11'
    }
  ];

  const handleReviewSubmit = () => {
    alert('评价提交成功！');
    setShowReviewModal(false);
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-full">
      <div className="sticky top-12 bg-white z-30 border-b border-gray-50 flex overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {mockOrders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-4 active:bg-gray-50/50 transition-colors" onClick={() => navigate(`/orders/${order.id}`)}>
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-gray-800">{order.store}</span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
              <span className={`text-xs font-bold ${order.status === OrderStatus.COMPLETED ? 'text-gray-400' : 'text-blue-500'}`}>
                {order.status}
              </span>
            </div>

            <div className="flex gap-4">
              <img src={order.img} className="w-16 h-16 rounded-lg object-cover" alt="product" />
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-gray-800">{order.items[0].name}</h4>
                  <span className="text-sm text-gray-400">×{order.items[0].qty}</span>
                </div>
                <p className="text-xs text-gray-400">单号：{order.id}</p>
                <p className="text-right text-sm font-bold mt-2">实付: <span className="text-blue-500">¥{order.total}</span></p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-gray-50" onClick={(e) => e.stopPropagation()}>
              {order.status === OrderStatus.DELIVERING || order.status === OrderStatus.PENDING_DELIVERY ? (
                <>
                  <button className="px-4 py-1.5 rounded-full border border-gray-100 text-xs font-medium text-gray-600">取消订单</button>
                  <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-50 active:scale-95 transition-transform">催促配送</button>
                </>
              ) : (
                <>
                  <button className="px-4 py-1.5 rounded-full border border-gray-100 text-xs font-medium text-gray-600 flex items-center gap-1">
                    <RotateCcw size={14} /> 再来一单
                  </button>
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="px-4 py-1.5 rounded-full bg-white border border-blue-500 text-blue-500 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
                  >
                    <MessageSquare size={14} /> 去评价
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col justify-end" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-t-3xl p-6 space-y-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">发表评价</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400"><X size={24} /></button>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    size={32} 
                    className={star <= rating ? 'text-yellow-400' : 'text-gray-200'} 
                    fill={star <= rating ? 'currentColor' : 'none'}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-500">{['极差', '失望', '一般', '满意', '惊喜'][rating - 1]}</span>
            </div>

            <div className="space-y-4">
              <textarea 
                placeholder="分享你的订水体验，帮助更多小伙伴~"
                className="w-full bg-gray-50 rounded-xl p-4 text-sm min-h-[120px] focus:ring-1 focus:ring-blue-500 outline-none border-none"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <div className="flex gap-2 overflow-x-auto">
                <div className="w-20 h-20 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={20} />
                  <span className="text-[10px] mt-1">添加图片</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleReviewSubmit}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-transform"
            >
              发布评价
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
