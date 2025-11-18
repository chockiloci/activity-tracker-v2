# Activity Tracker 
Tvoj osebni pomočnik za bolj organiziran dan.
Aplikacija za beleženje, urejanje in brisanje aktivnosti, ki samodejno odstrani pretekle aktivnosti in poudari tiste, ki so v naslednjih 48 urah.

# Zahteve
- Node.js (vsaj verzija 16)
- Npm 
- Sodobni brskalnik (Chrome, Firefox, Edge, Safari)
- Backend mora teči na http://localhost:8080** (glej backend README)

# Namestitev
- Kloniraj repozitorij (git clone <URL_REPOZITORIJA> in cd <IME_MAPE>)
- Namesti odvisnosti (npm install ali yarn install)
- Zagon aplikacije (npm start ali yarn start)
- Pred uporabo frontenda vedno najprej zaženi backend!

Aplikacija se bo odprla na http://localhost:3000 v tvojem brskalniku.

# Uporaba
- Klikni + Dodaj za ustvarjanje nove aktivnosti.
- Vnesi ime aktivnosti (obvezno), opis (neobvezno), datum (neobvezno), trajanje v minutah (neobvezno) in kategorijo.
- Aktivnosti lahko urejaš ali izbrišeš s klikom na gumbe na kartici.
- Aktivnosti, ki so danes ali v naslednjih 48 urah, so obarvane rdeče.
- Pretekle aktivnosti se samodejno odstranijo vsak dan ob polnoči.

# Uporabljene tehnologije
- React 18
- CSS3 (Glassmorphism dizajn)
- Fetch API za komunikacijo z backend-om