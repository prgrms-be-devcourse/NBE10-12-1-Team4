import type { OrderDetail, OrderItem, Product } from "../../type/admin";

export const BEANS: Product[] = [
    { id: "p1",  name: "에티오피아 예가체프", origin: "에티오피아",    stock: 1000,  weight: 200, price: 18000, description: "자스민·베르가못·백도의 화사한 산미", active: false, color: "#a06a3c", img: "/beans/p1.png" },
    { id: "p2",  name: "콜롬비아 나리뇨",     origin: "콜롬비아",      stock: 1000,  weight: 200, price: 16000, description: "카라멜·견과·오렌지의 균형감",       active: false, color: "#8a5a34", img: "/beans/p2.png" },
    { id: "p3",  name: "케냐 AA",           origin: "케냐",         stock: 1000,  weight: 200, price: 19000, description: "블랙커런트·자몽·와인의 깊은 산미",   active: false, color: "#7c4a2a", img: "/beans/p3.png" },
    { id: "p4",  name: "과테말라 안티구아",  origin: "과테말라",      stock: 1000,  weight: 200, price: 17000, description: "다크초콜릿·캐러멜·은은한 스파이스",   active: false, color: "#6b3e22", img: "/beans/p4.png" },
    { id: "p5",  name: "브라질 세하도",     origin: "브라질",        stock: 1000,  weight: 200, price: 15000, description: "헤이즐넛·다크초콜릿의 묵직한 바디",   active: false, color: "#5b3a22", img: "/beans/p5.png" },
    { id: "p6",  name: "인도네시아 만델링",    origin: "인도네시아",    stock: 1000,  weight: 200, price: 16500, description: "허브·시더·다크초콜릿의 흙내음",     active: true,  color: "#43250f", img: "/beans/p6.png" },
    { id: "p7",  name: "하우스 블렌드",       origin: "브라질·콜롬비아", stock: 1000,  weight: 200, price: 14000, description: "매일 마시기 좋은 균형 잡힌 바디",   active: false, color: "#8a5a34", img: "/beans/p7.png" },
    { id: "p8",  name: "에스프레소 블렌드",     origin: "브라질·인도네시아",stock: 1000,  weight: 200, price: 15000, description: "다크초콜릿·캐러멜의 진한 여운",     active: false, color: "#5a3318", img: "/beans/p8.png" },
    { id: "p9",  name: "디카페인 콜롬비아",   origin: "콜롬비아",      stock: 1000,  weight: 200, price: 16000, description: "스위스워터 디카페인, 부드러운 카카오", active: false, color: "#9c6b42", img: "/beans/p9.png" },
    { id: "p10", name: "코스타리카 따라주",   origin: "코스타리카",    stock: 1000,  weight: 200, price: 17500, description: "꿀·아몬드·붉은 자두의 클린컵",       active: false, color: "#caa03a", img: "/beans/p10.png" },
    { id: "p11", name: "파나마 게이샤",      origin: "파나마",        stock: 1000,  weight: 200, price: 32000, description: "자스민·베르가못·트로피컬 플로럴",     active: false, color: "#d98a4e", img: "/beans/p11.png" },
    { id: "p12", name: "르완다 부르봉",      origin: "르완다",        stock: 1000,  weight: 200, price: 16000, description: "홍차·오렌지·자두의 산뜻한 산미",     active: false, color: "#b8703f", img: "/beans/p12.png" },
    { id: "p13", name: "온두라스 마르칼라",   origin: "온두라스",      stock: 1000,  weight: 200, price: 15500, description: "밀크초콜릿·헤이즐넛·캐러멜",         active: false, color: "#9c6b3a", img: "/beans/p13.png" },
    { id: "p14", name: "엘살바도르 파카마라",origin: "엘살바도르",    stock: 1000,  weight: 200, price: 18500, description: "다크초콜릿·체리·갈색설탕의 단맛",     active: false, color: "#a14b34", img: "/beans/p14.png" },
    { id: "p15", name: "예멘 모카 마타리",    origin: "예멘",         stock: 1000,  weight: 200, price: 26000, description: "와인·다크초콜릿·건과일의 야성미",     active: false, color: "#7d5a8c", img: "/beans/p15.png" },
    { id: "p16", name: "페루 찬차마요",      origin: "페루",         stock: 1000,  weight: 200, price: 14500, description: "오렌지·캐러멜·부드러운 바디",         active: false, color: "#c25d3a", img: "/beans/p16.png" },
    { id: "p17", name: "탄자니아 피베리",   origin: "탄자니아",      stock: 1000,  weight: 200, price: 17000, description: "블랙커런트·다크체리·코코아",         active: false, color: "#5f7d46", img: "/beans/p17.png" },
    { id: "p18", name: "에티오피아 시다모",   origin: "에티오피아",    stock: 1000,  weight: 200, price: 17500, description: "블루베리·레몬·꽃향의 화려함",         active: false, color: "#cf9a3c", img: "/beans/p18.png" },
    { id: "p19", name: "콜롬비아 후일라",     origin: "콜롬비아",      stock: 1000,  weight: 200, price: 16500, description: "청사과·캐러멜·균형 잡힌 단맛",       active: false, color: "#3f7d72", img: "/beans/p19.png" },
  ];

