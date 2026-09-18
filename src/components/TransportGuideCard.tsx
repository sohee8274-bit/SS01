import React, { useState } from "react";
import { 
  Train, Bus, Car, Footprints, AlertCircle, Clock, 
  MapPin, CheckCircle2, ChevronRight, Sparkles, Navigation,
  HelpCircle, ArrowRight
} from "lucide-react";
import { TransportationGuide } from "../types";

interface TransportGuideCardProps {
  guide: TransportationGuide;
  placeName: string;
}

export const TransportGuideCard: React.FC<TransportGuideCardProps> = ({
  guide,
  placeName,
}) => {
  const [selectedTab, setSelectedTab] = useState<"transit" | "taxi" | "walk">("transit");

  return (
    <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden text-stone-800">
      {/* Naver Map Style Route Header */}
      <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 p-4 sm:p-5 text-white">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-emerald-100 border border-white/20">
            <Navigation className="w-3 h-3 text-emerald-200 animate-pulse" />
            <span>네이버 지도 스타일 길찾기 & 교통 안내</span>
          </div>
          <span className="text-[11px] text-emerald-200/90 font-medium hidden sm:inline">
            출발지 기준 최적 경로
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold truncate">
          <span className="text-emerald-200 shrink-0 font-medium text-xs">출발</span>
          <span className="truncate">{guide.originName}</span>
          <ArrowRight className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="text-emerald-200 shrink-0 font-medium text-xs">도착</span>
          <span className="truncate text-amber-200">{guide.destinationName || placeName}</span>
        </div>
      </div>

      {/* Mode Tabs (Subway/Bus, Taxi, Walk/Bike) */}
      <div className="grid grid-cols-3 border-b border-stone-200 bg-stone-50/80 p-1.5 gap-1.5">
        <button
          onClick={() => setSelectedTab("transit")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedTab === "transit"
              ? "bg-white text-emerald-700 shadow-xs border border-emerald-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <Bus className="w-4 h-4 text-emerald-600" />
          <span>대중교통</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold hidden sm:inline">
            {guide.transit.totalDurationMinutes}분
          </span>
        </button>

        <button
          onClick={() => setSelectedTab("taxi")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedTab === "taxi"
              ? "bg-white text-amber-700 shadow-xs border border-amber-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <Car className="w-4 h-4 text-amber-600" />
          <span>택시 / 승용차</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold hidden sm:inline">
            {guide.taxi.durationMinutes}분
          </span>
        </button>

        <button
          onClick={() => setSelectedTab("walk")}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            selectedTab === "walk"
              ? "bg-white text-blue-700 shadow-xs border border-blue-200"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
          }`}
        >
          <Footprints className="w-4 h-4 text-blue-600" />
          <span>도보 / 따릉이</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold hidden sm:inline">
            {guide.walkingOrBike.distanceKm}km
          </span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 sm:p-5 space-y-4">
        {/* TRANSIT VIEW */}
        {selectedTab === "transit" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Quick Summary Pill Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-emerald-800">
                  {guide.transit.totalDurationMinutes}분
                </span>
                <span className="text-xs text-stone-500 font-medium">
                  (환승 {guide.transit.transferCount}회)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-xl bg-white text-emerald-900 font-bold border border-emerald-200 shadow-2xs">
                  💳 요금 {guide.transit.fareEstimate}
                </span>
              </div>
            </div>

            {/* Route Timeline (Step by Step) */}
            <div className="space-y-3 relative pl-2">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                상세 이동 경로 & 탑승 위치
              </div>

              {guide.transit.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative group">
                  {/* Icon Node */}
                  <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: step.color || (step.type === "subway" ? "#10b981" : step.type === "bus" ? "#3b82f6" : "#64748b") }}
                  >
                    {step.type === "subway" && <Train className="w-4 h-4" />}
                    {step.type === "bus" && <Bus className="w-4 h-4" />}
                    {step.type === "walk" && <Footprints className="w-4 h-4" />}
                    {step.type === "transfer" && <Navigation className="w-4 h-4" />}
                  </div>

                  {/* Step Text Details */}
                  <div className="flex-1 bg-stone-50 group-hover:bg-stone-100/80 p-3 rounded-2xl border border-stone-200/80 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-extrabold text-stone-900">
                        {step.lineOrRoute || (step.type === "walk" ? "도보 이동" : "환승")}
                      </span>
                      <span className="text-[11px] font-bold text-stone-500">
                        약 {step.durationMinutes}분
                      </span>
                    </div>

                    {step.departureName && step.arrivalName && (
                      <div className="text-[11px] text-stone-500 font-medium mb-1">
                        {step.departureName} → {step.arrivalName}
                      </div>
                    )}

                    <p className="text-xs text-stone-700 leading-relaxed font-medium">
                      {step.instruction}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Realtime / Pro Tips Box */}
            {guide.transit.tips && (
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs leading-relaxed">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold mr-1">네이버 지도 꿀팁:</span>
                  <span>{guide.transit.tips}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAXI VIEW */}
        {selectedTab === "taxi" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-amber-900">
                  {guide.taxi.durationMinutes}분 소요
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  guide.taxi.trafficStatus === "smooth"
                    ? "bg-emerald-100 text-emerald-800"
                    : guide.taxi.trafficStatus === "moderate"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-rose-100 text-rose-800"
                }`}>
                  {guide.taxi.trafficStatus === "smooth" ? "교통 원활" : guide.taxi.trafficStatus === "moderate" ? "보통" : "정체"}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-950 block">
                  예상 요금: {guide.taxi.estimatedFare}
                </span>
                {guide.taxi.tollFee && (
                  <span className="text-[10px] text-stone-500">
                    ({guide.taxi.tollFee})
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">
                  🚕 일반 택시 호출 방법
                </span>
                <p className="text-stone-600 leading-relaxed">
                  카카오T, 우티(UT), TMAP 택시 등 앱 호출 또는 인근 큰길 건널목 택시 승강장 이용.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block mb-1">
                  🛣️ 추천 이동 도로 & 길안내
                </span>
                <p className="text-stone-600 leading-relaxed">
                  {guide.taxi.tips}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* WALK / BIKE VIEW */}
        {selectedTab === "walk" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div>
                <span className="text-xl sm:text-2xl font-black text-blue-900">
                  {guide.walkingOrBike.durationMinutes}분
                </span>
                <span className="text-xs text-stone-500 font-medium ml-2">
                  (거리 약 {guide.walkingOrBike.distanceKm}km)
                </span>
              </div>
              <div className="text-xs font-bold text-blue-800 bg-white px-3 py-1.5 rounded-xl border border-blue-200">
                🔥 약 {guide.walkingOrBike.calories} kcal 소모
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
              <span className="font-extrabold text-stone-800 block">
                🚴‍♀️ 자전거 & 도보 꿀코스 추천
              </span>
              <p className="text-stone-600 leading-relaxed">
                {guide.walkingOrBike.routeHint}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
