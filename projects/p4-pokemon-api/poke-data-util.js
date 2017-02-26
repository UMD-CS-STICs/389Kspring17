var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('poke.json', fs.readFileSync('poke_original.json'));
}

function loadData() {
    return JSON.parse(fs.readFileSync('poke.json'));
}

function saveData(data) {
	// poke.json stores the pokemon array under key "pokemon", 
	// so we are recreating the same structure with this object
	var obj = {
		pokemon: data
	};

	fs.writeFileSync('poke.json', JSON.stringify(obj));
}

module.exports = {
    restoreOriginalData: restoreOriginalData,
    loadData: loadData,
    saveData: saveData,
}
