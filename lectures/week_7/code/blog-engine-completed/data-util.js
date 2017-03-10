var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {
    // poke.json stores the pokemon array under key "pokemon", 
    // so we are recreating the same structure with this object
    var obj = {
        blog_posts: data
    };

    fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getAllTags(data) {
    var allTags = [];
    for(var i = 0; i < data.length; i++) {
        var tags = data[i].tags;
        for(var j = 0; j < tags.length; j++) {
            if(!~allTags.indexOf(tags[j])) allTags.push(tags[j]);
        }
    }
    return allTags;
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    getAllTags: getAllTags
}
