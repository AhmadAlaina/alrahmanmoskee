import test from 'node:test';
import assert from 'node:assert/strict';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import { donationLink, paymentLinks, prayerSchedule } from '../src/data.js';

for (const purpose of ['general', 'renovation']) {
  test(`${purpose}: QR decodes to the same verified WhatsApp recipient and correct purpose`, async () => {
    const link = donationLink(purpose);
    const png = PNG.sync.read(await QRCode.toBuffer(link, { width:196, margin:4, errorCorrectionLevel:'M', color:{dark:'#173f35',light:'#ffffff'} }));
    const decoded = jsQR(new Uint8ClampedArray(png.data),png.width,png.height);
    assert.equal(decoded?.data, link);
    const url = new URL(decoded.data);
    assert.equal(url.origin, 'https://wa.me');
    assert.equal(url.pathname, '/31647902836');
    assert.match(url.searchParams.get('text'), purpose === 'renovation' ? /renovatie van de wc’s/ : /doneren aan Al Rahman Moskee/);
  });
}
test('confirmed HTTPS payment links can replace the request route; unsafe protocols are rejected', () => {
  try {
    paymentLinks.general = 'https://example.com/donate';
    assert.equal(donationLink(), 'https://example.com/donate');
    paymentLinks.general = 'javascript:alert(1)';
    assert.throws(()=>donationLink(), /HTTPS/);
    assert.throws(()=>donationLink('unknown'), /Onbekend/);
  } finally { paymentLinks.general=''; }
});
test('prayers use the Amsterdam calendar day around UTC midnight and seasonal clock changes', () => {
  for(const [late, sameLocalDate] of [
    ['2026-07-01T22:30:00Z','2026-07-02T10:00:00Z'],
    ['2026-01-01T23:30:00Z','2026-01-02T10:00:00Z'],
    ['2026-03-28T23:30:00Z','2026-03-29T10:00:00Z'],
    ['2026-10-24T22:30:00Z','2026-10-25T10:00:00Z'],
  ]) {
    const first=prayerSchedule(new Date(late));
    assert.equal(first.length,6);
    assert.deepEqual(first.map(p=>p.time),prayerSchedule(new Date(sameLocalDate)).map(p=>p.time));
    for(const prayer of first) assert.match(prayer.time,/^\d{2}:\d{2}$/);
  }
});
test('sunrise is not highlighted as a prayer, and passed prayers are not next', () => {
  const day = new Date('2026-10-07T04:30:00Z');
  const schedule=prayerSchedule(day);
  assert.equal(schedule.find(p=>p.next)?.key,'dhuhr');
  assert.equal(prayerSchedule(new Date('2026-10-07T23:00:00+02:00')).some(p=>p.next),false);
});
