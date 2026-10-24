export const KEYS=['health','luck','social','focus'];
export const LABELS={health:'Resistencia',luck:'Suerte',social:'Sociabilidad',focus:'Concentración'};
export const SCENARIO='NANA-003-A';
export const EVENTS=[
 {name:'primeros pasos para trabajar',weights:{health:2,focus:1},threshold:70,rule:'Resistencia × 2 + Concentración ≥ 70',win:'Me puse a trabajar con facilidad y dejé una primera impresión en mis compañeros.',lose:'Llegué mientras recuperaba el aliento y elegí un día tranquilo.'},
 {name:'invitación de una ciudad extraña',weights:{social:2,luck:1},threshold:70,rule:'Sociabilidad × 2 + Suerte ≥ 70',win:'Tengo un nuevo amigo. La ciudad se acercó un poco más.',lose:'Mientras caminaba solo, encontré mi café favorito.'},
 {name:'secreto de la vieja caja',weights:{luck:2,focus:1},threshold:80,rule:'Suerte × 2 + Concentración ≥ 80',win:'Encontré un pequeño tesoro en la caja.',lose:'No había ningún tesoro, pero conseguí un bonito libro de registro.'},
 {name:'proyecto inacabado',weights:{focus:2,health:1},threshold:70,rule:'Concentración × 2 + Resistencia ≥ 70',win:'Completado hasta el final. Mi propio trabajo permanece.',lose:'Ideas guardadas para la próxima temporada.'},
 {name:'La encrucijada de un nuevo comienzo',weights:{health:1,luck:1,social:1,focus:2},threshold:130,rule:'Resistencia + Suerte + Social + Enfoque × 2 ≥ 130',win:'Abriendo un nuevo camino con valentía preparada.',lose:'Encontré mi propia paz en un lugar familiar.'}
];
export function validate(stats){return KEYS.every(k=>Number.isInteger(stats[k])&&stats[k]>=0&&stats[k]<=100&&stats[k]%10===0)&&KEYS.reduce((s,k)=>s+stats[k],0)===100;}
export function simulate(stats){if(!validate(stats))throw new RangeError('4Asigne las habilidades del perro en incrementos de 10 puntos para un total de 100 puntos.');const events=EVENTS.map(e=>{const value=Object.entries(e.weights).reduce((s,[k,w])=>s+stats[k]*w,0),success=value>=e.threshold;return {...e,value,success,story:success?e.win:e.lose};});const passed=events.filter(e=>e.success).length;const strongest=KEYS.reduce((a,b)=>stats[a]>=stats[b]?a:b);const titles={health:'La vida de un pionero que camina hasta el final.',luck:'La vida que convierte la coincidencia en oportunidad',social:'Una vida que conecta a las personas',focus:'Vida que completa las pequeñas cosas'};return {scenario:SCENARIO,events,passed,title:titles[strongest],stats:{...stats}};}
