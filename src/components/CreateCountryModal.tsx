import React, { useState } from "react";
import { 
  X, Wand2, Sparkles, MapPin, Utensils, Scroll, 
  Coins, Check, Loader2, Compass, AlertCircle 
} from "lucide-react";
import { Country, ColorTheme } from "../types";
import confetti from "canvas-confetti";

interface CreateCountryModalProps {
  onClose: () => void;
  onCountryCreated: (newCountry: Country) => void;
  travelerName: string;
}

const EMOJI_OPTIONS = ["🏰", "🌸", "☕", "🐱", "🌲", "🌌", "🍧", "💎", "⛵", "🍕", "🚀", "🥞", "🦩", "🌙", "🎨", "🧁", "🚂", "🌊"];

const THEME_COLORS: { key: ColorTheme; label: string; bg: string }[] = [
  { key: "amber", label: "황금빛 (Amber)", bg: "bg-amber-400" },
  { key: "emerald", label: "에메랄드 (Emerald)", bg: "bg-emerald-500" },
  { key: "indigo", label: "은하수 (Indigo)", bg: "bg-indigo-600" },
  { key: "rose", label: "선셋 핑크 (Rose)", bg: "bg-rose-400" },
  { key: "sky", label: "청명한 하늘 (Sky)", bg: "bg-sky-400" },
  { key: "violet", label: "신비로운 보라 (Violet)", bg: "bg-purple-500" },
];

const PRESET_IDEAS = [
  "구름 위의 갓 구운 크루아상과 커피 향이 맴도는 쉼표의 나라",
  "밤이 되면 모든 나무가 고양이 꼬리처럼 흔들리며 재즈를 연주하는 숲",
  "시원한 민트초코 빙수 호수와 오로라 미끄럼틀이 있는 극지방 낙원",
  "시간이 거꾸로 흐르고 별똥별을 주워 모으는 비밀 천문대 사막"
];

