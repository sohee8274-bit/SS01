import React, { useState } from "react";
import { 
  X, MapPin, Sparkles, Plus, Star, Utensils, Bed, 
  Compass, Coffee, Camera, Navigation, ArrowRight, Loader2,
  CheckCircle2, Upload
} from "lucide-react";
import { VisitedPlace, PlaceCategory, TransportationGuide } from "../types";
import confetti from "canvas-confetti";

interface AddPlaceModalProps {
  onClose: () => void;
  onAddPlace: (newPlace: VisitedPlace) => void;
  initialMode?: "mine" | "other";
  initialCountry?: string;
}

const COUNTRY_OPTIONS = [
  { name: "대한민국", emoji: "🇰🇷" },
  { name: "일본", emoji: "🇯🇵" },
  { name: "프랑스", emoji: "🇫🇷" },
  { name: "이탈리아", emoji: "🇮🇹" },
  { name: "스위스", emoji: "🇨🇭" },
  { name: "스페인", emoji: "🇪🇸" },
  { name: "미국", emoji: "🇺🇸" },
  { name: "영국", emoji: "🇬🇧" },
  { name: "베트남", emoji: "🇻🇳" },
  { name: "태국", emoji: "🇹🇭" },
  { name: "대만", emoji: "🇹🇼" },
  { name: "기타 (직접입력)", emoji: "🌍" },
];

const CATEGORIES: { key: PlaceCategory; label: string; icon: string; desc: string }[] = [
  { key: "restaurant", label: "음식점", icon: "🍽️", desc: "맛집, 로컬 식당, 파인다이닝" },
  { key: "cafe", label: "감성카페", icon: "☕", desc: "베이커리, 디저트, 갤러리카페" },
  { key: "attraction", label: "관광지", icon: "🎡", desc: "자연경관, 테마파크, 전시관" },
  { key: "stay", label: "숙소", icon: "🏨", desc: "호텔, 풀빌라, 감성 한옥스테이" },
];

const PRESET_PLACES = [
  {
    name: "제주 협재해변 노을 카페",
    category: "cafe" as PlaceCategory,
    address: "제주 제주시 한림읍 한림로 329",
    cityArea: "제주 협재",
    lat: 33.3941,
    lng: 126.2397,
    notes: "비양도가 손에 잡힐 듯 보이는 에메랄드빛 해변 앞 야외 테라스. 석양이 황홀함.",
    mustTryOrHighlight: "제주 한라봉 에이드 & 크림 크로플",
    priceRange: "음료 7,000원대",
    photoUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "서울 익선동 한옥 이탈리안",
    category: "restaurant" as PlaceCategory,
    address: "서울 종로구 수표로28길 17",
    cityArea: "서울 종로",
    lat: 37.5742,
    lng: 126.9898,
    notes: "골목 안 고즈넉한 한옥에서 맛보는 화덕피자와 트러플 파스타. 데이트 코스로 강추.",
    mustTryOrHighlight: "트러플 크림 뇨끼 & 루꼴라 피자",
    priceRange: "1인 2만원대",
    photoUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "경주 황리단길 한옥 풀빌라",
    category: "stay" as PlaceCategory,
    address: "경북 경주시 포석로 1068",
    cityArea: "경북 경주",
    lat: 35.8341,
    lng: 129.2104,
    notes: "대청마루에서 차를 마시고 마당 자쿠지에서 노천욕을 즐길 수 있는 감성 한옥 스테이.",
    mustTryOrHighlight: "프라이빗 편백나무 히노끼탕 & 다도 세트",
    priceRange: "1박 30만원대",
    photoUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
  },
];

