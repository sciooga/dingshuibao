
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Lock, Eye, EyeOff } from 'lucide-react';

const DeliveryLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!phone || !password) {
      alert('请完整填写手机号和密码');
      return;
    }
    // Mock login logic
    localStorage.setItem('delivery_session', 'true');
    navigate('/delivery/home');
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900">配送员登录</h2>
        <p className="text-gray-400 mt-2 text-sm italic">专业配送，准时送达</p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-4">
          {/* Phone Input */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300">
              <Smartphone size={20} />
            </div>
            <input 
              type="tel" 
              placeholder="请输入手机号" 
              className="w-full pl-8 py-4 border-b border-gray-100 focus:border-blue-500 outline-none text-lg"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300">
              <Lock size={20} />
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="请输入登录密码" 
              className="w-full pl-8 py-4 border-b border-gray-100 focus:border-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 active:text-blue-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button 
          onClick={handleLogin}
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-gray-100 active:scale-[0.98] transition-all"
        >
          立即登录
        </button>
      </div>

      <div className="mt-auto text-center space-y-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="text-[10px] text-blue-600 leading-relaxed">
            新配送员请联系所属门店管理员进行后台录入并获取初始密码。
          </p>
        </div>
        <p className="text-[10px] text-gray-300">
          登录即代表您同意《配送员服务协议》
        </p>
      </div>
    </div>
  );
};

export default DeliveryLoginPage;
