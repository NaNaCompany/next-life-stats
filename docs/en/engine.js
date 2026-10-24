export const KEYS=['health','luck','social','focus'];
export const LABELS={health:'Stamina',luck:'Luck',social:'Social skills',focus:'Focus'};
export const SCENARIO='NANA-003-A';
export const EVENTS=[
 {name:'first steps to work',weights:{health:2,focus:1},threshold:70,rule:'Stamina × 2 + Focus ≥ 70',win:'I went to work easily and left a first impression on my colleagues.',lose:'Arrived while catching my breath and chose a leisurely day.'},
 {name:'invitation from a strange city',weights:{social:2,luck:1},threshold:70,rule:'Social skills × 2 + Luck ≥ 70',win:'I got a new friend. The city got a little closer.',lose:'While taking a walk alone, I found my favorite cafe.'},
 {name:'secret of the old box',weights:{luck:2,focus:1},threshold:80,rule:'Luck × 2 + Focus ≥ 80',win:'I found a little treasure in the box.',lose:'There was no treasure, but I got a nice record book.'},
 {name:'unfinished project',weights:{focus:2,health:1},threshold:70,rule:'Focus × 2 + Stamina ≥ 70',win:'Completed until the end. My own work remains.',lose:'Ideas saved for next season.'},
 {name:'The crossroads of a new beginning',weights:{health:1,luck:1,social:1,focus:2},threshold:130,rule:'Stamina + Luck + Social + Focus × 2 ≥ 130',win:'Opening a new path with prepared courage.',lose:'I found my own peace in a familiar place.'}
];
export function validate(stats){return KEYS.every(k=>Number.isInteger(stats[k])&&stats[k]>=0&&stats[k]<=100&&stats[k]%10===0)&&KEYS.reduce((s,k)=>s+stats[k],0)===100;}
export function simulate(stats){if(!validate(stats))throw new RangeError('4Please allocate the dog’s abilities in 10-point increments for a total of 100 points.');const events=EVENTS.map(e=>{const value=Object.entries(e.weights).reduce((s,[k,w])=>s+stats[k]*w,0),success=value>=e.threshold;return {...e,value,success,story:success?e.win:e.lose};});const passed=events.filter(e=>e.success).length;const strongest=KEYS.reduce((a,b)=>stats[a]>=stats[b]?a:b);const titles={health:'The life of a pioneer who walks to the end',luck:'Life that turns coincidence into opportunity',social:'A life that connects people',focus:'Life that completes small things'};return {scenario:SCENARIO,events,passed,title:titles[strongest],stats:{...stats}};}
