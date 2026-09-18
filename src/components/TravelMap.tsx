import React, { useState, useMemo } from "react";
import { 
  MapPin, Plus, Navigation, Camera, Star, Utensils, 
  Bed, Compass, Coffee, Search, Filter, Layers, 
  ArrowRight, Sparkles, ExternalLink, ChevronRight,
  Bus, Car, Footprints, Clock, Check, Calendar, Globe,
  Users, UserCheck, Heart, Bookmark, Flame, Award,
  Info, Compass as CompassIcon, Share2, Folder, FolderOpen,
  ChevronDown
} from "lucide-react";
import { VisitedPlace, PlaceCategory, Country } from "../types";

interface TravelMapProps {
  places: VisitedPlace[];
  countries?: Country[];
  onSelectPlace: (place: VisitedPlace) => void;
  onOpenAddPlace: (mode?: "mine" | "other", country?: string) => void;
  onOpenCreateCountry?: () => void;
  onOpenPhotoManager: (place: VisitedPlace) => void;
}

interface RegionMapPoint {
  x: number; // percentage
  y: number; // percentage
}

// Global & Regional pin coordinates mapped gracefully
const REGION_COORDS: Record<string, RegionMapPoint> = {
  // 대한민국
  "서울": { x: 38, y: 22 },
  "성수": { x: 40, y: 23 },
  "종로": { x: 37, y: 21 },
  "강원": { x: 65, y: 20 },
  "강릉": { x: 72, y: 22 },
  "제주": { x: 30, y: 88 },
  "애월": { x: 26, y: 86 },
  "협재": { x: 24, y: 88 },
  "부산": { x: 78, y: 68 },
  "해운대": { x: 82, y: 69 },
  "경주": { x: 76, y: 58 },
  "전주": { x: 42, y: 54 },
  "여수": { x: 50, y: 72 },
  // 해외 (세계 지도 뷰 및 해외 도시 허브)
  "도쿄": { x: 86, y: 35 },
  "시부야": { x: 85, y: 36 },
  "일본": { x: 84, y: 38 },
  "파리": { x: 18, y: 30 },
  "몽마르트르": { x: 19, y: 29 },
  "프랑스": { x: 18, y: 32 },
  "로마": { x: 28, y: 46 },
  "트레비": { x: 28, y: 47 },
  "이탈리아": { x: 29, y: 48 },
  "스위스": { x: 23, y: 38 },
  "그린델발트": { x: 24, y: 37 },
  "인터라켄": { x: 24, y: 38 },
};

const CATEGORY_CONFIG: Record<PlaceCategory, { label: string; icon: string; pinBg: string; activeColor: string }> = {
  restaurant: { label: "음식점", icon: "🍽️", pinBg: "bg-rose-500", activeColor: "border-rose-500 text-rose-700 bg-rose-50" },
  cafe: { label: "감성카페", icon: "☕", pinBg: "bg-amber-500", activeColor: "border-amber-500 text-amber-700 bg-amber-50" },
  attraction: { label: "관광지", icon: "🎡", pinBg: "bg-blue-600", activeColor: "border-blue-500 text-blue-700 bg-blue-50" },
  stay: { label: "숙소", icon: "🏨", pinBg: "bg-emerald-600", activeColor: "border-emerald-500 text-emerald-700 bg-emerald-50" },
};

// Travel Destination Curated Info Catalog for Bottom Section
interface TravelDestinationInfo {
  id: string;
  country: string;
  countryEmoji: string;
  title: string;
  tagline: string;
  bestSeason: string;
  curatedPlaces: string[];
  climateTip: string;
  transitTip: string;
  coverImage: string;
}

