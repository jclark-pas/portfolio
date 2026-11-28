// Recreates the docked LivePlan forecast view with the case study's café data.
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const icons = require('@phosphor-icons/react/dist/ssr');
const root = path.resolve(__dirname, '..');
const font = fs.readFileSync(path.join(root, 'src/app/fonts/Mulish-Variable.ttf')).toString('base64');
const ai = fs.readFileSync(path.join(root, 'public/images/help-me-forecast/ai-icon.svg')).toString('base64');
const liveplanMark = fs.readFileSync(path.join(root, 'public/images/help-me-forecast/liveplan-mark.svg')).toString('base64');
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const rect = (x,y,w,h,fill='#fff',r=0,stroke='none') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const text = (x,y,s,size=14,weight=400,color='#202d41',extra='') => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${esc(s)}</text>`;
const lines = (x,y,ss,size=14,weight=400,color='#202d41',leading=23) => ss.map((s,i)=>text(x,y+i*leading,s,size,weight,color)).join('');
const line = (x1,y1,x2,y2,color='#e4e6e8',extra='')=>`<path d="M${x1} ${y1}H${x2}" stroke="${color}" ${extra}/>`;
const icon = (name,x,y,size=18,color='#647080') => `<g transform="translate(${x} ${y})" color="${color}">${renderToStaticMarkup(React.createElement(icons[name],{size,weight:'regular'}))}</g>`;
const button = (x,y,w,label,iconName) => rect(x,y,w,30,'#fff',4,'#d9dddf')+(iconName?icon(iconName,x+8,y+7,16):'')+text(x+(iconName?30:10),y+20,label,12,600);
let s='';
// App shell, matching the actual dark top bar and two-column navigation.
s+=rect(32,32,1536,984,'#fff',14);
s+=`<g clip-path="url(#app)">`+rect(32,32,1536,50,'#242c3d')+rect(32,82,70,934,'#242c3d');
s+=`<image href="data:image/svg+xml;base64,${liveplanMark}" x="52.5" y="40.5" width="29" height="33"/>`;
s+=icon('Storefront',117,49,16,'#fff')+text(142,62,'Juniper Café',13,600,'#fff')+icon('CaretDown',257,51,12,'#c9ced6');
s+=icon('FilmStrip',293,49,16,'#d5dae2')+text(318,62,'Add a Scenario',13,400,'#fff')+icon('PlusCircle',416,50,14,'#9cceab');
s+=icon('Compass',1122,49,16,'#a2cfac')+text(1145,62,'Hire a Pro',11,400,'#a2cfac')+icon('Gift',1221,49,16,'#d4d9e2')+text(1244,62,'Redeem Perks',11,400,'#d4d9e2')+icon('UserPlus',1333,49,16,'#d4d9e2')+text(1356,62,'Invite Users',11,400,'#d4d9e2')+icon('UserCircle',1441,48,18,'#d4d9e2')+text(1467,62,'My Account',11,400,'#d4d9e2')+icon('CaretDown',1540,52,10,'#d4d9e2');
const rail=[['House','Home'],['MagicWand','Idea Canvas'],['MapTrifold','Plan'],['ChartBar','Forecast'],['Presentation','Pitch Deck'],['MagnifyingGlass','Research'],['Gauge','Dashboard'],['Gear','Options']];
rail.forEach(([i,label],n)=>{let y=100+n*62;if(n===3)s+=rect(38,y-6,58,51,'#394255',3);s+=icon(i,58,y+1,17,'#e0e3e9')+text(67,y+33,label,9,400,'#e0e3e9','text-anchor="middle"');});
s+=rect(38,958,58,48,'#3479ca',3)+icon('Question',59,966,16,'#fff')+text(67,994,'Get Help',9,600,'#fff','text-anchor="middle"');
s+=rect(102,82,14,14,'#242c3d')+`<path d="M116 82H314V1016H102V96Q102 82 116 82Z" fill="#fcfcfc"/>`+text(117,111,'FORECAST',13,700)+icon('CaretLeft',293,97,14,'#70a58e');
s+=line(102,132,314,132)+text(117,158,'Overview',13,700)+line(102,178,314,178);
s+=icon('CaretDown',119,191,13,'#40846c')+text(141,203,'Financial Tables',13,700);
['Revenue','Expenses & Costs','Assets','Taxes','Distributions','Cash Flow Assumptions','Financing'].forEach((label,n)=>{let y=239+n*37;if(n===1)s+=rect(102,y-24,212,37,'#e9e9e9');s+=text(141,y,label,12);});
s+=line(102,482,314,482)+icon('CaretDown',119,498,13,'#40846c')+text(141,510,'Financial Statements',13,700);
s+=lines(141,550,['Profit and Loss Statement','Projected Balance Sheet','Projected Cash Flow','Statement'],12,400,'#3c4552',30);
// Main forecast controls and chart. The docked panel sits over the table's right edge.
s+=text(330,113,'Expenses & Costs',22,800);
s+=line(314,132,1568,132);
s+=rect(314,133,1254,218,'#fff');
// One set of monthly values drives both the chart and table.
const demand = [.7,.9,1.3,1.05,1.65,1.4,1.9,1.6,1.8,1.55,2.1,2.35];
const fixed = amount => Array(12).fill(amount);
const seasonal = amount => demand.map(factor => Math.round(amount * factor));
const sumMonths = (...series) => series[0].map((_,i)=>series.reduce((total,values)=>total+values[i],0));
const beans=seasonal(780), milk=seasonal(520), packaging=seasonal(195);
const direct=sumMonths(beans,milk,packaging);
const wages=fixed(4000), benefits=fixed(800), personnel=sumMonths(wages,benefits);
const rent=fixed(2000), utilities=[310,330,350,325,380,410,450,420,375,340,385,430], insurance=fixed(150);
const expenses=sumMonths(rent,utilities,insurance);
const totals=sumMonths(direct,personnel,expenses);
const points=totals.map((value,i)=>[396+i*88,321-value/12000*162]);
const chartPath=points.map(([x,y],i)=>`${i?'L':'M'}${x} ${y.toFixed(2)}`).join(' ');
[0,4000,8000,12000].forEach((v,i)=>{let y=321-i*54;s+=line(365,y,1490,y,'#edf0f2')+text(354,y+4,v?'$'+v.toLocaleString('en-US'):'$0',9,400,'#6b7280','text-anchor="end"');});
s+=`<path d="${chartPath} L1364 321H396Z" fill="url(#area)"/><path d="${chartPath}" fill="none" stroke="#477fc4" stroke-width="2" stroke-dasharray="3 4"/>`;
['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'].forEach((m,n)=>{let [x,y]=points[n];s+=`<circle cx="${x}" cy="${y.toFixed(2)}" r="3.4" fill="#fff" stroke="#477fc4" stroke-width="1.6"/>`+text(x,342,`${m} '26`,10,600,'#323d4e','text-anchor="middle"');});
// Monthly financial table and realistic café entries.
s+=rect(314,354,1254,42,'#f7f8f8')+rect(314,350,1254,4,'#263247');
s+=icon('CaretCircleDown',328,368,13)+text(349,380,'Expenses & Costs',12,800)+button(479,360,98,'Organize','Stack')+icon('PlusCircle',589,369,14,'#3d856c');
const rows=[['Direct Costs',direct,'group'],['Direct Costs',direct,'sub'],['Coffee beans',beans,'entry'],['Milk',milk,'entry'],['Cups, lids, and packaging',packaging,'entry'],['Direct Labor',null,'sub'],['Personnel',personnel,'group'],['Salaries & Wages',wages,'sub'],['Employee Taxes & Benefits',benefits,'entry'],['Expenses',expenses,'group'],['Rent',rent,'entry'],['Utilities',utilities,'entry'],['Business insurance',insurance,'entry'],['Totals',totals,'total']];
rows.forEach(([label,values,type],n)=>{let y=396+n*43;const group=type==='group';s+=rect(314,y,1254,43,group?'#eff5f3':'#fff');s+=line(314,y,1568,y,group?'#d5e3df':'#e7eaeb');if(type==='total')s+=rect(314,y,1254,3,'#3d856c');let x=group?349:type==='entry'?383:365;if(group||type==='sub')s+=icon('CaretCircleDown',x-20,y+15,13,'#72807f');s+=text(x,y+27,label,12,group||type==='total'?800:600,type==='entry'?'#3d856c':'#26313e');if(type==='entry')s+=icon('DotsThreeVertical',587,y+14,15);if(!values&&type!=='group')s+=icon('PlusCircle',589,y+15,13,'#3d856c');
 ['July','Aug','Sept','Oct','Nov','Dec','2026'].forEach((m,j)=>{let cx=615+j*102;s+=rect(cx,y,102,43,j%2?'#f5f7f7':'#f9fafa');if(group)s+=rect(cx,y,102,43,'#eaf1ef');s+=text(cx+89,y+27,values?'$'+(j===6?values.reduce((a,b)=>a+b,0):values[j+6]).toLocaleString('en-US'):'',12,group||type==='total'?800:400,'#26313e','text-anchor="end"');});});
