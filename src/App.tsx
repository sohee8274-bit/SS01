import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CountryCard } from "./components/CountryCard";
import { CountryDetailModal } from "./components/CountryDetailModal";
import { CreateCountryModal } from "./components/CreateCountryModal";
import { PassportView } from "./components/PassportModal";
import { InteractiveMap } from "./components/InteractiveMap";
import { TravelMap } from "./components/TravelMap";
import { AddPlaceModal } from "./components/AddPlaceModal";
import { PlaceDetailModal } from "./components/PlaceDetailModal";
import { PlacePhotoModal } from "./components/PlacePhotoModal";
import { PostcardSection } from "./components/PostcardSection";
import { TravelQuizModal } from "./components/TravelQuizModal";
import { DEFAULT_COUNTRIES } from "./data/defaultCountries";
import { DEFAULT_VISITED_PLACES } from "./data/defaultPlaces";
import { Country, TravelerPassport, Postcard, PassportStamp, VisitedPlace } from "./types";
import { 
  Sparkles, Search, PlusCircle, Compass, MapPin, 
  BookUser, Heart, Stamp, SlidersHorizontal, Flame, Award, Map, Navigation
} from "lucide-react";
import confetti from "canvas-confetti";

const INITIAL_PASSPORT: TravelerPassport = {
  passportNumber: "DR-2026-8891-KOR",
  holderName: "김은하",
  travelerTitle: "은하수 방랑자 (Cosmic Wanderer)",
  issueDate: "2026.09.18",
  avatarEmoji: "🧭",
  stamps: [
    {
      id: "stamp-pudding-init",
      countryId: "country-pudding",
      countryName: "구름푸딩 왕국",
      flagEmoji: "🍮",
      date: "2026.09.18",
      colorTheme: "amber",
      quote: "매일 오후 3시, 달콤한 솜사탕 비!"
    }
  ]
};

