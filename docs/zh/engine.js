export const KEYS=['health','luck','social','focus'];
export const LABELS={health:'体力',luck:'运气',social:'社交',focus:'专注'};
export const SCENARIO='NANA-003-A';
export const EVENTS=[
 {name:'工作的第一步',weights:{health:2,focus:1},threshold:70,rule:'体力 × 2 + 专注 ≥ 70',win:'我轻松地上班，给同事留下了第一印象。.',lose:'喘着气到达，选了一个悠闲的日子。.'},
 {name:'来自陌生城市的邀请',weights:{social:2,luck:1},threshold:70,rule:'社交 × 2 + 运气 ≥ 70',win:'我有了一个新朋友。这座城市又近了一些.',lose:'独自散步时，我发现了我最喜欢的咖啡馆。.'},
 {name:'旧盒子的秘密',weights:{luck:2,focus:1},threshold:80,rule:'运气 × 2 + 专注 ≥ 80',win:'我在盒子里发现了一个小宝贝.',lose:'没有宝藏，但我得到了一本很好的记录本。.'},
 {name:'未完成的项目',weights:{focus:2,health:1},threshold:70,rule:'专注 × 2 + 体力 ≥ 70',win:'直至最后完成。我自己的作品依然存在.',lose:'为下一季保留想法.'},
 {name:'新起点的十字路口',weights:{health:1,luck:1,social:1,focus:2},threshold:130,rule:'耐力+运气+社交+专注 × 2 ≥ 130',win:'以有准备的勇气开辟新路.',lose:'我在熟悉的地方找到了属于自己的平静.'}
];
export function validate(stats){return KEYS.every(k=>Number.isInteger(stats[k])&&stats[k]>=0&&stats[k]<=100&&stats[k]%10===0)&&KEYS.reduce((s,k)=>s+stats[k],0)===100;}
export function simulate(stats){if(!validate(stats))throw new RangeError('4请以 10 分为增量分配狗的能力，总共 100 分。.');const events=EVENTS.map(e=>{const value=Object.entries(e.weights).reduce((s,[k,w])=>s+stats[k]*w,0),success=value>=e.threshold;return {...e,value,success,story:success?e.win:e.lose};});const passed=events.filter(e=>e.success).length;const strongest=KEYS.reduce((a,b)=>stats[a]>=stats[b]?a:b);const titles={health:'走到最后的拓荒者的一生',luck:'生活将巧合变成机遇',social:'将人们联系在一起的生活',focus:'完成小事的生活'};return {scenario:SCENARIO,events,passed,title:titles[strongest],stats:{...stats}};}
