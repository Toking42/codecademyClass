const db = require('./db')


let defaultZutaten = [
"Mehl",
"Zucker",
"Milch",
"Wasser",
"Rotwein",
"Weißwein",
"Gemüsebrühe",
"Puderzucker",
"Vanillezucker",
"Salz",
"Pfeffer",
"Paprika",
"Kräuter der Provence",
"Basilikum",
"Weißbrot",
"Kartoffeln",
"Kartoffeln (mehlig)",
"Kartoffeln (festkochend)",
"Reis",
"Nudeln",
"Kroketten",
"Spätzle",
"Hähnchenbrustfilet",
"Putenschnitzel",
"Rindfleisch",
"Kalbfleisch",
"Rindersteak",
"Rinderhackfleisch",
"Hackfleisch gemischt",
"Schweineschnitzel",
"Schweinekotelett",
"Ente",
"Gans",
"Käse",
"Frischkäse",
"Kräuterquark",
"Quark",
"Mozzarella",
"Parmesan",
"Speisequark (40 % Fett)",
"Camembert",
"Gouda",
"Edamer",
"Raclette",
"Mascarpone",
"Schinken (gekocht)",
"Schinken (roh)",
"Schinken (geräuchert)",
"Salami",
"Oliven schwarz",
"Butter",
"Butterschmalz",
"Olivenöl",
"Rapsöl",
"Sonnenblumenöl",
"Margarine",
"Honig",
"Marmelade",
"Konfitüre",
"Nussnougatcreme",
"Eier",
"Joghurt, 1,5 % Fett",
"Joghurt, 3,5 % Fett",
"Seelachs",
"Zander",
"Kabeljau",
"Garnelen",
"Krabben",
"Forelle",
"Makrele",
"Lachs",
"Lachs (geräuchert)",
"Heringsfilet",
"passierte Tomaten",
"Saure Sahne",
"Pesto (rot)",
"Pesto (grün)",
"Mayonnaise",
"Sahne",
"Crème fraiche",
"Nüsse",
"Mandeln",
"Apfelmus",
"Preiselbeeren",
"Schokolade (Vollmilch)",
"Schokolade (Zartbitter)",
"Kuvertüre (Vollmilch)",
"Kuvertüre (Zartbitter)",
"Marzipan",
"Hefe"
];

let defaultSchwierigkeiten = [
  "leicht",
  "mittel",
  "anspruchsvoll"
];


let defaultWertungskategorien = [
  { "name":"Gesamtwertung",
    "schluessel":"sum"},
  { "name":"Kosten",
    "schluessel":"kosten"}

];

const makeKey = (input) => {
  let result = input.toLowerCase();
  result = result.replace(/[\(\)]/g,"");
  result = result.replace(/[%,. ]/g,"_");
  return result;
  //console.log(result);

}

for(let i = 0; i<defaultSchwierigkeiten.length; i++) {
  let query = "INSERT INTO schwierigkeit (name, schluessel) "+
    "VALUES ($1, $2) returning *";
 db.query(query, [defaultSchwierigkeiten[i], makeKey(defaultSchwierigkeiten[i])], (err, rs) => {
   console.log(err);
 })
}

for(let i = 0; i<defaultWertungskategorien.length; i++) {
  let query = "INSERT INTO wertungkategorie (name, schluessel) "+
    "VALUES ($1, $2) returning *";
 db.query(query, [defaultWertungskategorien[i]['name'], makeKey(defaultWertungskategorien[i]['schluessel'])], (err, rs) => {
   console.log(err);
 })
}


for(let i = 0; i<defaultZutaten.length; i++) {
  let query = "INSERT INTO zutat (name, schluessel) "+
    "VALUES ($1, $2) returning *";
 db.query(query, [defaultZutaten[i], makeKey(defaultZutaten[i])], (err, rs) => {
   console.log(err);
 })
}
