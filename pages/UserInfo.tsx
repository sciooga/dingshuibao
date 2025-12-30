
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight } from 'lucide-react';

const UserInfoPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('水源用户_8829');
  const [phone, setPhone] = useState('13888889988');
  const [avatar, setAvatar] = useState('https://picsum.photos/100/100?random=50');

  const handleSave = () => {
    // Mock save logic
    alert('保存成功！');
    navigate(-1);
  };

  return (
    <div className="min-h-full bg-gray-50 flex flex-col">
      <div className="bg-white mt-2 border-y border-gray-100 divide-y divide-gray-50">
        {/* Avatar Section */}
        <div className="flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
          <span className="text-sm font-medium text-gray-700">头像</span>
          <div className="flex items-center gap-2">
            <div className="relative group">
              <img src={avatar} className="w-14 h-14 rounded-full border-2 border-gray-100 shadow-sm" alt="User Avatar" />
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
                <Camera size={18} className="text-white" />
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer" 
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (event) => setAvatar(event.target?.result as string);
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* Nickname Section */}
        <div className="flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors">
          <span className="text-sm font-medium text-gray-700">昵称</span>
          <div className="flex items-center gap-2 flex-1 justify-end ml-4">
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="text-right text-sm text-gray-500 bg-transparent outline-none focus:text-blue-600"
              placeholder="请输入昵称"
            />
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex items-center justify-between p-4 bg-white active:bg-gray-50 transition-colors">
          <span className="text-sm font-medium text-gray-700">绑定手机</span>
          <div className="flex items-center gap-2 flex-1 justify-end ml-4">
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-right text-sm text-gray-500 bg-transparent outline-none focus:text-blue-600"
              placeholder="请输入手机号"
            />
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        </div>
      </div>

      <div className="p-8">
        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center active:scale-[0.98] transition-all"
        >
          保存修改
        </button>
        <p className="text-center text-xs text-gray-400 mt-4 px-4">
          修改后可能需要重新登录以同步最新的账户信息
        </p>
      </div>

      {/* Security Tip */}
      <div className="mt-auto p-6">
        <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100/50">
          <h4 className="text-xs font-bold text-blue-800 mb-1">隐私与安全</h4>
          <p className="text-[10px] text-blue-600 leading-relaxed">
            您的账户信息仅用于订水服务配送及实名认证，平台严格遵守《网络安全法》及《个人信息保护法》，确保您的数据加密存储，绝不外泄。
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
