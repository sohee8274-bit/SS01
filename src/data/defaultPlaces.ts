import { VisitedPlace } from "../types";

export const DEFAULT_VISITED_PLACES: VisitedPlace[] = [
  // 1. 내 여행지 (대한민국 서울 성수)
  {
    id: "place-1",
    countryName: "대한민국",
    countryEmoji: "🇰🇷",
    authorName: "나 (김은하)",
    isOtherTraveler: false,
    name: "성수 대림창고 앤 갤러리",
    category: "cafe",
    categoryLabel: "감성카페",
    rating: 5,
    visitDate: "2026.08.14",
    address: "서울 성동구 성수이로 78",
    cityArea: "서울 성수",
    lat: 37.5418,
    lng: 127.0560,
    notes: "붉은 벽돌과 자연광이 쏟아지는 감성적인 갤러리 카페. 시그니처 플랫화이트와 바닐라 타르트가 일품이었음. 주말엔 20분 정도 웨이팅 발생.",
    mustTryOrHighlight: "시그니처 플랫화이트 & 크림치즈 무화과 타르트",
    tags: ["성수핫플", "갤러리카페", "힙플레이스", "포토존"],
    priceRange: "음료 6,000 ~ 9,000원",
    likes: 24,
    createdAt: "2026.08.14",
    photos: [
      {
        id: "photo-1-1",
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
        caption: "자연광 쏟아지는 대형 아치형 창가와 커피 한 잔",
        takenAt: "2026.08.14 15:20"
      },
      {
        id: "photo-1-2",
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
        caption: "인더스트리얼 인테리어와 조형물 전시",
        takenAt: "2026.08.14 15:45"
      }
    ],
    transportGuide: {
      originName: "강남역 2호선",
      destinationName: "성수 대림창고",
      transit: {
        totalDurationMinutes: 24,
        transferCount: 0,
        summary: "지하철 2호선 직통 (강남역 → 성수역)",
        steps: [
          {
            type: "subway",
            lineOrRoute: "2호선 (외선순환)",
            departureName: "강남역 승차",
            arrivalName: "성수역 하차",
            durationMinutes: 18,
            instruction: "강남역에서 2호선 탑승 후 성수역까지 8개 역 이동 (빠른 하차 4-2번 문)",
            color: "#10b981"
          },
          {
            type: "walk",
            durationMinutes: 6,
            instruction: "성수역 3번 출구 나와서 성수이로 방면 직진 320m 도보",
            color: "#6b7280"
          }
        ],
        fareEstimate: "1,400원 (교통카드)",
        tips: "성수역 3번 출구 에스컬레이터 이용 후 카페거리 골목으로 진입하면 골목 아트월 감상 가능"
      },
      taxi: {
        durationMinutes: 19,
        estimatedFare: "약 11,800원 ~ 13,500원",
        trafficStatus: "moderate",
        tollFee: "통행료 없음",
        tips: "영동대교 북단 진입 시 퇴근시간(17~19시)에는 올림픽대로 합류로 10분 지연될 수 있음"
      },
      walkingOrBike: {
        durationMinutes: 28,
        distanceKm: 6.8,
        calories: 195,
        routeHint: "따릉이 대여 시 한강 자전거도로 경유하여 성수동 진입 추천"
      }
    }
  },
  // 2. 내 여행지 (대한민국 제주 애월)
  {
    id: "place-2",
    countryName: "대한민국",
    countryEmoji: "🇰🇷",
    authorName: "나 (김은하)",
    isOtherTraveler: false,
    name: "제주 애월 우니담 & 해녀의집",
    category: "restaurant",
    categoryLabel: "음식점",
    rating: 5,
    visitDate: "2026.07.22",
    address: "제주 제주시 애월읍 애월로 86",
    cityArea: "제주 애월",
    lat: 33.4623,
    lng: 126.3110,
    notes: "바다 뷰가 파노라마로 펼쳐지는 통창 앞에서 성게비빔밥과 옥돔구이를 즐김. 해질녘 노을이 말도 안 되게 황홀함.",
    mustTryOrHighlight: "생성게 미역국 정식 & 우니 비빔밥",
    tags: ["애월맛집", "오션뷰식당", "제주로컬푸드", "인생선셋"],
    priceRange: "1인 25,000 ~ 35,000원",
    likes: 42,
    createdAt: "2026.07.22",
    photos: [
      {
        id: "photo-2-1",
        url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
        caption: "창가 석에서 바라보는 에메랄드빛 애월 바다와 한 상 차림",
        takenAt: "2026.07.22 17:30"
      },
      {
        id: "photo-2-2",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
        caption: "식사 후 걸었던 한담해변 산책로의 핑크빛 노을",
        takenAt: "2026.07.22 19:10"
      }
    ],
    transportGuide: {
      originName: "제주국제공항 1층 2번 게이트",
      destinationName: "애월 한담동 정류장",
      transit: {
        totalDurationMinutes: 48,
        transferCount: 0,
        summary: "공항 급행버스 102번 or 간선 202번 직통",
        steps: [
          {
            type: "bus",
            lineOrRoute: "급행 102번 (서일주 노선)",
            departureName: "제주공항(구제주방면)",
            arrivalName: "애월리마을 환승정류장",
            durationMinutes: 38,
            instruction: "공항 1층 2번 게이트 정류장에서 102번 탑승, 5개 정류장 후 하차",
            color: "#ef4444"
          },
          {
            type: "walk",
            durationMinutes: 10,
            instruction: "한담해변 산책로 방향으로 내리막길 도보 500m 이동",
            color: "#6b7280"
          }
        ],
        fareEstimate: "2,000원 (급행 기본요금)",
        tips: "공항에서 102번 배차간격이 25분이므로 카카오버스 앱으로 도착 정보 미리 확인 추천"
      },
      taxi: {
        durationMinutes: 28,
        estimatedFare: "약 21,500원 ~ 24,000원",
        trafficStatus: "smooth",
        tollFee: "없음",
        tips: "제주공항 장거리 택시 승강장 이용. 일주서로(평화로) 경유 요청 시 막힘없이 쾌적 이동"
      },
      walkingOrBike: {
        durationMinutes: 65,
        distanceKm: 18.2,
        calories: 420,
        routeHint: "해안도로 바이크 투어로 최고의 풍경을 즐길 수 있음 (전동바이크 추천)"
      }
    }
  },
  // 3. 내 여행지 (대한민국 부산 해운대)
  {
    id: "place-3",
    countryName: "대한민국",
    countryEmoji: "🇰🇷",
    authorName: "나 (김은하)",
    isOtherTraveler: false,
    name: "해운대 오션 프라이빗 풀빌라",
    category: "stay",
    categoryLabel: "숙소",
    rating: 5,
    visitDate: "2026.06.10",
    address: "부산 해운대구 달맞이길 117",
    cityArea: "부산 해운대",
    lat: 35.1595,
    lng: 129.1765,
    notes: "달맞이길 언덕에서 해운대 해변과 광안대교가 한눈에 들어오는 독채 테라스 풀빌라. 밤에 미온수 인피니티 풀에서 야경 보며 힐링함.",
    mustTryOrHighlight: "루프탑 프라이빗 온수풀 & 조식 브런치 바구니",
    tags: ["해운대숙소", "달맞이길", "인피니티풀", "오션뷰감성숙소"],
    priceRange: "1박 350,000 ~ 480,000원",
    likes: 31,
    createdAt: "2026.06.10",
    photos: [
      {
        id: "photo-3-1",
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
        caption: "바다와 맞닿은 인피니티 풀에서의 야경",
        takenAt: "2026.06.10 20:45"
      },
      {
        id: "photo-3-2",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        caption: "화이트 톤과 우드가 조화로운 침실과 햇살",
        takenAt: "2026.06.11 08:30"
      }
    ],
    transportGuide: {
      originName: "부산역 KTX 1번 출구",
      destinationName: "해운대 달맞이길 숙소",
      transit: {
        totalDurationMinutes: 52,
        transferCount: 1,
        summary: "지하철 1호선 서면역 환승 → 2호선 중동역/장산역",
        steps: [
          {
            type: "subway",
            lineOrRoute: "부산 1호선 (노포행)",
            departureName: "부산역",
            arrivalName: "서면역 (환승)",
            durationMinutes: 12,
            instruction: "부산역에서 1호선 탑승 후 서면역에서 2호선 장산행으로 환승",
            color: "#f59e0b"
          },
          {
            type: "transfer",
            durationMinutes: 4,
            instruction: "서면역 지하 2층 환승통로를 통해 2호선 3번 플랫폼으로 이동",
            color: "#6b7280"
          },
          {
            type: "subway",
            lineOrRoute: "부산 2호선 (장산행)",
            departureName: "서면역",
            arrivalName: "중동역",
            durationMinutes: 26,
            instruction: "2호선 탑승 후 중동역 하차 (7번 출구)",
            color: "#10b981"
          },
          {
            type: "bus",
            lineOrRoute: "마을버스 해운대구2",
            departureName: "중동역 정류장",
            arrivalName: "달맞이길 어울마당",
            durationMinutes: 8,
            instruction: "마을버스 승차 후 언덕 3개 정류장 이동",
            color: "#3b82f6"
          }
        ],
        fareEstimate: "1,600원 (교통카드 환승무료 적용)",
        tips: "캐리어가 무거우면 중동역에서 택시 타면 기본요금(4,800원) 수준으로 편하게 이동 가능"
      },
      taxi: {
        durationMinutes: 32,
        estimatedFare: "약 19,000원 ~ 22,000원",
        trafficStatus: "moderate",
        tollFee: "광안대교 이용 시 1,000원",
        tips: "기사님께 '광안대교 상층 경유' 요청하면 광안대교 바다 위 질주하며 환상적인 뷰 관람"
      },
      walkingOrBike: {
        durationMinutes: 35,
        distanceKm: 4.2,
        calories: 140,
        routeHint: "해운대 해변 백사장을 따라 미포 철길 거쳐 달맞이 언덕 도보 산책로 코스 강추"
      }
    }
  },
  // 4. 내 여행지 (대한민국 강원 강릉)
  {
    id: "place-4",
    countryName: "대한민국",
    countryEmoji: "🇰🇷",
    authorName: "나 (김은하)",
    isOtherTraveler: false,
    name: "강릉 아르떼뮤지엄 & 허균허난설헌 기념공원",
    category: "attraction",
    categoryLabel: "관광지",
    rating: 5,
    visitDate: "2026.05.02",
    address: "강원 강릉시 난설헌로 131",
    cityArea: "강원 강릉",
    lat: 37.7915,
    lng: 128.9180,
    notes: "몰입형 미디어아트 전시관. '빛과 소리의 폭포'와 '파도' 공간에서 인생 사진 100장 건짐! 바로 옆 소나무 숲길 산책도 최고였음.",
    mustTryOrHighlight: "빛의 바다(WAVE) 전시관 & TEA BAR 특제 밀크티",
    tags: ["미디어아트", "강릉여행", "인생샷명소", "실내데이트"],
    priceRange: "성인 입장료 17,000원",
    likes: 38,
    createdAt: "2026.05.02",
    photos: [
      {
        id: "photo-4-1",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
        caption: "화려한 오로라 미디어아트 터널 속 실루엣",
        takenAt: "2026.05.02 14:15"
      },
      {
        id: "photo-4-2",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
        caption: "허균허난설헌 생가터의 청량한 솔숲 바람",
        takenAt: "2026.05.02 16:30"
      }
    ],
    transportGuide: {
      originName: "강릉역 KTX 정문",
      destinationName: "아르떼뮤지엄 강릉",
      transit: {
        totalDurationMinutes: 22,
        transferCount: 0,
        summary: "시내버스 202-1번 or 202-2번 직통",
        steps: [
          {
            type: "bus",
            lineOrRoute: "시내 202-1번 (경포방면)",
            departureName: "강릉역 건너편 버스정류장",
            arrivalName: "난설헌삼거리 정류장",
            durationMinutes: 16,
            instruction: "강릉역 1번 출구 건너편에서 202-1번 탑승 후 7개 정류장 이동",
            color: "#3b82f6"
          },
          {
            type: "walk",
            durationMinutes: 5,
            instruction: "정류장 하차 후 아르떼뮤지엄 대형 주차장 방면으로 250m 도보",
            color: "#6b7280"
          }
        ],
        fareEstimate: "1,400원 (교통카드)",
        tips: "주말에는 아르떼뮤지엄 입구 주차 차량이 많아 버스나 택시로 인근 하차 후 걸어가는 것이 훨씬 빠름"
      },
      taxi: {
        durationMinutes: 10,
        estimatedFare: "약 6,500원 ~ 7,500원",
        trafficStatus: "smooth",
        tollFee: "없음",
        tips: "강릉역 택시 승강장에서 탑승 시 10분 이내 도착하며 일행 2인 이상이면 버스보다 택시가 효율적"
      },
      walkingOrBike: {
        durationMinutes: 18,
        distanceKm: 3.9,
        calories: 110,
        routeHint: "강릉 경포호수 둘레길 자전거 전용도로 타고 달리면 힐링 그 자체"
      }
    }
  },

  // 5. 타인의 여행지: [일본] 도쿄 시부야 야키니쿠 & 스카이 전망대 (등록자: 여행자 타쿠야)
  {
    id: "place-other-1",
    countryName: "일본",
    countryEmoji: "🇯🇵",
    authorName: "도쿄 미식가 타쿠야",
    isOtherTraveler: true,
    name: "시부야 스카이 전망대 & 파르코 야키니쿠",
    category: "attraction",
    categoryLabel: "관광지",
    rating: 5,
    visitDate: "2026.04.18",
    address: "2 Chome-24-12 Shibuya, Tokyo 150-0002, Japan",
    cityArea: "도쿄 시부야",
    lat: 35.6595,
    lng: 139.7005,
    notes: "지상 229m 루프탑에서 360도로 펼쳐지는 도쿄 파노라마 뷰와 스크램블 교차로를 내려다보는 압도적인 경관. 일몰 시간대 티켓은 4주 전 사전예약 필수!",
    mustTryOrHighlight: "스카이 엣지(코너 포토존) & 지하 1층 카오스 키친 와규 야키니쿠",
    tags: ["도쿄핫플", "시부야스카이", "야경성지", "일본여행", "인생전망대"],
    priceRange: "전망대 입장권 2,200엔 / 식사 3,500엔~",
    likes: 89,
    createdAt: "2026.04.18",
    photos: [
      {
        id: "photo-ot-1-1",
        url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
        caption: "시부야 스카이 루프탑에서 바라본 도쿄 타워와 일몰",
        takenAt: "2026.04.18 18:20"
      },
      {
        id: "photo-ot-1-2",
        url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80",
        caption: "화려한 네온사인으로 빛나는 밤의 시부야 스크램블 교차로",
        takenAt: "2026.04.18 20:10"
      }
    ],
    transportGuide: {
      originName: "하네다 공항 제3터미널",
      destinationName: "시부야 스크램블 스퀘어",
      transit: {
        totalDurationMinutes: 36,
        transferCount: 1,
        summary: "케이큐선 시나가와역 환승 → JR 야마노테선 시부야역",
        steps: [
          {
            type: "subway",
            lineOrRoute: "케이큐 공항선 쾌속",
            departureName: "하네다공항 제3터미널역",
            arrivalName: "시나가와역",
            durationMinutes: 16,
            instruction: "케이큐선 탑승 후 시나가와역에서 JR 야마노테선으로 환승",
            color: "#dc2626"
          },
          {
            type: "transfer",
            durationMinutes: 3,
            instruction: "시나가와역 환승 게이트를 거쳐 JR 2번 승강장으로 이동",
            color: "#6b7280"
          },
          {
            type: "subway",
            lineOrRoute: "JR 야마노테선 (시부야/신주쿠 방면)",
            departureName: "시나가와역",
            arrivalName: "시부야역",
            durationMinutes: 13,
            instruction: "야마노테선 탑승 후 시부야역 하차, 지하 직통 연결통로 이용",
            color: "#84cc16"
          },
          {
            type: "walk",
            durationMinutes: 4,
            instruction: "시부야 스크램블 스퀘어 전용 고속 엘리베이터 탑승하여 14층 매표소 이동",
            color: "#6b7280"
          }
        ],
        fareEstimate: "580엔 (Suica/Pasmo IC카드)",
        tips: "시부야역 복잡할 땐 B6번 지하 출구 표지판을 따라가면 엘리베이터로 비 안 맞고 직결"
      },
      taxi: {
        durationMinutes: 30,
        estimatedFare: "약 8,500엔 ~ 9,800엔",
        trafficStatus: "moderate",
        tollFee: "수도고속도로 톨비 약 1,100엔",
        tips: "도쿄 택시는 자동문이므로 문을 직접 열지 마세요. GO 앱으로 호출 시 영어 주소 지원"
      },
      walkingOrBike: {
        durationMinutes: 45,
        distanceKm: 3.2,
        calories: 130,
        routeHint: "하라주쿠 캣스트리트에서 쇼핑하며 시부야까지 걸어오는 코스 추천"
      }
    }
  },

  // 6. 타인의 여행지: [프랑스] 파리 몽마르트르 언덕 & 로컬 비스트로 (등록자: 파리지앵 소피)
  {
    id: "place-other-2",
    countryName: "프랑스",
    countryEmoji: "🇫🇷",
    authorName: "파리지앵 소피",
    isOtherTraveler: true,
    name: "사크레쾨르 대성당 & 몽마르트르 와인 비스트로",
    category: "restaurant",
    categoryLabel: "음식점",
    rating: 5,
    visitDate: "2026.03.29",
    address: "35 Rue du Chevalier de la Barre, 75018 Paris, France",
    cityArea: "파리 몽마르트르",
    lat: 48.8867,
    lng: 2.3431,
    notes: "파리 시내가 한눈에 내려다보이는 몽마르트르 정상. 거리 악사의 아코디언 연주를 들으며 갓 구운 바게트와 에스카르고, 보르도 와인을 곁들인 낭만적인 저녁.",
    mustTryOrHighlight: "부르고뉴식 에스카르고 달팽이 요리 & 오리 콩피",
    tags: ["파리감성", "몽마르트르", "프랑스와인", "로컬비스트로", "사크레쾨르"],
    priceRange: "코스 1인 38~55유로",
    likes: 67,
    createdAt: "2026.03.29",
    photos: [
      {
        id: "photo-ot-2-1",
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
        caption: "하얀 사크레쾨르 대성당 앞 계단과 파리 시내 전경",
        takenAt: "2026.03.29 17:00"
      },
      {
        id: "photo-ot-2-2",
        url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=80",
        caption: "야외 테라스에서 즐긴 와인과 전통 프렌치 디너",
        takenAt: "2026.03.29 19:40"
      }
    ],
    transportGuide: {
      originName: "파리 북역 (Gare du Nord)",
      destinationName: "사크레쾨르 사원 푸니쿨라",
      transit: {
        totalDurationMinutes: 18,
        transferCount: 0,
        summary: "메트로 2호선 직통 (앙베르역 하차)",
        steps: [
          {
            type: "subway",
            lineOrRoute: "파리 메트로 2호선 (Porte Dauphine 방면)",
            departureName: "Anvers(앙베르)역",
            arrivalName: "Funiculaire de Montmartre",
            durationMinutes: 10,
            instruction: "앙베르역 하차 후 Rue de Steinkerque 기념품 골목을 따라 언덕 진입",
            color: "#2563eb"
          },
          {
            type: "walk",
            durationMinutes: 8,
            instruction: "계단 또는 나비고 카드로 이용 가능한 푸니쿨라 케이블카 탑승",
            color: "#6b7280"
          }
        ],
        fareEstimate: "2.15유로 (Ticket t+)",
        tips: "계단 오를 때 실팔찌 강매단이 다가오면 단호하게 'Non, merci'라고 말하고 지나가세요"
      },
      taxi: {
        durationMinutes: 15,
        estimatedFare: "약 16~22유로 (Bolt / Uber)",
        trafficStatus: "moderate",
        tollFee: "없음",
        tips: "몽마르트르 골목은 일방통행이 많으므로 사크레쾨르 사원 아래 광장 쪽에서 하차 추천"
      },
      walkingOrBike: {
        durationMinutes: 25,
        distanceKm: 1.8,
        calories: 90,
        routeHint: "물랭루즈에서 아멜리에 카페를 거쳐 올라가는 감성 도보 코스"
      }
    }
  },

  // 7. 타인의 여행지: [이탈리아] 로마 트레비 분수 & 젤라토 (등록자: 여행작가 마르코)
  {
    id: "place-other-3",
    countryName: "이탈리아",
    countryEmoji: "🇮🇹",
    authorName: "여행작가 마르코",
    isOtherTraveler: true,
    name: "트레비 분수 & 100년 전통 피스타치오 젤라토",
    category: "cafe",
    categoryLabel: "감성카페",
    rating: 5,
    visitDate: "2026.02.14",
    address: "Piazza di Trevi, 00187 Roma RM, Italy",
    cityArea: "로마 트레비",
    lat: 41.9009,
    lng: 12.4833,
    notes: "동전을 등 뒤로 던져 다시 로마에 오기를 소원함. 분수 바로 앞 골목의 장인이 만든 진한 피스타치오 & 리조(쌀) 젤라토는 인생 최고의 맛!",
    mustTryOrHighlight: "수제 피스타치오 & 리조(쌀) 콘 젤라토 (휘핑크림 듬뿍)",
    tags: ["로마여행", "트레비분수", "이탈리아젤라토", "인생디저트", "소원명소"],
    priceRange: "젤라토 미디엄 콘 4~5유로",
    likes: 95,
    createdAt: "2026.02.14",
    photos: [
      {
        id: "photo-ot-3-1",
        url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80",
        caption: "청록빛 물결이 쏟아지는 트레비 분수의 웅장한 바로크 조각상",
        takenAt: "2026.02.14 11:20"
      },
      {
        id: "photo-ot-3-2",
        url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1000&q=80",
        caption: "생크림을 얹은 달콤한 이탈리안 전통 수제 젤라토",
        takenAt: "2026.02.14 12:05"
      }
    ],
    transportGuide: {
      originName: "로마 테르미니역 (Roma Termini)",
      destinationName: "트레비 분수 (Fontana di Trevi)",
      transit: {
        totalDurationMinutes: 14,
        transferCount: 0,
        summary: "메트로 A선 직통 (바르베리니역 하차 후 도보)",
        steps: [
          {
            type: "subway",
            lineOrRoute: "로마 지하철 A선 (Battistini 방면)",
            departureName: "Termini역",
            arrivalName: "Barberini역",
            durationMinutes: 4,
            instruction: "테르미니역에서 A선 탑승 후 2개 역 이동 (Barberini역 하차)",
            color: "#f97316"
          },
          {
            type: "walk",
            durationMinutes: 8,
            instruction: "바르베리니 광장에서 Via del Tritone 거리 따라 도보 500m 직진",
            color: "#6b7280"
          }
        ],
        fareEstimate: "1.50유로 (100분 유효 1회권)",
        tips: "트레비 분수는 아침 8시 이전 또는 밤 11시 이후 방문 시 사람이 없어 사진 찍기 최고"
      },
      taxi: {
        durationMinutes: 10,
        estimatedFare: "약 9~14유로 (FreeNow 앱 추천)",
        trafficStatus: "moderate",
        tollFee: "없음",
        tips: "로마 도심은 ZTL(교통제한구역)이 있으므로 공인 택시(흰색)만 통과 가능합니다"
      },
      walkingOrBike: {
        durationMinutes: 20,
        distanceKm: 1.5,
        calories: 75,
        routeHint: "테르미니역에서 퀴리날레 궁전 언덕을 거쳐 트레비로 내려오는 산책 코스"
      }
    }
  },

  // 8. 타인의 여행지: [스위스] 인터라켄 그린델발트 감성 샬레 (등록자: 알프스 하이커 민지)
  {
    id: "place-other-4",
    countryName: "스위스",
    countryEmoji: "🇨🇭",
    authorName: "알프스 하이커 민지",
    isOtherTraveler: true,
    name: "그린델발트 아이거뷰 우드 샬레 & 퐁뒤 레스토랑",
    category: "stay",
    categoryLabel: "숙소",
    rating: 5,
    visitDate: "2026.01.19",
    address: "Dorfstrasse 110, 3818 Grindelwald, Switzerland",
    cityArea: "스위스 그린델발트",
    lat: 46.6242,
    lng: 8.0414,
    notes: "테라스 창문을 열면 거대한 아이거 북벽이 눈앞에 가득 차는 꿈같은 전통 목조 샬레. 테라스에서 눈 덮인 설산을 보며 스위스 치즈 퐁뒤를 끓여 먹었음.",
    mustTryOrHighlight: "스위스 그뤼에르 치즈 퐁뒤 & 뢰스티, 테라스 모닝 커피",
    tags: ["스위스여행", "아이거북벽", "그린델발트", "전통샬레", "알프스힐링"],
    priceRange: "1박 380~550 CHF",
    likes: 112,
    createdAt: "2026.01.19",
    photos: [
      {
        id: "photo-ot-4-1",
        url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
        caption: "테라스에서 직관하는 만년설 덮인 웅장한 알프스 아이거 북벽",
        takenAt: "2026.01.19 09:15"
      },
      {
        id: "photo-ot-4-2",
        url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80",
        caption: "아늑한 원목 난로와 따스한 조명이 감도는 샬레 거실",
        takenAt: "2026.01.19 19:30"
      }
    ],
    transportGuide: {
      originName: "취리히 공항역 (Zurich Flughafen)",
      destinationName: "그린델발트 기차역",
      transit: {
        totalDurationMinutes: 160,
        transferCount: 2,
        summary: "스위스 패스 SBB 열차 (취리히 → 베른 → 인터라켄 동역 → 그린델발트)",
        steps: [
          {
            type: "subway",
            lineOrRoute: "SBB IC8 열차",
            departureName: "Zurich Flughafen",
            arrivalName: "Bern(베른역 환승)",
            durationMinutes: 70,
            instruction: "공항 지하역에서 베른행 고속열차 탑승",
            color: "#dc2626"
          },
          {
            type: "transfer",
            durationMinutes: 8,
            instruction: "베른역에서 인터라켄 동역(Interlaken Ost) 행 플랫폼으로 이동",
            color: "#6b7280"
          },
          {
            type: "subway",
            lineOrRoute: "BOB 산악 톱니바퀴 열차",
            departureName: "Interlaken Ost",
            arrivalName: "Grindelwald 역",
            durationMinutes: 34,
            instruction: "인터라켄 동역 2B 플랫폼에서 그린델발트 방향 열차 탑승",
            color: "#eab308"
          },
          {
            type: "walk",
            durationMinutes: 5,
            instruction: "그린델발트 역 출구에서 마을 중심 도르프 거리 도보 300m 이동",
            color: "#6b7280"
          }
        ],
        fareEstimate: "스위스 트래블 패스 무료 / 개별권 약 82 CHF",
        tips: "인터라켄 동역에서 열차가 둘로 나뉘므로 열차 외벽의 'Grindelwald' 표기를 꼭 확인하세요"
      },
      taxi: {
        durationMinutes: 25,
        estimatedFare: "인터라켄 기준 약 65~80 CHF",
        trafficStatus: "smooth",
        tollFee: "비네트 적용",
        tips: "스위스 산악 지대는 기차가 훨씬 정확하고 풍경이 압도적으로 아름답습니다"
      },
      walkingOrBike: {
        durationMinutes: 60,
        distanceKm: 4.5,
        calories: 220,
        routeHint: "피르스트(First) 전망대 바흐알프제 호수 하이킹 코스 필수 추천"
      }
    }
  }
];

