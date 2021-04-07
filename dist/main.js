(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var r=t(n);return!isNaN(r)}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(e){return function(t){var n=t||{},r=n.width?String(n.width):e.defaultWidth;return e.formats[r]||e.formats[e.defaultWidth]}}var o,i={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},c={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=a.width?String(a.width):o;r=e.formattingValues[i]||e.formattingValues[o]}else{var c=e.defaultWidth,u=a.width?String(a.width):e.defaultWidth;r=e.values[u]||e.values[c]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function d(e){return function(t,n){var r=String(t),a=n||{},o=a.width,i=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],c=r.match(i);if(!c)return null;var u,d=c[0],s=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(s)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(d))return n}(s):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(d))return n}(s),u=e.valueCallback?e.valueCallback(u):u,{value:u=a.valueCallback?a.valueCallback(u):u,rest:r.slice(d.length)}}}const s={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof r[e]?r[e]:1===t?r[e].one:r[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:i,formatRelative:function(e,t,n,r){return c[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),r=t||{},a=n.match(o.matchPattern);if(!a)return null;var i=a[0],c=n.match(o.parsePattern);if(!c)return null;var u=o.valueCallback?o.valueCallback(c[0]):c[0];return{value:u=r.valueCallback?r.valueCallback(u):u,rest:n.slice(i.length)}}),era:d({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:d({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:d({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:d({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:d({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function l(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function m(n,r){e(2,arguments);var a=t(n).getTime(),o=l(r);return new Date(a+o)}function h(t,n){e(2,arguments);var r=l(n);return m(t,-r)}function f(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const g=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return f("yy"===t?r%100:r,t.length)},p=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):f(n+1,2)},y=function(e,t){return f(e.getUTCDate(),t.length)},v=function(e,t){return f(e.getUTCHours()%12||12,t.length)},w=function(e,t){return f(e.getUTCHours(),t.length)},b=function(e,t){return f(e.getUTCMinutes(),t.length)},C=function(e,t){return f(e.getUTCSeconds(),t.length)},S=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return f(Math.floor(r*Math.pow(10,n-3)),t.length)};var x=864e5;function k(n){e(1,arguments);var r=1,a=t(n),o=a.getUTCDay(),i=(o<r?7:0)+o-r;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function T(n){e(1,arguments);var r=t(n),a=r.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(a+1,0,4),o.setUTCHours(0,0,0,0);var i=k(o),c=new Date(0);c.setUTCFullYear(a,0,4),c.setUTCHours(0,0,0,0);var u=k(c);return r.getTime()>=i.getTime()?a+1:r.getTime()>=u.getTime()?a:a-1}function N(t){e(1,arguments);var n=T(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=k(r);return a}var M=6048e5;function q(n,r){e(1,arguments);var a=r||{},o=a.locale,i=o&&o.options&&o.options.weekStartsOn,c=null==i?0:l(i),u=null==a.weekStartsOn?c:l(a.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=t(n),s=d.getUTCDay(),m=(s<u?7:0)+s-u;return d.setUTCDate(d.getUTCDate()-m),d.setUTCHours(0,0,0,0),d}function E(n,r){e(1,arguments);var a=t(n,r),o=a.getUTCFullYear(),i=r||{},c=i.locale,u=c&&c.options&&c.options.firstWeekContainsDate,d=null==u?1:l(u),s=null==i.firstWeekContainsDate?d:l(i.firstWeekContainsDate);if(!(s>=1&&s<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var m=new Date(0);m.setUTCFullYear(o+1,0,s),m.setUTCHours(0,0,0,0);var h=q(m,r),f=new Date(0);f.setUTCFullYear(o,0,s),f.setUTCHours(0,0,0,0);var g=q(f,r);return a.getTime()>=h.getTime()?o+1:a.getTime()>=g.getTime()?o:o-1}function D(t,n){e(1,arguments);var r=n||{},a=r.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:l(o),c=null==r.firstWeekContainsDate?i:l(r.firstWeekContainsDate),u=E(t,n),d=new Date(0);d.setUTCFullYear(u,0,c),d.setUTCHours(0,0,0,0);var s=q(d,n);return s}var P=6048e5;function j(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=t||"";return n+String(a)+i+f(o,2)}function U(e,t){return e%60==0?(e>0?"-":"+")+f(Math.abs(e)/60,2):L(e,t)}function L(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+f(Math.floor(a/60),2)+n+f(a%60,2)}const W={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return g(e,t)},Y:function(e,t,n,r){var a=E(e,r),o=a>0?a:1-a;return"YY"===t?f(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):f(o,t.length)},R:function(e,t){return f(T(e),t.length)},u:function(e,t){return f(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return f(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return f(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return p(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return f(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,o){var i=function(n,r){e(1,arguments);var a=t(n),o=q(a,r).getTime()-D(a,r).getTime();return Math.round(o/P)+1}(n,o);return"wo"===r?a.ordinalNumber(i,{unit:"week"}):f(i,r.length)},I:function(n,r,a){var o=function(n){e(1,arguments);var r=t(n),a=k(r).getTime()-N(r).getTime();return Math.round(a/M)+1}(n);return"Io"===r?a.ordinalNumber(o,{unit:"week"}):f(o,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):y(e,t)},D:function(n,r,a){var o=function(n){e(1,arguments);var r=t(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var o=r.getTime(),i=a-o;return Math.floor(i/x)+1}(n);return"Do"===r?a.ordinalNumber(o,{unit:"dayOfYear"}):f(o,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return f(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return f(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return f(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return v(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):w(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):b(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):C(e,t)},S:function(e,t){return S(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return U(a);case"XXXX":case"XX":return L(a);case"XXXXX":case"XXX":default:return L(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return U(a);case"xxxx":case"xx":return L(a);case"xxxxx":case"xxx":default:return L(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+j(a,":");case"OOOO":default:return"GMT"+L(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+j(a,":");case"zzzz":default:return"GMT"+L(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return f(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return f((r._originalDate||e).getTime(),t.length)}};function A(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function Y(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const O={p:Y,P:function(e,t){var n,r=e.match(/(P+)(p+)?/),a=r[1],o=r[2];if(!o)return A(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",A(a,t)).replace("{{time}}",Y(o,t))}};function I(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var z=["D","DD"],H=["YY","YYYY"];function F(e){return-1!==z.indexOf(e)}function X(e){return-1!==H.indexOf(e)}function B(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var Q=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,G=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,R=/^'([^]*?)'?$/,J=/''/g,$=/[a-zA-Z]/;function _(e){return e.match(R)[1].replace(J,"'")}const V=document.createElementNS("http://www.w3.org/2000/svg","svg");V.setAttributeNS(null,"width","20"),V.setAttributeNS(null,"height","20"),V.setAttributeNS(null,"viewBox","0 0 24 24"),V.setAttributeNS(null,"stroke-width","1.5"),V.setAttributeNS(null,"fill","none"),V.setAttributeNS(null,"stroke-linecap","round"),V.setAttributeNS(null,"stroke-linejoin","round");const K=document.createElementNS("http://www.w3.org/2000/svg","path");K.setAttributeNS(null,"stroke","none"),K.setAttributeNS(null,"d","M0 0h24v24H0z"),K.setAttributeNS(null,"fill","none"),V.appendChild(K);const Z=e=>{const t=document.createElementNS("http://www.w3.org/2000/svg","line");return t.setAttributeNS(null,"x1",e.x1),t.setAttributeNS(null,"y1",e.y1),t.setAttributeNS(null,"x2",e.x2),t.setAttributeNS(null,"y2",e.y2),t},ee=e=>{const t=document.createElementNS("http://www.w3.org/2000/svg","circle");return t.setAttributeNS(null,"cx",e.cx),t.setAttributeNS(null,"cy",e.cy),t.setAttributeNS(null,"r",e.r),t},te=e=>{const t=document.createElementNS("http://www.w3.org/2000/svg","path");return t.setAttributeNS(null,"d",e),t},ne=(()=>{const e=V.cloneNode(!0);return e.setAttributeNS(null,"stroke","#00aaff"),e.appendChild(Z({x1:"9",y1:"6",x2:"20",y2:"6"})),e.appendChild(Z({x1:"9",y1:"12",x2:"20",y2:"12"})),e.appendChild(Z({x1:"9",y1:"18",x2:"20",y2:"18"})),e.appendChild(Z({x1:"5",y1:"6",x2:"5",y2:"6.01"})),e.appendChild(Z({x1:"5",y1:"12",x2:"5",y2:"12.01"})),e.appendChild(Z({x1:"5",y1:"18",x2:"5",y2:"18.01"})),e})(),re=(e,t)=>{const n=V.cloneNode(!0);return n.setAttributeNS(null,"stroke","#c8c8c8"),n.appendChild(ee({cx:"12",cy:"12",r:"9"})),e?n.appendChild(te("M9 12l2 2l4 -4")):t&&n.setAttributeNS(null,"stroke","#dc4c3f"),n},ae=(()=>{const e=V.cloneNode(!0);return e.setAttributeNS(null,"stroke","#00aaff"),e.appendChild(Z({x1:"12",y1:"5",x2:"12",y2:"19"})),e.appendChild(Z({x1:"5",y1:"12",x2:"19",y2:"12"})),e})(),oe=(()=>{const e=V.cloneNode(!0);return e.setAttributeNS(null,"stroke","#dc4c3f"),e.appendChild(Z({x1:"10",y1:"11",x2:"10",y2:"17"})),e.appendChild(Z({x1:"14",y1:"11",x2:"14",y2:"17"})),e.appendChild(Z({x1:"4",y1:"7",x2:"20",y2:"7"})),e.appendChild(te("M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12")),e.appendChild(te("M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3")),e})(),ie=(()=>{const e=V.cloneNode(!0);return e.setAttributeNS(null,"stroke","#c8c8c8"),e.appendChild(te("M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4")),e.appendChild(ee({cx:"18",cy:"18",r:"4"})),e.appendChild(te("M15 3v4")),e.appendChild(te("M7 3v4")),e.appendChild(te("M3 11h16")),e.appendChild(te("M18 16.496v1.504l1 1")),e})(),ce=(()=>{const e=V.cloneNode(!0);return e.setAttributeNS(null,"stroke","#00aaff"),e.appendChild(te("M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3")),e.appendChild(te("M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3")),e.appendChild(Z({x1:"16",y1:"5",x2:"19",y2:"8"})),e})();function ue(n){e(1,arguments);var r=t(n);return r.setHours(0,0,0,0),r}function de(t,n){e(2,arguments);var r=ue(t),a=ue(n);return r.getTime()===a.getTime()}var se=864e5;const le=(n,r)=>{const a=[],o=()=>a.map((e=>e.info()));return{setName:e=>n=e,getName:()=>n,setId:e=>r=e,store:()=>{localStorage.setItem(`project-${r}`,JSON.stringify({name:n,tasks:o()}))},at:e=>a[e],add:(e,t,n,r,o)=>a.push(((e,t,n,r,a)=>({toggleDone:()=>a=!a,setTitle:t=>e=t,setDesc:e=>t=e,setDue:e=>n=e,setPrio:e=>r=Boolean(e),info:()=>({title:e,desc:t,due:n,prio:r,done:a})}))(e,t,n,r,o))-1,remove:e=>a.splice(e,1),all:o,today:()=>a.reduce(((t,n,a)=>(function(t){return e(1,arguments),de(t,Date.now())}(n.info().due)&&t.push({projectIndex:r,index:a,...n.info()}),t)),[]),nextWeek:()=>a.reduce(((n,a,o)=>{const i=function(t,n){e(2,arguments);var r=ue(t),a=ue(n),o=r.getTime()-I(r),i=a.getTime()-I(a);return Math.round((o-i)/se)}(function(n,r){e(2,arguments);var a=t(n),o=l(r);return isNaN(o)?new Date(NaN):o?(a.setDate(a.getDate()+o),a):a}(new Date,7),a.info().due);return i>=0&&i<=7&&n.push({projectIndex:r,index:o,...a.info()}),n}),[])}},me=(()=>{let e=[];const t=()=>{a(r("My Tasks")).store(),n()},n=()=>{localStorage.setItem("project-total",e.length)},r=t=>{const n=e.length,r=le(t,n);return e.push(r),n},a=t=>e[t];return{store:n,load:()=>{if(0===localStorage.length)t();else if(localStorage.getItem("project-total")){const n=Number(localStorage.getItem("project-total"));if(Number.isInteger(n)&&n>0)for(let a=0;a<n;a++){if(!localStorage.getItem(`project-${a}`)){localStorage.clear(),e=[],t();break}const n=JSON.parse(localStorage.getItem(`project-${a}`)),o=r(n.name);n.tasks.forEach((t=>{e[o].add(t.title,t.desc,new Date(t.due),t.prio,t.done)}))}else localStorage.clear(),t()}},add:r,remove:t=>{localStorage.removeItem("project-"+(e.length-1)),e.splice(t,1),n(),e.forEach(((e,t)=>{e.setId(t),e.store()}))},at:a,names:()=>e.map((e=>e.getName())),today:()=>e.reduce(((e,t)=>(e.push(...t.today()),e)),[]),nextWeek:()=>e.reduce(((e,t)=>(e.push(...t.nextWeek()),e)),[])}})();(()=>{const r=e=>{for(;e.firstChild;)e.removeChild(e.firstChild)},a=e=>document.querySelector(`.project[data-index="${e}"]`),o=()=>Number.isNaN(Number(document.querySelector("main").dataset.type)),i=()=>{S(!1,document.querySelector("main").dataset.type,document.querySelector(".main-header > h2").textContent)},c=()=>({form:document.querySelector("#task-form"),title:document.querySelector("#task-form-title"),desc:document.querySelector("#task-form-desc"),due:document.querySelector("#task-form-due"),prio:document.querySelector("#task-form-prio"),cancel:document.querySelector("#task-form-cancel")}),u=()=>{const{form:e,title:t,desc:n,due:r,prio:a,cancel:o}=c();e.style.display="none",t.value="",n.value="",r.value="",a.checked=!1,o.disabled=!0,e.querySelector("h3").textContent="",document.querySelector("#task-form-cancel + button")&&e.querySelector("#task-form-buttons").removeChild(document.querySelector("#task-form-cancel + button")),document.querySelector("#task-form-header > svg")&&document.querySelector("#task-form-header").removeChild(document.querySelector("#task-form-header > svg"))},d=(e,t,n)=>{const{form:r,cancel:a}=c();r.querySelector("h3").textContent=e?"Edit Task":"New Task",a.disabled=!1;const o=document.createElement("button");if(o.textContent="Ok",r.querySelector("#task-form-buttons").appendChild(o),e){const e=oe.cloneNode(!0);e.addEventListener("click",(e=>{m(t,n),u()})),document.querySelector("#task-form-header").appendChild(e)}return o},m=(e,t)=>{r(document.querySelector("#task-info")),delete document.querySelector("#task-info").dataset.index,delete document.querySelector("#task-info").dataset.projectIndex,me.at(e).remove(t),me.at(e).store(),o()?i():S(!0,e,me.at(e).getName())},f=(e,t=document.querySelector("main").dataset.type)=>{me.at(t).at(e).toggleDone(),me.at(t).store();const n=Number(document.querySelector("#task-info").dataset.index);if(o()){const e=Number(document.querySelector("#task-info").dataset.projectIndex);i(),Number.isInteger(n)&&Number.isInteger(e)&&g({index:n,projectIndex:e,...me.at(e).at(n).info()})}else S(!0,t,me.at(t).getName()),Number.isInteger(n)&&g({index:n,...me.at(t).at(n).info()})},g=a=>{const m=document.querySelector("#task-info");r(m),m.dataset.index=a.index,o()&&(m.dataset.projectIndex=a.projectIndex);const p=re(a.done,a.prio);p.addEventListener("click",(e=>{f(a.index,a.projectIndex)}));const y=ce.cloneNode(!0);y.addEventListener("click",(r=>{(r=>{const{form:a,title:m,desc:f,due:p,prio:y}=c(),v=o()?r.projectIndex:document.querySelector("main").dataset.type,w=d(!0,v,r.index);m.value=r.title,f.value=r.desc,p.value=function(r,a,o){e(2,arguments);var i=String(a),c=o||{},u=c.locale||s,d=u.options&&u.options.firstWeekContainsDate,m=null==d?1:l(d),f=null==c.firstWeekContainsDate?m:l(c.firstWeekContainsDate);if(!(f>=1&&f<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=u.options&&u.options.weekStartsOn,p=null==g?0:l(g),y=null==c.weekStartsOn?p:l(c.weekStartsOn);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var v=t(r);if(!n(v))throw new RangeError("Invalid time value");var w=h(v,I(v)),b={firstWeekContainsDate:f,weekStartsOn:y,locale:u,_originalDate:v};return i.match(G).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,O[t])(e,u.formatLong,b):e})).join("").match(Q).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return _(e);var n=W[t];if(n)return!c.useAdditionalWeekYearTokens&&X(e)&&B(e,a,r),!c.useAdditionalDayOfYearTokens&&F(e)&&B(e,a,r),n(w,e,u.localize,b);if(t.match($))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("")}(r.due,"yyyy-MM-dd"),y.checked=r.prio,w.addEventListener("click",(e=>{e.preventDefault();const t=me.at(v).at(r.index);t.setTitle(m.value),t.setDesc(f.value),t.setDue(p.value?new Date(p.value.replaceAll("-","/")):new Date),t.setPrio(y.checked),me.at(v).store(),o()?(i(),g({index:r.index,projectIndex:v,...t.info()})):(S(!0,v,me.at(v).getName()),g({index:r.index,...t.info()})),u()})),a.style.display="block"})(a)}));const v=document.createElement("div");v.appendChild(p),v.appendChild(y),m.appendChild(v);const w=document.createElement("h3");w.textContent=a.title,m.appendChild(w);const b=document.createElement("div");b.textContent=a.desc,m.appendChild(b);const C=document.createElement("div");C.classList.add("icon-label"),C.appendChild(ie);const x=document.createElement("div");x.textContent=a.due.toDateString().replace(" ",", "),C.appendChild(x),m.appendChild(C)},p=e=>{const t=document.createElement("div");t.classList.add("icon-label","task");const n=re(e.done,e.prio);n.addEventListener("click",(()=>{f(e.index,e.projectIndex)})),t.appendChild(n);const r=document.createElement("label");r.textContent=e.title,e.done&&r.classList.add("done"),t.appendChild(r);const a=document.querySelector("main");r.addEventListener("click",(t=>g(e)));const o=document.querySelector("main > .add");a.insertBefore(t,o)},y=()=>({container:document.querySelector("#project-form"),form:document.querySelector("#project-form > form"),name:document.querySelector("#project-form-name"),cancel:document.querySelector("#project-form-cancel")}),v=()=>{const{container:e,form:t,name:n,cancel:r}=y();n.value="",e.style.display="none",t.querySelector("h3").textContent="",r.disabled=!0,document.querySelector("#project-form-cancel + button")&&t.querySelector("#project-form-buttons").removeChild(document.querySelector("#project-form-cancel + button")),document.querySelector("#project-form-header > svg")&&document.querySelector("#project-form-header").removeChild(document.querySelector("#project-form-header > svg"))},w=(e,t)=>{const{form:n,cancel:r}=y();n.querySelector("h3").textContent=e?"Edit Project":"New Project",r.disabled=!1;const a=document.createElement("button");if(a.textContent="Ok",n.querySelector("#project-form-buttons").appendChild(a),e){const e=oe.cloneNode(!0);e.addEventListener("click",(e=>{b(t),v()})),document.querySelector("#project-form-header").appendChild(e)}return a},b=e=>{const t=a(e).parentElement;document.querySelector("#projects").removeChild(t),me.remove(e),document.querySelectorAll(".project").forEach(((e,t)=>{e.dataset.index=t}));const n=document.querySelector("main");n.dataset.type==e&&(r(n),me.at(e)&&S(!0,e,me.at(e).getName()))},C=e=>{const{container:t,name:n}=y(),r=w(!0,e),o=a(e).querySelector("h4");n.value=o.textContent,r.addEventListener("click",(t=>{t.preventDefault(),o.textContent=n.value,o.classList.contains("bold")&&(document.querySelector("main h2").textContent=n.value);const r=me.at(e);r.setName(n.value),r.store(),v()})),t.style.display="block"},S=(e,t,n)=>{((e,t)=>{document.querySelectorAll("#default-groups h4").forEach((e=>e.classList.remove("bold"))),document.querySelectorAll(".project > h4").forEach((e=>e.classList.remove("bold"))),e?a(t).querySelector("h4").classList.add("bold"):document.querySelector(`#${t} > h4`).classList.add("bold")})(e,t);const o=document.querySelector("main");o.dataset.type=t,r(o),r(document.querySelector("#task-info")),delete document.querySelector("#task-info").dataset.index,delete document.querySelector("#task-info").dataset.projectIndex;const i=document.createElement("div");i.classList.add("main-header");const s=document.createElement("h2");if(s.textContent=n,i.appendChild(s),o.appendChild(i),e?((e,t)=>{const n=ce.cloneNode(!0);n.addEventListener("click",(t=>{C(e)})),t.appendChild(n),me.at(e).all().forEach(((e,t)=>p({index:t,...e})))})(t,i):(e=>{switch(e){case"today":me.today().forEach(p);break;case"week":me.nextWeek().forEach(p)}})(t),e){const e=document.createElement("div");e.classList.add("icon-label","add"),e.appendChild(ae);const n=document.createElement("div");n.textContent="Add Task",e.appendChild(n),e.addEventListener("click",(e=>(e=>{const{form:t,title:n,desc:r,due:a,prio:o}=c();d(!1).addEventListener("click",(t=>{if(t.preventDefault(),n.value){const t=new Date(a.value?new Date(a.value.replaceAll("-","/")):new Date),i=me.at(e),c=i.add(n.value,r.value,t,o.checked,!1);i.store(),p({index:c,title:n.value,desc:r.value,due:t,prio:o.checked})}u()})),t.style.display="block"})(t))),document.querySelector("main").appendChild(e)}},x=(e,t)=>{const n=document.querySelector("#projects"),r=document.createElement("div");r.classList.add("icon-label","project"),r.appendChild(ne.cloneNode(!0));const a=document.createElement("h4");a.textContent=e,r.appendChild(a),r.addEventListener("click",(n=>S(!0,t,e))),r.dataset.index=t;const o=document.createElement("div");o.classList.add("project-sidebar"),o.appendChild(r);const i=ce.cloneNode(!0);i.classList.add("edit"),i.style.display="none",o.appendChild(i),i.addEventListener("click",(e=>{C(t)})),o.addEventListener("mouseover",(e=>{e.currentTarget.querySelector(".edit").style.display="block"})),o.addEventListener("mouseout",(e=>{e.currentTarget.querySelector(".edit").style.display="none"})),n.appendChild(o)};me.load(),me.names().forEach(((e,t)=>x(e,t))),me.at(0)&&S(!0,0,me.at(0).getName()),document.querySelectorAll("form > input[type='text']").forEach((e=>{e.addEventListener("keypress",(e=>{"Enter"===e.key&&e.preventDefault()}))})),function(){const{container:e,name:t,cancel:n}=y();n.addEventListener("click",(e=>{e.preventDefault(),v()})),document.querySelector("#add-project").addEventListener("click",(n=>{w(!1).addEventListener("click",(e=>{e.preventDefault();const n=""===t.value?"Untitled":t.value,r=me.add(n);me.store(),me.at(r).store(),x(n,r),S(!0,r,n),v()})),e.style.display="block"}))}(),document.querySelector("#task-form-cancel").addEventListener("click",(e=>{e.preventDefault(),u()})),document.querySelector("#today").addEventListener("click",(e=>{S(!1,"today","Today")})),document.querySelector("#week").addEventListener("click",(e=>{S(!1,"week","Next 7 Days")}))})()})();