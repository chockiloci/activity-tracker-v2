# Activity Tracker - Backend

Backend za **Activity Tracker** aplikacijo. Implementiran v **Spring Boot** z uporabo **JPA/Hibernate** za dostop do baze podatkov.

## Funkcionalnosti
- CRUD operacije za aktivnosti:
  - Pridobivanje vseh aktivnosti (`GET /api/activities`)
  - Dodajanje nove aktivnosti (`POST /api/activities`)
  - Posodabljanje aktivnosti (`PUT /api/activities/{id}`)
  - Brisanje aktivnosti (`DELETE /api/activities/{id}`)
- Podpora za **Cross-Origin Requests** iz frontenda (`http://localhost:3000`)
- **Validacija podatkov** na backend strani

## Zahteve
- Java 17 ali novejša
- Maven 3 ali Gradle lahko pa tudi Visual Studio Code z Java Extension Pack (za razvoj in zagon preko IDE)
- Baza podatkov (H2 za razvoj, PostgreSQL ali MySQL za produkcijo)

## Namestitev in zagon
- Kloniraj repozitorij:
git clone <URL_REPOZITORIJA>
cd <backend-mapa>
- zagon aplikacije ./mvnw spring-boot:run

## Zagon preko Visual Studio Code
1. Odpri **VS Code** in izberi mapo backend projekta.
2. Prepričaj se, da imaš nameščen **Java Extension Pack**.
3. V **Explorerju** poišči datoteko `DemoApplication.java` (v `src/main/java/com/example/demo/`).
4. Klikni **Run** (zelena puščica nad `main` metodo) ali pritisni **F5**.
5. Aplikacija se bo zagnala, REST API pa bo dosegljiv na [http://localhost:8080](http://localhost:8080).

## Baza podatkov
Aplikacija uporablja **H2** datotečno bazo, kar pomeni, da se podatki ohranijo tudi po ponovnem zagonu.

## Dostop do H2 Console:
1. Pojdite na [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
2. Nastavitve povezave:
   - **JDBC URL**: `jdbc:h2:file:./data/activitiesdb`
   - **User Name**: `sa`
   - **Password**: (pustite prazno)
3. Kliknite **Connect**

## Lokacija podatkov:
- Podatki se shranjujejo v mapo `./data/` v korenu projekta.
- **Opomba**: Če želite izbrisati vse podatke, izbrišite mapo `data/`.

##  UREJANJE PODATKOV PREKO H2 BAZE
## Validacijska pravila:
- **name**: Obvezno, ne sme biti prazno
- **category**: Obvezno, ne sme biti prazno
- **date**: Mora biti danes ali v prihodnosti (opcijsko polje - morate vpisati 'null' če datuma ne želite določiti)
- **duration**: Mora biti vsaj 1 minuta (opcijsko polje - morate vpisati 'null' če trajanja ne želite določiti)
- **description**: Opcijsko (lahko pustite popolnoma prazno)

## POMEMBNO 
**Format datuma**
- H2 baza zahteva **SQL format datuma**: `YYYY-MM-DD` (npr. `2025-11-17`) !
- NE uporabljajte: `17.11.2025` ali `17/11/2025`

**Baza NE more preprečiti:**
- Pretekle datume (to preverja samo API) če vnesete pretekli datum direktno v H2 ta aktivnost NE bo prikazana na frontend-u (frontend jih filtrira). 

**Priporočilo:** Za normalno uporabo uporabljajte frontend aplikacijo.