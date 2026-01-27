
import React from 'react';
import { 
  TicketPercent, 
  Wallet, 
  Refrigerator, 
  Zap, 
  ShieldCheck, 
  GlassWater,
  CupSoda
} from 'lucide-react';
import { Product, RechargePackage, Store } from './types';

// 自定义桶装水图标
const WaterBarrelIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6-.4 1-1 1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2c-.6 0-1-.4-1-1V3a1 1 0 0 0-1-1Z" />
    <path d="M3 12h18" />
    <path d="M3 17h18" />
  </svg>
);

export const NAV_ITEMS = [
  { id: '1', label: '桶装水', icon: <WaterBarrelIcon className="w-6 h-6 text-blue-600" />, category: '桶装水' },
  { id: '2', label: '免押金', icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, category: '免押金' },
  { id: '3', label: '瓶装水', icon: <GlassWater className="w-6 h-6 text-cyan-500" />, category: '瓶装水' },
  { id: '4', label: '水票套餐', icon: <TicketPercent className="w-6 h-6 text-red-500" />, category: '水票套餐' },
  { id: '5', label: '余额充值', icon: <Wallet className="w-6 h-6 text-orange-500" />, category: '余额充值' },
  { id: '6', label: '饮水机', icon: <Refrigerator className="w-6 h-6 text-indigo-500" />, category: '饮水机' },
  { id: '7', label: '压水器', icon: <Zap className="w-6 h-6 text-purple-500" />, category: '压水器' },
  { id: '8', label: '饮料', icon: <CupSoda className="w-6 h-6 text-pink-500" />, category: '饮料' },
];

export const MOCK_STORES: Store[] = [
  { 
    id: '1', 
    name: '昆明旗舰店', 
    address: '昆明市盘龙区北京路100号', 
    distance: '1.2km',
    businessHours: '08:30-21:30',
    isOpen: true
  },
  { 
    id: '2', 
    name: '翠湖分店', 
    address: '昆明市五华区翠湖南路', 
    distance: '3.5km',
    businessHours: '09:00-19:00',
    isOpen: true
  },
  { 
    id: '3', 
    name: '官渡服务站', 
    address: '昆明市官渡区春城路', 
    distance: '5.8km',
    businessHours: '08:00-18:00',
    isOpen: false
  },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: '轿子山泉 18.9L', category: '桶装水', price: 18, originalPrice: 22, unit: '桶', image: 'https://picsum.photos/200/200?random=1' },
  { id: 'p2', name: '农夫山泉 19L (免押金专享)', category: '免押金', price: 25, unit: '桶', image: 'https://picsum.photos/200/200?random=2' },
  { id: 'p3', name: '怡宝纯净水 18.9L', category: '桶装水', price: 22, unit: '桶', image: 'https://picsum.photos/200/200?random=3' },
  { id: 'p4', name: '景田百岁山 348ml*24', category: '瓶装水', price: 48, unit: '箱', image: 'https://picsum.photos/200/200?random=4' },
  { id: 'p5', name: '可口可乐 500ml*12', category: '饮料', price: 36, unit: '箱', image: 'https://picsum.photos/200/200?random=8' },
  { id: 'p6', name: '简易压水器', category: '压水器', price: 15, unit: '个', image: 'https://picsum.photos/200/200?random=6' },
];

