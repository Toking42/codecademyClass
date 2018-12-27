// Todo Implement Database Connection




db.serialize(function() {
db.run("CREATE TABLE" +"    IF NOT EXISTS zutat" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS einheit" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS geraet" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS kategorie" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS wertungkategorie" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS schwierigkeit" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        schwierigkeit bigint NOT NULL REFERENCES schwierigkeit(id)," +
"        name text NOT NULL," +
"        portionen NUMERIC NOT NULL DEFAULT 4.0," +
"        nutzer bigint NOT NULL REFERENCES nutzer(id)," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept_dauer" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        dauer interval NOT NULL," +
"        name text NOT NULL," +
"        sort INT NOT NULL DEFAULT 0," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept_zutat" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        einheit bigint NOT NULL REFERENCES einheit(id)," +
"        zutat bigint NOT NULL REFERENCES zutat(id)," +
"        menge NUMERIC" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept_geraet" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        einheit bigint NOT NULL REFERENCES einheit(id)," +
"        geraet bigint NOT NULL REFERENCES geraet(id)," +
"        menge NUMERIC" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept_schritt" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        sort INT NOT NULL DEFAULT 0," +
"        name text NOT NULL," +
"        beschreibung text NOT NULL" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept_kategorie" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        kategorie bigint NOT NULL REFERENCES kategorie(id)," +
"        modifikator NUMERIC NOT NULL DEFAULT 1," +
"        beschreibung text NOT NULL" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS nutzer" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        name text NOT NULL," +
"        email text NOT NULL," +
"        kennwort text NOT NULL," +
"        beschreibung text NOT NULL" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rolle" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        schluessel text NOT NULL," +
"        name text NOT NULL," +
"        beschreibung text" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS nutzer_rolle" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        nutzer bigint NOT NULL REFERENCES nutzer(id)," +
"        rolle bigint NOT NULL REFERENCES rolle(id)," +
"        beschreibung text NOT NULL" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS nutzer_favorit" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        nutzer bigint NOT NULL REFERENCES nutzer(id)," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        beschreibung text NOT NULL" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS rezept_wertung" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        nutzer bigint NOT NULL REFERENCES nutzer(id)," +
"        rezept bigint NOT NULL REFERENCES rezept(id)," +
"        wertungkategorie bigint NOT NULL REFERENCES wertungkategorie(id)," +
"        wert INTEGER NOT NULL DEFAULT 5," +
"        beschreibung text NOT NULL" +
"    );" +

);
db.run("CREATE TABLE" +"    IF NOT EXISTS nutzer_kommentar" +
"    (" +
"        id bigserial PRIMARY KEY," +
"        nutzer bigint NOT NULL REFERENCES nutzer(id)," +
"        relation text NOT NULL," +
"        relation_id bigint NOT NULL," +
"        beschreibung text NOT NULL" +
    );

db.run("CREATE UNIQUE INDEX idx_geraet_schluessel ON geraet (schluessel);");
db.run("CREATE UNIQUE INDEX idx_einheit_schluessel ON einheit (schluessel);");
db.run("CREATE UNIQUE INDEX idx_kategorie_schluessel ON kategorie (schluessel);");
db.run("CREATE UNIQUE INDEX idx_schwierigket_schluessel ON schwierigkeit (schluessel);");
db.run("CREATE UNIQUE INDEX idx_zutat_schluessel ON zutat (schluessel);");
db.run("CREATE UNIQUE INDEX idx_rezept_schluessel ON rezept (schluessel);");
db.run("CREATE UNIQUE INDEX idx_nutzer_email ON nutzer (email);");


    );
};
