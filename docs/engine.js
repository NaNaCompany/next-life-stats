export const KEYS=['health','luck','social','focus'];
export const LABELS={health:'체력',luck:'행운',social:'사교',focus:'집중'};
export const SCENARIO='NANA-003-A';
export const EVENTS=[
 {name:'첫 출근의 계단',weights:{health:2,focus:1},threshold:70,rule:'체력 × 2 + 집중 ≥ 70',win:'가뿐히 출근, 동료에게 첫인상을 남겼다.',lose:'숨을 고르며 도착, 느긋한 하루를 골랐다.'},
 {name:'낯선 도시의 초대',weights:{social:2,luck:1},threshold:70,rule:'사교 × 2 + 행운 ≥ 70',win:'새 친구가 생겼다. 도시가 조금 가까워졌다.',lose:'혼자 산책하다 단골 카페를 발견했다.'},
 {name:'오래된 상자의 비밀',weights:{luck:2,focus:1},threshold:80,rule:'행운 × 2 + 집중 ≥ 80',win:'상자 속 작은 보물을 발견했다.',lose:'보물은 없었지만 근사한 기록장을 얻었다.'},
 {name:'미완성의 프로젝트',weights:{focus:2,health:1},threshold:70,rule:'집중 × 2 + 체력 ≥ 70',win:'끝까지 완성했다. 나만의 작품이 남았다.',lose:'다음 계절을 위해 아이디어를 남겨 두었다.'},
 {name:'새 출발의 갈림길',weights:{health:1,luck:1,social:1,focus:2},threshold:130,rule:'체력 + 행운 + 사교 + 집중 × 2 ≥ 130',win:'준비된 용기로 새로운 길을 열었다.',lose:'익숙한 곳에서 나만의 평온을 찾았다.'}
];
export function validate(stats){return KEYS.every(k=>Number.isInteger(stats[k])&&stats[k]>=0&&stats[k]<=100&&stats[k]%10===0)&&KEYS.reduce((s,k)=>s+stats[k],0)===100;}
export function simulate(stats){if(!validate(stats))throw new RangeError('4개 능력을 10점 단위로 합계 100점 배분해 주세요.');const events=EVENTS.map(e=>{const value=Object.entries(e.weights).reduce((s,[k,w])=>s+stats[k]*w,0),success=value>=e.threshold;return {...e,value,success,story:success?e.win:e.lose};});const passed=events.filter(e=>e.success).length;const strongest=KEYS.reduce((a,b)=>stats[a]>=stats[b]?a:b);const titles={health:'끝까지 걷는 개척자의 생',luck:'우연을 기회로 바꾸는 생',social:'사람과 사람을 잇는 생',focus:'작은 것을 완성하는 생'};return {scenario:SCENARIO,events,passed,title:titles[strongest],stats:{...stats}};}
