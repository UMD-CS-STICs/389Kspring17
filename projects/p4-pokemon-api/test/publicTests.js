var request = require('request');
var pokeDataUtil = require('../poke-data-util');
var assert = require('assert');
var fs = require('fs');
var _ = require("underscore");
var PORT = require('../index').PORT;
var URL = `http://localhost:${PORT}`

/*
 * Please do not modify this file at all. 
 * Navigate to the main directory of your project, and run `npm test`.
 * Please make sure the server is not running, and you close any other application
 * that could be using port 3000. If you do not do this, the tests will not work.
 *
 */

describe('evochain', function() {
    pokeDataUtil.restoreOriginalData();
    it('(1 pts.) no pokemon', function(done) {
        request(`${URL}/api/evochain/notapokemon`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), []);
            done();
        });
    });
    it('(4 pts.) sandslash - 2 pokemon', function(done) {
        request(`${URL}/api/evochain/Sandslash`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), ['Sandshrew', 'Sandslash']);
            done();
        });
    });
    it('(4 pts.) magmar - 1 pokemon', function(done) {
        request(`${URL}/api/evochain/Magmar`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), ['Magmar']);
            done();
        });
    });
});

describe('get pokemon by id', function() {
    pokeDataUtil.restoreOriginalData();
    it('(1 pts.) not a real id', function(done) {
        request(`${URL}/api/id/notanid`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), {});
            done();
        });
    });
    it('(9 pts.) get squirtle id 7', function(done) {
        request(`${URL}/api/id/7`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), {
                "id": 7,
                "num": "007",
                "name": "Squirtle",
                "img": "http://www.serebii.net/pokemongo/pokemon/007.png",
                "type": ["Water"],
                "height": "0.51 m",
                "weight": "9.0 kg",
                "candy": "Squirtle Candy",
                "candy_count": 25,
                "egg": "2 km",
                "spawn_chance": 0.58,
                "avg_spawns": 58,
                "spawn_time": "04:25",
                "multipliers": [2.1],
                "weaknesses": ["Electric", "Grass"],
                "next_evolution": [{ "num": "008", "name": "Wartortle" }, { "num": "009", "name": "Blastoise" }]
            });
            done();
        });
    });
});

describe('list of pokemon of certain type', function() {
    pokeDataUtil.restoreOriginalData();
    it('(1 pts.) not a real type', function(done) {
        request(`${URL}/api/type/notatype`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), []);
            done();
        });
    });
    it('(9 pts.) fighting type', function(done) {
        request(`${URL}/api/type/Fighting`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), ["Mankey", "Primeape", "Poliwrath", "Machop", "Machoke", "Machamp", "Hitmonlee", "Hitmonchan"]);
            done();
        });
    });
});

describe('heaviest', function() {
    pokeDataUtil.restoreOriginalData();
    it('(1 pts.) not a real type', function(done) {
        request(`${URL}/api/type/notatype/heaviest`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), {});
            done();
        });
    });
    it('(9 pts.) water type', function(done) {
        request(`${URL}/api/type/Water/heaviest`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), { "name": "Gyarados", "weight": 235 });
            done();
        });
    });
});

describe('add weaknesses', function() {
    var desired = {
        "name": "Squirtle",
        "weaknesses": [
            "Electric",
            "Grass",
            "Ishaan"
        ]
    };
    pokeDataUtil.restoreOriginalData();
    it('(1 pts.) add weakness "Ishaan" to notapokemon', function(done) {
        request.post(`${URL}/api/weakness/notapokemon/add/Ishaan`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), {});
            done();
        });
    });
    it('(4 pts.) add weakness "Ishaan" to Squirtle', function(done) {
        request.post(`${URL}/api/weakness/Squirtle/add/Ishaan`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), desired);
            var result = _.findWhere(pokeDataUtil.loadData().pokemon, { name: 'Squirtle' });
            assert.deepEqual(result.weaknesses, desired.weaknesses);
            done();
        });
    });
    it('(4 pts.) add duplicate weakness "Ishaan" to Squirtle', function(done) {
        request.post(`${URL}/api/weakness/Squirtle/add/Ishaan`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), desired);
            var result = _.findWhere(pokeDataUtil.loadData().pokemon, { name: 'Squirtle' });
            assert.deepEqual(result.weaknesses, desired.weaknesses);
            done();
        });
    });
});

describe('delete weaknesses', function() {
    var desired = {
        "name": "Squirtle",
        "weaknesses": [
            "Electric",
            "Grass"
        ]
    };
    it('(1 pts.) delete weakness "Ishaan" from Squirtle (weakness exists)', function(done) {
        request.delete(`${URL}/api/weakness/Squirtle/remove/Ishaan`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), desired);
            var result = _.findWhere(pokeDataUtil.loadData().pokemon, { name: 'Squirtle' });
            assert.deepEqual(result.weaknesses, desired.weaknesses);
            done();
        });
    });
    it('(4 pts.) delete weakness "Ishaan" from Squirtle (weakness does not exist)', function(done) {
        request.delete(`${URL}/api/weakness/Squirtle/remove/Ishaan`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), desired);
            var result = _.findWhere(pokeDataUtil.loadData().pokemon, { name: 'Squirtle' });
            assert.deepEqual(result.weaknesses, desired.weaknesses);
            done();
        });
    });
    it('(4 pts.) delete weakness "Ishaan" from notapokemon', function(done) {
        request.delete(`${URL}/api/weakness/notapokemon/remove/Ishaan`, function(err, res, body) {
            if (err) done(err);
            assert.deepEqual(JSON.parse(body), {});
            assert.deepEqual(pokeDataUtil.loadData().pokemon, JSON.parse(fs.readFileSync('./poke_original.json')).pokemon);
            done();
        });
    });
});
