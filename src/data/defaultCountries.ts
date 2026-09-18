import { Country } from "../types";

export const DEFAULT_COUNTRIES: Country[] = [
  {
    id: "country-pudding",
    name: "구름푸딩 왕국",
    englishName: "Kingdom of Fluffy Pudding",
    slogan: "오후 3시마다 달콤한 솜사탕 비가 내리는 평온의 나라",
    flagEmoji: "🍮",
    colorTheme: "amber",
    geography: "몽실몽실한 카라멜 고원과 마시멜로 언덕, 투명한 바닐라 호수로 이루어진 공중 낙원입니다.",
    climate: "사계절 내내 온화한 22도, 솜사탕 바람과 달콤한 시럽 향기가 감도는 포근한 날씨.",
    landmarks: [
      { name: "카라멜 시럽 대폭포", desc: "황금빛 달콤한 시럽이 쏟아져 내리는 유서 깊은 왕립 폭포" },
      { name: "바닐라 구름 전망대", desc: "발밑으로 펼쳐진 푹신한 구름 쿠션에 직접 누워 쉴 수 있는 명소" },
      { name: "별사탕 수정 동굴", desc: "밤이 되면 스스로 은은하게 무지갯빛으로 빛나는 천연 사탕 동굴" }
    ],
    cuisine: [
      { name: "몽글 수플레 팬케이크", desc: "포크를 대면 눈처럼 사르르 녹아내리는 국가 지정 문화 간식" },
      { name: "구름 거품 라떼", desc: "한 모금 마시면 10초간 발걸음이 깃털처럼 가벼워지는 마법의 음료" }
    ],
    traditions: [
      "모든 주민은 매일 오후 3시 사이렌이 울리면 하던 일을 멈추고 30분간 티타임을 가진다.",
      "서로 마주치면 손가락 하트를 그리며 '달콤한 하루!'라고 축복한다."
    ],
    currency: "1 푸디 (PUD)",
    greeting: "달콤한 하루 되세요! (Puddi-La!)",
    backgroundStory: "현대 생활에 지친 지상 여행자들을 위해 전설의 파티시에 요정이 꿈결의 구름을 빚어 세운 치유의 왕국입니다.",
    travelTips: "푹신한 신발을 착용하세요. 구름 언덕을 걷다 보면 스텝이 퐁퐁 솟아올라 저절로 춤을 추게 됩니다.",
    founder: "왕립 파티시에 젤로",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    mapCoords: { x: 25, y: 28 },
    likes: 342
  },
  {
    id: "country-starlight",
    name: "별빛 바다의 아일랜드",
    englishName: "Starlight Lagoon Archipelago",
    slogan: "파도가 칠 때마다 은하수가 노래하는 신비의 군도",
    flagEmoji: "🌌",
    colorTheme: "indigo",
    geography: "발광 플랑크톤이 푸른빛으로 수놓는 형광 산호 해변과 자수정 모래밭, 은하수를 담은 라군입니다.",
    climate: "낮에는 따스한 에메랄드빛 햇살, 밤에는 시원하고 쾌적한 오로라 미풍이 불어옵니다.",
    landmarks: [
      { name: "발광 플랑크톤 블루 베이", desc: "파도가 칠 때마다 푸른 반딧불이처럼 밤바다가 빛나는 절경" },
      { name: "달맞이 산호 등대", desc: "은하수 나침반을 조율해 길 잃은 배들을 인도하는 고대 등대" },
      { name: "해저 유리 음악당", desc: "신비로운 혹등고래들의 자장가를 생생하게 들을 수 있는 수중 홀" }
    ],
    cuisine: [
      { name: "오로라 코코넛 샤베트", desc: "빛의 각도에 따라 색과 맛이 다채롭게 변하는 신비한 빙과" },
      { name: "별가루 소라 파스타", desc: "입안 가득 바다의 시원한 풍미와 은은한 감칠맛이 터지는 시그니처 요리" }
    ],
    traditions: [
      "밤바다에 발을 담그고 소원을 세 번 속삭이면 은하수가 간직해 준다는 풍습",
      "인사할 때 두 손을 가슴에 얹고 반짝이는 손짓을 건네는 '루미나' 제스처"
    ],
    currency: "1 루멘 (LUM)",
    greeting: "별빛이 당신의 길을 비추길! (Stella Mare!)",
    backgroundStory: "오래전 하늘에서 쏟아져 내린 유성 조각들이 깊은 청록빛 바다와 만나 영원히 빛나는 섬들이 되었습니다.",
    travelTips: "투명 방수 파우치를 챙겨오세요. 밤바다 스노클링을 즐기며 별빛 사진을 찍기에 최적입니다.",
    founder: "항해사 아스트리드",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    mapCoords: { x: 75, y: 72 },
    likes: 489
  },
  {
    id: "country-bookforest",
    name: "초록 서재의 숲",
    englishName: "Bibliotheca Sylvan Realm",
    slogan: "나무마다 책이 열리고, 바람이 페이지를 넘겨주는 사색의 성소",
    flagEmoji: "📖",
    colorTheme: "emerald",
    geography: "천 년 된 고목 서재들이 늘어선 피톤치드 침엽수림과 졸졸 흐르는 잉크빛 청정 계곡.",
    climate: "일 년 내내 책 읽기에 가장 이상적인 18도의 쾌적하고 선선한 가을 날씨.",
    landmarks: [
      { name: "천 년의 활자 거목", desc: "원하는 단어를 속삭이면 가지 끝에서 나만을 위한 책 한 권이 열리는 신목" },
      { name: "침묵의 이끼 독서정원", desc: "오직 나뭇잎 스치는 바람 소리와 사각거리는 연필 소리만 존재하는 쉼터" },
      { name: "책갈피 풍차 언덕", desc: "바람이 불 때마다 전 세계의 오래된 양장본 종이 향기를 퍼뜨리는 풍차" }
    ],
    cuisine: [
      { name: "얼그레이 시나몬 파이", desc: "독서 중 두뇌 회전과 집중력을 극대화해 주는 도서관 구운 빵" },
      { name: "이슬 담은 숲속 피톤치드 티", desc: "머리를 맑게 씻겨주는 숲속 야생 이끼 채취 허브 블렌딩 차" }
    ],
    traditions: [
      "낯선 이와 마주치면 싸우지 않고 각자 아끼는 책 속 명문장 한 줄을 교환함",
      "매일 해질녘 10분간 숲 전체가 불을 끄고 밤하늘과 종이 냄새를 음미하는 시간"
    ],
    currency: "1 퀼 (QUILL)",
    greeting: "당신의 페이지에 평화가 가득하길! (Pax Folio!)",
    backgroundStory: "세상의 잊힌 아름다운 문장들과 따스한 사색들이 대지에 뿌리를 내려 거대한 숲이 되었습니다.",
    travelTips: "가장 아끼는 만년필이나 노트를 지참하세요. 숲속 누구나 자신만의 시인이 됩니다.",
    founder: "도서관장 세이지",
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    mapCoords: { x: 38, y: 65 },
    likes: 278
  },
  {
    id: "country-clockwork",
    name: "시계태엽 스팀 시티",
    englishName: "Aetheria Clockwork Metropolis",
    slogan: "황동 기어와 증기 비행선이 하늘을 가르는 모험과 낭만의 공중도시",
    flagEmoji: "⚙️",
    colorTheme: "amber",
    geography: "거대한 황동 톱니바퀴 플랫폼 위에 세워진 앤틱 빌딩들과 구름 사이를 잇는 서스펜션 브릿지.",
    climate: "증기기관의 따스한 온기와 시원한 구름 미풍이 어우러져 기분 좋은 활동성 넘치는 날씨.",
    landmarks: [
      { name: "그랜드 기어 타워", desc: "도시 전체의 시계바늘과 공중 비행선 이착륙을 총괄하는 중앙 황동 시계탑" },
      { name: "하늘 고래 비행선 정박소", desc: "구름 바다 위를 항해하는 앤틱 윈드 제플린들이 모여드는 하늘 항구" },
      { name: "태엽 오르골 골목", desc: "골목마다 각기 다른 장인의 핸드메이드 오르골 멜로디가 울려 퍼지는 거리" }
    ],
    cuisine: [
      { name: "황금 버터 스팀 스콘", desc: "정밀 증기 오븐에서 1초의 오차도 없이 구워낸 겉바속촉 스콘" },
      { name: "치직 스파크 앤틱 탄산수", desc: "황동 잔에 담겨 기포가 톡톡 터지며 활력을 북돋아주는 시그니처 칵테일" }
    ],
    traditions: [
      "약속 시간은 초 단위까지 정확히 지키되, 늦은 사람은 상대방에게 예쁜 오르골을 선물하기",
      "비행선이 출항할 때마다 황동 고글을 이마에 올리며 무사 항해를 기원하는 전통"
    ],
    currency: "1 기어 (COG)",
    greeting: "엔진은 힘차게, 마음은 둥글게! (Full Steam Ahead!)",
    backgroundStory: "낭만을 잃지 않은 천재 발명가들이 구름 위에 세운, 고장 나지 않는 상상력의 기계 도시입니다.",
    travelTips: "빈티지 트렌치코트나 고글을 착용하면 현지 시민들의 열렬한 패션 환영을 받습니다.",
    founder: "수석 기관사 올리버",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    mapCoords: { x: 80, y: 28 },
    likes: 315
  },
  {
    id: "country-coral",
    name: "선셋 플라밍고 라군",
    englishName: "Coral Solaria Island",
    slogan: "365일 황금빛 노을이 멈추지 않는 분홍빛 휴양의 낙원",
    flagEmoji: "🦩",
    colorTheme: "rose",
    geography: "분홍빛 모래사장과 얕고 투명한 산호 라군, 플라밍고들이 유영하는 온화한 섬입니다.",
    climate: "따사롭고 부드러운 영원한 노을빛 온기 (26도), 끈적이지 않는 보송보송한 휴양 기후.",
    landmarks: [
      { name: "영원한 노을 곶", desc: "해가 완전히 지지 않고 황금빛 수평선을 유지하는 기적의 석양 포인트" },
      { name: "핑크 산호 정원", desc: "스노클링을 하면 형형색색의 아기 열대어와 분홍 산호가 반겨주는 명소" },
      { name: "해먹 야자수 해변", desc: "부드러운 파도 소리를 들으며 끝없는 낮잠을 즐길 수 있는 해변" }
    ],
    cuisine: [
      { name: "핑크 드래곤프루트 볼", desc: "신선한 열대 과일과 달콤한 코코넛 요거트를 듬뿍 얹은 건강 디저트" },
      { name: "선셋 칵테일 블리즈", desc: "오렌지빛에서 자줏빛으로 그라데이션되는 무알콜 트로피컬 음료" }
    ],
    traditions: [
      "매일 오후 해변에 모여 노을을 향해 한 박수갈채를 치며 오늘 하루의 무사를 감사함",
      "시계 착용이 금지되어 있으며 오직 파도 소리와 기분에 따라 일정을 정함"
    ],
    currency: "1 솔 (SOL)",
    greeting: "노을빛 평화가 당신에게! (Aloha Sol!)",
    backgroundStory: "해가 지는 순간의 따뜻함에 반한 고대 여행자가 세운, 시간의 재촉이 없는 영원한 휴식처입니다.",
    travelTips: "가장 좋아하는 린넨 셔츠와 선글라스를 챙기세요. 신발을 벗고 맨발로 걷는 것이 규칙입니다.",
    founder: "자유로운 영혼 로라",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    mapCoords: { x: 50, y: 48 },
    likes: 412
  },
  {
    id: "country-aurora",
    name: "오로라 설원 노르디카",
    englishName: "Astra Borealis Kingdom",
    slogan: "밤하늘에 춤추는 초록빛 커튼과 따스한 유빙 온천의 왕국",
    flagEmoji: "❄️",
    colorTheme: "sky",
    geography: "새하얀 설원 침엽수림 사이로 솟아오르는 천연 유빙 온천과 글래스 이글루 마을.",
    climate: "바깥은 시원하고 상쾌한 겨울 공기, 실내와 온천은 38도의 천국 같은 따스함.",
    landmarks: [
      { name: "글래스 돔 이글루 타운", desc: "누워서 천장 통유리로 춤추는 초록빛 오로라를 감상하는 로맨틱 숙소" },
      { name: "스팀 유빙 온천", desc: "설산 한가운데 눈을 맞으며 몸을 녹이는 전설의 유황 온천" },
      { name: "달빛 썰매 언덕", desc: "하얀 눈꽃 사슴들이 끄는 마법의 썰매를 타고 은빛 숲을 가르는 코스" }
    ],
    cuisine: [
      { name: "별빛 가루 핫초코", desc: "마시멜로가 눈사람 모양으로 떠오르는 진하고 달콤한 특제 코코아" },
      { name: "장작불 훈제 연어 스테이크", desc: "자작나무 장작불에 천천히 구워 훈연 향이 가득한 북방식 만찬" }
    ],
    traditions: [
      "오로라가 하늘에 번질 때 손을 잡으면 영원한 우정과 사랑이 약속된다는 전설",
      "방문객에게 첫날 따뜻한 양모 양말을 신겨주는 '포근한 환대' 의식"
    ],
    currency: "1 프로스트 (FROST)",
    greeting: "따뜻한 밤 되세요! (Kald Varm!)",
    backgroundStory: "눈의 여왕이 홀로 외롭지 않도록 세상의 모든 따뜻한 마음과 모닥불을 모아 완성한 은빛 왕국입니다.",
    travelTips: "방한 장갑과 도톰한 비니는 필수! 온천 후 마시는 차가운 핫초코는 별미입니다.",
    founder: "순록 지기 에릭",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
    mapCoords: { x: 62, y: 16 },
    likes: 520
  }
];

