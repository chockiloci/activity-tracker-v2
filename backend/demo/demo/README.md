# Activity Tracker - Backend

Backend za **Activity Tracker** aplikacijo. Implementiran v **Spring Boot** z uporabo **JPA/Hibernate** za dostop do baze podatkov.

## Funkcionalnosti

- CRUD operacije za aktivnosti:
  - Pridobivanje vseh aktivnosti (`GET /api/activities`)
  - Dodajanje nove aktivnosti (`POST /api/activities`)
  - Posodabljanje aktivnosti (`PUT /api/activities/{id}`)
  - Brisanje aktivnosti (`DELETE /api/activities/{id}`)
- Podpora za **Cross-Origin Requests** iz frontenda (`http://localhost:3000`)


## Zahteve

- Java 17 ali novejša
- Maven 3 ali Gradle lahko pa tudi Visual Studio Code z Java Extension Pack (za razvoj in zagon preko IDE)
- Baza podatkov (H2 za razvoj, PostgreSQL ali MySQL za produkcijo)

## Namestitev in zagon

- Kloniraj repozitorij:
git clone <URL_REPOZITORIJA>
cd <backend-mapa>
- zagon aplikacije ./mvnw spring-boot:run

### Zagon preko Visual Studio Code

1. Odpri **VS Code** in izberi mapo backend projekta.
2. Prepričaj se, da imaš nameščen **Java Extension Pack**.
3. V **Explorerju** poišči datoteko `DemoApplication.java` (v `src/main/java/com/example/demo/`).
4. Klikni **Run** (zelena puščica nad `main` metodo) ali pritisni **F5**.
5. Aplikacija se bo zagnala, REST API pa bo dosegljiv na [http://localhost:8080](http://localhost:8080).