import React, { useState } from "react";
import { 
  Stamp, Award, Calendar, Share2, Edit3, Check, 
  Sparkles, Compass, ShieldCheck, Download, RefreshCw 
} from "lucide-react";
import { TravelerPassport, PassportStamp, ColorTheme } from "../types";

interface PassportModalProps {
  passport: TravelerPassport;
  onUpdatePassport: (updated: TravelerPassport) => void;
  onSelectCountryById: (countryId: string) => void;
}

const AVATAR_OPTIONS = ["🧭", "🧙‍♂️", "🐱", "🦊", "👑", "✈️", "🚀", "🎩", "🌟", "🧳"];

const TITLE_OPTIONS = [
  "은하수 방랑자 (Cosmic Wanderer)",
  "구름나라 항해사 (Cloud Navigator)",
  "꿈꾸는 건축가 (Dream Architect)",
  "별빛 기록가 (Starlight Chronicler)",
  "자유로운 음유시인 (Free Bard)"
];

const stampColors: Record<ColorTheme, { border: string; text: string; bg: string }> = {
  amber: { border: "border-amber-700/80", text: "text-amber-800", bg: "bg-amber-500/10" },
  emerald: { border: "border-emerald-700/80", text: "text-emerald-800", bg: "bg-emerald-500/10" },
  indigo: { border: "border-indigo-700/80", text: "text-indigo-800", bg: "bg-indigo-500/10" },
  rose: { border: "border-rose-700/80", text: "text-rose-800", bg: "bg-rose-500/10" },
  sky: { border: "border-sky-700/80", text: "text-sky-800", bg: "bg-sky-500/10" },
  violet: { border: "border-purple-700/80", text: "text-purple-800", bg: "bg-purple-500/10" },
};