export const ORDERITEMS : OrderItem[] = [
  {id:1, name: "에티오피아 예가체프 G1", price: 18000, stock:1},
  {id:2, name: "콜롬비아 수프리모", price: 16000, stock:2},
  {id:3, name: "과테말라 안티구아", price: 10000, stock:1},
  {id:4, name: "디카페인 멕시코", price: 20000, stock:3}
]

export const STATS = {
  days: [
    { label: "05/26", revenue: 45000 },
    { label: "05/27", revenue: 63000 },
    { label: "05/28", revenue: 38000 },
    { label: "05/29", revenue: 71000 },
    { label: "05/30", revenue: 52000 },
    { label: "05/31", revenue: 89000 },
    { label: "06/01", revenue: 104000 },
    { label: "06/02", revenue: 67000 },
    { label: "06/03", revenue: 91000 },
    { label: "06/04", revenue: 58000 },
    { label: "06/05", revenue: 76000 },
    { label: "06/06", revenue: 43000 },
    { label: "06/07", revenue: 112000 },
    { label: "06/08", revenue: 85000 },
  ],
  beans: [
    { name: "파나마 게이샤",       revenue: 320000, color: "#d98a4e" },
    { name: "에티오피아 예가체프", revenue: 270000, color: "#a06a3c" },
    { name: "케냐 AA",            revenue: 228000, color: "#7c4a2a" },
    { name: "예멘 모카 마타리",    revenue: 208000, color: "#7d5a8c" },
    { name: "과테말라 안티구아",   revenue: 187000, color: "#6b3e22" },
    { name: "인도네시아 만델링",   revenue: 165000, color: "#43250f" },
    { name: "콜롬비아 나리뇨",    revenue: 144000, color: "#8a5a34" },
    { name: "에티오피아 시다모",   revenue: 122000, color: "#cf9a3c" },
  ],
};

export const ORDERS : OrderDetail[] = [
  {id: 1, orderNumber: "no-1", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 23000, time: "2026-06-02 12:34:33", status: "접수"},
  {id: 2, orderNumber: "no-2", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 23000, time: "2026-06-02 00:34:33", status: "준비중"},
  {id: 3, orderNumber: "no-3", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 33000, time: "2026-06-08 14:34:33", status: "접수"},
  {id: 4, orderNumber: "no-4", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 43000, time: "2026-06-08 04:34:33", status: "접수"},
  {id: 5, orderNumber: "no-5", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 53000, time: "2026-06-02 14:34:33", status: "접수"},
  {id: 6, orderNumber: "no-6", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 13000, time: "2026-06-02 10:34:33", status: "접수"},
  {id: 7, orderNumber: "no-7", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 25000, time: "2026-06-10 14:34:33", status: "취소"},
  {id: 8, orderNumber: "no-8", email: "test@test.com", address: "서울특별시 **구 **동 123-4", phone: "010-0000-0000", orderItems: ORDERITEMS, price: 27000, time: "2026-06-03 14:34:33", status: "완료"},
]