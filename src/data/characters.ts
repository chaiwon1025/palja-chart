import type { CharacterProfile, CharacterType } from "@/lib/types";

export const characters: Record<CharacterType, CharacterProfile> = {
  "상승장 포식자": {
    type: "상승장 포식자",
    emoji: "🦈",
    rarity: 8,
    sajuIntro:
      "화(火)의 기운이 강하고\n행동력이 앞서는 일주입니다.\n\n사주적으로는\n상승 흐름에 올라타는 감각이 뛰어나\n빠르게 움직이는 자산과 궁합이 좋습니다.\n\n반면, 느리게 움직이는 자산에서는\n참을성이 바닥날 수 있는 기질입니다.",
    tagline: "초록색 캔들 3개 연속이면\n이미 풀매수 완료된 타입.",
    description:
      "상승장 냄새를 맡는 속도는 한국 개미 중 최상위권.\n남들이 \"오르네?\" 할 때 당신은 이미 수익 중입니다.\n\n문제는\n하락장에서도 \"이건 조정이야\"를 외치며\n내려올 생각을 안 한다는 것.",
    strength: "\"상승장 시작 5분 만에 탑승 완료 (안전벨트는 안 맴)\"",
    weakness: "\"하락장에서도 '조정일 뿐'이라며 버팀 (-30%까지 확인함)\"",
    hope: "상승장에서 계좌가 빛나는 천재",
    despair: "하락장에서 계좌가 사라지는 천재",
    verdict:
      "당신은 판이 열리면 누구보다 빠르게\n올라타는 타입입니다.\n\n문제는 내려야 할 때도\n\"아직 아니야\"를 외치고 있다는 것.\n\n타이밍 잘 잡으면 전설,\n못 잡으면 전설의 물타기.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 5, compatibility: "좋음", comment: "태어나서 이 시장을 만난 게 운명" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 4, compatibility: "좋음", comment: "나스닥 상승장에서 진가 발휘" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 3, compatibility: "무난", comment: "국장 상승장은 짧아서 체력이 안 맞을 수 있음" },
      { name: "ETF", emoji: "📊", attraction: 2, compatibility: "낮음", comment: "너무 느려서 졸음이 올 수 있음" },
      { name: "부동산", emoji: "🏠", attraction: 1, compatibility: "낮음", comment: "기다림이 필요한 건 체질에 안 맞음" },
      { name: "현금", emoji: "💵", attraction: 1, compatibility: "낮음", comment: "통장에 돈이 있으면 손이 근질근질" },
    ],
  },
  "존버 마스터": {
    type: "존버 마스터",
    emoji: "💎",
    rarity: 12,
    sajuIntro:
      "토(土)의 기운이 깊고\n인내심이 강한 일주입니다.\n\n사주적으로는\n장기적 안목과 흔들리지 않는 중심이 있어\n시간이 지날수록 빛나는 자산과 궁합이 좋습니다.\n\n적립식과 장기 보유가\n당신의 사주와 가장 잘 맞는 투자 방식입니다.",
    tagline: "-50% 찍어도 앱 삭제하고\n1년 뒤에 열어보는 타입.",
    description:
      "\"시간이 답이다\"를 입버릇처럼 말하는 타입.\n카톡 단톡방에서 누가 패닉셀 하면\n\"흔들리면 지는 거다\"를 복붙합니다.\n\n근데 솔직히\n친구가 단타로 300% 수익 인증하면\n살짝 손이 떨리긴 합니다.",
    strength: "\"폭락장에서 넷플릭스 보면서 존버 가능 (알림은 꺼둠)\"",
    weakness: "\"10년 후 100배 기다리다가 눈앞의 10배를 놓칠 수 있음\"",
    hope: "복리의 마법으로 조용히 부자 되는 사람",
    despair: "10년 존버했는데 원금인 사람",
    verdict:
      "당신은 시간을 무기로 삼는\n가장 정석적인 투자자입니다.\n\n근데 가끔은 생각해보세요.\n존버가 답이 아닐 때도 있다는 걸.\n\n그래도 멘탈만큼은\n이 세계관 최강입니다.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 3, compatibility: "무난", comment: "존버력은 되는데 코인이 버텨줄지가 문제" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 4, compatibility: "매우 좋음", comment: "S&P500 적립식은 당신을 위해 만들어짐" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 3, compatibility: "무난", comment: "삼성전자 장기 보유는 한국 투자자의 통과의례" },
      { name: "ETF", emoji: "📊", attraction: 4, compatibility: "매우 좋음", comment: "당신의 인내심과 ETF는 찰떡궁합" },
      { name: "부동산", emoji: "🏠", attraction: 3, compatibility: "좋음", comment: "20년 보유는 당신에게 껌" },
      { name: "현금", emoji: "💵", attraction: 2, compatibility: "낮음", comment: "현금으로 존버하면 인플레가 먹어버림" },
    ],
  },
  "코인 개척자": {
    type: "코인 개척자",
    emoji: "🪙",
    rarity: 7,
    sajuIntro:
      "수(水)의 기운이 흐르고\n변화를 두려워하지 않는 일주입니다.\n\n사주적으로는\n새로운 것에 대한 직감과 개척 정신이 강해\n아직 검증되지 않은 신규 자산과 궁합이 좋습니다.\n\n이미 모두가 아는 자산보다\n아무도 모르는 자산에서 빛나는 기질입니다.",
    tagline: "남들이 '그게 뭔데?' 할 때\n이미 사고 있는 타입.",
    description:
      "NFT, 디파이, AI 코인 전부 초기에 들어간 전적 있음.\n코인판에서 \"이거 아는 사람?\" 글 올리면\n이미 3일 전에 들어가 있는 사람.\n\n문제는\n남들이 관심 가지기 시작할 때\n이미 지쳐 있을 가능성도 있다는 것.",
    strength: "\"아무도 모르는 코인을 남들보다 6개월 먼저 삼 (자랑할 사람이 없음)\"",
    weakness: "\"그래서 6개월 동안 혼자 물려 있음 (커뮤니티에 글도 못 씀)\"",
    hope: "남들보다 먼저 100배 코인을 찾는 선구자",
    despair: "남들보다 먼저 -99% 코인을 찾는 선구자",
    verdict:
      "당신은 아무도 안 가본 길에\n먼저 발을 딛는 타입입니다.\n\n다음 큰 흐름을 잡을 수도 있지만\n그 흐름이 오기 전에\n지갑이 먼저 텅 빌 수도 있습니다.\n\n선구자와 선열사는 한 끗 차이.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 5, compatibility: "매우 좋음", comment: "이 시장이 당신을 기다리고 있었음" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 3, compatibility: "무난", comment: "신규 상장주면 관심 가질 수도" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 2, compatibility: "낮음", comment: "국장에서 새로운 건 잘 안 나와서 심심함" },
      { name: "ETF", emoji: "📊", attraction: 1, compatibility: "낮음", comment: "이미 있는 걸 사는 건 재미가 없음" },
      { name: "부동산", emoji: "🏠", attraction: 1, compatibility: "낮음", comment: "움직일 수 없는 자산은 답답함" },
      { name: "현금", emoji: "💵", attraction: 1, compatibility: "낮음", comment: "현금 들고 있으면 새 코인에 넣고 싶어짐" },
    ],
  },
  "변동성 중독자": {
    type: "변동성 중독자",
    emoji: "🎢",
    rarity: 9,
    sajuIntro:
      "화(火)와 금(金)이 충돌하는\n역동적인 일주입니다.\n\n사주적으로는\n움직임이 클수록 에너지가 올라가는 체질로\n변동성이 큰 자산과 궁합이 좋습니다.\n\n횡보하는 자산은 당신에게\n잠을 유발하는 수면제와 같습니다.",
    tagline: "횡보장이 제일 지루하고\n급등급락이 제일 재밌는 타입.",
    description:
      "차트가 요동칠 때 오히려 눈이 빛나는 당신.\n새벽 4시에 비트코인 차트 보다가\n출근 시간에 눈이 충혈된 적이 한두 번이 아닙니다.\n\n변동성은 위험이 아니라 재미라고 확신하는 중.\n수수료가 수익보다 많은 달이 가끔 있습니다.",
    strength: "\"급등급락에서 멘탈이 오히려 각성됨 (새벽 4시에 제일 맑음)\"",
    weakness: "\"거래 수수료만 모으면 차 한 대 뽑을 수 있음 (증권사 감사패 후보)\"",
    hope: "단타의 신이라 불리는 계좌 고수",
    despair: "증권사 수수료 수익에 기여하는 우량 고객",
    verdict:
      "당신은 시장이 요동칠수록\n오히려 살아있음을 느끼는 타입입니다.\n\n잘 타면 짜릿하지만\n잘못 타면 계좌가 녹는 속도도\n남들보다 빠릅니다.\n\n가끔은 쉬는 것도 트레이딩입니다.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 5, compatibility: "좋음", comment: "24시간 변동성은 당신의 놀이터" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 4, compatibility: "좋음", comment: "실적 시즌에 특히 신남" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 3, compatibility: "무난", comment: "동학개미 급등장에서 피가 끓을 타입" },
      { name: "ETF", emoji: "📊", attraction: 1, compatibility: "낮음", comment: "하루에 0.3% 움직이는 건 잠이 옴" },
      { name: "부동산", emoji: "🏠", attraction: 1, compatibility: "낮음", comment: "1년에 한 번 가격 바뀌는 건 참을 수 없음" },
      { name: "현금", emoji: "💵", attraction: 1, compatibility: "낮음", comment: "현금은 변동성이 0이라 관심 밖" },
    ],
  },
  "차트 분석 집착자": {
    type: "차트 분석 집착자",
    emoji: "🧠",
    rarity: 11,
    sajuIntro:
      "금(金)의 기운이 날카롭고\n분석력이 뛰어난 일주입니다.\n\n사주적으로는\n논리와 체계를 중시하는 성향이 강해\n재무제표와 데이터가 풍부한 자산과 궁합이 좋습니다.\n\n분석할 게 없는 자산은\n당신에게 불안감을 줄 수 있습니다.",
    tagline: "매수 전에 엑셀부터 여는 타입.\n감이 아니라 데이터로 투자합니다.",
    description:
      "PER, PBR, RSI, MACD...\n지표 안 보면 1원도 못 넣는 타입입니다.\n네이버 종목토론방에 분석글 올리면\n댓글보다 글이 더 긴 그런 사람.\n\n문제는\n분석하다가 타이밍을 놓치고\n\"역시 내 분석이 맞았어\"라고 혼자 위로하는 것.",
    strength: "\"감정에 흔들리지 않는 냉정한 투자 가능 (엑셀이 감정임)\"",
    weakness: "\"분석하다 타이밍 놓치고 '역시 내가 맞았어' 셀프 위로 (수익은 0원)\"",
    hope: "데이터로 시장을 이기는 주식 고수",
    despair: "분석만 100번 하고 매수는 0번인 사람",
    verdict:
      "당신은 숫자와 논리로\n무장한 이성적 투자자입니다.\n\n실수는 적지만\n기회도 적을 수 있습니다.\n\n가끔은 엑셀 닫고\n직감을 믿어보는 것도 방법입니다.\n(근데 아마 안 할 거죠?)",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 2, compatibility: "낮음", comment: "분석할 재무제표가 없어서 불안함" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 5, compatibility: "매우 좋음", comment: "10-K 보고서 읽는 게 취미인 당신에게 딱" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 4, compatibility: "좋음", comment: "하이닉스 실적 분석하다 밤샐 수 있음" },
      { name: "ETF", emoji: "📊", attraction: 3, compatibility: "좋음", comment: "백테스팅 결과가 깔끔하게 나옴" },
      { name: "부동산", emoji: "🏠", attraction: 3, compatibility: "무난", comment: "입지 분석 엑셀 시트 이미 만들어놨을 듯" },
      { name: "현금", emoji: "💵", attraction: 2, compatibility: "무난", comment: "분석 끝날 때까지 현금 보유 중" },
    ],
  },
  "트렌드 레이더": {
    type: "트렌드 레이더",
    emoji: "📡",
    rarity: 10,
    sajuIntro:
      "목(木)의 기운이 뻗어가고\n정보에 민감한 일주입니다.\n\n사주적으로는\n흐름을 읽는 촉이 발달해 있어\n화제성이 높은 자산과 궁합이 좋습니다.\n\n조용한 자산보다 시장에서\n이야기가 되는 자산에서 빛나는 기질입니다.",
    tagline: "카톡 단톡방에 링크 뜨면\n반사적으로 매수 앱 여는 타입.",
    description:
      "주식 카페에서 뜨는 종목을 가장 빠르게 캐치합니다.\n트위터 트렌딩이 곧 매수 신호라고 믿는 당신.\n\n정보 수집 속도는 빠른데\n그 정보가 이미 늦었을 때가 종종 있습니다.\n\n\"아 어제 봤는데\" 가 입버릇.",
    strength: "\"정보 수집 속도가 광속급 (판단 속도는 별개)\"",
    weakness: "\"그 정보가 이미 반영된 가격인 걸 매수 후에 앎\"",
    hope: "트렌드 초입에 올라타서 수익 대박",
    despair: "트렌드 꼭지에 올라타서 물려버림",
    verdict:
      "당신은 시장의 분위기를\n누구보다 빠르게 읽는 타입입니다.\n\n트렌드의 초입을 잡으면 대박이지만\n꼭지를 잡으면 장기 존버 시작.\n\n\"남들이 다 아는 정보\"와\n\"진짜 알파\"를 구분하는 눈을 키우세요.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 5, compatibility: "무난", comment: "밈코인 트렌드를 빠르게 포착" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 4, compatibility: "좋음", comment: "테마주 흐름 읽는 눈이 있음" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 3, compatibility: "무난", comment: "국장 테마주는 '이번엔 다르다'의 반복" },
      { name: "ETF", emoji: "📊", attraction: 2, compatibility: "낮음", comment: "트렌드가 없는 자산은 흥미가 없음" },
      { name: "부동산", emoji: "🏠", attraction: 1, compatibility: "낮음", comment: "부동산 트렌드는 너무 느림" },
      { name: "현금", emoji: "💵", attraction: 1, compatibility: "낮음", comment: "현금은 트렌드가 아니라 패스" },
    ],
  },
  "초기 투자 중독자": {
    type: "초기 투자 중독자",
    emoji: "🚀",
    rarity: 6,
    sajuIntro:
      "화(火)의 기운이 폭발적이고\n승부욕이 강한 일주입니다.\n\n사주적으로는\n큰 판을 벌이는 기질이 있어\n고위험 고수익 자산과 궁합이 좋습니다.\n\n안정적인 수익을 주는 자산은\n당신에게 지루함 그 자체입니다.",
    tagline: "10% 수익에는 관심 없고\n10배 수익만 꿈꾸는 타입.",
    description:
      "안정적인 수익? 그건 은행이나 하는 거라고 생각합니다.\n관심사는 오직 '다음 100배 종목'.\n\n포트폴리오가 롤러코스터인 게 자랑이고\n카톡 단톡방에 \"이번엔 진짜야\"를\n매달 올리고 있습니다.",
    strength: "\"남들이 무서워할 때 들어가는 배짱 (무모함과 종이 한 장 차이)\"",
    weakness: "\"손절 타이밍에 '조금만 더'를 외치다가 계좌가 조금만 더 줄어듦\"",
    hope: "한방에 인생이 바뀌는 투자 천재",
    despair: "한방에 계좌가 바뀌는 투자 용사",
    verdict:
      "당신은 작은 수익엔 눈도 안 가고\n큰 판만 벌이는 타입입니다.\n\n인생 한방은 진짜 올 수 있지만\n그 전에 계좌가 먼저\n한방 맞을 수도 있습니다.\n\n리스크 관리라는 단어,\n한번쯤 검색해보세요.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 5, compatibility: "좋음", comment: "100배의 꿈이 현실이 되는 곳" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 3, compatibility: "무난", comment: "IPO 첫날 매수 아니면 관심 없음" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 2, compatibility: "낮음", comment: "국장에서 10배는 전설에서나 나오는 이야기" },
      { name: "ETF", emoji: "📊", attraction: 1, compatibility: "낮음", comment: "연 10% 수익? 하품 나옴" },
      { name: "부동산", emoji: "🏠", attraction: 1, compatibility: "낮음", comment: "레버리지 없으면 재미없음" },
      { name: "현금", emoji: "💵", attraction: 1, compatibility: "낮음", comment: "현금은 기회비용이 아까움" },
    ],
  },
  "안전빵 수호자": {
    type: "안전빵 수호자",
    emoji: "🛡️",
    rarity: 14,
    sajuIntro:
      "토(土)의 기운이 두텁고\n안정을 추구하는 일주입니다.\n\n사주적으로는\n원금 보전 본능이 강하고\n실물 자산과 안전 자산에 궁합이 좋습니다.\n\n눈에 보이고 손에 잡히는 자산이\n당신에게 가장 큰 안정감을 줍니다.",
    tagline: "연 수익률 5%에 감사하고\n원금 손실이 세상에서 제일 무서운 타입.",
    description:
      "예금, 적금, 국채, 배당주.\n안전한 자산이 최고라는 신념의 소유자.\n\n직장 동료가 코인으로 차 바꿨다는 얘기 들어도\n\"그래 근데 세금은?\"이 먼저 나오는 타입.\n\n근데 인플레이션이 당신의 진짜 적입니다.",
    strength: "\"어떤 폭락장에서도 멘탈과 원금 모두 무사 (수익도 무사)\"",
    weakness: "\"물가가 오르는 속도보다 수익이 느림 (커피값이 매년 오르는 이유)\"",
    hope: "잃지 않는 투자로 조용히 부자 되는 사람",
    despair: "10년 모은 돈의 실질가치가 줄어든 사람",
    verdict:
      "당신은 잃지 않는 투자를\n최우선으로 하는 안전형 투자자입니다.\n\n계좌는 항상 평화롭지만\n가끔은 생각해보세요.\n\n안전한 곳에만 있으면\n인플레이션이 당신의 돈을\n조용히 먹고 있다는 걸.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 1, compatibility: "낮음", comment: "밤에 잠을 못 잘 확률 높음" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 2, compatibility: "무난", comment: "배당주 위주라면 괜찮음" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 3, compatibility: "무난", comment: "삼성전자 배당이라도 받으면 마음이 편함" },
      { name: "ETF", emoji: "📊", attraction: 4, compatibility: "좋음", comment: "분산 투자가 마음의 평화를 줌" },
      { name: "부동산", emoji: "🏠", attraction: 5, compatibility: "매우 좋음", comment: "눈에 보이는 자산이 제일 안심" },
      { name: "현금", emoji: "💵", attraction: 5, compatibility: "매우 좋음", comment: "통장 잔고 보는 게 제일 편안함" },
    ],
  },
  "균형 투자자": {
    type: "균형 투자자",
    emoji: "⚖️",
    rarity: 15,
    sajuIntro:
      "오행이 고르게 분포된\n조화로운 일주입니다.\n\n사주적으로는\n극단을 피하고 중용을 추구하는 성향으로\n다양한 자산에 골고루 분산하는 것이 가장 잘 맞습니다.\n\n한 곳에 몰빵하는 순간이\n당신의 사주적 균형이 무너지는 순간입니다.",
    tagline: "주식 60%, 채권 30%, 현금 10%.\n자산 배분의 정석을 실천하는 모범생.",
    description:
      "리밸런싱 날짜를 캘린더에 등록해둔 적이 있는 타입.\n포트폴리오가 이 세계관에서 가장 예쁩니다.\n\n근데 솔직히 말하면\n대박도 안 나고 쪽박도 안 나서\n가끔 심심합니다.\n\n연말에 수익률 정산하면 늘 \"무난하네\"가 나옴.",
    strength: "\"어떤 시장에서도 크게 안 잃는 안정감 (대신 크게 안 벌기도 함)\"",
    weakness: "\"어떤 시장에서도 크게 안 벌어서 연말 수익률 정산이 좀 심심함\"",
    hope: "균형 잡힌 포트폴리오로 안정적 성장",
    despair: "재미없는 수익률에 결국 코인에 손 대는 순간",
    verdict:
      "당신은 균형 잡힌 시각으로\n안정적인 성장을 추구하는 투자자입니다.\n\n큰 손실은 없지만\n큰 수익도 없어서\n가끔 유튜브 수익 인증 영상 보다가\n\"나도 한번...\" 하는 순간이 위험합니다.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 2, compatibility: "낮음", comment: "포트폴리오의 5%까지는 허용" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 4, compatibility: "좋음", comment: "핵심 자산으로 적합" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 3, compatibility: "무난", comment: "동학개미 정신으로 국장도 일부 배분" },
      { name: "ETF", emoji: "📊", attraction: 5, compatibility: "매우 좋음", comment: "당신의 영혼의 자산" },
      { name: "부동산", emoji: "🏠", attraction: 4, compatibility: "좋음", comment: "안정적 포트 구성에 딱" },
      { name: "현금", emoji: "💵", attraction: 3, compatibility: "무난", comment: "리밸런싱용 현금은 항상 확보" },
    ],
  },
  "매수 타이밍 헌터": {
    type: "매수 타이밍 헌터",
    emoji: "🎯",
    rarity: 8,
    sajuIntro:
      "금(金)과 수(水)의 기운이 만나\n날카로운 판단력을 가진 일주입니다.\n\n사주적으로는\n기다림의 미학을 아는 성향으로\n급락 후 반등하는 자산과 궁합이 좋습니다.\n\n타이밍이 핵심인 자산에서\n당신의 기질이 빛을 발합니다.",
    tagline: "평소엔 조용히 관망하다가\n확신이 오면 올인하는 타입.",
    description:
      "대부분의 시간은 지켜봅니다.\n네이버 증권 앱 켜놓고\n호가창만 한 시간씩 보는 게 일상.\n\n그리고 \"지금이다\" 싶으면\n망설임 없이 풀베팅.\n\n문제는 \"지금이다\" 싶었던 게\n\"지금이 아니었다\"인 경우도 꽤 있다는 것.",
    strength: "\"인내심과 결단력을 동시에 장착 (가끔 둘 다 오작동함)\"",
    weakness: "\"확신의 순간이 가끔 착각의 순간임 (뇌가 '지금이다' 버그 걸림)\"",
    hope: "한 방에 크게 먹는 저격수",
    despair: "한 방에 크게 맞는 저격수",
    verdict:
      "당신은 기다림의 가치를 아는\n타이밍 장인입니다.\n\n한 번의 매매로 큰 수익을 낼 수 있지만\n기다림이 너무 길어지면\n\"아 그냥 아무거나 살까\"가\n가장 위험한 순간입니다.",
    assets: [
      { name: "코인", emoji: "🪙", attraction: 4, compatibility: "좋음", comment: "급락 때 저점 매수 본능 발동" },
      { name: "미국주식", emoji: "🇺🇸", attraction: 5, compatibility: "매우 좋음", comment: "실적 발표 후 저격 매수 찬스" },
      { name: "국내주식", emoji: "🇰🇷", attraction: 4, compatibility: "좋음", comment: "하이닉스 급락 때 동학개미 정신 발동" },
      { name: "ETF", emoji: "📊", attraction: 2, compatibility: "무난", comment: "타이밍 잡기엔 움직임이 작음" },
      { name: "부동산", emoji: "🏠", attraction: 3, compatibility: "무난", comment: "급매 나오면 바로 결단 가능" },
      { name: "현금", emoji: "💵", attraction: 2, compatibility: "낮음", comment: "기회 올 때까지 현금 대기 중" },
    ],
  },
};