export const TRAVEL_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "휴가를 떠난다면 당신이 가장 꿈꾸는 풍경은?",
    options: [
      { text: "푹신한 구름과 달콤한 디저트가 가득한 동화 속 세상", target: "country-pudding" },
      { text: "밤바다에 은하수가 쏟아져 내리는 환상적인 해변", target: "country-starlight" },
      { text: "피톤치드 가득한 숲속, 나만의 안락한 나무 도서관", target: "country-bookforest" },
      { text: "기어와 황동 비행선이 하늘을 가르는 흥미진진한 모험", target: "country-clockwork" }
    ]
  },
  {
    id: 2,
    question: "여행 중 가장 행복한 순간은 언제인가요?",
    options: [
      { text: "오후 3시, 예쁜 카페에서 갓 구운 디저트와 차 마시기", target: "country-pudding" },
      { text: "밤하늘의 별과 파도 소리를 들으며 멍하니 야경 보기", target: "country-starlight" },
      { text: "향긋한 종이 냄새 맡으며 여유롭게 독서하고 글쓰기", target: "country-bookforest" },
      { text: "노을 지는 해변 해먹에 누워 맨발로 파도 느끼기", target: "country-coral" }
    ]
  },
  {
    id: 3,
    question: "숙소를 고를 때 가장 중요하게 생각하는 것은?",
    options: [
      { text: "폭신폭신 구름 침대와 사랑스러운 인테리어", target: "country-pudding" },
      { text: "침대에 누워 밤하늘 오로라와 은하수를 볼 수 있는 천창", target: "country-aurora" },
      { text: "창밖으로 끝없는 녹음이 펼쳐지는 조용한 숲속 오두막", target: "country-bookforest" },
      { text: "바다로 바로 뛰어들 수 있는 해상 빌라", target: "country-coral" }
    ]
  }
];
