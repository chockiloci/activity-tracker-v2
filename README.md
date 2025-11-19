# Activity Tracker 🗓️
**Tvoj osebni pomočnik za bolj organiziran dan.**
Activity Tracker je aplikacija za beleženje, urejanje in brisanje aktivnosti. Samodejno odstrani pretekle aktivnosti in poudari tiste, ki so v naslednjih 48 urah.


##  Namembnost
- **Beleženje aktivnosti**: Vnesi ime, opis, datum, trajanje in kategorijo
- **Avtomatsko brisanje**: Pretekle aktivnosti se izbrišejo ob polnoči
- **Vizualna opozorila**: Aktivnosti v naslednjih 48 urah so obarvane rdeče
- **Organizacija**: Aktivnosti so razvrščene po datumu, nato aktivnosti brez datuma
- **Trajno shranjevanje**: Podatki se shranjujejo v H2 bazo in ostanejo ob ponovnem zagonu


## Zahteve
### Frontend
- **Node.js** (verzija 16 ali novejša)
- **npm** ali **yarn**
- Sodoben brskalnik (Chrome, Firefox, Edge, Safari)

### Backend
- **Java 17** ali novejša
- **Maven 3** ali **Visual Studio Code** z **Java Extension Pack**


## Namestitev in zagon
### Kloniraj repozitorij
```bash
git clone 
cd activity-tracker-v2
```


###  **NAJPREJ** zaženi **Backend** ⚠️
**Backend mora teči, da se podatki shranjujejo! Brez njega frontend ne bo deloval pravilno.**

#### **Opcija A: Zagon preko CMD terminala (Maven)**
```bash
cd activity-tracker-v2
cd backend
mvnw spring-boot:run
```

#### **Opcija B: Zagon preko Visual Studio Code**
1. Odpri **VS Code** in izberi mapo `backend`
2. Prepričaj se, da imaš nameščen **Java Extension Pack**
3. V **Explorerju** poišči `DemoApplication.java` (v `src/main/java/com/example/demo/`)
4. Klikni **Run** (zelena puščica nad `main` metodo) ali pritisni **F5**

Backend bo dosegljiv na: **http://localhost:8080**


### 3️⃣ Zaženi Frontend
V **novem terminalu**:

```bash
cd activity-tracker-v2
cd frontend
cd activity-tracker
npm install
npm start
```

Aplikacija se bo odprla na: **http://localhost:3000**


##  Baza podatkov (H2)
Backend uporablja **H2 datotečno bazo**, kar pomeni, da se podatki **trajno shranjujejo** in ostanejo ob ponovnem zagonu.

### Dostop do H2 konzole:
1. Pojdi na: **http://localhost:8080/h2-console**
2. Nastavitve povezave:
   - **JDBC URL**: `jdbc:h2:file:./data/activitiesdb`
   - **User Name**: `sa`
   - **Password**: (pustite prazno)
3. Klikni **Connect**

### Lokacija podatkov:
- Podatki se shranjujejo v mapo `./backend/data/`
- Če želite izbrisati vse podatke, izbrišite mapo `data/`

### Validacijska pravila v bazi:
- **name**: Obvezno, ne sme biti prazno
- **category**: Obvezno, ne sme biti prazno
- **date**: Mora biti danes ali v prihodnosti (opcijsko - vpišite `null` če datuma ne želite določiti)
- **duration**: Mora biti vsaj 1 minuta (opcijsko - vpišite `null` če trajanja ne želite določiti)
- **description**: Opcijsko (lahko pustite popolnoma prazno)

**Format datuma v H2**: `YYYY-MM-DD` (npr. `2025-11-19`)

**Priporočilo**: Za normalno uporabo uporabljajte frontend aplikacijo.


## Uporaba aplikacije
1. Klikni **+ Dodaj** za ustvarjanje nove aktivnosti
2. Vnesi:
   - **Ime aktivnosti** (obvezno)
   - **Opis** (neobvezno)
   - **Datum** (neobvezno)
   - **Trajanje v minutah** (neobvezno)
   - **Kategorija** (Hobi, Šola, Služba ali Drugo)
3. Aktivnosti lahko urejaš ali izbrišeš s klikom na gumbe
4. **Rdeče obarvane aktivnosti** so danes ali v naslednjih 48 urah
5. Pretekle aktivnosti se **samodejno odstranijo** vsak dan ob polnoči


## Uporabljene tehnologije
### Frontend
- **React 18**
- **CSS3** (Glassmorphism dizajn)
- **Fetch API** za komunikacijo z backendom

### Backend
- **Spring Boot 3.4.11**
- **Spring Data JPA / Hibernate**
- **H2 Database** (file-based)
- **Bean Validation** (Jakarta)
- **Maven**


##  Struktura projekta
```
activity-tracker-v2/
├── frontend/
│   └── activity-tracker/
│       ├── src/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   └── components/
│       │       └── ActivityCard.jsx
│       └── package.json
├── backend/
│   ├── src/main/java/com/example/demo/
│   │   ├── DemoApplication.java
│   │   ├── controller/ActivityController.java
│   │   ├── model/Activity.java
│   │   ├── repository/ActivityRepository.java
│   │   └── exception/GlobalExceptionHandler.java
│   ├── src/main/resources/
│   │   └── application.yaml
│   └── pom.xml
└── README.md
```

## Pomembno
- **Backend mora teči**, da se podatki shranjujejo!
- Brez backenda frontend ne bo deloval pravilno
- Aktivnosti brez datuma se prikažejo **po** aktivnostih z datumom
- Pretekli datumi v H2 se **ne prikažejo** na frontendu (frontend jih filtrira)


## Težave?
Če frontend ne prikazuje aktivnosti:
1. Preveri, ali backend teče na **http://localhost:8080**
2. Preveri konzolo v brskalniku (F12) za napake
3. Preveri backend konzolo za napake
4. Preveri H2 konzolo, ali tabela `activity` obstaja


##  Licenca
Ta projekt je namenjen izobraževalnim namenom.