const FEATURED_TRAVEL_DESTINATIONS: TravelDestinationInfo[] = [
  {
    id: "dest-kr",
    country: "대한민국",
    countryEmoji: "🇰🇷",
    title: "사계절 감성과 도심의 트렌드가 공존하는 K-트래블",
    tagline: "성수동 감성 골목부터 제주 에메랄드 해변, 부산 달맞이길 야경까지",
    bestSeason: "4월~6월(봄 벚꽃·신록), 9월~11월(가을 단풍)",
    curatedPlaces: ["성수 대림창고", "제주 애월 한담해변", "해운대 달맞이길", "강릉 아르떼뮤지엄"],
    climateTip: "봄·가을은 일교차가 크므로 얇은 겉옷 필수. 여름은 우산과 자외선 차단제 지참.",
    transitTip: "지하철과 시내버스는 티머니/신용카드 후불교통으로 전국 100% 환승 할인 적용.",
    coverImage: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest-jp",
    country: "일본",
    countryEmoji: "🇯🇵",
    title: "네온사인 골목과 낭만적인 미식의 천국, 도쿄 & 간사이",
    tagline: "시부야 스카이 360도 야경, 골목 야키니쿠와 정갈한 로컬 라멘 투어",
    bestSeason: "3월~5월(벚꽃 축제), 10월~12월(청명한 가을·겨울 일루미네이션)",
    curatedPlaces: ["시부야 스카이 전망대", "신주쿠 오모이데요코초", "교토 아라시야마", "오사카 도톤보리"],
    climateTip: "한국과 기온이 비슷하나 도쿄는 습도가 약간 높고 겨울은 비교적 포근함.",
    transitTip: "아이폰 Apple Pay에 Suica/Pasmo 즉시 등록 가능. 전철 환승 시 라인별 개찰구 주의.",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest-fr",
    country: "프랑스",
    countryEmoji: "🇫🇷",
    title: "예술과 와인, 세느강의 낭만이 흐르는 파리 & 프로방스",
    tagline: "사크레쾨르 언덕의 아코디언 선율과 테라스 비스트로에서 즐기는 와인",
    bestSeason: "5월~9월(밤 10시까지 긴 일몰과 쾌적한 야외 테라스 라이프)",
    curatedPlaces: ["몽마르트르 사크레쾨르", "루브르 박물관", "마레 지구 감성 편집숍", "에펠탑 마르스 광장"],
    climateTip: "여름에도 건조하여 그늘은 시원함. 실내 에어컨이 없는 곳이 많으니 부채나 핸디팬 추천.",
    transitTip: "나비고 이지(Navigo Easy) 카드 또는 스마트폰 충전식 티켓(t+)으로 메트로·버스 탑승.",
    coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest-it",
    country: "이탈리아",
    countryEmoji: "🇮🇹",
    title: "천년의 역사와 골목마다 퍼지는 피스타치오 젤라토 향기",
    tagline: "트레비 분수의 소원 동전과 피렌체 두오모 붉은 지붕, 베네치아 곤돌라",
    bestSeason: "4월~6월, 9월~10월(화창하고 걷기 가장 좋은 날씨)",
    curatedPlaces: ["로마 트레비 분수", "콜로세움", "피렌체 미켈란젤로 언덕", "베네치아 산마르코"],
    climateTip: "7~8월 한낮은 35도 이상 상승하므로 아침 일찍 유적지 관람 후 오후는 젤라토 휴식 권장.",
    transitTip: "도시 간 이동은 트랜이탈리아/이탈로 고속열차 사전 예약이 가장 경제적이고 쾌적.",
    coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dest-ch",
    country: "스위스",
    countryEmoji: "🇨🇭",
    title: "아이거 북벽과 만년설 아래 푸른 호수를 품은 대자연의 요람",
    tagline: "그린델발트 샬레 테라스에서 즐기는 치즈 퐁뒤와 빙하 파노라마 열차",
    bestSeason: "6월~9월(알프스 야생화 하이킹), 12월~3월(환상적인 설경과 스키)",
    curatedPlaces: ["그린델발트 피르스트", "융프라우요흐", "체르마트 마테호른", "루체른 카펠교"],
    climateTip: "해발고도가 높아 산 위는 여름에도 10도 이하로 쌀쌀. 방풍 재킷과 선글라스 필수.",
    transitTip: "스위스 트래블 패스 한 장으로 모든 기차, 유람선, 트램 무제한 탑승 및 박물관 무료.",
    coverImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
  }
];