export const CreateCountryModal: React.FC<CreateCountryModalProps> = ({
  onClose,
  onCountryCreated,
  travelerName,
}) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPromptInput, setAiPromptInput] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [flagEmoji, setFlagEmoji] = useState("🏰");
  const [colorTheme, setColorTheme] = useState<ColorTheme>("amber");
  const [geography, setGeography] = useState("");
  const [climate, setClimate] = useState("");
  const [currency, setCurrency] = useState("1 룬 (LUN)");
  const [greeting, setGreeting] = useState("반가워요! (Salute!)");
  const [backgroundStory, setBackgroundStory] = useState("");
  const [travelTips, setTravelTips] = useState("");
  const [founder, setFounder] = useState(travelerName || "자유 여행자");

  // Landmarks
  const [landmark1, setLandmark1] = useState({ name: "", desc: "" });
  const [landmark2, setLandmark2] = useState({ name: "", desc: "" });
  const [landmark3, setLandmark3] = useState({ name: "", desc: "" });

  // Cuisine
  const [dish1, setDish1] = useState({ name: "", desc: "" });
  const [dish2, setDish2] = useState({ name: "", desc: "" });

  // Traditions
  const [tradition1, setTradition1] = useState("");
  const [tradition2, setTradition2] = useState("");

  const handleAiGenerate = async (presetText?: string) => {
    const promptToUse = presetText || aiPromptInput || "따뜻하고 동화 같은 나만의 여행 안식처";
    setIsAiLoading(true);

    try {
      const res = await fetch("/api/generate-country", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: promptToUse,
          travelerName: founder,
        }),
      });
      const data = await res.json();
      if (data.success && data.country) {
        const c = data.country;
        setName(c.name || "");
        setEnglishName(c.englishName || "");
        setSlogan(c.slogan || "");
        setFlagEmoji(c.flagEmoji || "🏰");
        if (c.colorTheme) setColorTheme(c.colorTheme);
        setGeography(c.geography || "");
        setClimate(c.climate || "");
        setCurrency(c.currency || "1 드림");
        setGreeting(c.greeting || "환영합니다!");
        setBackgroundStory(c.backgroundStory || "");
        setTravelTips(c.travelTips || "");
        if (c.founder) setFounder(c.founder);

        if (c.landmarks?.[0]) setLandmark1(c.landmarks[0]);
        if (c.landmarks?.[1]) setLandmark2(c.landmarks[1]);
        if (c.landmarks?.[2]) setLandmark3(c.landmarks[2]);

        if (c.cuisine?.[0]) setDish1(c.cuisine[0]);
        if (c.cuisine?.[1]) setDish2(c.cuisine[1]);

        if (c.traditions?.[0]) setTradition1(c.traditions[0]);
        if (c.traditions?.[1]) setTradition2(c.traditions[1]);
      }
    } catch (err) {
      console.error("Failed to generate country with AI:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("나라 이름을 입력해주세요!");
      return;
    }

    const newCountry: Country = {
      id: `custom-country-${Date.now()}`,
      name: name.trim(),
      englishName: englishName.trim() || name.trim(),
      slogan: slogan.trim() || "상상 속 특별한 이야기가 펼쳐지는 곳",
      flagEmoji: flagEmoji || "🏰",
      colorTheme: colorTheme || "amber",
      geography: geography.trim() || "신비로운 자연과 환상적인 풍경이 어우러진 대지",
      climate: climate.trim() || "여행하기에 언제나 기분 좋은 화창한 날씨",
      landmarks: [
        { name: landmark1.name || "첫 번째 랜드마크", desc: landmark1.desc || "건국을 기념하는 중앙 광장" },
        { name: landmark2.name || "비경의 명소", desc: landmark2.desc || "방문자들의 찬사가 끊이지 않는 곳" },
        { name: landmark3.name || "비밀 전망대", desc: landmark3.desc || "나라의 전경을 한눈에 담을 수 있는 언덕" }
      ],
      cuisine: [
        { name: dish1.name || "대표 요리", desc: dish1.desc || "현지 특산물로 정성껏 빚은 전통 요리" },
        { name: dish2.name || "시그니처 음료", desc: dish2.desc || "청량하고 달콤한 특제 음료" }
      ],
      traditions: [
        tradition1.trim() || "여행자에게 먼저 따뜻한 미소와 손인사 건네기",
        tradition2.trim() || "매일 저녁 노을빛을 바라보며 오늘의 소중한 순간 기념하기"
      ],
      currency: currency.trim() || "1 스타",
      greeting: greeting.trim() || "반갑습니다!",
      backgroundStory: backgroundStory.trim() || `${founder} 님이 꿈꾸던 상상 속 파라다이스로 건국된 기적의 나라입니다.`,
      travelTips: travelTips.trim() || "설레는 마음과 여권을 준비해오세요.",
      founder: founder.trim() || "익명의 건국자",
      isCustom: true,
      createdAt: new Date().toLocaleDateString("ko-KR"),
      likes: 1,
      mapCoords: {
        x: Math.floor(Math.random() * 60) + 20,
        y: Math.floor(Math.random() * 60) + 20
      },
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
    };

    onCountryCreated(newCountry);
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-linear-to-r from-amber-500 via-amber-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl">
              🏰
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                나만의 여행나라 건국소
              </h2>
              <p className="text-xs sm:text-sm text-amber-100">
                상상 속 꿈꿔온 당신만의 환상 국가를 직접 설계하고 지도에 등록하세요.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Quick Generator Bar */}
        <div className="p-5 bg-amber-50 border-b border-amber-200/80">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-sm mb-2">
            <Wand2 className="w-4 h-4 text-amber-600" />
            <span>AI 마법 건국 도우미 (한 번에 자동 생성)</span>
          </div>
          <p className="text-xs text-stone-600 mb-3">
            원하는 테마나 분위기를 적어보세요. AI가 세계관, 랜드마크, 요리, 법률까지 자동으로 완성해 줍니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="예: 고양이들이 갓 구운 식빵을 굽는 따뜻한 바닷가 마을..."
              value={aiPromptInput}
              onChange={(e) => setAiPromptInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-xs"
            />
            <button
              type="button"
              onClick={() => handleAiGenerate()}
              disabled={isAiLoading}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md shadow-amber-600/20 active:scale-95 transition-all cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isAiLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>건국 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>AI로 마법 건국</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Idea Chips */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-bold text-stone-400">추천 아이디어:</span>
            {PRESET_IDEAS.map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setAiPromptInput(idea);
                  handleAiGenerate(idea);
                }}
                className="text-[11px] bg-white border border-amber-200/90 text-stone-700 hover:bg-amber-100 hover:text-amber-900 px-2.5 py-1 rounded-lg transition-colors cursor-pointer truncate max-w-[260px]"
              >
                ✨ {idea}
              </button>
            ))}
          </div>
        </div>

        {/* Manual Configuration Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[55vh] overflow-y-auto space-y-6">
          {/* Section 1: Basic Identity */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-2">
              <Scroll className="w-4 h-4 text-amber-600" />
              <span>1. 국가 정체성 & 상징</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  나라 이름 (한글) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 구름푸딩 왕국, 별빛 라군"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  영문 표기
                </label>
                <input
                  type="text"
                  placeholder="예: Kingdom of Fluffy Pudding"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                국가 슬로건 / 모토
              </label>
              <input
                type="text"
                placeholder="예: 오후 3시마다 달콤한 솜사탕 비가 내리는 평온의 나라"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  건국자 이름
                </label>
                <input
                  type="text"
                  value={founder}
                  onChange={(e) => setFounder(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Theme Color */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  국가 테마 컬러
                </label>
                <div className="flex gap-2 items-center pt-1">
                  {THEME_COLORS.map((tc) => (
                    <button
                      key={tc.key}
                      type="button"
                      onClick={() => setColorTheme(tc.key)}
                      className={`w-7 h-7 rounded-full ${tc.bg} transition-transform ${
                        colorTheme === tc.key ? "ring-2 ring-stone-900 ring-offset-2 scale-110" : "opacity-75 hover:opacity-100"
                      }`}
                      title={tc.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Flag Emoji Picker */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                국기 상징 이모지
              </label>
              <div className="flex flex-wrap gap-2 items-center">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFlagEmoji(emoji)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all cursor-pointer ${
                      flagEmoji === emoji
                        ? "bg-amber-100 border-amber-500 scale-110 shadow-xs"
                        : "bg-stone-50 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Environment & Lore */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-2">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>2. 자연 환경 & 세계관 스토리</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  지형 및 풍경
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 몽실몽실한 카라멜 고원과 마시멜로 언덕..."
                  value={geography}
                  onChange={(e) => setGeography(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  기후 및 날씨
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 사계절 내내 온화한 22도, 오후엔 시럽 향 솔솔..."
                  value={climate}
                  onChange={(e) => setClimate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                건국 신화 / 배경 이야기
              </label>
              <textarea
                rows={3}
                placeholder="이 나라가 어떻게 생겨났고 어떤 꿈을 간직하고 있는지 적어주세요."
                value={backgroundStory}
                onChange={(e) => setBackgroundStory(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />
            </div>
          </div>

          {/* Section 3: Landmarks & Cuisine */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>3. 대표 명소 & 국가 지정 음식</span>
            </h3>

            {/* Landmarks 3 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700">
                필수 방문 명소 3곳 (이름 / 간략 설명)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="명소 1 이름"
                  value={landmark1.name}
                  onChange={(e) => setLandmark1({ ...landmark1, name: e.target.value })}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="명소 2 이름"
                  value={landmark2.name}
                  onChange={(e) => setLandmark2({ ...landmark2, name: e.target.value })}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="명소 3 이름"
                  value={landmark3.name}
                  onChange={(e) => setLandmark3({ ...landmark3, name: e.target.value })}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Food 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  대표 요리 이름
                </label>
                <input
                  type="text"
                  placeholder="예: 몽글 수플레 팬케이크"
                  value={dish1.name}
                  onChange={(e) => setDish1({ ...dish1, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  대표 음료/디저트
                </label>
                <input
                  type="text"
                  placeholder="예: 구름 거품 라떼"
                  value={dish2.name}
                  onChange={(e) => setDish2({ ...dish2, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Customs & Currency */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-2 border-b border-stone-200 pb-2">
              <Coins className="w-4 h-4 text-emerald-600" />
              <span>4. 법률, 화폐, 인사말</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  고유 화폐 단위
                </label>
                <input
                  type="text"
                  placeholder="예: 1 푸디, 1 루멘, 1 냥이코인"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  현지 인사말
                </label>
                <input
                  type="text"
                  placeholder="예: 달콤한 하루 되세요! (Puddi-La!)"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                재미있는 국가 법률 / 전통 1
              </label>
              <input
                type="text"
                placeholder="예: 매일 오후 3시엔 무조건 하던 일을 멈추고 30분간 디저트를 먹는다."
                value={tradition1}
                onChange={(e) => setTradition1(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                여행자 꿀팁 / 준비물
              </label>
              <input
                type="text"
                placeholder="예: 푹신한 신발을 착용하세요. 구름 언덕을 걷다 보면 스텝이 퐁퐁 솟아납니다."
                value={travelTips}
                onChange={(e) => setTravelTips(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md shadow-amber-500/30 active:scale-95 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>건국 선포 및 지도 등록</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
