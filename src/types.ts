export type ColorTheme = 'amber' | 'emerald' | 'indigo' | 'rose' | 'sky' | 'violet';

export type PlaceCategory = 'restaurant' | 'attraction' | 'stay' | 'cafe';

export interface PlacePhoto {
  id: string;
  url: string;
  caption?: string;
  takenAt?: string;
}

export interface TransitStep {
  type: 'subway' | 'bus' | 'walk' | 'transfer';
  lineOrRoute?: string; // e.g. "2호선", "721번 버스"
  departureName?: string;
  arrivalName?: string;
  durationMinutes: number;
  instruction: string;
  color?: string; // e.g. green for line 2
}

export interface TransportationGuide {
  originName: string;
  destinationName: string;
  // Public Transit
  transit: {
    totalDurationMinutes: number;
    transferCount: number;
    summary: string;
    steps: TransitStep[];
    fareEstimate: string; // e.g. "1,400원"
    tips: string; // e.g. "3번 출구로 나와 도보 3분"
  };
  // Taxi / Rideshare
  taxi: {
    durationMinutes: number;
    estimatedFare: string; // e.g. "약 12,400원"
    trafficStatus: 'smooth' | 'moderate' | 'congested';
    tollFee?: string;
    tips: string; // e.g. "택시 승차는 맞은편 승강장 이용 시 유턴 요금 절약"
  };
  // Walking / Bike
  walkingOrBike: {
    durationMinutes: number;
    distanceKm: number;
    calories: number;
    routeHint: string;
  };
}

export interface VisitedPlace {
  id: string;
  countryId?: string; // Links to fantasy country if related, or standalone place
  countryName?: string; // e.g. "대한민국", "일본", "프랑스", "이탈리아", "구름푸딩 왕국" 등 나라별 분류
  countryEmoji?: string; // e.g. "🇰🇷", "🇯🇵", "🇫🇷", "🇮🇹", "🍮"
  authorName?: string; // 등록자 이름 (예: "나", "여행자 김은하", "도쿄미식가 준" 등)
  isOtherTraveler?: boolean; // 다른 사람의 여행지 여부
  name: string;
  category: PlaceCategory;
  categoryLabel: string; // "음식점", "관광지", "숙소", "감성카페"
  rating: number; // 1-5
  visitDate: string; // "YYYY.MM.DD" 또는 "YYYY-MM-DD"
  address: string;
  cityArea: string; // e.g. "서울 성수", "도쿄 시부야", "파리 마레지구", "제주 애월"
  lat: number;
  lng: number;
  notes: string;
  mustTryOrHighlight: string; // 대표 메뉴나 추천 포인트
  photos: PlacePhoto[];
  tags: string[];
  priceRange?: string; // e.g. "1인 1~2만원대", "1박 15만원대"
  transportGuide?: TransportationGuide;
  likes?: number;
  createdAt: string;
}

export interface Landmark {
  name: string;
  desc: string;
  image?: string;
}

export interface Dish {
  name: string;
  desc: string;
}

export interface Country {
  id: string;
  name: string;
  englishName: string;
  slogan: string;
  flagEmoji: string;
  colorTheme: ColorTheme;
  geography: string;
  climate: string;
  landmarks: Landmark[];
  cuisine: Dish[];
  traditions: string[];
  currency: string;
  greeting: string;
  backgroundStory: string;
  travelTips: string;
  founder: string;
  isCustom?: boolean;
  createdAt?: string;
  imageUrl?: string;
  mapCoords?: { x: number; y: number }; // percentage 0-100 on fantasy realm map
  likes: number;
}

export interface PassportStamp {
  id: string;
  countryId: string;
  countryName: string;
  flagEmoji: string;
  date: string;
  colorTheme: ColorTheme;
  quote?: string;
}

export interface TravelerPassport {
  passportNumber: string;
  holderName: string;
  travelerTitle: string;
  issueDate: string;
  avatarEmoji: string;
  stamps: PassportStamp[];
}

export interface Postcard {
  id: string;
  countryId: string;
  countryName: string;
  sender: string;
  message: string;
  date: string;
  stampEmoji: string;
  bgGradient: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  diningTip: string;
}