const INITIAL_POSTCARDS: Postcard[] = [
  {
    id: "pc-1",
    countryId: "country-pudding",
    countryName: "구름푸딩 왕국",
    sender: "파티시에 민",
    message: "오후 3시에 내리는 솜사탕 비를 맞으며 바닐라 라떼를 마셨어요. 피로가 눈 녹듯 사라지는 기분!",
    date: "2026.09.18",
    stampEmoji: "🍮",
    bgGradient: "amber"
  },
  {
    id: "pc-2",
    countryId: "country-starlight",
    countryName: "별빛 바다의 아일랜드",
    sender: "야간 항해사 루카",
    message: "발광 플랑크톤 해변에 발을 담그니 밤바다가 푸른 은하수처럼 반짝였어요. 다음엔 꼭 텐트를 가져올 거예요.",
    date: "2026.09.17",
    stampEmoji: "🌌",
    bgGradient: "indigo"
  },
  {
    id: "pc-3",
    countryId: "country-bookforest",
    countryName: "초록 서재의 숲",
    sender: "사색하는 여행자",
    message: "천 년의 활자 거목 아래에서 나무가 건네준 오래된 시집 한 권을 읽었습니다. 바람 냄새가 종이 향기와 같아요.",
    date: "2026.09.16",
    stampEmoji: "📖",
    bgGradient: "emerald"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"explore" | "travel-map" | "map" | "create" | "passport" | "postcards">("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Persisted visited places (restaurants, attractions, stays)
  const [places, setPlaces] = useState<VisitedPlace[]>(() => {
    const saved = localStorage.getItem("my_visited_places");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error parsing saved places:", e);
      }
    }
    return DEFAULT_VISITED_PLACES;
  });

  // Modal controls for visited places
  const [selectedPlaceModal, setSelectedPlaceModal] = useState<VisitedPlace | null>(null);
  const [photoManagerPlace, setPhotoManagerPlace] = useState<VisitedPlace | null>(null);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [addPlaceMode, setAddPlaceMode] = useState<"mine" | "other">("mine");
  const [addPlaceCountry, setAddPlaceCountry] = useState<string>("대한민국");

  const handleOpenAddPlace = (mode: "mine" | "other" = "mine", country: string = "대한민국") => {
    setAddPlaceMode(mode);
    setAddPlaceCountry(country);
    setIsAddPlaceModalOpen(true);
  };

  // Persisted state
  const [countries, setCountries] = useState<Country[]>(() => {
    const saved = localStorage.getItem("my_travel_countries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Error parsing saved countries:", e);
      }
    }
    return DEFAULT_COUNTRIES;
  });

  const [passport, setPassport] = useState<TravelerPassport>(() => {
    const saved = localStorage.getItem("my_travel_passport");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing passport:", e);
      }
    }
    return INITIAL_PASSPORT;
  });

  const [postcards, setPostcards] = useState<Postcard[]>(() => {
    const saved = localStorage.getItem("my_travel_postcards");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Error parsing postcards:", e);
      }
    }
    return INITIAL_POSTCARDS;
  });

  const [likedCountryIds, setLikedCountryIds] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem("my_travel_liked_countries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing likes:", e);
      }
    }
    return { "country-pudding": true, "country-starlight": true };
  });

  // Modal controls
  const [selectedCountryModal, setSelectedCountryModal] = useState<Country | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("my_visited_places", JSON.stringify(places));
  }, [places]);

  useEffect(() => {
    localStorage.setItem("my_travel_countries", JSON.stringify(countries));
  }, [countries]);

  useEffect(() => {
    localStorage.setItem("my_travel_passport", JSON.stringify(passport));
  }, [passport]);

  useEffect(() => {
    localStorage.setItem("my_travel_postcards", JSON.stringify(postcards));
  }, [postcards]);

  useEffect(() => {
    localStorage.setItem("my_travel_liked_countries", JSON.stringify(likedCountryIds));
  }, [likedCountryIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Stamp a visa into passport
  const handleStampVisa = (country: Country) => {
    const exists = passport.stamps.some((s) => s.countryId === country.id);
    if (exists) {
      showToast(`이미 '${country.name}' 비자 도장이 여권에 찍혀 있습니다!`);
      return;
    }

    const newStamp: PassportStamp = {
      id: `stamp-${Date.now()}`,
      countryId: country.id,
      countryName: country.name,
      flagEmoji: country.flagEmoji,
      date: new Date().toLocaleDateString("ko-KR"),
      colorTheme: country.colorTheme,
      quote: country.slogan
    };

    setPassport((prev) => ({
      ...prev,
      stamps: [newStamp, ...prev.stamps]
    }));

    showToast(`축하합니다! '${country.name}' 입국 비자 도장이 여권에 날인되었습니다.`);
  };

  const handleToggleLike = (countryId: string) => {
    setLikedCountryIds((prev) => {
      const current = !!prev[countryId];
      const next = !current;
      // Update country like count
      setCountries((prevCountries) =>
        prevCountries.map((c) =>
          c.id === countryId ? { ...c, likes: c.likes + (next ? 1 : -1) } : c
        )
      );
      return { ...prev, [countryId]: next };
    });
  };

  const handleCountryCreated = (newCountry: Country) => {
    setCountries((prev) => [newCountry, ...prev]);
    setIsCreateModalOpen(false);

    // Auto stamp visa for founder
    handleStampVisa(newCountry);

    setSelectedCountryModal(newCountry);
    showToast(`🎉 새로운 나라 '${newCountry.name}'이(가) 환상세계에 건국되었습니다!`);
  };

  const handleAddPostcard = (newCard: Postcard) => {
    setPostcards((prev) => [newCard, ...prev]);
    showToast(`📬 '${newCard.countryName}'에서 보낸 엽서가 우체통에 등록되었습니다.`);
  };

  // Visited Place Actions
  const handleAddPlace = (newPlace: VisitedPlace) => {
    setPlaces((prev) => [newPlace, ...prev]);
    setIsAddPlaceModalOpen(false);
    setSelectedPlaceModal(newPlace);
    showToast(`✨ '${newPlace.name}' 장소와 네이버 스타일 교통 정보가 등록되었습니다!`);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleUpdatePlacePhotos = (placeId: string, updatedPhotos: VisitedPlace["photos"]) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === placeId ? { ...p, photos: updatedPhotos } : p))
    );
    if (selectedPlaceModal && selectedPlaceModal.id === placeId) {
      setSelectedPlaceModal((prev) => (prev ? { ...prev, photos: updatedPhotos } : null));
    }
    if (photoManagerPlace && photoManagerPlace.id === placeId) {
      setPhotoManagerPlace((prev) => (prev ? { ...prev, photos: updatedPhotos } : null));
    }
    showToast("📸 사진 앨범이 성공적으로 업데이트되었습니다.");
  };

  const handleDeletePlace = (placeId: string) => {
    setPlaces((prev) => prev.filter((p) => p.id !== placeId));
    setSelectedPlaceModal(null);
    showToast("장소가 목록에서 삭제되었습니다.");
  };

  // Filtered countries
  const filteredCountries = countries.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slogan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.geography.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.landmarks.some((lm) => lm.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === "all") return true;
    if (selectedCategory === "custom") return !!c.isCustom;
    if (selectedCategory === "sweet") return c.colorTheme === "amber" || c.name.includes("푸딩") || c.name.includes("구름");
    if (selectedCategory === "ocean") return c.colorTheme === "indigo" || c.colorTheme === "rose" || c.geography.includes("바다") || c.geography.includes("라군");
    if (selectedCategory === "nature") return c.colorTheme === "emerald" || c.geography.includes("숲");
    if (selectedCategory === "aurora") return c.colorTheme === "sky" || c.geography.includes("설원");

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/25 text-stone-800 font-sans selection:bg-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl border border-amber-400/40 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenAddPlace={() => setIsAddPlaceModalOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        passport={passport}
        favoriteCount={Object.values(likedCountryIds).filter(Boolean).length}
        placeCount={places.length}
      />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* VIEW 0: TRAVEL MAP (NAVER MAP STYLE VISITED PLACES & TRANSIT & PHOTOS) */}
        {activeTab === "travel-map" && (
          <TravelMap
            places={places}
            countries={countries}
            onSelectPlace={(p) => setSelectedPlaceModal(p)}
            onOpenAddPlace={(mode, country) => handleOpenAddPlace(mode || "mine", country || "대한민국")}
            onOpenCreateCountry={() => setIsCreateModalOpen(true)}
            onOpenPhotoManager={(p) => setPhotoManagerPlace(p)}
          />
        )}

        {/* VIEW 1: EXPLORE REALMS */}
        {activeTab === "explore" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Hero Welcome Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-amber-600 via-amber-700 to-stone-900 text-white p-6 sm:p-12 shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-bold border border-white/20">
                  <Compass className="w-4 h-4" />
                  <span>환상세계 여행자 환영 센터</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  당신만의 상상 속 나라로<br className="hidden sm:inline" />
                  언제든 여행을 떠나세요
                </h1>

                <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-light">
                  구름 위의 디저트 왕국부터 은하수 빛나는 심해 군도까지, 
                  나만의 특별한 여행 나라를 직접 건국하고 나만의 여권에 입국 비자를 모아보세요.
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("travel-map")}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-stone-950 shadow-lg shadow-emerald-950/40 active:scale-95 transition-all cursor-pointer"
                  >
                    <MapPin className="w-5 h-5 text-emerald-950" />
                    <span>내 맛집·숙소·교통 지도 열기</span>
                  </button>

                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg shadow-amber-950/30 active:scale-95 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>새로운 나라 건국하기</span>
                  </button>

                  <button
                    onClick={() => setIsQuizModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/25 active:scale-95 transition-all cursor-pointer"
                  >
                    <Award className="w-5 h-5 text-amber-300" />
                    <span>내 여행 성향 테스트</span>
                  </button>
                </div>
              </div>

              {/* Decorative Passport Floating Badge */}
              <div 
                onClick={() => setActiveTab("passport")}
                className="hidden lg:flex absolute right-10 bottom-10 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-900 flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform">
                  {passport.avatarEmoji}
                </div>
                <div>
                  <div className="text-xs text-amber-200 font-bold uppercase tracking-wider">
                    Official Passport
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {passport.holderName} 님의 여권
                  </div>
                  <div className="text-xs text-amber-100 flex items-center gap-1 mt-0.5">
                    <Stamp className="w-3.5 h-3.5 text-amber-300" />
                    <span>{passport.stamps.length}개국 비자 날인됨</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              {/* Category Chips */}
              <div className="flex flex-wrap gap-2 items-center">
                {[
                  { id: "all", label: "전체 나라" },
                  { id: "custom", label: "내가 건국한 나라 👑" },
                  { id: "sweet", label: "달콤한 디저트 🍮" },
                  { id: "ocean", label: "바다 & 라군 🌌" },
                  { id: "nature", label: "숲 & 사색 📖" },
                  { id: "aurora", label: "설원 & 오로라 ❄️" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-white text-stone-600 hover:bg-amber-50 hover:text-stone-900 border border-stone-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px] sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="나라 이름, 명소, 슬로건 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
                />
              </div>
            </div>

            {/* Countries Grid */}
            {filteredCountries.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                <Compass className="w-12 h-12 text-stone-400 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">
                  검색 조건에 맞는 여행나라를 찾지 못했습니다.
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  직접 당신이 꿈꾸는 새로운 여행나라를 건국해보는 건 어떨까요?
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md cursor-pointer mt-2"
                >
                  지금 나라 건국하기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCountries.map((country) => (
                  <CountryCard
                    key={country.id}
                    country={country}
                    onSelect={(c) => setSelectedCountryModal(c)}
                    onStamp={handleStampVisa}
                    onToggleLike={handleToggleLike}
                    isStamped={passport.stamps.some((s) => s.countryId === country.id)}
                    isLiked={!!likedCountryIds[country.id]}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: INTERACTIVE REALM ATLAS MAP */}
        {activeTab === "map" && (
          <InteractiveMap
            countries={countries}
            onSelectCountry={(c) => setSelectedCountryModal(c)}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            onSwitchToTravelMap={() => setActiveTab("travel-map")}
          />
        )}

        {/* VIEW 3: PASSPORT & VISA STAMPS */}
        {activeTab === "passport" && (
          <PassportView
            passport={passport}
            onUpdatePassport={(updated) => setPassport(updated)}
            onSelectCountryById={(cId) => {
              const matched = countries.find((c) => c.id === cId);
              if (matched) setSelectedCountryModal(matched);
            }}
          />
        )}

        {/* VIEW 4: POSTCARDS */}
        {activeTab === "postcards" && (
          <PostcardSection
            postcards={postcards}
            countries={countries}
            onAddPostcard={handleAddPostcard}
            travelerName={passport.holderName}
            preselectedCountry={selectedCountryModal}
          />
        )}
      </main>

      {/* Modals */}
      {selectedCountryModal && (
        <CountryDetailModal
          country={selectedCountryModal}
          onClose={() => setSelectedCountryModal(null)}
          onStamp={handleStampVisa}
          isStamped={passport.stamps.some((s) => s.countryId === selectedCountryModal.id)}
          onOpenWritePostcard={(c) => {
            setSelectedCountryModal(null);
            setActiveTab("postcards");
          }}
          isLiked={!!likedCountryIds[selectedCountryModal.id]}
          onToggleLike={handleToggleLike}
        />
      )}

      {isCreateModalOpen && (
        <CreateCountryModal
          onClose={() => setIsCreateModalOpen(false)}
          onCountryCreated={handleCountryCreated}
          travelerName={passport.holderName}
        />
      )}

      {isQuizModalOpen && (
        <TravelQuizModal
          onClose={() => setIsQuizModalOpen(false)}
          countries={countries}
          onSelectCountry={(c) => setSelectedCountryModal(c)}
          onStamp={handleStampVisa}
        />
      )}

      {/* VISITED PLACES MODALS (Map, Photos, Transit) */}
      {isAddPlaceModalOpen && (
        <AddPlaceModal
          onClose={() => setIsAddPlaceModalOpen(false)}
          onAddPlace={handleAddPlace}
          initialMode={addPlaceMode}
          initialCountry={addPlaceCountry}
        />
      )}

      {selectedPlaceModal && (
        <PlaceDetailModal
          place={selectedPlaceModal}
          onClose={() => setSelectedPlaceModal(null)}
          onOpenPhotoManager={(p: VisitedPlace) => setPhotoManagerPlace(p)}
          onDeletePlace={handleDeletePlace}
        />
      )}

      {photoManagerPlace && (
        <PlacePhotoModal
          place={photoManagerPlace}
          onClose={() => setPhotoManagerPlace(null)}
          onUpdatePlace={(updatedPlace: VisitedPlace) => handleUpdatePlacePhotos(updatedPlace.id, updatedPlace.photos)}
        />
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-amber-200/60 bg-white/80 py-8 text-center text-xs text-stone-500 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Compass className="w-4 h-4 text-amber-500" />
          <span className="font-extrabold text-stone-800">나만의 여행나라 (Realm of Dreams)</span>
        </div>
        <p>상상 속 모든 나라의 입국 비자는 무료이며, 당신의 꿈을 응원합니다.</p>
        <p className="text-[11px] text-stone-400">© 2026 나만의 여행나라 협회 • All Rights Reserved</p>
      </footer>
    </div>
  );
}
