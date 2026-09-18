import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Creative fallback country generator if Gemini API key is absent or quota is limited
function generateFallbackCountry(themeHint?: string, mood?: string) {
  const fallbackThemes = [
    {
      name: "구름푸딩 왕국",
      englishName: "Kingdom of Fluffy Pudding",
      slogan: "매일 오후 3시, 달콤한 솜사탕 비가 내리는 평화의 나라",
      flagEmoji: "🍮",
      colorTheme: "amber",
      geography: "몽실몽실한 카라멜 언덕과 휘핑크림 호수, 바닐라 향이 감도는 구름 고원",
      climate: "언제나 기분 좋은 22도, 오후엔 설탕 향기 솔솔 부는 미풍",
      landmarks: [
        { name: "카라멜 시럽 대폭포", desc: "황금빛 달콤한 시럽이 쏟아지는 유서 깊은 폭포" },
        { name: "바닐라 구름 전망대", desc: "발밑으로 펼쳐진 푹신한 구름 쿠션을 직접 만져볼 수 있는 곳" },
        { name: "별사탕 수정 동굴", desc: "밤이 되면 은은하게 빛나는 무지개 별사탕 원석 지대" }
      ],
      cuisine: [
        { name: "몽글 수플레 팬케이크", desc: "포크를 대면 사르르 녹아내리는 국가 지정 무형문화 간식" },
        { name: "구름 거품 라떼", desc: "한 모금 마시면 10초 동안 몸이 깃털처럼 가벼워지는 음료" }
      ],
      traditions: [
        "모든 국민은 하루에 한 번 서로에게 진심 어린 달콤한 칭찬을 건네야 함",
        "매주 금요일 밤은 전 국민이 야외에서 밤하늘의 솜사탕 별을 세는 '별빛 나이트'"
      ],
      currency: "1 푸디 (PUD)",
      greeting: "달콤한 하루 되세요! (Puddi-La!)",
      backgroundStory: "마음이 지친 여행자들을 위해 전설의 파티시에 요정이 꿈속 구름을 빚어 만든 기적의 낙원입니다.",
      travelTips: "푹신한 신발을 신고 오세요. 구름 위를 걷다 보면 스텝이 퐁퐁 솟아오릅니다."
    },
    {
      name: "별빛 바다의 아일랜드",
      englishName: "Starlight Lagoon Archipelago",
      slogan: "파도가 칠 때마다 은하수가 노래하는 신비의 군도",
      flagEmoji: "🌌",
      colorTheme: "indigo",
      geography: "형광빛으로 빛나는 산호초 바다와 수정 모래사장, 하늘을 향해 자란 발광 식물 군락",
      climate: "낮에는 따스한 에메랄드 햇살, 밤에는 시원한 오로라 미풍",
      landmarks: [
        { name: "발광 플랑크톤 블루 베이", desc: "발을 담그면 푸른 반딧불이처럼 빛나는 기적의 해변" },
        { name: "달맞이 산호 등대", desc: "은하수 나침반을 조율하는 신비로운 고대 해상 건축물" },
        { name: "해저 유리 음악당", desc: "고래들의 자장가를 들으며 감상하는 수중 오케스트라" }
      ],
      cuisine: [
        { name: "오로라 코코넛 샤베트", desc: "빛의 각도에 따라 맛이 변하는 환상적인 셔벗" },
        { name: "별가루 소라 파스타", desc: "입안 가득 바다의 시원함과 은은한 반짝임이 감도는 요리" }
      ],
      traditions: [
        "바다에 발을 담그고 소원을 빌면 다음 해 보름달에 꼭 이루어진다는 전설",
        "서로 인사할 때 두 손을 모아 반짝이는 손짓을 하는 '루미나' 인사법"
      ],
      currency: "1 루멘 (LUM)",
      greeting: "별빛이 당신의 길을 비추길! (Stella Mare!)",
      backgroundStory: "오래전 밤하늘에서 떨어진 유성이 깊은 바다와 만나 영원히 꺼지지 않는 은하빛 섬들이 되었습니다.",
      travelTips: "투명 방수 카메라를 챙겨가세요. 밤바다 스노클링은 평생 잊지 못할 장관입니다."
    },
    {
      name: "초록 서재의 숲",
      englishName: "Bibliotheca Sylvan Realm",
      slogan: "나무마다 책이 열리고, 바람이 페이지를 넘겨주는 사색의 성소",
      flagEmoji: "📖",
      colorTheme: "emerald",
      geography: "거대한 고목나무 서재가 이어진 비밀스러운 침엽수림과 졸졸 흐르는 잉크빛 청정 계곡",
      climate: "사계절 내내 차분하게 집중하기 좋은 선선한 가을 날씨 (18도)",
      landmarks: [
        { name: "천 년의 활자 거목", desc: "원하는 단어를 속삭이면 가지 끝에서 책 한 권이 열리는 신목" },
        { name: "침묵의 이끼 독서정원", desc: "오직 나뭇잎 스치는 소리와 만년필 사각거림만 존재하는 힐링 구역" },
        { name: "책갈피 풍차 언덕", desc: "바람이 불 때마다 전 세계의 오래된 종이 향기를 퍼뜨리는 풍차" }
      ],
      cuisine: [
        { name: "얼그레이 시나몬 파이", desc: "독서 중 집중력을 3배 올려준다는 전설의 도서관 구운 빵" },
        { name: "이슬 담은 숲속 피톤치드 티", desc: "머리를 맑게 씻겨주는 숲속 이끼 채취 허브차" }
      ],
      traditions: [
        "어떤 사람과 마주치든 말다툼 대신 좋아하는 책 속 문장 한 줄을 교환함",
        "매일 일몰 후 10분간 숲 전체가 불을 끄고 밤하늘과 종이 냄새를 음미하는 침묵의 시간"
      ],
      currency: "1 퀼 (QUILL)",
      greeting: "당신의 페이지에 평화가 가득하길! (Pax Folio!)",
      backgroundStory: "세상의 잊힌 이야기와 아름다운 상상들이 숲에 뿌리를 내려 나무가 된 지혜의 왕국입니다.",
      travelTips: "가장 좋아하는 만년필이나 노트를 지참하세요. 숲속 누구나 작가가 될 수 있습니다."
    },
    {
      name: "시계태엽 스팀 시티",
      englishName: "Aetheria Clockwork Metropolis",
      slogan: "황동 기어와 증기 비행선이 하늘을 가르는 모험과 낭만의 공중도시",
      flagEmoji: "⚙️",
      colorTheme: "amber",
      geography: "거대한 톱니바퀴 플랫폼 위에 세워진 빅토리아풍 황동 빌딩과 구름다리",
      climate: "따뜻한 증기 온기가 흐르는 선선한 봄날씨, 가끔 기분 좋은 증기 무지개가 뜸",
      landmarks: [
        { name: "그랜드 기어 타워", desc: "도시 전체의 시계바늘과 비행선 이착륙을 총괄하는 중앙 황동 시계탑" },
        { name: "하늘 고래 비행선 정박소", desc: "구름 위를 항해하는 앤틱 원드 제플린들이 모여드는 항구" },
        { name: "태엽 오르골 골목", desc: "골목마다 각기 다른 장인의 핸드메이드 오르골 멜로디가 울려 퍼지는 거리" }
      ],
      cuisine: [
        { name: "황금 버터 스팀 스콘", desc: "정밀 증기 오븐에서 1초의 오차도 없이 구워낸 겉바속촉 스콘" },
        { name: "치직 스파크 앤틱 탄산수", desc: "기포가 톡톡 터지며 활력을 북돋아주는 황동 잔 칵테일" }
      ],
      traditions: [
        "모든 약속 시간은 초 단위까지 정확히 지키되, 늦은 사람은 오르골을 선물하기",
        "비행선이 출항할 때마다 모두가 황동 고글을 이마에 올리며 무사 항해를 기원함"
      ],
      currency: "1 기어 (COG)",
      greeting: "엔진은 힘차게, 마음은 둥글게! (Full Steam Ahead!)",
      backgroundStory: "낭만을 잃지 않은 괴짜 발명가들이 구름 위에 세운, 고장 나지 않는 상상력의 기계 도시입니다.",
      travelTips: "고글과 멋진 트렌치코트를 챙겨가면 현지인들의 열렬한 패션 환영을 받습니다."
    }
  ];

  if (themeHint) {
    const matched = fallbackThemes.find(t => 
      t.name.includes(themeHint) || 
      t.geography.includes(themeHint) ||
      t.slogan.includes(themeHint)
    );
    if (matched) return matched;
  }
  // Random pick
  return fallbackThemes[Math.floor(Math.random() * fallbackThemes.length)];
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API to generate a unique travel country
  app.post("/api/generate-country", async (req, res) => {
    const { theme, keywords, vibe, travelerName } = req.body || {};
    const ai = getAI();

    if (!ai) {
      // Fallback generator when GEMINI_API_KEY is not configured
      const fallback = generateFallbackCountry(keywords || theme, vibe);
      return res.json({
        success: true,
        country: {
          ...fallback,
          founder: travelerName || "방랑 탐험가",
          id: `country-${Date.now()}`
        },
        source: "curated-fallback"
      });
    }

    try {
      const prompt = `당신은 세계 최고의 환상 여행 건축가이자 판타지 여행 작가입니다. 
여행자가 꿈꾸는 상상 속 '나만의 여행나라'를 독창적이고 매혹적으로 디자인해주세요.
입력 정보:
- 희망 테마: ${theme || "자유로운 상상의 세계"}
- 키워드/선호: ${keywords || "낭만, 힐링, 신비로움"}
- 분위기: ${vibe || "따뜻하고 몽환적인"}
- 건국자(여행자): ${travelerName || "익명의 여행자"}

다음 JSON 형식에 정확히 맞춰서 응답해주세요:
{
  "name": "한글 나라 이름 (예: 구름푸딩 왕국, 별빛 라군 등 2~6단어)",
  "englishName": "영문 나라 이름",
  "slogan": "매혹적인 국가 슬로건 한 문장",
  "flagEmoji": "국기를 상징하는 대표 이모지 1개 (예: 🏰, 🌸, ☕, 🌌 등)",
  "colorTheme": "amber | emerald | indigo | rose | sky | violet 중 가장 어울리는 하나",
  "geography": "지형 및 자연 환경 묘사 (2~3문장)",
  "climate": "기후 및 날씨 특징 묘사",
  "landmarks": [
    { "name": "명소 1 이름", "desc": "명소 설명 1~2문장" },
    { "name": "명소 2 이름", "desc": "명소 설명 1~2문장" },
    { "name": "명소 3 이름", "desc": "명소 설명 1~2문장" }
  ],
  "cuisine": [
    { "name": "대표 요리 1", "desc": "요리 설명" },
    { "name": "대표 음료/디저트", "desc": "음료 설명" }
  ],
  "traditions": [
    "독특한 법률 또는 일상 전통 1 (유쾌하고 낭만적인 규칙)",
    "독특한 법률 또는 일상 전통 2"
  ],
  "currency": "화폐 단위 (예: 1 드림, 1 룬 등)",
  "greeting": "현지 고유의 인사말과 발음/의미",
  "backgroundStory": "이 나라가 생겨난 신비로운 건국 신화나 배경 스토리 (3~4문장)",
  "travelTips": "여행자를 위한 특별한 꿀팁 (복장이나 준비물, 마음가짐 등)"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "당신은 감성적이고 몰입감 넘치는 여행 판타지 월드빌더입니다. 여행자가 가슴 설레도록 사랑스럽고 시각적인 디테일이 살아있는 한국어로 작성하세요."
        }
      });

      const responseText = response.text?.trim() || "{}";
      const parsed = JSON.parse(responseText);

      return res.json({
        success: true,
        country: {
          ...parsed,
          founder: travelerName || "익명의 여행자",
          id: `country-${Date.now()}`
        },
        source: "gemini"
      });
    } catch (err: any) {
      console.error("Gemini country generation error:", err);
      const fallback = generateFallbackCountry(keywords || theme, vibe);
      return res.json({
        success: true,
        country: {
          ...fallback,
          founder: travelerName || "방랑 탐험가",
          id: `country-${Date.now()}`
        },
        source: "fallback-on-error"
      });
    }
  });

  // API to generate custom 3-day itinerary
  app.post("/api/generate-itinerary", async (req, res) => {
    const { countryName, geography, landmarks, travelerStyle } = req.body || {};
    const ai = getAI();

    if (!ai) {
      return res.json({
        success: true,
        itinerary: [
          {
            day: 1,
            title: "첫 발걸음과 입국 환영식",
            activities: [
              "중앙 광장에서 현지 고유의 향기로운 웰컴 티 시음하기",
              landmarks?.[0]?.name || "대표 명소" + " 둘러보기",
              "노을 지는 언덕에서 은은한 바람 소리 감상하기"
            ],
            diningTip: "골목길 작은 식당에서 갓 구운 전통 빵 맛보기"
          },
          {
            day: 2,
            title: "숨겨진 비경과 현지 문화 속으로",
            activities: [
              landmarks?.[1]?.name || "비밀스러운 비경" + " 트레킹",
              "현지 장인과 함께하는 나만의 수공예 기념품 만들기",
              "밤하늘 올려다보며 별빛 일기 작성하기"
            ],
            diningTip: "달콤한 시그니처 셔벗과 따스한 수프"
          },
          {
            day: 3,
            title: "영원한 기억과 작별의 엽서",
            activities: [
              landmarks?.[2]?.name || "전망대" + "에서 나라 전경 한눈에 담기",
              "중앙 우체통에서 미래의 나에게 엽서 부치기",
              "여권에 출국 기념 황금 스탬프 날인받기"
            ],
            diningTip: "여행을 마무리하는 축제 만찬 즐기기"
          }
        ]
      });
    }

    try {
      const prompt = `'${countryName}'(지형: ${geography || "아름다운 자연"})을 여행하는 3일간의 감성 가득한 추천 여행 일정표를 작성해주세요.
여행자 스타일: ${travelerStyle || "여유로운 힐링과 사진 촬영"}
명소 정보: ${JSON.stringify(landmarks || [])}

응답 형식:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Day 1 테마 제목",
      "activities": ["활동 1", "활동 2", "활동 3"],
      "diningTip": "추천 식도락 팁"
    },
    {
      "day": 2,
      "title": "Day 2 테마 제목",
      "activities": ["활동 1", "활동 2", "활동 3"],
      "diningTip": "추천 식도락 팁"
    },
    {
      "day": 3,
      "title": "Day 3 테마 제목",
      "activities": ["활동 1", "활동 2", "활동 3"],
      "diningTip": "추천 식도락 팁"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      return res.json({ success: true, itinerary: parsed.itinerary || [] });
    } catch (err) {
      console.error("Itinerary gen error:", err);
      return res.json({
        success: true,
        itinerary: [
          {
            day: 1,
            title: "마법 같은 첫 만남",
            activities: ["입국 수속 및 웰컴 과일 바구니 받기", "구시가지 골목길 산책", "노을빛 전망대"],
            diningTip: "따뜻한 시그니처 수프"
          },
          {
            day: 2,
            title: "신비로운 자연 탐험",
            activities: ["비밀 폭포 피크닉", "현지 축제 참여", "반딧불이 야경 투어"],
            diningTip: "달콤한 특산물 디저트"
          },
          {
            day: 3,
            title: "추억 갈무리",
            activities: ["벼룩시장에서 골동품 고르기", "기념 엽서 쓰기", "마지막 일몰 바라보기"],
            diningTip: "낭만적인 카페 브런치"
          }
        ]
      });
    }
  });

  // AI Naver-Map-like transit guide generator
  app.post("/api/generate-transit-guide", async (req, res) => {
    const { placeName, category, address, origin } = req.body;
    const originPlace = origin || "인근 KTX역 또는 주요 중심 지하철역";

    try {
      const ai = getAI();
      if (!ai) {
        throw new Error("AI Client not initialized");
      }
      const prompt = `당신은 한국의 네이버지도(Naver Map) 최고 전문 길찾기 시스템입니다.
여행자가 직접 대중교통이나 택시를 이용하지 않았더라도, 해당 장소('${placeName}', 주소: '${address}', 분류: '${category}')에 찾아갈 수 있도록 완벽하고 정확한 교통 가이드를 생성해주세요.
출발지: '${originPlace}'
도착지: '${placeName}'

반드시 다음 JSON 형식으로만 응답하세요:
{
  "guide": {
    "originName": "${originPlace}",
    "destinationName": "${placeName}",
    "transit": {
      "totalDurationMinutes": 28,
      "transferCount": 0,
      "summary": "지하철 or 급행버스 직통 이동 경로 요약",
      "steps": [
        {
          "type": "subway",
          "lineOrRoute": "노선 번호 (예: 2호선)",
          "departureName": "탑승 정류장/역",
          "arrivalName": "하차 정류장/역",
          "durationMinutes": 20,
          "instruction": "탑승 위치, 빠른 환승 문 번호 및 이동 팁",
          "color": "#10b981"
        },
        {
          "type": "walk",
          "durationMinutes": 8,
          "instruction": "출구 번호 및 랜드마크를 거쳐 도보 이동하는 상세 안내",
          "color": "#6b7280"
        }
      ],
      "fareEstimate": "1,400원 (교통카드)",
      "tips": "네이버지도 기준 실시간 버스/지하철 탑승 꿀팁"
    },
    "taxi": {
      "durationMinutes": 18,
      "estimatedFare": "약 11,000원 ~ 13,000원",
      "trafficStatus": "moderate",
      "tollFee": "통행료 없음",
      "tips": "택시 승차 위치 및 기사님께 요청할 도로 꿀팁 (예: 유턴 요금 절약 승강장)"
    },
    "walkingOrBike": {
      "durationMinutes": 25,
      "distanceKm": 3.2,
      "calories": 120,
      "routeHint": "자전거도로 또는 도보 산책길 뷰 추천"
    }
  }
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      return res.json({ success: true, guide: parsed.guide });
    } catch (err) {
      console.error("Transit guide error:", err);
      // Fallback structured guide
      return res.json({
        success: true,
        guide: {
          originName: originPlace,
          destinationName: placeName,
          transit: {
            totalDurationMinutes: 25,
            transferCount: 0,
            summary: `${placeName} 인근 주요 대중교통 직통 노선`,
            steps: [
              {
                type: "subway",
                lineOrRoute: "주요 간선 노선",
                departureName: `${originPlace} 승차`,
                arrivalName: `${placeName} 인근 역 하차`,
                durationMinutes: 18,
                instruction: "인근 중심역에서 승차 후 가장 빠른 출구로 이동",
                color: "#10b981"
              },
              {
                type: "walk",
                durationMinutes: 7,
                instruction: "역 출구 나와서 골목 방면 직진 350m 도보 이동",
                color: "#6b7280"
              }
            ],
            fareEstimate: "1,400원 (교통카드)",
            tips: "네이버지도 실시간 버스 및 전철 도착 예정 시간을 확인하면 대기시간 최소화 가능"
          },
          taxi: {
            durationMinutes: 16,
            estimatedFare: "약 9,500원 ~ 12,000원",
            trafficStatus: "moderate",
            tollFee: "통행료 없음",
            tips: "카카오T/우티 앱으로 목적지 상호명 검색 시 입구 바로 앞 하차 가능"
          },
          walkingOrBike: {
            durationMinutes: 24,
            distanceKm: 2.8,
            calories: 105,
            routeHint: "인도 및 자전거 전용도로가 잘 정비된 평지 구간"
          }
        }
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`나만의 여행나라 서버 실행 중: http://localhost:${PORT}`);
  });
}

startServer();
