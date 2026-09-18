import React, { useState } from "react";
import { MapPin, Compass, Sparkles, Plus, ArrowRight, Eye, Info } from "lucide-react";
import { Country } from "../types";

interface InteractiveMapProps {
  countries: Country[];
  onSelectCountry: (country: Country) => void;
  onOpenCreate: () => void;
  onSwitchToTravelMap?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  countries,
  onSelectCountry,
  onOpenCreate,
  onSwitchToTravelMap,
}) => {
  const [selectedPin, setSelectedPin] = useState<Country | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 text-xs font-bold mb-1 border border-indigo-200">
            <Compass className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
            <span>판타지 대륙 지도 (Atlas of Dreamlands)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            환상세계 인터랙티브 아틀라스
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            핀을 클릭하여 환상 대륙 곳곳에 위치한 나라들의 비경을 탐험해보세요.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onSwitchToTravelMap && (
            <button
              onClick={onSwitchToTravelMap}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300 shadow-2xs transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>실제 다녀온 맛집/숙소 지도 보기 →</span>
            </button>
          )}

          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/25 active:scale-95 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>지도에 내 나라 건국하기</span>
          </button>
        </div>
      </div>

      {/* Map Board */}
      <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border-2 border-amber-900/20 shadow-xl bg-[#0f172a] select-none">
        {/* Fantasy Map Background Styling */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)`
          }}
        />

        {/* Vintage Map Grid Lines & Compass Rose */}
        <div className="absolute inset-0 border border-amber-500/10 [background-image:linear-gradient(to_right,#f59e0b08_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b08_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Compass Rose Decoration */}
        <div className="absolute top-6 right-6 opacity-30 pointer-events-none flex flex-col items-center">
          <div className="text-xs font-serif font-black tracking-widest text-amber-300">N</div>
          <div className="w-16 h-16 border border-dashed border-amber-400/50 rounded-full flex items-center justify-center my-1">
            <Compass className="w-10 h-10 text-amber-400" />
          </div>
          <div className="text-[10px] font-serif font-bold text-amber-300/60">S</div>
        </div>

        {/* Sea / Ocean Labels */}
        <div className="absolute top-12 left-10 text-amber-200/20 font-serif tracking-[0.4em] text-xs uppercase pointer-events-none">
          ~ Mare Nebulae (구름 바다) ~
        </div>
        <div className="absolute bottom-12 right-12 text-indigo-200/20 font-serif tracking-[0.4em] text-xs uppercase pointer-events-none">
          ~ Oceanus Astralis (은하 해역) ~
        </div>
        <div className="absolute top-1/2 left-1/3 text-emerald-200/20 font-serif tracking-[0.4em] text-xs uppercase pointer-events-none">
          ~ Terra Sylvan (고대 신목 대륙) ~
        </div>

        {/* Country Pins */}
        {countries.map((c) => {
          const coords = c.mapCoords || { x: 50, y: 50 };
          const isSelected = selectedPin?.id === c.id;

          return (
            <div
              key={c.id}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              onClick={() => setSelectedPin(c)}
            >
              {/* Pin Pulsing Glow */}
              <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none" />

              {/* Pin Center Marker */}
              <div 
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-400 text-stone-900 ring-4 ring-white scale-125 z-30 shadow-amber-500/50"
                    : "bg-stone-900/90 hover:bg-stone-800 text-white border border-amber-400/50 hover:scale-110 shadow-black/60"
                }`}
              >
                <span className="text-2xl select-none">{c.flagEmoji}</span>
              </div>

              {/* Pin Title Badge */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap">
                <span className="px-2.5 py-1 rounded-xl bg-stone-900/90 text-amber-200 text-[11px] font-extrabold border border-amber-500/30 shadow-md flex items-center gap-1 group-hover:border-amber-400">
                  <span>{c.name}</span>
                  {c.isCustom && <span className="text-[9px] text-amber-400 font-bold">★</span>}
                </span>
              </div>
            </div>
          );
        })}

        {/* Selected Country Popover Card */}
        {selectedPin && (
          <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:max-w-md bg-stone-900/95 text-white backdrop-blur-md rounded-2xl p-5 border border-amber-500/50 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shrink-0">
                  {selectedPin.flagEmoji}
                </div>
                <div>
                  <h4 className="font-extrabold text-lg text-white">
                    {selectedPin.name}
                  </h4>
                  <p className="text-xs text-amber-300 font-mono">
                    {selectedPin.englishName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPin(null)}
                className="text-stone-400 hover:text-white p-1 rounded-lg text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 italic mt-3 line-clamp-2">
              “{selectedPin.slogan}”
            </p>

            <div className="grid grid-cols-2 gap-2 my-3 text-[11px] bg-stone-800/80 p-2.5 rounded-xl border border-stone-700">
              <div>
                <span className="text-stone-400 block font-semibold">화폐 단위</span>
                <span className="text-amber-300 font-bold">{selectedPin.currency}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-semibold">현지 인사</span>
                <span className="text-stone-200 font-bold truncate block">{selectedPin.greeting}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-400">
                건국자: {selectedPin.founder}
              </span>
              <button
                onClick={() => onSelectCountry(selectedPin)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 shadow-md transition-colors cursor-pointer"
              >
                <span>이 나라로 입국</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Legend / Quick Jump Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
          <Info className="w-4 h-4 text-amber-500" />
          <span>현재 등록된 환상 나라 총 {countries.length}개국</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedPin(c)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-stone-700 bg-stone-50 hover:bg-amber-100 hover:text-amber-900 border border-stone-200 transition-colors cursor-pointer"
            >
              <span>{c.flagEmoji}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
