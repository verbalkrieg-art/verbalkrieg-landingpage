import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("index.html","utf8");
const readme=fs.readFileSync("README.md","utf8");
const script=fs.readFileSync("app.js","utf8");

for(const text of ["WAS WIRD BEHAUPTET?","WAS HÄLT STAND?","WAS KÖNNTE","DARAUS FOLGEN?"])assert.ok(html.includes(text),`Produktbotschaft fehlt: ${text}`);
for(const text of ["URL","TEXT","SCREENSHOT","FOTO"])assert.match(html,new RegExp(`<b>${text}<\\/b>`),`Eingabeart fehlt: ${text}`);
assert.match(html,/Vor deiner Bestätigung findet keine KI-Analyse statt\./);
assert.match(html,/Die aktuelle Alpha analysiert die Struktur eines Beitrags\./);
assert.match(html,/Vertiefte Quellenprüfung[\s\S]{0,120}FOLGT MIT M6/);
assert.match(html,/„Mögliche Folgen“ ist in Version 0\.7\.0-alpha noch nicht aktiv\./);
assert.match(html,/GESCHLOSSENE ALPHA · VERSION 0\.7\.0/);
assert.match(readme,/Version 0\.7\.0 Alpha/);
assert.match(script,/AUSSAGEN WERDEN GETRENNT/);

for(const obsolete of ["DEBATTE VORBEREITEN","PERSPEKTIVEN WÄHLEN","UNTERHALTSAME DUELLE","EINE FRAGE EINREICHEN","CLAIM LEDGER & EVIDENCE"])assert.ok(!html.includes(obsolete),`Alter Debatten-Einstieg ist noch sichtbar: ${obsolete}`);
assert.equal((html.match(/class="entryChoiceGrid focusEntry"/g)||[]).length,1);
assert.equal((html.match(/<article><span>01<\/span><small>MEDIENBEITRAG<\/small>/g)||[]).length,1);
assert.match(html,/https:\/\/app\.verbalkrieg\.de\/akten\/medienakten/);

console.log("Landingpage-Vertrag: Medienfokus, ehrliche Alpha-Grenzen und Version 0.7.0 bestätigt.");
