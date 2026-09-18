import React, { useState } from "react";
import { 
  X, Plus, Camera, Image, Sparkles, MapPin, 
  Trash2, Calendar, Star, Utensils, Bed, Compass, Coffee,
  Car, Bus, Train, Footprints, AlertCircle, Upload
} from "lucide-react";
import { VisitedPlace, PlaceCategory, PlacePhoto, TransportationGuide } from "../types";

interface PlacePhotoModalProps {
  place: VisitedPlace | null;
  onClose: () => void;
  onUpdatePlace: (updated: VisitedPlace) => void;
}

const SAMPLE_PHOTO_PRESETS = [
  { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80", label: "근사한 레스토랑 & 와인" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80", label: "침샘 자극 대표 미식 요리" },
  { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80", label: "탁 트인 뷰와 오션뷰 테라스" },
  { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80", label: "아늑하고 감성 넘치는 객실" },
  { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", label: "그림 같은 해변과 노을빛" },
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80", label: "모던하고 힙한 조명과 인테리어" },
];

export const PlacePhotoModal: React.FC<PlacePhotoModalProps> = ({
  place,
  onClose,
  onUpdatePlace,
}) => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  if (!place) return null;

  const handleAddPhoto = (urlToAdd: string, customCaption?: string) => {
    if (!urlToAdd.trim()) return;

    const newPhoto: PlacePhoto = {
      id: `photo-${Date.now()}`,
      url: urlToAdd.trim(),
      caption: customCaption || caption.trim() || `${place.name}에서의 소중한 기록`,
      takenAt: new Date().toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const updated: VisitedPlace = {
      ...place,
      photos: [...place.photos, newPhoto],
    };

    onUpdatePlace(updated);
    setPhotoUrl("");
    setCaption("");
    setShowAddForm(false);
    setActivePhotoIdx(updated.photos.length - 1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to DataURL for immediate client preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        handleAddPhoto(dataUrl, file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (photoId: string) => {
    const filtered = place.photos.filter((p) => p.id !== photoId);
    onUpdatePlace({
      ...place,
      photos: filtered,
    });
    if (activePhotoIdx >= filtered.length) {
      setActivePhotoIdx(Math.max(0, filtered.length - 1));
    }
  };

  const currentPhoto = place.photos[activePhotoIdx] || place.photos[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-6 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs text-xl">
              📸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl text-stone-900">
                  {place.name} 사진 앨범 & 순간 기록
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  총 {place.photos.length}장
                </span>
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{place.address}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Main Photo Viewer */}
          {place.photos.length > 0 && currentPhoto ? (
            <div className="space-y-3">
              <div className="relative w-full h-72 sm:h-[400px] rounded-3xl overflow-hidden bg-stone-900 flex items-center justify-center shadow-inner group">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.caption || place.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Caption on Photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="font-bold text-sm sm:text-base drop-shadow-sm">
                      {currentPhoto.caption || "직접 방문한 순간의 사진"}
                    </p>
                    {currentPhoto.takenAt && (
                      <span className="text-xs text-amber-300/90 font-mono">
                        촬영일시: {currentPhoto.takenAt}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeletePhoto(currentPhoto.id)}
                    className="p-2 rounded-xl bg-black/40 hover:bg-rose-600 text-white/80 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1 backdrop-blur-md"
                    title="이 사진 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>삭제</span>
                  </button>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {place.photos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activePhotoIdx === idx
                        ? "border-amber-500 scale-105 shadow-md shadow-amber-500/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}

                {/* Add Photo Trigger Button in row */}
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="w-20 h-20 rounded-2xl border-2 border-dashed border-stone-300 hover:border-amber-500 bg-stone-50 hover:bg-amber-50/50 flex flex-col items-center justify-center gap-1 text-stone-600 hover:text-amber-800 shrink-0 transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5 text-amber-600" />
                  <span className="text-[10px] font-bold">사진 추가</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-14 text-center border-2 border-dashed border-stone-300 rounded-3xl bg-stone-50/50 space-y-3">
              <Camera className="w-12 h-12 text-stone-400 mx-auto animate-bounce" />
              <div>
                <h4 className="font-bold text-stone-800 text-base">
                  등록된 방문 사진이 아직 없습니다.
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  직접 찍은 사진이나 추천 이미지 프리셋을 등록하여 소중한 추억을 간직하세요!
                </p>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition-all cursor-pointer"
              >
                + 첫 사진 등록하기
              </button>
            </div>
          )}

          {/* Add Photo Drawer / Form */}
          {showAddForm && (
            <div className="p-5 rounded-3xl bg-stone-50 border border-stone-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-600" />
                  <span>새 사진 등록하기</span>
                </span>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-stone-400 hover:text-stone-600"
                >
                  닫기
                </button>
              </div>

              {/* Upload File or Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    1. 내 컴퓨터/스마트폰 사진 업로드
                  </label>
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/60 hover:bg-amber-100/70 text-amber-900 font-bold text-xs cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-amber-600" />
                    <span>갤러리 / 내 파일에서 사진 선택</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    2. 사진 이미지 웹 URL 입력
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddPhoto(photoUrl)}
                      className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 cursor-pointer"
                    >
                      추가
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  사진 설명 (캡션)
                </label>
                <input
                  type="text"
                  placeholder="예: 창가 석에서 맛본 인생 디저트와 오션뷰"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Quick Presets */}
              <div>
                <span className="text-xs font-bold text-stone-500 block mb-2">
                  ✨ 추천 감성 사진 프리셋 (원클릭 등록)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SAMPLE_PHOTO_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPhoto(preset.url, preset.label)}
                      className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 hover:border-amber-400 bg-white hover:bg-amber-50 text-left transition-all cursor-pointer group"
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="text-[11px] font-medium text-stone-700 leading-tight">
                        {preset.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between text-xs text-stone-500">
          <span>사진은 브라우저에 자동 영구 저장되어 언제든 다시 볼 수 있습니다.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl font-bold text-white bg-stone-900 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
