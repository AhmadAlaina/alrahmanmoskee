import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from 'adhan';

export const mosque = {
  iban: 'NL37INGB0007353215',
  ibanDisplay: 'NL37 INGB 0007 3532 15',
  recipient: 'Stichting Al Rahman Moskee',
  donationPhone: '31647902836',
  youtube: 'https://www.youtube.com/channel/UCvxd8ve-2WLnPXBIQKFkZ6w',
};

// Add verified payment-provider URLs here when the mosque supplies them.
// Without a payment URL, both the QR code and button request one via WhatsApp.
export const paymentLinks = { general: '', renovation: '' };
export function donationLink(purpose = 'general') {
  if (!['general', 'renovation'].includes(purpose)) throw new Error('Onbekend donatiedoel');
  const configured = paymentLinks[purpose];
  if (configured) {
    const url = new URL(configured);
    if (url.protocol !== 'https:') throw new Error('Betaallink moet HTTPS gebruiken');
    return url.href;
  }
  const message = purpose === 'renovation'
    ? 'Assalamu alaikum, ik wil graag doneren voor de renovatie van de wc’s. Mag ik hiervoor een betaallink ontvangen?'
    : 'Assalamu alaikum, ik wil graag doneren aan Al Rahman Moskee. Mag ik hiervoor een betaallink ontvangen?';
  return `https://wa.me/${mosque.donationPhone}?text=${encodeURIComponent(message)}`;
}
export function prayerSchedule(now = new Date()) {
  const localDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const [year, month, day] = localDay.split('-').map(Number);
  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = Madhab.Hanafi;
  const times = new PrayerTimes(new Coordinates(51.4964, 3.6136), new Date(year, month - 1, day), params);
  const names = [['fajr','Fadjr','Dageraad','sunrise'],['sunrise','Shuruk','Zonsopgang','sun'],['dhuhr','Dhuhr','Middag','sun'],['asr','Asr','Namiddag','sun-medium'],['maghrib','Maghreb','Zonsondergang','sunset'],['isha','Isha','Nacht','moon']];
  const next = names.find(([key]) => key !== 'sunrise' && times[key] > now)?.[0];
  return names.map(([key,label,description,icon]) => ({ key,label,description,icon,next: key === next,time: new Intl.DateTimeFormat('nl-NL', { timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit' }).format(times[key]) }));
}
