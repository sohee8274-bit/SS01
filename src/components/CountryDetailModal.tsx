import React, { useState } from "react";
import { 
  X, Stamp, MapPin, Utensils, Scroll, Sparkles, 
  Calendar, Check, Heart, MessageSquare, Compass,
  Lightbulb, AlertCircle, Loader2 
} from "lucide-react";
import { Country, ItineraryDay } from "../types";
import confetti from "canvas-confetti";

interface CountryDetailModalProps {
  country: Country | null;
  onClose: () => void;
  onStamp: (country: Country) => void;
  isStamped: boolean;
  onOpenWritePostcard: (country: Country) => void;
  isLiked: boolean;
  onToggleLike: (countryId: string) => void;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  country,
  onClose,
  onStamp,
  isStamped,
  onOpenWritePostcard,
  isLiked,
  onToggleLike,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "landmarks" | "itinerary">("overview");
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [isLoadingItinerary, setIsLoadingItinerary] = useState(false);

  if (!country) return null;

  const handleFetchItinerary = async () => {
    setIsLoadingItinerary(true);
    try {
      const res = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryName: country.name,
          geography: country.geography,
          landmarks: country.landmarks,
          travelerStyle: "환상적인 힐링과 감성 사진 투어",
        }),
      });
      const data = await res.json();
      if (data.itinerary) {
        setItinerary(data.itinerary);
      }
    } catch (e) {
      console.error("Failed to fetch itinerary:", e);
    } finally {
      setIsLoadingItinerary(false);
    }
  };

  const triggerStampCelebration = () => {
    onStamp(country);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#f59e0b", "#10b981", "#6366f1", "#ec4899"],
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900">
          <img
            src={country.imageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"}
            alt={country.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Badge & Quick Stats */}
          <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2">
            <span className="text-4xl bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/50 inline-block leading-none">
              {country.flagEmoji}
            </span>
            <div className="bg-stone-900/80 backdrop-blur-md text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">
              👑 건국자: {country.founder}
            </div>
            <div className="bg-stone-900/80 backdrop-blur-md text-stone-200 border border-stone-700 px-3 py-1.5 rounded-xl text-xs font-medium">
              💰 공식 화폐: {country.currency}
            </div>
          </div>

          {/* Title Area */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-amber-300 uppercase tracking-widest">
                  {country.englishName}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-0.5">
                  {country.name}
                </h2>
                <p className="text-sm sm:text-base text-stone-200 font-light mt-1 max-w-2xl italic">
                  “{country.slogan}”
                </p>
              </div>

              {/* Action Buttons in Hero */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleLike(country.id)}
                  className={`p-3 rounded-2xl backdrop-blur-md transition-all cursor-pointer ${
                    isLiked 
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30" 
                      : "bg-white/20 hover:bg-white/30 text-white"
                  }`}
                  title="좋아요"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-white" : ""}`} />
                </button>

                <button
                  onClick={triggerStampCelebration}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                    isStamped
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30"
                  }`}
                >
                  {isStamped ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>입국 비자 날인됨</span>
                    </>
                  ) : (
                    <>
                      <Stamp className="w-5 h-5" />
                      <span>여권에 비자 도장 받기</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Sub-Tabs */}
        <div className="flex items-center border-b border-stone-200 px-6 bg-stone-50/80 gap-6">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`py-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === "overview"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            기본 정보 & 세계관
          </button>
          <button
            onClick={() => setActiveSubTab("landmarks")}
            className={`py-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeSubTab === "landmarks"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            명소 & 식도락 ({country.landmarks.length}곳)
          </button>
          <button
            onClick={() => {
              setActiveSubTab("itinerary");
              if (!itinerary) handleFetchItinerary();
            }}
            className={`py-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "itinerary"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI 추천 3일 여행 코스</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {activeSubTab === "overview" && (
            <div className="space-y-6">
              {/* Background Lore */}
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200/70">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-base mb-2">
                  <Scroll className="w-5 h-5 text-amber-600" />
                  <span>건국 신화 및 배경 이야기</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {country.backgroundStory}
                </p>
              </div>

              {/* Climate & Geography */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    지형 및 자연 환경
                  </span>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed">
                    {country.geography}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    기후 및 날씨
                  </span>
                  <p className="text-sm text-stone-800 font-medium leading-relaxed">
                    {country.climate}
                  </p>
                </div>
              </div>

              {/* Fun Laws & Traditions */}
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>이 나라만의 특별한 법률과 풍습</span>
                </h4>
                <div className="space-y-2">
                  {country.traditions.map((tradition, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-stone-700 leading-relaxed font-medium">
                        {tradition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Greeting & Travel Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/70">
                  <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-1">
                    현지 인사말
                  </div>
                  <p className="text-base font-bold text-indigo-950">
                    “{country.greeting}”
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/70">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-600" />
                    <span>여행자 꿀팁</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 font-medium">
                    {country.travelTips}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "landmarks" && (
            <div className="space-y-6">
              {/* Landmarks List */}
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>반드시 방문해야 할 대표 명소 3선</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {country.landmarks.map((lm, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-300 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-amber-600 font-extrabold text-xs mb-1">
                          SPOT 0{idx + 1}
                        </div>
                        <h5 className="font-extrabold text-base text-stone-900 mb-2">
                          {lm.name}
                        </h5>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {lm.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signature Delicacies */}
              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-rose-500" />
                  <span>국가 지정 대표 요리 & 시그니처 음료</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {country.cuisine.map((dish, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/80 flex items-start gap-3"
                    >
                      <div className="text-2xl mt-0.5">🍽️</div>
                      <div>
                        <h5 className="font-bold text-sm text-stone-900">
                          {dish.name}
                        </h5>
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {dish.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "itinerary" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-stone-900">
                    {country.name} 3일 추천 여행 일정
                  </h4>
                  <p className="text-xs text-stone-500">
                    여행자를 위한 최적 동선과 식도락 가이드입니다.
                  </p>
                </div>
                <button
                  onClick={handleFetchItinerary}
                  disabled={isLoadingItinerary}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>새 코스 생성</span>
                </button>
              </div>

              {isLoadingItinerary ? (
                <div className="py-16 text-center">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
                  <p className="text-sm font-medium text-stone-700">
                    {country.name}의 숨은 비경을 조합해 여행 코스를 작성 중입니다...
                  </p>
                </div>
              ) : itinerary && itinerary.length > 0 ? (
                <div className="space-y-4">
                  {itinerary.map((dayItem) => (
                    <div
                      key={dayItem.day}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black">
                          DAY {dayItem.day}
                        </span>
                        <h5 className="font-bold text-sm text-stone-900">
                          {dayItem.title}
                        </h5>
                      </div>
                      <ul className="space-y-1.5 mb-3">
                        {dayItem.activities.map((act, i) => (
                          <li
                            key={i}
                            className="text-xs text-stone-700 flex items-start gap-2"
                          >
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-xs text-amber-900 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/60 font-medium">
                        🍴 <span className="font-bold">식도락 추천:</span> {dayItem.diningTip}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-stone-500">
                  <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-sm">일정을 불러오는 중입니다...</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenWritePostcard(country)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 rounded-xl border border-stone-200 shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span>여행 엽서 남기기</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerStampCelebration}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isStamped
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"
              }`}
            >
              <Stamp className="w-4 h-4" />
              <span>{isStamped ? "비자 스탬프 획득 완료" : "여권에 비자 도장 날인"}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