export const TravelMap: React.FC<TravelMapProps> = ({
  places,
  onSelectPlace,
  onOpenAddPlace,
  onOpenPhotoManager,
}) => {
  // Navigation tabs: organize by "일자별 (Date)" or "나라별 (Country)"
  const [navTab, setNavTab] = useState<"date" | "country">("country");
  
  // Community Scope: "all" (전체), "mine" (내 여행지), "community" (타인의 여행지)
  const [authorScope, setAuthorScope] = useState<"all" | "mine" | "community">("all");

  // Country filtering (Active selected country when in country tab)
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>("all");

  // Date sorting / filtering (e.g. All dates, 2026.08, 2026.07, etc.)
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>("all");

  // Category and search query
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(places[0]?.id || null);
  const [mapStyle, setMapStyle] = useState<"modern" | "satellite">("modern");

  // Extract unique countries with place counts
  const availableCountries = useMemo(() => {
    const map = new Map<string, { name: string; emoji: string; count: number; otherCount: number }>();
    places.forEach((p) => {
      const cName = p.countryName || (p.address.includes("대한민국") || !p.countryName ? "대한민국" : "기타");
      const cEmoji = p.countryEmoji || (cName === "대한민국" ? "🇰🇷" : cName === "일본" ? "🇯🇵" : cName === "프랑스" ? "🇫🇷" : cName === "이탈리아" ? "🇮🇹" : cName === "스위스" ? "🇨🇭" : "🌍");
      const current = map.get(cName) || { name: cName, emoji: cEmoji, count: 0, otherCount: 0 };
      current.count += 1;
      if (p.isOtherTraveler) current.otherCount += 1;
      map.set(cName, current);
    });
    return Array.from(map.values());
  }, [places]);

  // Extract unique date months (e.g. "2026.08", "2026.07")
  const availableDateMonths = useMemo(() => {
    const set = new Set<string>();
    places.forEach((p) => {
      if (p.visitDate) {
        const parts = p.visitDate.split(".");
        if (parts.length >= 2) {
          set.add(`${parts[0]}.${parts[1]}`);
        } else {
          set.add(p.visitDate.slice(0, 7));
        }
      }
    });
    return Array.from(set).sort().reverse();
  }, [places]);

  // Main filtered places
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      // 1. Author scope filter
      if (authorScope === "mine" && p.isOtherTraveler) return false;
      if (authorScope === "community" && !p.isOtherTraveler) return false;

      // 2. Tab-specific filter: Date vs Country
      if (navTab === "country") {
        if (selectedCountryFilter !== "all") {
          const cName = p.countryName || "대한민국";
          if (cName !== selectedCountryFilter) return false;
        }
      } else {
        if (selectedDateFilter !== "all") {
          if (!p.visitDate.startsWith(selectedDateFilter)) return false;
        }
      }

      // 3. Category filter
      if (selectedCategory !== "all" && p.category !== selectedCategory) return false;

      // 4. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(query) ||
          p.address.toLowerCase().includes(query) ||
          p.cityArea.toLowerCase().includes(query) ||
          (p.countryName && p.countryName.toLowerCase().includes(query)) ||
          (p.authorName && p.authorName.toLowerCase().includes(query)) ||
          p.tags.some((t) => t.toLowerCase().includes(query));
        if (!match) return false;
      }

      return true;
    });
  }, [places, navTab, authorScope, selectedCountryFilter, selectedDateFilter, selectedCategory, searchQuery]);

  const activePlace = useMemo(() => {
    return places.find((p) => p.id === selectedPlaceId) || filteredPlaces[0] || places[0];
  }, [places, selectedPlaceId, filteredPlaces]);

  // Group places for bottom display according to active Tab
  const groupedByCountryForView = useMemo(() => {
    const map = new Map<string, VisitedPlace[]>();
    filteredPlaces.forEach((p) => {
      const c = p.countryName || "대한민국";
      const list = map.get(c) || [];
      list.push(p);
      map.set(c, list);
    });
    return Array.from(map.entries());
  }, [filteredPlaces]);

  // Calculate pin coordinate based on cityArea or address
  const getPinCoordinate = (place: VisitedPlace): RegionMapPoint => {
    for (const [key, coords] of Object.entries(REGION_COORDS)) {
      if (place.address.includes(key) || place.cityArea.includes(key) || place.name.includes(key) || (place.countryName && place.countryName.includes(key))) {
        const seed = place.name.charCodeAt(0) % 7 - 3;
        return {
          x: Math.min(88, Math.max(12, coords.x + seed * 1.5)),
          y: Math.min(88, Math.max(12, coords.y + (seed % 3) * 1.5)),
        };
      }
    }
    const hash = place.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      x: 35 + (hash % 40),
      y: 25 + ((hash * 7) % 50),
    };
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-stone-800">
      {/* Top Banner & Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-linear-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-40 h-40 rounded-full bg-teal-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-2.5 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>일자별·나라별 스마트 트래블 맵 & 네이버식 대중교통 뷰어</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            나만의 여행 지도 & 타인들의 글로벌 추천 명소
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            방문 일자 및 나라별로 여행지를 편리하게 분류하고, 이용하지 않았어도 즉시 확인할 수 있는 정밀 대중교통·택시 가이드와 현장 사진을 자유롭게 등록해보세요.
          </p>
        </div>

        {/* Dual Register Buttons: My Place & Other Person's Place */}
        <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenAddPlace("mine")}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>내 여행지 등록</span>
          </button>

          <button
            onClick={() => onOpenAddPlace("other")}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs sm:text-sm text-stone-900 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-stone-950" />
            <span>타인 여행지 (나라별) 등록</span>
          </button>
        </div>
      </div>

      {/* Primary Organizing Tabs: [일자별] vs [나라별] (User Explicit Request) */}
      <div className="bg-white p-2.5 sm:p-3 rounded-3xl border border-stone-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Left: Date / Country Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-2xl shrink-0">
          <button
            onClick={() => setNavTab("country")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
              navTab === "country"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">나라별 탭</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 whitespace-nowrap shrink-0">
              {availableCountries.length}개국
            </span>
          </button>

          <button
            onClick={() => setNavTab("date")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
              navTab === "date"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">일자별 탭</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 whitespace-nowrap shrink-0">
              {availableDateMonths.length}개 기간
            </span>
          </button>
        </div>

        {/* Center: Author Scope (전체 / 내 여행지 / 타인 여행지) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
          <button
            onClick={() => setAuthorScope("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              authorScope === "all"
                ? "bg-stone-900 text-white shadow-xs"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            전체 보기 ({places.length})
          </button>
          <button
            onClick={() => setAuthorScope("mine")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              authorScope === "mine"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">나만의 여행지 ({places.filter((p) => !p.isOtherTraveler).length})</span>
          </button>
          <button
            onClick={() => setAuthorScope("community")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              authorScope === "community"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">타인의 여행지 ({places.filter((p) => p.isOtherTraveler).length})</span>
          </button>
        </div>

        {/* Right: Search Input */}
        <div className="relative w-full md:w-64 shrink-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none shrink-0" />
          <input
            type="text"
            placeholder="장소명, 나라, 작성자, 태그 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 whitespace-nowrap"
          />
        </div>
      </div>

      {/* Sub-Filters: Date Pills or Country Pills based on Active Tab */}
      <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
        {navTab === "country" ? (
          /* Country Pills Row */
          <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-thin pb-1">
            <span className="text-xs font-extrabold text-stone-500 shrink-0 flex items-center gap-1 mr-1">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>국가 필터:</span>
            </span>
            <button
              onClick={() => setSelectedCountryFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedCountryFilter === "all"
                  ? "bg-stone-800 text-white shadow-xs"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              전체 국가
            </button>
            {availableCountries.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedCountryFilter(c.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedCountryFilter === c.name
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
                <span className="text-[10px] opacity-80 font-mono">({c.count})</span>
              </button>
            ))}
          </div>
        ) : (
          /* Date Months Pills Row */
          <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-thin pb-1">
            <span className="text-xs font-extrabold text-stone-500 shrink-0 flex items-center gap-1 mr-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>방문 일자 필터:</span>
            </span>
            <button
              onClick={() => setSelectedDateFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedDateFilter === "all"
                  ? "bg-stone-800 text-white shadow-xs"
                  : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
              }`}
            >
              전체 일자
            </button>
            {availableDateMonths.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedDateFilter(month)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  selectedDateFilter === month
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                <span>🗓️</span>
                <span>{month}</span>
              </button>
            ))}
          </div>
        )}

        {/* Place Category Selector (음식점, 카페, 관광지, 숙소) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pt-2 border-t border-stone-200/60">
          <span className="text-[11px] font-bold text-stone-400 shrink-0 mr-1">카테고리:</span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer shrink-0 ${
              selectedCategory === "all" ? "bg-stone-700 text-white" : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
            }`}
          >
            전체
          </button>
          {(Object.keys(CATEGORY_CONFIG) as PlaceCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer shrink-0 ${
                selectedCategory === cat ? "bg-emerald-600 text-white" : "bg-stone-200/70 text-stone-700 hover:bg-stone-300"
              }`}
            >
              <span>{CATEGORY_CONFIG[cat].icon}</span>
              <span>{CATEGORY_CONFIG[cat].label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Map + Sidebar Split View (Naver Map Style with Transit Guide) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Map Stage */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-3">
          <div className="relative w-full h-[500px] sm:h-[600px] rounded-3xl overflow-hidden border-2 border-stone-200/90 shadow-xl bg-[#0e1726] select-none">
            {/* Map Canvas Background Texture */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: mapStyle === "modern"
                  ? `radial-gradient(circle at 45% 40%, #1e293b 0%, #0f172a 100%)`
                  : `radial-gradient(circle at 45% 40%, #111827 0%, #030712 100%)`
              }}
            />

            {/* Stylized Geo Roads & Coastlines Grid Lines */}
            <div className="absolute inset-0 border border-emerald-500/10 [background-image:linear-gradient(to_right,#10b98108_1px,transparent_1px),linear-gradient(to_bottom,#10b98108_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

            {/* Stylized Geography Silhouettes & World Hub Marks */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              {/* Korea Capital */}
              <div className="absolute top-[20%] left-[36%] text-[10px] text-emerald-300 font-bold tracking-wider">
                대한민국 (서울·경기)
              </div>
              <div className="absolute top-[18%] left-[34%] w-16 h-16 rounded-full border border-emerald-400/40" />

              {/* Gangwon */}
              <div className="absolute top-[18%] left-[64%] text-[10px] text-sky-300 font-bold tracking-wider">
                강원 동해안
              </div>

              {/* Busan */}
              <div className="absolute bottom-[28%] right-[16%] text-[10px] text-amber-300 font-bold tracking-wider">
                부산 / 남해안
              </div>

              {/* Jeju */}
              <div className="absolute bottom-[10%] left-[24%] text-[10px] text-teal-300 font-bold tracking-wider">
                제주도
              </div>

              {/* Global Zones */}
              <div className="absolute top-[32%] right-[10%] text-[10px] text-rose-300 font-bold tracking-wider">
                일본 (도쿄·간사이)
              </div>
              <div className="absolute top-[25%] left-[14%] text-[10px] text-indigo-300 font-bold tracking-wider">
                유럽 (프랑스·스위스·이탈리아)
              </div>
            </div>

            {/* Map Controls: Switch Modern / Dark Satellite */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 bg-stone-900/85 backdrop-blur-md p-1 rounded-2xl border border-stone-700/80 text-[11px] text-white">
              <button
                onClick={() => setMapStyle("modern")}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  mapStyle === "modern" ? "bg-emerald-500 text-white" : "text-stone-300 hover:text-white"
                }`}
              >
                네이버 지도 스타일
              </button>
              <button
                onClick={() => setMapStyle("satellite")}
                className={`px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  mapStyle === "satellite" ? "bg-emerald-500 text-white" : "text-stone-300 hover:text-white"
                }`}
              >
                위성 다크 뷰
              </button>
            </div>

            {/* Total Pins Counter Badge */}
            <div className="absolute top-4 right-4 z-30 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-stone-200 shadow-md flex items-center gap-2 text-xs font-bold text-stone-800">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>표시된 장소: {filteredPlaces.length}곳</span>
            </div>

            {/* Interactive Pins on Map */}
            {filteredPlaces.map((p) => {
              const coords = getPinCoordinate(p);
              const isSelected = activePlace?.id === p.id;
              const catConfig = CATEGORY_CONFIG[p.category];

              return (
                <div
                  key={p.id}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  onClick={() => {
                    setSelectedPlaceId(p.id);
                  }}
                >
                  {/* Pin Body */}
                  <div
                    className={`relative flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "scale-125 z-30"
                        : "group-hover:scale-115 group-hover:z-20 opacity-90 hover:opacity-100"
                    }`}
                  >
                    {/* Pulsing ring on selected */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-emerald-400/40 animate-ping" />
                    )}

                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center text-base shadow-lg border-2 transition-colors ${
                        isSelected
                          ? "bg-stone-950 text-white border-emerald-400 ring-4 ring-emerald-500/30"
                          : p.isOtherTraveler
                          ? "bg-indigo-600 text-white border-white"
                          : "bg-white text-stone-900 border-emerald-500"
                      }`}
                    >
                      <span>{catConfig.icon}</span>
                    </div>

                    {/* Country Emoji Pin Tag */}
                    <span className="absolute -top-2 -right-2 text-xs bg-stone-900/90 rounded-full px-1 py-0.5 border border-white/40 shadow-xs">
                      {p.countryEmoji || "📍"}
                    </span>
                  </div>

                  {/* Tooltip Label */}
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap shadow-xl border pointer-events-none transition-all ${
                      isSelected
                        ? "bg-stone-950 text-white border-emerald-400 opacity-100 scale-105 z-30"
                        : "bg-white/95 text-stone-800 border-stone-300 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span>{p.name}</span>
                      {p.isOtherTraveler && (
                        <span className="text-[9px] px-1 rounded bg-indigo-100 text-indigo-800 font-bold">
                          공유
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Bottom Sub-Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 rounded-2xl bg-white border border-stone-200/80 text-xs text-stone-600 shadow-2xs">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1 font-semibold text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                내 등록 장소
              </span>
              <span className="flex items-center gap-1 font-semibold text-indigo-800">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                타인 추천 장소 (나라별)
              </span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-500">
                현재 선택: <strong className="text-stone-900">{activePlace ? activePlace.name : "없음"}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAddPlace("other")}
                className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
              >
                + 타인 여행지 등록하기
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Active Place Details Card (Naver Map Style Panel) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          {activePlace ? (
            <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md overflow-hidden animate-in fade-in duration-200">
              {/* Card Photo Header */}
              <div className="relative h-48 w-full bg-stone-900 group">
                <img
                  src={activePlace.photos[0]?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"}
                  alt={activePlace.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Country and Category Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-stone-900/85 backdrop-blur-md text-white border border-stone-700 shadow-xs flex items-center gap-1">
                    <span>{activePlace.countryEmoji || "🌍"}</span>
                    <span>{activePlace.countryName || "대한민국"}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-emerald-600/90 backdrop-blur-md text-white shadow-xs">
                    {activePlace.categoryLabel}
                  </span>
                  {activePlace.isOtherTraveler && (
                    <span className="px-2 py-0.5 rounded-xl text-[10px] font-black bg-indigo-600 text-white shadow-xs">
                      타인 추천
                    </span>
                  )}
                </div>

                {/* Star Rating Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-xs font-black bg-stone-900/80 backdrop-blur-md text-amber-300 border border-stone-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{activePlace.rating}.0</span>
                </div>

                {/* Title & Author on Photo Bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-black tracking-tight drop-shadow-sm truncate">
                    {activePlace.name}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-stone-200 mt-0.5">
                    <span className="truncate">{activePlace.cityArea}</span>
                    {activePlace.authorName && (
                      <span className="text-emerald-300 font-medium shrink-0">
                        작성: {activePlace.authorName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-4">
                {/* Meta details */}
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{activePlace.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      <span>방문: {activePlace.visitDate}</span>
                    </span>
                    {activePlace.priceRange && (
                      <span className="text-stone-400">• {activePlace.priceRange}</span>
                    )}
                  </div>
                </div>

                {/* Highlights / Must-Try */}
                <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1">
                  <div className="font-extrabold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>추천 포인트 & 대표 메뉴:</span>
                  </div>
                  <p className="text-amber-950 font-medium">
                    {activePlace.mustTryOrHighlight}
                  </p>
                </div>

                {/* Notes Snippet */}
                <p className="text-xs text-stone-700 leading-relaxed line-clamp-3 bg-stone-50 p-3 rounded-2xl border border-stone-200/60">
                  {activePlace.notes}
                </p>

                {/* Naver Map Style Transit Guide Quick Preview */}
                {activePlace.transportGuide && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                        <span>교통편 이용 안내 (네이버 지도식)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900 font-bold">
                        AI 교통 플래너
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                          <Bus className="w-3 h-3 text-emerald-600" />
                          <span>대중교통</span>
                        </span>
                        <span className="font-black text-emerald-800 text-sm">
                          약 {activePlace.transportGuide.transit.totalDurationMinutes}분
                        </span>
                        <span className="text-[10px] text-stone-500 truncate">
                          {activePlace.transportGuide.transit.fareEstimate}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-emerald-100 flex flex-col justify-between">
                        <span className="text-[10px] font-bold text-stone-500 flex items-center gap-1">
                          <Car className="w-3 h-3 text-amber-600" />
                          <span>택시 이동</span>
                        </span>
                        <span className="font-black text-amber-800 text-sm">
                          약 {activePlace.transportGuide.taxi.durationMinutes}분
                        </span>
                        <span className="text-[10px] text-stone-500 truncate">
                          {activePlace.transportGuide.taxi.estimatedFare}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-emerald-900 leading-snug line-clamp-2">
                      💡 {activePlace.transportGuide.transit.tips}
                    </p>
                  </div>
                )}

                {/* Photo Previews Row */}
                {activePlace.photos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-stone-500 mb-2">
                      <span>현장 사진 갤러리</span>
                      <button
                        onClick={() => onOpenPhotoManager(activePlace)}
                        className="text-amber-600 hover:text-amber-700 text-[11px] font-bold cursor-pointer"
                      >
                        사진 추가/관리 →
                      </button>
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {activePlace.photos.map((ph, idx) => (
                        <div
                          key={ph.id || idx}
                          onClick={() => onOpenPhotoManager(activePlace)}
                          className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200 cursor-pointer group"
                        >
                          <img
                            src={ph.url}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => onOpenPhotoManager(activePlace)}
                        className="w-16 h-16 rounded-xl border border-dashed border-stone-300 hover:border-amber-500 bg-stone-50 flex flex-col items-center justify-center gap-0.5 text-stone-500 hover:text-amber-700 text-[10px] font-bold shrink-0 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>추가</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectPlace(activePlace)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
                  >
                    <span>상세 정보 & 전체 길안내 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenPhotoManager(activePlace)}
                    className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
                    title="사진 관리"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <MapPin className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-xs text-stone-500">
                선택된 장소가 없습니다. 지도에서 핀을 클릭해보세요.
              </p>
            </div>
          )}

          {/* Quick List of Places in Current Filter */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-4 shadow-xs space-y-2">
            <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>목록 ({filteredPlaces.length}곳)</span>
              {navTab === "country" && selectedCountryFilter !== "all" && (
                <span className="text-emerald-700 font-bold">{selectedCountryFilter}</span>
              )}
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1.5 scrollbar-thin">
              {filteredPlaces.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlaceId(p.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                    activePlace?.id === p.id
                      ? "bg-emerald-50/80 border-emerald-300 font-bold text-emerald-950"
                      : "bg-stone-50/50 hover:bg-stone-100/70 border-stone-200/70 text-stone-700"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base">{p.countryEmoji || CATEGORY_CONFIG[p.category].icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-extrabold truncate flex items-center gap-1.5">
                        <span>{p.name}</span>
                        {p.isOtherTraveler && (
                          <span className="text-[9px] px-1 rounded bg-indigo-100 text-indigo-700 font-semibold">
                            {p.authorName?.split(" ")[0]}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-stone-400 truncate">{p.address}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-200/70 font-mono text-stone-600 shrink-0">
                    ⭐ {p.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM SECTION: 여행지 정보 큐레이션 & 나라별 여행 가이드
          (User explicitly requested: 하단에는 여러 여행지에 대한 정보 등이 있으면 좋겠어)
      ========================================================================= */}
      <div className="space-y-6 pt-4 border-t-2 border-stone-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
              <CompassIcon className="w-3.5 h-3.5 text-amber-700" />
              <span>글로벌 여행지 백과 & 나라별 완벽 가이드</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              꼭 가봐야 할 국내외 인기 여행지 큐레이션
            </h3>
            <p className="text-xs text-stone-500">
              최적의 여행 시즌, 현지 교통 팁, 꼭 둘러봐야 할 명소와 실시간 기후 정보까지 한 번에 확인하세요!
            </p>
          </div>

          <button
            onClick={() => onOpenAddPlace("other")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-emerald-700 text-white transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>이 여행지에 장소 등록하기</span>
          </button>
        </div>

        {/* Travel Destination Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TRAVEL_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-900">
                  <img
                    src={dest.coverImage}
                    alt={dest.country}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-stone-900/85 backdrop-blur-md text-white text-xs font-black flex items-center gap-1.5 border border-stone-700 shadow-sm">
                    <span>{dest.countryEmoji}</span>
                    <span>{dest.country}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-extrabold text-sm sm:text-base leading-snug drop-shadow-sm">
                      {dest.title}
                    </h4>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-3.5 text-xs text-stone-600">
                  <p className="text-stone-700 font-medium leading-relaxed">
                    {dest.tagline}
                  </p>

                  <div className="space-y-2 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                    <div className="flex items-start gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-800">최적 여행 시기:</strong> {dest.bestSeason}
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-800">대중교통 팁:</strong> {dest.transitTip}
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-800">날씨 & 복장:</strong> {dest.climateTip}
                      </div>
                    </div>
                  </div>

                  {/* Highlights Tags */}
                  <div>
                    <div className="text-[11px] font-bold text-stone-500 mb-1.5">
                      주요 핫플레이스:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.curatedPlaces.map((pl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-semibold"
                        >
                          📍 {pl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setNavTab("country");
                    setSelectedCountryFilter(dest.country);
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-emerald-600 hover:text-white text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{dest.country} 여행지 지도에서 필터링</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
