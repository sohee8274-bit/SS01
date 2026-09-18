import React from "react";
import { Compass, Sparkles, Map, PlusCircle, BookUser, Mail, HelpCircle, Heart } from "lucide-react";
import { TravelerPassport } from "../types";

interface HeaderProps {
  activeTab: "explore" | "travel-map" | "map" | "create" | "passport" | "postcards";
  setActiveTab: (tab: "explore" | "travel-map" | "map" | "create" | "passport" | "postcards") => void;
  onOpenCreate: () => void;
  onOpenAddPlace: () => void;
  onOpenQuiz: () => void;
  passport: TravelerPassport;
  favoriteCount: number;
  placeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreate,
  onOpenAddPlace,
  onOpenQuiz,
  passport,
  favoriteCount,
  placeCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-2 sm:gap-4">
          {/* Logo */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab("explore")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-br from-emerald-500 via-teal-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-lg sm:text-xl md:text-2xl text-stone-900 tracking-tight whitespace-nowrap">
                  나만의 여행나라
                </span>
                <span className="hidden xl:inline-block text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 shadow-2xs whitespace-nowrap">
                  Travel Map
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden lg:block font-medium whitespace-nowrap truncate max-w-[260px]">
                맛집·숙소 지도 & 여행나라 포털
              </p>
            </div>
          </div>

          {/* Navigation Links - All single-line with whitespace-nowrap */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-stone-100/90 p-1 rounded-2xl border border-stone-200/80 shrink-0">
            <button
              id="nav-tab-explore"
              onClick={() => setActiveTab("explore")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "explore"
                  ? "bg-white text-stone-900 shadow-xs border border-stone-200"
                  : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="whitespace-nowrap">나라 탐험</span>
            </button>

            {/* NEW: TRAVEL MAP (NAVER MAP STYLE) */}
            <button
              id="nav-tab-travel-map"
              onClick={() => setActiveTab("travel-map")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all cursor-pointer relative whitespace-nowrap ${
                activeTab === "travel-map"
                  ? "bg-white text-emerald-900 shadow-xs border border-emerald-300"
                  : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
              }`}
            >
              <Map className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap">맛집·숙소 지도</span>
              {placeCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold shadow-2xs whitespace-nowrap shrink-0">
                  {placeCount}
                </span>
              )}
            </button>

            <button
              id="nav-tab-map"
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "map"
                  ? "bg-white text-indigo-900 shadow-xs border border-indigo-200"
                  : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
              }`}
            >
              <Compass className="w-4 h-4 text-indigo-500 shrink-0" />
              <span className="whitespace-nowrap">판타지 아틀라스</span>
            </button>

            <button
              id="nav-tab-passport"
              onClick={() => setActiveTab("passport")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all cursor-pointer relative whitespace-nowrap ${
                activeTab === "passport"
                  ? "bg-white text-amber-900 shadow-xs border border-amber-200"
                  : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
              }`}
            >
              <BookUser className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="whitespace-nowrap">마이 여권</span>
              {passport.stamps.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs whitespace-nowrap shrink-0">
                  {passport.stamps.length}
                </span>
              )}
            </button>

            <button
              id="nav-tab-postcards"
              onClick={() => setActiveTab("postcards")}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "postcards"
                  ? "bg-white text-rose-900 shadow-xs border border-rose-200"
                  : "text-stone-600 hover:text-stone-900 hover:bg-white/60"
              }`}
            >
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="whitespace-nowrap">여행자 우체통</span>
            </button>
          </nav>

          {/* Action Buttons - Single-line guaranteed */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              id="btn-add-place-top"
              onClick={onOpenAddPlace}
              className="hidden sm:flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-extrabold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="whitespace-nowrap">+ 장소 등록</span>
            </button>

            <button
              id="btn-create-country"
              onClick={onOpenCreate}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-linear-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 shadow-sm shadow-amber-500/25 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">나라 건국하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="flex md:hidden items-center justify-around border-t border-stone-200 bg-stone-50/95 px-2 py-2 text-[11px]">
        <button
          onClick={() => setActiveTab("explore")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === "explore" ? "text-emerald-700 font-bold" : "text-stone-600"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>탐험</span>
        </button>

        <button
          onClick={() => setActiveTab("travel-map")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg relative ${
            activeTab === "travel-map" ? "text-emerald-700 font-bold" : "text-stone-600"
          }`}
        >
          <Map className="w-4 h-4 text-emerald-600" />
          <span>맛집지도</span>
          {placeCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
              {placeCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("map")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === "map" ? "text-indigo-700 font-bold" : "text-stone-600"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>아틀라스</span>
        </button>

        <button
          onClick={() => setActiveTab("passport")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg relative ${
            activeTab === "passport" ? "text-amber-700 font-bold" : "text-stone-600"
          }`}
        >
          <BookUser className="w-4 h-4" />
          <span>여권</span>
          {passport.stamps.length > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
              {passport.stamps.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("postcards")}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
            activeTab === "postcards" ? "text-rose-700 font-bold" : "text-stone-600"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>우체통</span>
        </button>
      </div>
    </header>
  );
};
