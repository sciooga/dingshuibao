
import React, { useState } from 'react';
import { Calendar, Clock, ChevronRight, Package, Search } from 'lucide-react';

const AppointmentsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('待确认');
  const tabs = ['全部', '待确认', '待服务', '已完成', '已取消'];

  const appointments = [
    {
      id: '2024102201',
      date: '2024-10-22',
      time: '14:00 - 16:00',
      type: '水机清洗服务',
      status: '待确认',
      address: '昆明市盘龙区北京路金泰大厦 12F'
    }
  ];

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-50 flex overflow-x-auto hide-scrollbar sticky top-12 z-20">
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
        {appointments.map(appt => (
          <div key={appt.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 space-y-3">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="text-xs font-bold text-gray-400">预约单号：{appt.id}</span>
              <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{appt.status}</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800">{appt.type}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar size={14} />
                <span>{appt.date}</span>
                <Clock size={14} className="ml-2" />
                <span>{appt.time}</span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-1">服务地址：{appt.address}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
              <button className="px-4 py-1.5 rounded-full border border-gray-100 text-xs text-gray-600">取消预约</button>
              <button className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">修改时间</button>
            </div>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 space-y-4">
            <Calendar size={60} strokeWidth={1} />
            <p className="text-sm">暂无相关预约记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