export const PassportView: React.FC<PassportModalProps> = ({
  passport,
  onUpdatePassport,
  onSelectCountryById,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [holderName, setHolderName] = useState(passport.holderName);
  const [travelerTitle, setTravelerTitle] = useState(passport.travelerTitle);
  const [avatarEmoji, setAvatarEmoji] = useState(passport.avatarEmoji);
  const [copied, setCopied] = useState(false);

  const handleSaveProfile = () => {
    onUpdatePassport({
      ...passport,
      holderName: holderName.trim() || "익명의 여행자",
      travelerTitle,
      avatarEmoji,
    });
    setIsEditing(false);
  };

  const handleSharePassport = () => {
    const text = `🛂 [나만의 여행나라 공식 여권]\n여행자: ${passport.holderName} (${passport.travelerTitle})\n여권번호: ${passport.passportNumber}\n방문 및 건국 스탬프: ${passport.stamps.length}개 획득!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>환상세계 공식 입국 허가증 & 여행자 기록부</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          나만의 환상 여행 여권
        </h2>
        <p className="text-sm text-stone-600 max-w-xl mx-auto">
          나라들을 탐험하고 건국하며 모은 특별한 입국 비자 스탬프를 확인하세요.
        </p>
      </div>

      {/* Passport Book Container */}
      <div className="bg-[#1e293b] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-500/40 text-stone-100 relative overflow-hidden">
        {/* Gold Foil Header */}
        <div className="border-b border-amber-400/30 pb-6 mb-8 text-center space-y-2">
          <div className="w-16 h-16 rounded-full border-2 border-amber-400/60 bg-amber-400/10 flex items-center justify-center mx-auto text-amber-300 mb-2">
            <Compass className="w-9 h-9" />
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-amber-300/80 font-bold">
            Federal Republic of Dream Realms
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-amber-300 drop-shadow-sm font-serif">
            PASSPORT
          </h3>
          <div className="text-xs text-amber-200/70 font-mono tracking-wider">
            NO. {passport.passportNumber}
          </div>
        </div>

        {/* Passport Identity Page */}
        <div className="bg-[#f8fafc] text-stone-900 rounded-2xl p-6 shadow-inner border border-stone-300 mb-8 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Photo Frame */}
            <div className="w-28 h-36 bg-amber-50 border-2 border-stone-400 rounded-xl flex flex-col items-center justify-center relative shadow-sm shrink-0">
              <span className="text-6xl">{avatarEmoji}</span>
              <div className="absolute bottom-1 right-1 text-[9px] font-mono text-stone-400">
                OFFICIAL
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-3 w-full text-left">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                    Traveler Name (성명)
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      className="text-lg font-black text-stone-900 border-b border-amber-500 bg-amber-50/50 px-2 py-0.5 rounded focus:outline-none"
                    />
                  ) : (
                    <div className="text-xl font-black text-stone-900 tracking-tight">
                      {passport.holderName}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (isEditing) handleSaveProfile();
                    else setIsEditing(true);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  {isEditing ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>저장</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>프로필 수정</span>
                    </>
                  )}
                </button>
              </div>

              {isEditing && (
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      캐릭터 아바타 선택
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {AVATAR_OPTIONS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => setAvatarEmoji(em)}
                          className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center ${
                            avatarEmoji === em ? "bg-amber-300 ring-2 ring-amber-600" : "bg-white"
                          }`}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      여행자 칭호 선택
                    </label>
                    <select
                      value={travelerTitle}
                      onChange={(e) => setTravelerTitle(e.target.value)}
                      className="w-full text-xs font-medium p-1.5 rounded-lg border border-stone-300 bg-white"
                    >
                      {TITLE_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Traveler Title
                  </span>
                  <span className="text-xs font-bold text-amber-900 truncate block">
                    {passport.travelerTitle}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Issue Date (발급일)
                  </span>
                  <span className="text-xs font-bold text-stone-700 block">
                    {passport.issueDate}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Visa Stamps (비자)
                  </span>
                  <span className="text-xs font-black text-emerald-700 block">
                    {passport.stamps.length}개 국가 날인
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visa Stamps Pages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-amber-400/30 pb-2">
            <div className="flex items-center gap-2">
              <Stamp className="w-5 h-5 text-amber-400" />
              <h4 className="text-base font-bold text-amber-300 uppercase tracking-wider font-serif">
                VISAS / 입국 도장 날인란
              </h4>
            </div>
            <span className="text-xs text-stone-400 font-mono">
              PAGE 04-05
            </span>
          </div>

          {passport.stamps.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-stone-700 rounded-2xl bg-stone-900/40">
              <Stamp className="w-12 h-12 text-stone-600 mx-auto mb-3 animate-bounce" />
              <p className="text-sm font-medium text-stone-400">
                아직 날인된 비자 스탬프가 없습니다.
              </p>
              <p className="text-xs text-stone-500 mt-1">
                [나라 탐험] 탭에서 마음에 드는 나라의 상세보기를 열고 입국 도장을 찍어보세요!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {passport.stamps.map((stamp, idx) => {
                const colorConfig = stampColors[stamp.colorTheme] || stampColors.amber;
                return (
                  <div
                    key={idx}
                    onClick={() => onSelectCountryById(stamp.countryId)}
                    className={`relative p-4 rounded-2xl border-2 border-dashed ${colorConfig.border} ${colorConfig.bg} backdrop-blur-sm cursor-pointer hover:scale-105 transition-all group flex flex-col items-center justify-center text-center`}
                  >
                    {/* Retro Stamp Ring effect */}
                    <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center mb-2 shadow-xs group-hover:rotate-12 transition-transform">
                      <span className="text-3xl">{stamp.flagEmoji}</span>
                    </div>

                    <div className="font-black text-sm text-stone-100 tracking-tight">
                      {stamp.countryName}
                    </div>
                    <div className="text-[10px] font-mono text-amber-300/80 mt-0.5">
                      ENTRY: {stamp.date}
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-stone-400 mt-1">
                      ★ IMMIGRATION APPROVED ★
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-amber-400/30 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-stone-400 font-mono">
            AUTHORITY: AI STUDIO FANTASY TRAVEL ALLIANCE
          </div>
          <button
            onClick={handleSharePassport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-400 hover:bg-amber-300 shadow-md transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-800" />
                <span>여권 정보 복사 완료!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>여권 정보 공유하기</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
