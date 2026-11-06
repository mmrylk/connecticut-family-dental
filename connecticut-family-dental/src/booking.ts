export function nextBusinessDates(count=10,from=new Date()) {
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit'}).format(from);
 const cursor=new Date(`${today}T12:00:00Z`);const dates:string[]=[];
 while(dates.length<count){cursor.setUTCDate(cursor.getUTCDate()+1);if(cursor.getUTCDay()!==0&&cursor.getUTCDay()!==6)dates.push(cursor.toISOString().slice(0,10));}return dates;
}
export function getSlots(date:string){const day=new Date(`${date}T12:00:00Z`).getUTCDay();if(!date||day===0||day===6||Number.isNaN(day))return [];const closing=day===4?20:day===5?14:18;return Array.from({length:closing-9},(_,i)=>{const h=i+9;return {value:`${String(h).padStart(2,'0')}:00`,label:`${h%12||12}:00 ${h<12?'AM':'PM'}`,evening:h>=18}});}
export function formatDate(date:string,options:Intl.DateTimeFormatOptions={weekday:'long',month:'long',day:'numeric'}){return new Intl.DateTimeFormat('en-US',{...options,timeZone:'UTC'}).format(new Date(`${date}T12:00:00Z`));}
