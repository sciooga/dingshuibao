
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Package, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  User, 
  BellRing,
  CheckCircle2,
  Wallet
} from 'lucide-react';
import { OrderStatus } from '../types';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUrged, setIsUrged] = useState(false);

  // Mock data fetching based on id
  const order = {
    id: id || '2410210001',
    status: OrderStatus.DELIVERING,
    createTime: '2024-10-21 14:22',
    payTime: '2024-10-21 14:23',
    payMethod: '余额支付',
    store: '昆明旗舰店',
    total: 36.00,
    items: [
      { name: '轿子山泉 18.9L', qty: 2, price: 18.00, img: 'https://picsum.photos/100/100?random=1' }
    ],
    receiver: {
      name: '水源用户_8829',
      phone: '13888889988',
      address: '昆明市盘龙区北京路金泰大厦 12F 1201室'
    },
    delivery: {
      name: '王师傅',
      id: 'D007',
      phone: '13912345678',
      avatar: 'https://picsum.photos/100/100?random=20'
    }
  };

  const handleUrge = () => {
    setIsUrged(true);
    alert('催单指令已发送！配送员将优先为您处理。');
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case OrderStatus.DELIVERING: return <Truck className="text-blue-500" size={32} />;
      case OrderStatus.COMPLETED: return <CheckCircle2 className="text-green-500" size={32} />;
      case OrderStatus.PENDING_PAYMENT: return <Wallet className="text-orange-500" size={32} />;
      default: return <Package className="text-blue-500" size={32} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-full space-y-3 pb-24">
      {/* Status Header */}
      <div className="bg-white p-6 flex items-center justify-between border-b border-gray-100">
        <div>
          <h2 className="text-xl font-black text-gray-900">{order.status}</h2>
          <p className="text-xs text-gray-400 mt-1">
            {order.status === OrderStatus.DELIVERING ? '配送员正在快马加鞭赶往您的地址' : '感谢您的支持，欢迎再次光临'}
          </p>
        </div>
        <div className="bg-blue-50 p-3 rounded-full">
          {getStatusIcon(order.status)}
        </div>
      </div>

      {/* Address Card */}
      <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm space-y-3 border border-gray-50">
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
            <MapPin size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">{order.receiver.name}</span>
              <span className="text-sm text-gray-400 font-medium">{order.receiver.phone}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{order.receiver.address}</p>
          </div>
        </div>
      </div>

      {/* Delivery Person Card (Only if Delivering/Completed) */}
      {(order.status === OrderStatus.DELIVERING || order.status === OrderStatus.COMPLETED) && (
        <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-gray-800">配送服务</h3>
            <span className="text-[10px] text-gray-300 font-medium">配送员已实名认证</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={order.delivery.avatar} className="w-12 h-12 rounded-full border border-gray-100" alt="" />
              <div>
                <p className="text-sm font-bold text-gray-800">{order.delivery.name} <span className="text-[10px] text-gray-400 font-normal ml-1">工号:{order.delivery.id}</span></p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded-sm font-bold">准时达</span>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm font-bold">五星服务</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleUrge}
                disabled={isUrged}
                className={`flex flex-col items-center gap-1 transition-all ${isUrged ? 'text-gray-300 scale-95' : 'text-orange-500 active:scale-90'}`}
              >
                <div className={`p-2 rounded-full border ${isUrged ? 'border-gray-100 bg-gray-50' : 'border-orange-100 bg-orange-50'}`}>
                  <BellRing size={20} />
                </div>
                <span className="text-[10px] font-bold">{isUrged ? '已催单' : '催一下'}</span>
              </button>
              <a 
                href={`tel:${order.delivery.phone}`}
                className="flex flex-col items-center gap-1 text-blue-500 active:scale-90 transition-transform"
              >
                <div className="p-2 rounded-full border border-blue-100 bg-blue-50">
                  <Phone size={20} />
                </div>
                <span className="text-[10px] font-bold">联系他</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Items Section */}
      <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-50 pb-3">
          <span className="text-sm font-bold text-gray-800">{order.store}</span>
          <ChevronRight size={14} className="text-gray-300" />
        </div>
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <img src={item.img} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="text-sm font-bold text-gray-800">{item.name}</h4>
                  <span className="text-sm font-black text-gray-900">¥{item.price}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 italic">规格：18.9L 标准装</p>
                <p className="text-right text-xs text-gray-500 mt-2">数量：x{item.qty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xs text-gray-400 font-medium">优惠券/抵扣</span>
          <span className="text-xs text-red-500 font-bold">-¥0.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-gray-800">合计</span>
          <span className="text-lg font-black text-blue-600">¥{order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Order Info Section */}
      <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-3">
        <h3 className="text-sm font-bold text-gray-800 border-b border-gray-50 pb-2">订单信息</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">订单编号</span>
            <span className="text-gray-600 font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">下单时间</span>
            <span className="text-gray-600 font-medium">{order.createTime}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">支付时间</span>
            <span className="text-gray-600 font-medium">{order.payTime}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">支付方式</span>
            <span className="text-gray-600 font-medium">{order.payMethod}</span>
          </div>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="mx-4 flex items-center justify-center gap-1.5 py-4">
        <ShieldCheck size={16} className="text-gray-300" />
        <span className="text-[10px] text-gray-300 font-medium">品质饮水，由平台安全承保</span>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom flex justify-end gap-3 z-50">
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 active:bg-gray-50"
        >
          返回首页
        </button>
        {order.status === OrderStatus.COMPLETED ? (
          <button className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all">
            再次订购
          </button>
        ) : (
          <button className="px-6 py-2.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold active:bg-blue-100">
            取消订单
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;