['July','Aug','Sept','Oct','Nov','Dec','2026'].forEach((m,n)=>s+=text(704+n*102,380,m==='2026'?m:`${m} '26`,12,800,'#26313e','text-anchor="end"'));
s+=`<path d="M314 82V1016" stroke="#dfe3e7" stroke-width="1"/>`;
// Docked conversational panel: exact app chrome, reply bubbles, and personnel form.
s+=`<g transform="translate(0 -51)">`+rect(1098,133,470,934,'#f9f7fc')+`<path d="M1098 133V1067" stroke="#e2deeb"/>`+rect(1098,133,470,50,'#fff')+line(1098,183,1568,183);
s+=`<image href="data:image/svg+xml;base64,${ai}" x="1112" y="146" width="24" height="24"/>`+text(1146,158,'Help Me Forecast',15,800,'#202d41','dominant-baseline="central"');
s+=rect(1454,142,28,25,'#fff',3,'#d9dddf')+icon('NotePencil',1460,147,16,'#6840a5')+icon('Sidebar',1494,147,17)+icon('X',1533,147,17);
s+=rect(1120,194,424,232,'#fff',5,'#e4e2e9')+text(1142,225,'About your personnel',17,800);
s+=lines(1142,253,['Personnel covers the people you pay to run your','café — their wages, hours, and employer taxes.'],14,400,'#26313e',23);
s+=lines(1142,316,['If you pay yourself through payroll, that salary goes','here. An owner’s draw comes out of profit and','gets set up in distributions.'],14,400,'#26313e',23)+text(1142,401,'Ready to build your personnel?',14);
s+=rect(1295,443,249,48,'#ede8f4',7)+text(1316,473,'Yes, let’s start my personnel.',13,400,'#535c6c');
s+=rect(1219,501,325,73,'#ede8f4',7)+text(1240,529,'Which roles will you be paying for?',13,800)+text(1240,553,'Yourself, if you take a W-2 salary',13,400,'#535c6c');
s+=`<g filter="url(#cardShadow)">`+rect(1120,591,424,405,'#fff',6,'#e4e2e9')+'</g>';
s+=lines(1142,624,['What annual pay and','staffing level should I use?'],18,800,'#202d41',23)+lines(1142,679,['Enter annual pay for one full-time person and your','planned full-time-equivalents.'],13,400,'#7a8089',22);
s+=rect(1142,720,380,191,'#fff',5,'#e4e6e8')+text(1158,747,'Your salary — annual pay',14,800)+text(1158,768,'Annual salary for one full-time person.',11,400,'#7a8089');
s+=rect(1158,781,348,34,'#fff',2,'#e2e4e8')+text(1167,804,'$',14,400,'#89909a')+text(1494,804,'48,000',14,600,'#26313e','text-anchor="end"')+line(1142,831,1522,831);
s+=text(1158,854,'Your salary — FTEs',14,800)+text(1158,875,'Full-time-equivalents. For example, half-time is 0.5.',11,400,'#7a8089');
s+=icon('MinusCircle',1158,888,17,'#7a8089')+rect(1184,882,291,25,'#fff',2,'#e2e4e8')+text(1329,900,'1',12,700,'#26313e','text-anchor="middle"')+icon('PlusCircle',1487,888,17,'#7a8089');
s+=lines(1142,934,['* Pre-populated numbers are AI estimates based on your plan','and reference files.'],10,400,'#7a8089',16)+line(1120,963,1544,963)+rect(1497,973,31,23,'#652fd0',3)+icon('ArrowRight',1505,977,15,'#fff');
s+='</g></g>';
const defs=`<defs><style>@font-face{font-family:Mulish;src:url(data:font/ttf;base64,${font}) format('truetype');font-weight:200 1000}text{font-family:Mulish,sans-serif}</style><clipPath id="app"><rect x="32" y="32" width="1536" height="984" rx="14"/></clipPath><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#b9ceeb"/><stop offset="1" stop-color="#f8fbff"/></linearGradient><filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#202d41" flood-opacity=".08"/></filter><filter id="shadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#263247" flood-opacity=".18"/></filter></defs>`;
const svg = (mobile=false)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${mobile?470:1600}" height="${mobile?934:1060}" viewBox="${mobile?'1098 82 470 934':'0 0 1600 1060'}" role="img"><title>LivePlan forecast with the Help Me Forecast personnel conversation</title><desc>A café’s Expenses and Costs table sits alongside a guided conversation explaining personnel and asking the owner for annual salary and staffing levels.</desc>${defs}<g filter="url(#shadow)">${s}</g></svg>`;
fs.writeFileSync(path.join(root,'public/images/help-me-forecast/hero.svg'),svg());
fs.writeFileSync(path.join(root,'public/images/help-me-forecast/hero-mobile.svg'),svg(true));
// Card artwork isolates the conversation at a readable scale, with the rest
// of the panel continuing below the frame.
const cardSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="510" height="974" viewBox="0 0 510 974" role="img"><title>Help Me Forecast personnel conversation</title>${defs}<defs><clipPath id="conversationCard"><rect x="20" y="20" width="470" height="934" rx="14"/></clipPath></defs><g filter="url(#shadow)"><g clip-path="url(#conversationCard)"><g transform="translate(-1078 -62)">${s}</g></g></g></svg>`;
fs.writeFileSync(path.join(root,'public/images/help-me-forecast/featured-sidebar.svg'),cardSvg);
