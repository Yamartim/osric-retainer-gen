//PARA TESTES NO NODEJS
//const {races_gosterwick, classes, classes_rare } = require("./data");

//console.log(races_gosterwick);
//console.log(classes);
//console.log(classes_rare);
//console.log("teste: ", generateCharacter());

let races_gosterwick, classes, classes_rare;

fetch("./data.json")
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        races_gosterwick = data.races_gosterwick;
        classes = data.classes;
        classes_rare = data.classes_rare;
    })

function rollAbilityScore() {
    let result = Math.floor(Math.random() * 6) + 1
                + Math.floor(Math.random() * 6) + 1
                + Math.floor(Math.random() * 6) + 1;
    return result;
}

function rollRace(){
    const total = races_gosterwick.reduce((sum, item) => sum + item.chance, 0)

    let roll = Math.random() * total+1;

    for (const item of races_gosterwick) {
        roll -= item.chance;
        if (roll <= 0) return item.name;
    }
    return races_gosterwick[0].name; // Fallback

}

function rollClass(){
    const total = classes.reduce((sum, item) => sum + item.chance, 0)

    let roll = Math.floor(Math.random() * total)+1;

    let result = "";
    for (const item of classes) {
        roll -= item.chance;
        if (roll <= 0) {
            result = item.name;
            break;
        }
    }

    let rare = false;
    for (const rclass of classes_rare) {
        if (result === rclass.base)
        {
            rare = (Math.floor(Math.random() * rclass.chance_in)) == 0
            if (rare) {
                result = result + " - " + rclass.name.toUpperCase();
                break;
            }
        }
    }
    console.log(result)
    return result;
}

// Generate a single character
function generateCharacter() {
    const race = rollRace().toUpperCase();
    const cclass = rollClass();

    // Ability scores
    const abilities = {
        Strength: rollAbilityScore(),
        Dexterity: rollAbilityScore(),
        Constitution: rollAbilityScore(),
        Intelligence: rollAbilityScore(),
        Wisdom: rollAbilityScore(),
        Charisma: rollAbilityScore()
    };

    return { race, cclass, abilities };
}

// Generate and display characters
function generateCharacters() {
    const count = parseInt(document.getElementById("characterCount").value) || 1;
    const container = document.getElementById("charactersContainer");
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const character = generateCharacter();
        const card = document.createElement("div");

        card.innerHTML = `
            <div class="bg-osric-parchment p-6 rounded-lg border-2 border-osric-gold shadow-md w-full md:w-72">
                <div class="border-b border-osric-gold pb-2 mb-4">
                <h2 class="text-xl font-bold text-osric-red">${character.race}<br>${character.cclass}</h2>
                <p class="text-sm text-osric-red/80">Level 1</p>
                </div>

                <h3 class="font-bold text-osric-red mb-3 text-sm uppercase tracking-wider">Abilities</h3>
                <div class="grid grid-cols-3 gap-2 mb-3">
                ${Object.entries(character.abilities)
                    .slice(0, 3) // First row: STR, DEX, CON
                    .map(([name, score]) => `
                    <div class="text-center">
                        <div class="text-xs font-semibold text-osric-red/80">${name}</div>
                        <div class="text-lg font-bold">${score}</div>
                    </div>
                    `).join("")}
                </div>
                <div class="grid grid-cols-3 gap-2 mb-4">
                ${Object.entries(character.abilities)
                    .slice(3) // Second row: INT, WIS, CHA
                    .map(([name, score]) => `
                    <div class="text-center">
                        <div class="text-xs font-semibold text-osric-red/80">${name}</div>
                        <div class="text-lg font-bold">${score}</div>
                    </div>
                    `).join("")}
                </div>
            </div>
            `;

        container.appendChild(card);
    }
}