import React, { useState } from "react";
import { 
  X, MapPin, Star, Calendar, Camera, Utensils, 
  Bed, Compass, Coffee, Navigation, ChevronRight,
  Share2, Heart, Tag, Sparkles, Plus, ExternalLink
} from "lucide-react";
import { VisitedPlace } from "../types";
import { TransportGuideCard } from "./TransportGuideCard";

interface PlaceDetailModalProps {
  place: VisitedPlace | null;
  onClose: () => void;
  onOpenPhotoManager: (place: VisitedPlace) => void;
  onDeletePlace?: (placeId: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  restaurant: { bg: "bg-rose-50 text-rose-800", text: "text-rose-600", border: "border-rose-200" },
  cafe: { bg: "bg-amber-50 text-amber-800", text: "text-amber-600", border: "border-amber-200" },
  attraction: { bg: "bg-blue-50 text-blue-800", text: "text-blue-600", border: "border-blue-200" },
  stay: { bg: "bg-emerald-50 text-emerald-800", text: "text-emerald-600", border: "border-emerald-200" },
};

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  onOpenPhotoManager,
  onDeletePlace,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "transit" | "photos">("overview");

  if (!place) return null;

  const colorStyles = CATEGORY_COLORS[place.category] || CATEGORY_COLORS.restaurant;
  const heroPhoto = place.photos[0]?.url || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-stone-900">
          <img
            src={heroPhoto}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Badges on Hero */}
          <div className="absolute top-6 left-6 flex items-center gap-2 flex-wrap">
            {place.countryName && (
              <span className="px-3 py-1 rounded-xl text-xs font-black shadow-md border bg-stone-900/80 backdrop-blur-md text-white border-stone-700 flex items-center gap-1.5">
                <span>{place.countryEmoji || "🌍"}</span>
                <span>{place.countryName}</span>
              </span>
            )}
            <span className={`px-3 py-1 rounded-xl text-xs font-black shadow-md border ${colorStyles.bg} ${colorStyles.border}`}>
              {place.categoryLabel}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-stone-900/80 backdrop-blur-md text-amber-300 border border-stone-700 shadow-md flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{place.rating}.0</span>
            </span>
            {place.isOtherTraveler && (
              <span className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-indigo-600/90 backdrop-blur-md text-white border border-indigo-400/50 shadow-md">
                여행자 공유
              </span>
            )}
          </div>

          {/* Place Title & Address */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-sm">
              {place.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-200 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{place.address}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>방문: {place.visitDate}</span>
              </span>
              {place.authorName && (
                <>
                  <span>•</span>
                  <span className="text-stone-300 font-medium">
                    등록: <span className="text-emerald-300 font-bold">{place.authorName}</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center border-b border-stone-200 px-6 bg-stone-50/90 gap-6">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-emerald-600 text-emerald-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            방문 기록 & 추천 메뉴
          </button>
          <button
            onClick={() => setActiveTab("transit")}
            className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "transit"
                ? "border-emerald-600 text-emerald-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>네이버 지도식 교통/길안내</span>
          </button>
          <button
            onClick={() => setActiveTab("photos")}
            className={`py-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "photos"
                ? "border-emerald-600 text-emerald-900"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            <Camera className="w-4 h-4 text-amber-500" />
            <span>방문 사진 ({place.photos.length}장)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Highlight Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-0.5">
                    대표 추천 포인트 & 메뉴
                  </div>
                  <div className="text-sm font-extrabold text-stone-900">
                    {place.mustTryOrHighlight}
                  </div>
                </div>
              </div>

              {/* User Notes */}
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  직접 남긴 방문 메모 & 감상
                </h4>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-sm text-stone-700 leading-relaxed font-medium">
                  {place.notes}
                </div>
              </div>

              {/* Price Range & Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    예상 가격대
                  </span>
                  <span className="text-sm font-bold text-stone-800">
                    {place.priceRange || "정보 없음"}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1">
                    지역 & 권역
                  </span>
                  <span className="text-sm font-bold text-stone-800">
                    {place.cityArea}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div>
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400" />
                  <span>등록된 태그</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRANSIT (NAVER MAP STYLE) */}
          {activeTab === "transit" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {place.transportGuide ? (
                <TransportGuideCard
                  guide={place.transportGuide}
                  placeName={place.name}
                />
              ) : (
                <div className="p-8 text-center bg-stone-50 rounded-3xl border border-stone-200 text-stone-500 text-xs">
                  교통편 정보가 아직 등록되지 않았습니다.
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PHOTOS */}
          {activeTab === "photos" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    직접 찍은 현장 사진 갤러리
                  </h4>
                  <p className="text-xs text-stone-500">
                    새 사진을 등록하거나 사진을 클릭하여 크게 볼 수 있습니다.
                  </p>
                </div>
                <button
                  onClick={() => onOpenPhotoManager(place)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>사진 추가 / 관리</span>
                </button>
              </div>

              {place.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {place.photos.map((photo, idx) => (
                    <div
                      key={photo.id || idx}
                      onClick={() => onOpenPhotoManager(place)}
                      className="group relative h-36 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xs cursor-pointer"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                        <span className="text-[11px] text-white font-medium line-clamp-1">
                          {photo.caption || "사진 보기"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 space-y-2">
                  <Camera className="w-10 h-10 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-600 font-medium">
                    등록된 사진이 없습니다. 첫 사진을 등록해보세요!
                  </p>
                  <button
                    onClick={() => onOpenPhotoManager(place)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs"
                  >
                    + 사진 등록하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPhotoManager(place)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300/60 transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-700" />
              <span>사진 {place.photos.length}장 관리</span>
            </button>

            {onDeletePlace && (
              <button
                onClick={() => {
                  if (confirm(`'${place.name}' 장소를 지도에서 삭제하시겠습니까?`)) {
                    onDeletePlace(place.id);
                  }
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-100/80 transition-colors cursor-pointer"
              >
                삭제
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