export const AddPlaceModal: React.FC<AddPlaceModalProps> = ({
  onClose,
  onAddPlace,
  initialMode = "mine",
  initialCountry = "대한민국",
}) => {
  const [isOtherTraveler, setIsOtherTraveler] = useState(initialMode === "other");
  const [authorName, setAuthorName] = useState(initialMode === "other" ? "여행 탐험가" : "나 (김은하)");
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [customCountryName, setCustomCountryName] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PlaceCategory>("restaurant");
  const [rating, setRating] = useState(5);
  const [visitDate, setVisitDate] = useState(new Date().toISOString().slice(0, 10).replace(/-/g, "."));
  const [address, setAddress] = useState("");
  const [cityArea, setCityArea] = useState("");
  const [notes, setNotes] = useState("");
  const [mustTry, setMustTry] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // AI Transit Generation State
  const [originForTransit, setOriginForTransit] = useState("서울역 / 주요 중심지");
  const [isAiGeneratingTransit, setIsAiGeneratingTransit] = useState(false);
  const [generatedTransit, setGeneratedTransit] = useState<TransportationGuide | null>(null);

  const handleSelectPreset = (p: typeof PRESET_PLACES[0]) => {
    setName(p.name);
    setCategory(p.category);
    setAddress(p.address);
    setCityArea(p.cityArea);
    setNotes(p.notes);
    setMustTry(p.mustTryOrHighlight);
    setPriceRange(p.priceRange);
    setPhotoUrl(p.photoUrl);
    setPhotoCaption(p.mustTryOrHighlight);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setPhotoUrl(dataUrl);
        if (!photoCaption) setPhotoCaption(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateAiTransit = async () => {
    if (!name.trim() && !address.trim()) {
      alert("장소 이름이나 주소를 먼저 입력해주세요.");
      return;
    }

    setIsAiGeneratingTransit(true);
    try {
      const res = await fetch("/api/generate-transit-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          placeName: name.trim() || address.trim(),
          category,
          address: address.trim() || "해당 장소 중심가",
          origin: originForTransit.trim() || "가장 가까운 KTX역 또는 지하철 중심역",
        }),
      });

      const data = await res.json();
      if (data.guide) {
        setGeneratedTransit(data.guide);
      }
    } catch (err) {
      console.error("AI transit error:", err);
    } finally {
      setIsAiGeneratingTransit(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("장소 이름을 입력해주세요.");
      return;
    }

    const categoryObj = CATEGORIES.find((c) => c.key === category) || CATEGORIES[0];
    const tags = tagsInput
      ? tagsInput.split(",").map((t) => t.trim().replace(/^#/, "")).filter(Boolean)
      : [categoryObj.label, cityArea || "국내여행", "직접방문"];

    const photos = photoUrl
      ? [
          {
            id: `photo-${Date.now()}`,
            url: photoUrl,
            caption: photoCaption || `${name} 현장 사진`,
            takenAt: visitDate,
          },
        ]
      : [];

    // Default fallback guide if user didn't explicitly request AI generator
    const defaultTransit: TransportationGuide = generatedTransit || {
      originName: originForTransit || "인근 KTX/지하철역",
      destinationName: name,
      transit: {
        totalDurationMinutes: 25,
        transferCount: 0,
        summary: `주요 대중교통 노선 직통 운행 (${address || name} 방면)`,
        steps: [
          {
            type: "subway",
            lineOrRoute: "주요 대중교통",
            departureName: originForTransit || "중심역 승차",
            arrivalName: `${name} 인근 정류장`,
            durationMinutes: 20,
            instruction: "가까운 역에서 승차 후 인근 역 하차",
            color: "#10b981",
          },
          {
            type: "walk",
            durationMinutes: 5,
            instruction: "출구 나와 도보 300m 이내 이동",
            color: "#6b7280",
          },
        ],
        fareEstimate: "1,400원",
        tips: "네이버 지도 앱을 통해 실시간 버스 도착 정보 및 지하철 혼잡도 확인 가능",
      },
      taxi: {
        durationMinutes: 15,
        estimatedFare: "약 9,800원 ~ 12,000원",
        trafficStatus: "smooth",
        tollFee: "통행료 없음",
        tips: "카카오T 또는 우티 앱을 통해 바로 목적지 지정 호출 가능",
      },
      walkingOrBike: {
        durationMinutes: 20,
        distanceKm: 2.5,
        calories: 95,
        routeHint: "평지 위주의 쾌적한 보행로 및 자전거 전용도로 구비",
      },
    };

    const finalCountryName = selectedCountry === "기타 (직접입력)" 
      ? (customCountryName.trim() || "기타") 
      : selectedCountry;
    const countryOption = COUNTRY_OPTIONS.find((c) => c.name === selectedCountry);
    const finalCountryEmoji = countryOption ? countryOption.emoji : "🌍";

    const newPlace: VisitedPlace = {
      id: `place-${Date.now()}`,
      countryName: finalCountryName,
      countryEmoji: finalCountryEmoji,
      authorName: isOtherTraveler ? (authorName.trim() || "익명의 여행자") : "나 (김은하)",
      isOtherTraveler,
      name: name.trim(),
      category,
      categoryLabel: categoryObj.label,
      rating,
      visitDate,
      address: address.trim() || `${cityArea || finalCountryName} 일대`,
      cityArea: cityArea.trim() || (address.includes(" ") ? address.split(" ").slice(0, 2).join(" ") : finalCountryName),
      lat: 36.5 + (Math.random() - 0.5) * 2,
      lng: 127.5 + (Math.random() - 0.5) * 2,
      notes: notes.trim() || `${name}에서 남긴 소중한 여행 기록입니다.`,
      mustTryOrHighlight: mustTry.trim() || "대표 추천 메뉴 및 방문 인증 포인트",
      photos,
      tags,
      priceRange: priceRange.trim() || "적정가",
      transportGuide: defaultTransit,
      likes: Math.floor(Math.random() * 10) + 1,
      createdAt: new Date().toISOString(),
    };

    onAddPlace(newPlace);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
              📍
            </div>
            <div>
              <h3 className="font-extrabold text-xl tracking-tight">
                지도에 다녀온 장소 등록하기
              </h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                음식점, 관광지, 숙소 등록 시 네이버 지도 스타일 교통편과 사진까지 완벽 보관!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Quick Fill */}
        <div className="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-bold text-emerald-900 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>추천 예시 빠른 입력:</span>
          </span>
          {PRESET_PLACES.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="px-2.5 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-100 font-medium shrink-0 transition-colors cursor-pointer"
            >
              {p.name.split(" ")[0]} {p.name.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Registration Mode & Country Selector */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-800">
                  등록 구분 (내 여행지 vs 다른 사람의 여행지) *
                </label>
                <p className="text-[11px] text-stone-500">
                  타인의 여행지는 나라별로 분류되어 커뮤니티 지도에 등록됩니다.
                </p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setIsOtherTraveler(false);
                    setAuthorName("나 (김은하)");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !isOtherTraveler
                      ? "bg-white text-emerald-800 shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  🙋‍♂️ 나만의 여행지
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOtherTraveler(true);
                    if (authorName.startsWith("나")) setAuthorName("여행 탐험가");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isOtherTraveler
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  🌍 다른 사람의 여행지
                </button>
              </div>
            </div>

            {/* Country and Author Input Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200/60">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center justify-between">
                  <span>방문 국가 / 나라 선택 *</span>
                  {isOtherTraveler && (
                    <span className="text-[10px] text-emerald-700 font-bold">
                      (타인 여행지 나라별 등록 필수)
                    </span>
                  )}
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.emoji} {c.name}
                    </option>
                  ))}
                </select>

                {selectedCountry === "기타 (직접입력)" && (
                  <input
                    type="text"
                    required
                    placeholder="국가명을 직접 입력하세요 (예: 독일, 싱가포르 등)"
                    value={customCountryName}
                    onChange={(e) => setCustomCountryName(e.target.value)}
                    className="w-full mt-2 px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  작성자 / 닉네임 *
                </label>
                <input
                  type="text"
                  required
                  placeholder={isOtherTraveler ? "예: 도쿄미식가, 알프스하이커" : "나 (김은하)"}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              장소 카테고리 선택 *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setCategory(cat.key)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    category === cat.key
                      ? "border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20 text-emerald-950 font-bold"
                      : "border-stone-200 hover:border-stone-300 bg-white text-stone-700"
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div>
                    <div className="text-sm font-extrabold">{cat.label}</div>
                    <div className="text-[10px] text-stone-500 line-clamp-1">{cat.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Name & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                장소 / 상호명 *
              </label>
              <input
                type="text"
                required
                placeholder="예: 성수 대림창고, 애월 해녀의집"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                상세 주소 또는 지역명 *
              </label>
              <input
                type="text"
                required
                placeholder="예: 서울 성동구 성수이로 78 or 제주 애월읍"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (!cityArea && e.target.value.includes(" ")) {
                    setCityArea(e.target.value.split(" ").slice(0, 2).join(" "));
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Rating, Visit Date, City Area */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                내 만족도 별점
              </label>
              <div className="flex items-center gap-1 py-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-stone-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                방문 날짜
              </label>
              <input
                type="text"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                placeholder="2026.08.14"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                대표 지역 태그
              </label>
              <input
                type="text"
                placeholder="예: 서울 성수, 제주 애월"
                value={cityArea}
                onChange={(e) => setCityArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Notes & Must-Try */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                대표 추천 메뉴 / 핵심 포인트
              </label>
              <input
                type="text"
                placeholder="예: 시그니처 뇨끼 & 화덕피자 or 루프탑 인피니티풀"
                value={mustTry}
                onChange={(e) => setMustTry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                가격대 정보 (선택)
              </label>
              <input
                type="text"
                placeholder="예: 1인 1~2만원대, 1박 20만원대"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              내 방문 후기 & 감상 노트
            </label>
            <textarea
              rows={2}
              placeholder="분위기, 뷰, 서비스, 재방문 의사 등 자유롭게 기록하세요."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Photo Registration Section */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-950 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-amber-600" />
                <span>장소 대표 사진 등록 (PC/모바일 업로드 또는 URL)</span>
              </span>
              <span className="text-[11px] text-amber-800 font-medium">
                등록 후 언제든 추가 사진 등록 가능
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-amber-300 bg-white hover:bg-amber-100/50 text-amber-900 font-bold text-xs cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-amber-600" />
                <span>내 기기에서 사진 파일 업로드</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <input
                type="url"
                placeholder="또는 이미지 URL 직접 입력"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-amber-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {photoUrl && (
              <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-amber-200">
                <img
                  src={photoUrl}
                  alt="미리보기"
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="사진 설명 (예: 창가 석에서 찍은 인생 뷰)"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    className="w-full text-xs border-b border-stone-200 py-1 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Naver Map Style Transit Guide Generator (AI) */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>네이버 지도식 대중교통/택시 길안내 자동 생성</span>
              </span>
              <button
                type="button"
                onClick={handleGenerateAiTransit}
                disabled={isAiGeneratingTransit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                {isAiGeneratingTransit ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>길찾기 생성 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI 교통편 자동 생성</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-emerald-900 leading-relaxed">
              본인이 직접 대중교통이나 택시를 타지 않았어도, 다른 여행자나 다음 방문 시 즉시 참고할 수 있는
              <span className="font-bold text-emerald-950"> 지하철 호선, 버스 번호, 예상 택시 요금, 도보 시간</span> 가이드가 등록됩니다.
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-600 shrink-0">출발지 기준:</span>
              <input
                type="text"
                value={originForTransit}
                onChange={(e) => setOriginForTransit(e.target.value)}
                placeholder="예: 서울역, 강남역, 제주공항, 부산역"
                className="flex-1 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {generatedTransit && (
              <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs space-y-1 text-emerald-900">
                <div className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>교통편 생성 완료: 대중교통 약 {generatedTransit.transit.totalDurationMinutes}분, 택시 {generatedTransit.taxi.durationMinutes}분 ({generatedTransit.taxi.estimatedFare})</span>
                </div>
                <p className="text-[11px] text-stone-600 truncate">
                  {generatedTransit.transit.summary}
                </p>
              </div>
            )}
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>지도에 장소 등록 완료</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
