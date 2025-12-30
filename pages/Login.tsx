
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, ShieldCheck, Lock, Heart, Eye, EyeOff, MessageCircle, ChevronLeft } from 'lucide-react';

type LoginMode = 'wechat' | 'password' | 'code' | 'register-password' | 'forgot';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>('wechat');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 倒计时逻辑
  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号');
      return;
    }
    setCountdown(60);
    // 模拟发送验证码
    console.log('Sending code to', phone);
  };

  const handleNextStep = () => {
    if (mode === 'code') {
      if (code.length !== 6) {
        alert('请输入6位验证码');
        return;
      }
      // 模拟逻辑：如果是新手机号，跳转设置密码
      setMode('register-password');
    } else if (mode === 'register-password') {
      if (password.length < 8 || !/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
        alert('密码需至少8位，且包含字母和数字');
        return;
      }
      if (password !== confirmPassword) {
        alert('两次输入的密码不一致');
        return;
      }
      handleLoginSuccess();
    } else {
      handleLoginSuccess();
    }
  };

  const handleLoginSuccess = () => {
    localStorage.setItem('user_session', 'true');
    navigate('/');
  };

  const renderForm = () => {
    switch (mode) {
      case 'wechat':
        return (
          <div className="space-y-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={48} fill="currentColor" />
            </div>
            <button 
              onClick={() => handleLoginSuccess()}
              className="w-full bg-[#07C160] text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <MessageCircle size={22} fill="white" /> 微信一键登录
            </button>
            <div className="flex gap-6 text-sm text-gray-500">
              <button onClick={() => setMode('code')} className="hover:text-blue-500 font-medium">手机号登录/注册</button>
              <div className="w-[1px] h-4 bg-gray-200 self-center" />
              <button onClick={() => setMode('password')} className="hover:text-blue-500 font-medium">密码登录接口</button>
            </div>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
              <div className="relative">
                <Smartphone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="tel" 
                  maxLength={11}
                  placeholder="请输入手机号" 
                  className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none text-lg tracking-wider"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="number" 
                  maxLength={6}
                  placeholder="请输入验证码" 
                  className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none text-lg tracking-[0.2em]"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button 
                  disabled={countdown > 0}
                  onClick={handleSendCode}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 text-sm font-bold transition-colors ${countdown > 0 ? 'text-gray-300' : 'text-blue-600'}`}
                >
                  {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>未注册手机号验证后将自动注册</span>
              <button onClick={() => setMode('password')} className="text-blue-500 font-bold">密码登录</button>
            </div>
            <button 
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-100 active:scale-[0.98] transition-all"
            >
              下一步
            </button>
          </div>
        );

      case 'register-password':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-600 leading-relaxed">
                验证成功！为了您的账号安全，请设置登录密码。下次登录可使用“手机号+密码”快捷进入。
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type={showPwd ? "text" : "password"} 
                  placeholder="设置登录密码 (8位以上)" 
                  className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => setShowPwd(!showPwd)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type={showPwd ? "text" : "password"} 
                  placeholder="确认登录密码" 
                  className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex gap-2 text-[10px] text-gray-400 items-center px-1">
                <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? 'bg-green-400' : 'bg-gray-100'}`} />
                <div className={`h-1 flex-1 rounded-full ${/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password) ? 'bg-green-400' : 'bg-gray-100'}`} />
                <span>密码需包含字母和数字</span>
              </div>
            </div>
            
            <button 
              onClick={handleNextStep}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-blue-100 active:scale-[0.98] transition-all"
            >
              完成并登录
            </button>
          </div>
        );

      case 'password':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="space-y-4">
              <div className="relative">
                <Smartphone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="tel" placeholder="请输入手机号" className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none text-lg" />
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type={showPwd ? "text" : "password"} 
                  placeholder="请输入登录密码" 
                  className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none" 
                />
                <button onClick={() => setShowPwd(!showPwd)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <button onClick={() => setMode('forgot')} className="hover:text-blue-500">忘记密码？</button>
              <button onClick={() => setMode('code')} className="text-blue-500 font-bold">验证码登录</button>
            </div>
            <button onClick={handleLoginSuccess} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold active:scale-[0.98] transition-all">立即登录</button>
          </div>
        );

      case 'forgot':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="space-y-4">
              <div className="relative">
                <Smartphone className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="tel" placeholder="请输入手机号" className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none" />
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="text" placeholder="请输入验证码" className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none" />
                <button 
                  disabled={countdown > 0}
                  onClick={handleSendCode}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 text-sm font-bold transition-colors ${countdown > 0 ? 'text-gray-300' : 'text-blue-600'}`}
                >
                  {countdown > 0 ? `${countdown}s` : '获取验证码'}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="password" placeholder="设置新登录密码" className="w-full pl-8 py-3 border-b border-gray-100 focus:border-blue-500 outline-none" />
              </div>
            </div>
            <button onClick={() => setMode('password')} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold active:scale-[0.98]">重置并登录</button>
          </div>
        );
    }
  }

  const getTitle = () => {
    switch(mode) {
      case 'wechat': return '快捷登录';
      case 'password': return '密码登录';
      case 'code': return '手机号登录';
      case 'register-password': return '设置密码';
      case 'forgot': return '重置密码';
    }
  }

  return (
    <div className="min-h-screen bg-white p-8 pt-4 flex flex-col relative">
      {/* Back Button */}
      {mode !== 'wechat' && (
        <button 
          onClick={() => setMode(mode === 'register-password' ? 'code' : 'wechat')}
          className="absolute left-4 top-4 p-2 text-gray-400 active:text-blue-500"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <div className="mb-10 mt-12">
        <h2 className="text-3xl font-bold mt-2 text-gray-900 tracking-tight">{getTitle()}</h2>
        <p className="text-gray-400 mt-2 text-sm">订水驿站，为您守护饮水健康</p>
      </div>

      <div className="flex-1">
        {renderForm()}

        {['wechat', 'password', 'code'].includes(mode) && (
          <div className="pt-10 flex flex-col items-center">
            <div className="w-full flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-gray-100 flex-1" />
              <span className="text-[10px] text-gray-300 uppercase tracking-widest font-black">第三方登录 / 亲情服务</span>
              <div className="h-[1px] bg-gray-100 flex-1" />
            </div>
            
            <button 
              onClick={() => navigate('/')}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-sm group-active:scale-90 transition-transform">
                <Heart size={32} />
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-gray-700">亲情订水 (免登录)</span>
                <p className="text-[10px] text-gray-400 mt-1">无需注册 无需支付</p>
              </div>
            </button>
          </div>
        )}
      </div>

      <div className="text-center text-[10px] text-gray-300 mt-auto pt-10">
        登录即代表您同意《用户服务协议》与《隐私政策》
      </div>
    </div>
  );
};

export default LoginPage;
