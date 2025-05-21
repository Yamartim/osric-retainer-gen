// Data pools
const races_gosterwick = [
    {name: "Archontean", chance: 40},
    {name: "Thorcin", chance: 40},
    {name: "Wiskin", chance: 15},
    {name: "demi-human", chance: 5},

];

const classes = [
    {name: "fighter", chance: 40},
    {name: "magic user", chance: 20},
    {name: "cleric", chance: 20},
    {name: "thief", chance: 20},

];

const classes_rare = [
    {base: "fighter", name: "paladin", chance_in: 10},
    {base: "fighter", name: "ranger", chance_in: 10},
    {base: "magic user", name: "illusionist", chance_in: 6},
    {base: "cleric", name: "druid", chance_in: 6},
    {base: "thief", name: "assassin", chance_in: 6},
];


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
                result = result + " - " + rclass.name;
                break;
            }
        }
    }
    console.log(result)
    return result;
}

// Generate a single character
function generateCharacter() {
    const race = rollRace();
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