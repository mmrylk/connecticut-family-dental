import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import SmileSimulator from './components/SmileSimulator';
import Doctor from './components/Doctor';
import NewPatients from './components/NewPatients';
import Contact from './components/Contact';
import BookingModal from './components/BookingModal';
export default function App(){const[booking,setBooking]=useState<{service:string}|null>(null);const onBook=useCallback((service?:string)=>setBooking({service:service||''}),[]);const close=useCallback(()=>setBooking(null),[]);
 useEffect(()=>{const schema={ '@context':'https://schema.org','@type':'Dentist',name:'Connecticut Family Dental — Bridgeport',telephone:'+1-203-663-2772',faxNumber:'+1-203-275-8595',address:{'@type':'PostalAddress',streetAddress:'3885 Main Street, Suite 101',addressLocality:'Bridgeport',addressRegion:'CT',postalCode:'06606',addressCountry:'US'},openingHoursSpecification:[{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday'],opens:'09:00',closes:'18:00'},{'@type':'OpeningHoursSpecification',dayOfWeek:'Thursday',opens:'09:00',closes:'20:00'},{'@type':'OpeningHoursSpecification',dayOfWeek:'Friday',opens:'09:00',closes:'14:00'}]};const script=document.createElement('script');script.type='application/ld+json';script.textContent=JSON.stringify(schema);document.head.appendChild(script);return()=>script.remove()},[]);
 return <><a className="skip-link" href="#main">Skip to content</a><Header onBook={()=>onBook()}/><main id="main"><Hero onBook={()=>onBook()}/><Services onBook={onBook}/><SmileSimulator onBook={()=>onBook('Full Smile Restorations')}/><Doctor onBook={()=>onBook()}/><NewPatients onBook={()=>onBook()}/><Contact onBook={()=>onBook()}/></main>{booking&&<BookingModal initialService={booking.service} onClose={close}/>}</>}