export const CORPORATE_PRODUCTS: Product[] = [
    {
      id: 'c1',
      name: '农夫山泉 19L (企业月结版)',
      desc: '单次起订10桶',
      price: 20,
      originalPrice: 28,
      image: 'https://picsum.photos/200/200?random=2',
      tag: '含税专票',
      category: '桶装水',
      unit: '桶'
    },
    {
      id: 'c2',
      name: '珍茗金龙水 18.9L (50桶套餐)',
      desc: '赠送立式温热饮水机',
      price: 900,
      originalPrice: 1200,
      image: 'https://picsum.photos/200/200?random=1',
      tag: '送饮水机',
      category: '水票套餐',
      unit: '套'
    },
    {
      id: 'c3',
      name: '高端立式冰热饮水机',
      desc: '制冷/制热/常温',
      price: 388,
      originalPrice: 599,
      image: 'https://picsum.photos/200/200?random=6',
      tag: '以租代售',
      category: '办公设备',
      unit: '台'
    },
    {
      id: 'c4',
      name: '商务待客小瓶水 350ml*24',
      desc: '会议专用 20箱起',
      price: 35,
      originalPrice: 48,
      image: 'https://picsum.photos/200/200?random=4',
      tag: '整箱批发',
      category: '瓶装水',
      unit: '箱'
    },
     {
      id: 'c5',
      name: '百岁山 18.9L (100桶年卡)',
      desc: '赠茶吧机+纸杯',
      price: 2200,
      originalPrice: 2800,
      image: 'https://picsum.photos/200/200?random=16',
      tag: '年度爆款',
      category: '水票套餐',
      unit: '套'
    },
    {
      id: 'c6',
      name: '雀巢咖啡 268ml*15瓶',
      desc: '提神醒脑',
      price: 65,
      originalPrice: 80,
      image: 'https://picsum.photos/200/200?random=8',
      tag: '下午茶',
      category: '饮料',
      unit: '箱'
    }
];

export const MOCK_TICKETS: Product[] = [
  { 
    id: 't1', 
    name: '农夫山泉 19L (20桶赠3桶)', 
    category: '农夫山泉', 
    price: 500, 
    originalPrice: 575, 
    unit: '套', 
    savings: 75, 
    image: 'https://picsum.photos/200/200?random=12',
    packageDetail: '23桶'
  },
  { 
    id: 't2', 
    name: '怡宝 18.9L (10桶赠1桶)', 
    category: '怡宝', 
    price: 220, 
    originalPrice: 242, 
    unit: '套', 
    savings: 22, 
    image: 'https://picsum.photos/200/200?random=3',
    packageDetail: '11桶'
  },
  { 
    id: 't3', 
    name: '娃哈哈 18.9L (30桶超值装)', 
    category: '娃哈哈', 
    price: 450, 
    originalPrice: 540, 
    unit: '套', 
    savings: 90, 
    image: 'https://picsum.photos/200/200?random=15',
    packageDetail: '30桶'
  },
  { 
    id: 't4', 
    name: '景田百岁山 18.9L (20桶装)', 
    category: '景田', 
    price: 480, 
    originalPrice: 560, 
    unit: '套', 
    savings: 80, 
    image: 'https://picsum.photos/200/200?random=16',
    packageDetail: '20桶'
  },
  { 
    id: 't5', 
    name: '怡宝 555ml*24瓶 (买5箱送1箱)', 
    category: '怡宝', 
    price: 240, 
    originalPrice: 288, 
    unit: '套', 
    savings: 48, 
    image: 'https://picsum.photos/200/200?random=13',
    packageDetail: '144瓶'
  },
  { 
    id: 't6', 
    name: '景田百岁山 348ml*24瓶 (10箱囤货装)', 
    category: '景田', 
    price: 450, 
    originalPrice: 480, 
    unit: '套', 
    savings: 30, 
    image: 'https://picsum.photos/200/200?random=14',
    packageDetail: '240瓶'
  },
  { 
    id: 't7', 
    name: '农夫山泉 550ml*24瓶 (20箱团购价)', 
    category: '农夫山泉', 
    price: 720, 
    originalPrice: 800, 
    unit: '套', 
    savings: 80, 
    image: 'https://picsum.photos/200/200?random=17',
    packageDetail: '480瓶'
  },
];

export const RECHARGE_PACKAGES: RechargePackage[] = [
  { id: 'r1', amount: 59, bonus: 5 },
  { id: 'r2', amount: 188, bonus: 20, isRecommended: true },
  { id: 'r3', amount: 360, bonus: 50 },
  { id: 'r4', amount: 1000, bonus: 200 },
];
