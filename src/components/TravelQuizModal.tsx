import React, { useState } from "react";
import { X, Sparkles, Compass, Check, ArrowRight, Stamp } from "lucide-react";
import { TRAVEL_QUIZ_QUESTIONS } from "../data/defaultCountries";
import { Country } from "../types";
import confetti from "canvas-confetti";

interface TravelQuizModalProps {
  onClose: () => void;
  countries: Country[];
  onSelectCountry: (country: Country) => void;
  onStamp: (country: Country) => void;
}

export const TravelQuizModal: React.FC<TravelQuizModalProps> = ({
  onClose,
  countries,
  onSelectCountry,
  onStamp,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultCountry, setResultCountry] = useState<Country | null>(null);

  const handleSelectOption = (targetId: string) => {
    const nextAnswers = [...answers, targetId];
    setAnswers(nextAnswers);

    if (currentStep + 1 < TRAVEL_QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate matching country
      const counts: Record<string, number> = {};
      nextAnswers.forEach((id) => {
        counts[id] = (counts[id] || 0) + 1;
      });

      let bestId = nextAnswers[0];
      let maxCount = 0;
      for (const id in counts) {
        if (counts[id] > maxCount) {
          maxCount = counts[id];
          bestId = id;
        }
      }

      const match = countries.find((c) => c.id === bestId) || countries[0];
      setResultCountry(match);

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResultCountry(null);
  };

  const currentQ = TRAVEL_QUIZ_QUESTIONS[currentStep];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!resultCountry ? (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Q0{currentStep + 1} of {TRAVEL_QUIZ_QUESTIONS.length}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900">
                나의 영혼에 맞는 여행나라 찾기
              </h3>
            </div>

            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-center">
              <p className="font-extrabold text-base text-amber-950">
                {currentQ.question}
              </p>
            </div>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.target)}
                  className="w-full text-left p-4 rounded-2xl border border-stone-200 hover:border-amber-400 hover:bg-amber-50/50 text-stone-800 text-sm font-semibold transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / TRAVEL_QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>성향 분석 완료!</span>
            </div>

            <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-5xl mx-auto shadow-md">
              {resultCountry.flagEmoji}
            </div>

            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                당신에게 꼭 맞는 운명의 여행나라
              </p>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
                {resultCountry.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 italic mt-1">
                “{resultCountry.slogan}”
              </p>
            </div>

            <p className="text-xs text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-200 leading-relaxed text-left">
              {resultCountry.geography}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  onStamp(resultCountry);
                  onSelectCountry(resultCountry);
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Stamp className="w-4 h-4" />
                <span>비자 받고 여행 시작하기</span>
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                다시 테스트하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
