import React from "react";
import { MapPin, Stamp, Heart, Utensils, Coins, Check, ArrowRight } from "lucide-react";
import { Country } from "../types";

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
  onStamp: (country: Country) => void;
  onToggleLike: (countryId: string) => void;
  isStamped: boolean;
  isLiked: boolean;
}

const themeBorderStyles: Record<string, string> = {
  amber: "border-amber-200 hover:border-amber-400 group-hover:shadow-amber-500/10",
  emerald: "border-emerald-200 hover:border-emerald-400 group-hover:shadow-emerald-500/10",
  indigo: "border-indigo-200 hover:border-indigo-400 group-hover:shadow-indigo-500/10",
  rose: "border-rose-200 hover:border-rose-400 group-hover:shadow-rose-500/10",
  sky: "border-sky-200 hover:border-sky-400 group-hover:shadow-sky-500/10",
  violet: "border-purple-200 hover:border-purple-400 group-hover:shadow-purple-500/10",
};

const themePillStyles: Record<string, string> = {
  amber: "bg-amber-100/90 text-amber-800 border-amber-300/60",
  emerald: "bg-emerald-100/90 text-emerald-800 border-emerald-300/60",
  indigo: "bg-indigo-100/90 text-indigo-800 border-indigo-300/60",
  rose: "bg-rose-100/90 text-rose-800 border-rose-300/60",
  sky: "bg-sky-100/90 text-sky-800 border-sky-300/60",
  violet: "bg-purple-100/90 text-purple-800 border-purple-300/60",
};

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onSelect,
  onStamp,
  onToggleLike,
  isStamped,
  isLiked,
}) => {
  return (
    <div
      id={`country-card-${country.id}`}
      className={`group bg-white rounded-3xl overflow-hidden border ${
        themeBorderStyles[country.colorTheme] || themeBorderStyles.amber
      } shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col flex-1 h-full`}
    >
      {/* Image Header with Flag Badge */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
        <img
          src={
            country.imageUrl ||
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
          }
          alt={country.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

        {/* Flag Crest Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-white/40">
          <span className="text-2xl leading-none">{country.flagEmoji}</span>
          <span className="text-xs font-bold tracking-tight text-stone-800">
            {country.founder ? `건국자: ${country.founder}` : "환상의 왕국"}
          </span>
        </div>

        {/* Like Button */}
        <button
          id={`btn-like-${country.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(country.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-2xl backdrop-blur-md transition-all cursor-pointer ${
            isLiked
              ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
              : "bg-white/80 hover:bg-white text-stone-700 hover:text-rose-500"
          }`}
          title="이 나라 마음에 들어요"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-white" : ""}`} />
        </button>

        {/* Title & Slogan on Image */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-extrabold text-xl sm:text-2xl drop-shadow-sm tracking-tight">
              {country.name}
            </h3>
            <span className="text-xs font-medium text-amber-200/90 tracking-wide uppercase truncate max-w-[45%]">
              {country.englishName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-200 line-clamp-1 mt-0.5 font-light">
            “{country.slogan}”
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        {/* Key Attributes */}
        <div className="space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                themePillStyles[country.colorTheme] || themePillStyles.amber
              }`}
            >
              {country.currency}
            </span>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              {country.climate.slice(0, 18)}...
            </span>
            {country.isCustom && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                직접 건국
              </span>
            )}
          </div>

          {/* Geography brief */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {country.geography}
          </p>

          {/* Key Landmarks preview */}
          <div className="pt-1">
            <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>대표 명소</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {country.landmarks.slice(0, 3).map((lm, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-stone-50 border border-stone-200/80 text-stone-700 px-2.5 py-1 rounded-xl truncate max-w-[170px]"
                >
                  📍 {lm.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          {/* Visa Stamp Action */}
          <button
            id={`btn-stamp-${country.id}`}
            onClick={() => onStamp(country)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isStamped
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200"
            }`}
          >
            {isStamped ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>입국 도장 완료</span>
              </>
            ) : (
              <>
                <Stamp className="w-3.5 h-3.5 text-amber-600" />
                <span>여권 도장 찍기</span>
              </>
            )}
          </button>

          {/* Explore Details */}
          <button
            id={`btn-detail-${country.id}`}
            onClick={() => onSelect(country)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-amber-600 transition-colors shadow-xs group-hover:bg-amber-600 cursor-pointer"
          >
            <span>둘러보기</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
