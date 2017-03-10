var fs = require('fs');

function loadData() {
    return JSON.parse(fs.readFileSync('data.json'));
}

function saveData(data) {

    var obj = {
        blog_posts: data
    };

    fs.writeFileSync('data.json', JSON.stringify(obj));
}

function getAllTags(data) {
    return [];
}

module.exports = {
    loadData: loadData,
    saveData: saveData,
    getAllTags: getAllTags
}
