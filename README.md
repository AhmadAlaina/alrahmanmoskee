# Al Rahman Moskee Middelburg

Nederlandstalige, responsive website met onderhoud, QR-donaties, nieuws, lezingen, activiteiten, gebedstijden, stichtinginformatie en contact.

## Ontwikkelen

Node.js 22.12+ (geverifieerd met 24.14.1) en npm:

```sh
npm ci
npm run dev -- --port 3000
npm test
npm run build
```

Publiceer de map `dist/` na de build op de webserver. Alle pagina's zijn afzonderlijke HTML-ingangen; er is geen serverdatabase nodig. `nieuwbouw.html` verwijst door naar `onderhoud.html` voor bestaande links.

## Inhoud en donaties

- Pagina-inhoud en navigatie: `src/main.js`. Vormgeving: `src/style.css`.
- Bankgegevens, donatienummer en betaallinks: `src/data.js`.
- QR-codes worden lokaal gegenereerd, zonder externe QR-dienst. Standaard openen ze een WhatsApp-bericht naar het bestaande donatienummer om een betaallink aan te vragen. Dit is geen directe bankbetaling. De knop en QR gebruiken dezelfde bestemming.
- Vervang `paymentLinks.general` en `paymentLinks.renovation` alleen door door de moskee bevestigde HTTPS-betaallinks. De bijschriften veranderen dan automatisch. Controleer ontvanger en beide QR-codes voor publicatie.
- Berekende gebedstijden via Adhan: Middelburg, Muslim World League, Hanafi, Europe/Amsterdam. Dit zijn geen bevestigde iqama-tijden. Geen externe API of credentials vereist.
- Nieuws en lezingen worden in de broncode bijgewerkt. Er is geen beheerpaneel; er worden geen onbevestigde data, inzamelbedragen of streefbedragen getoond.

## Informatiebronnen

Contactgegevens, bankrekening, donatienummer, bestuursgegevens, statuten en jaarverslagen zijn overgenomen van https://www.alrahmanmoskee.webnestiq.nl/ op 7 oktober 2026. De lopende wc-renovatie is door de opdrachtgever aangegeven. Controleer tijdgevoelige inhoud met het bestuur voor publicatie.

De moskeefoto is een sfeerbeeld van de Sultan Salahuddin Abdul Aziz Shah-moskee, niet van het pand in Middelburg; dit staat bij de foto. Foto's afkomstig van Unsplash (`photo-1519817650390-64a93db51149` en `photo-1609599006353-e629aaabfeae`). Het beeldmerk komt van de bestaande website. Projectillustratie is CSS en wordt niet als echte renovatiefoto gepresenteerd.
