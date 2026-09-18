import React, { useState } from "react";
import { Mail, Send, Stamp, Sparkles, Heart, Plus, Check } from "lucide-react";
import { Postcard, Country } from "../types";
import confetti from "canvas-confetti";

interface PostcardSectionProps {
  postcards: Postcard[];
  countries: Country[];
  onAddPostcard: (newCard: Postcard) => void;
  travelerName: string;
  preselectedCountry?: Country | null;
}

const STAMP_OPTIONS = ["💌", "🕊️", "🌟", "🌸", "☕", "🏰", "🌌", "🦩", "🧭"];

const CARD_THEMES = [
  { id: "amber", name: "빈티지 양피지", bg: "bg-amber-50/95 border-amber-300 text-stone-900" },
  { id: "rose", name: "선셋 로즈", bg: "bg-rose-50/95 border-rose-300 text-stone-900" },
  { id: "emerald", name: "숲속 피톤치드", bg: "bg-emerald-50/95 border-emerald-300 text-stone-900" },
  { id: "indigo", name: "별빛 미드나잇", bg: "bg-slate-900 border-indigo-500 text-indigo-50" },
];

export const PostcardSection: React.FC<PostcardSectionProps> = ({
  postcards,
  countries,
  onAddPostcard,
  travelerName,
  preselectedCountry,
}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState(
    preselectedCountry?.id || countries[0]?.id || ""
  );
  const [sender, setSender] = useState(travelerName || "자유로운 여행자");
  const [message, setMessage] = useState("");
  const [stampEmoji, setStampEmoji] = useState("💌");
  const [selectedTheme, setSelectedTheme] = useState("amber");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const targetCountry = countries.find((c) => c.id === selectedCountryId) || countries[0];

    const newPostcard: Postcard = {
      id: `postcard-${Date.now()}`,
      countryId: targetCountry.id,
      countryName: targetCountry.name,
      sender: sender.trim() || "여행자",
      message: message.trim(),
      date: new Date().toLocaleDateString("ko-KR"),
      stampEmoji: stampEmoji || "💌",
      bgGradient: selectedTheme,
    };

    onAddPostcard(newPostcard);
    setMessage("");
    setIsWriting(false);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold mb-1 border border-rose-200">
            <Mail className="w-3.5 h-3.5 text-rose-600" />
            <span>여행자 방명록 & 아날로그 우체통</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            환상세계 여행자 우체통
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            여행 중 느낀 감동, 기억하고 싶은 순간, 다른 여행자들에게 전하고픈 이야기를 엽서에 담아보세요.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/25 active:scale-95 transition-all cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>엽서 작성하기</span>
        </button>
      </div>

      {/* Writing Drawer/Card */}
      {isWriting && (
        <div className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-xl animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-5">
            <div className="flex items-center gap-2 text-rose-950 font-bold">
              <Mail className="w-5 h-5 text-rose-500" />
              <h3 className="text-base font-extrabold">새 여행 엽서 쓰기</h3>
            </div>
            <button
              onClick={() => setIsWriting(false)}
              className="text-stone-400 hover:text-stone-600 text-xs p-1"
            >
              닫기
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  어느 나라에서 보내시나요?
                </label>
                <select
                  value={selectedCountryId}
                  onChange={(e) => setSelectedCountryId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-stone-50 font-medium"
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flagEmoji} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  보내는 사람 (여행자 서명)
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  placeholder="당신의 이름 또는 칭호"
                />
              </div>
            </div>

            {/* Stamp & Theme Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  기념 우표 선택
                </label>
                <div className="flex flex-wrap gap-2">
                  {STAMP_OPTIONS.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStampEmoji(st)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all cursor-pointer ${
                        stampEmoji === st
                          ? "bg-rose-100 border-rose-500 scale-110 shadow-xs"
                          : "bg-stone-50 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  엽서 종이 스타일
                </label>
                <div className="flex gap-2">
                  {CARD_THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedTheme === theme.id
                          ? "ring-2 ring-rose-500 border-rose-500 bg-rose-50 text-rose-950 font-black"
                          : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                엽서 내용
              </label>
              <textarea
                rows={3}
                required
                placeholder="이 나라의 바람, 향기, 혹은 오늘의 작은 다짐을 적어보세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-stone-300 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>우체통에 엽서 넣기</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Postcards Corkboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postcards.map((card) => {
          const themeConfig =
            CARD_THEMES.find((t) => t.id === card.bgGradient) || CARD_THEMES[0];

          return (
            <div
              key={card.id}
              className={`p-6 rounded-3xl border-2 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${themeConfig.bg}`}
            >
              {/* Retro Postage Stamp */}
              <div className="flex items-start justify-between border-b border-current/15 pb-3 mb-4">
                <div>
                  <span className="text-[11px] font-mono tracking-wider opacity-70 uppercase block">
                    FROM {card.countryName}
                  </span>
                  <span className="text-xs font-bold opacity-90">
                    {card.date}
                  </span>
                </div>

                {/* Stamp Emblem */}
                <div className="w-12 h-12 rounded-xl border-2 border-dashed border-current/40 flex items-center justify-center text-2xl rotate-6 shadow-xs">
                  {card.stampEmoji}
                </div>
              </div>

              {/* Message */}
              <p className="text-sm leading-relaxed font-serif italic mb-6">
                “{card.message}”
              </p>

              {/* Postcard Footer / Signature */}
              <div className="flex items-center justify-between border-t border-current/15 pt-3 text-xs">
                <span className="opacity-70 font-mono">AIR MAIL</span>
                <span className="font-extrabold tracking-tight">
                  Signed by. {card.sender}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
