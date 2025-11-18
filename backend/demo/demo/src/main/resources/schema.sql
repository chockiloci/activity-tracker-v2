-- izbriše tabelo 'activity', če obstaja.
-- CASCADE pomeni, da se izbrišejo tudi vsi odvisni objekti (FK, itd.)
DROP TABLE IF EXISTS activity CASCADE;

CREATE TABLE activity (
    -- ID primarni ključ, samodejno inkrementiranje (H2 podpira AUTO_INCREMENT)
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    -- ime ne sme biti NULL
    -- CHECK: TRIM(name) <> '' prepreči prazne nize (enako kot @NotBlank)
    name VARCHAR(255) NOT NULL CHECK (TRIM(name) <> ''),

    -- neobvezno polje; dovoli NULL
    description VARCHAR(1000) NULL,

    -- datum je lahko NULL (npr. če še ni določen)
    -- OPOMBA: to NE preverja "future or present" – to dela Java validacija
    date DATE NULL,

    -- če je duration NULL → dovoljeno
    -- če NI NULL → mora biti >= 1 (enako kot @Min(1))
    duration INTEGER NULL CHECK (duration IS NULL OR duration >= 1),

    -- kategorija mora biti ne-prazna (enako kot @NotBlank)
    category VARCHAR(255) NOT NULL CHECK (TRIM(category) <> '')
    
);