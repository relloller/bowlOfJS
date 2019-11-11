let frameParse = require('./bowlscore.js');
const assert = require('assert');

let validScore0 = [3, 5, 8, '/', 6, '/', 'x', 'x', 'x', 5, '/', 'x', 2, 7, 3, '/', 2];
let validScore1 = [3, 5, 8, '/', 6, '/', 'x', 'x', 'x', 5, '/', 'x', 2, 7, 'x', 1, 2,];
let invalidExtraScores0 = [3, 5, 8, '/', 6, '/', 'x', 'x', 'x', 5, '/', 'x', 2, 7, 'x', 1, 2, 3];
let invalidExtraScores1 = [3, 5, 8, '/', 6, '/', 'x', 'x', 'x', 5, '/', 'x', 2, 7, 3, '/', 2, 1];
let invalidFrames = [3, 'x', 8, '/', 6, '/', 'x', 'x', 'x', 5, '/', 'x', 2, 7, 3, '/', 2, 1];
let perfectGame = ['x','x','x','x','x','x','x','x','x','x','x','x'];


assert.equal(300, frameParse(perfectGame));  
assert.equal(179, frameParse(validScore0));
assert.equal(180, frameParse(validScore1));
assert.throws(function() {return frameParse(invalidExtraScores0)} , /invalid frame sequence - extra scores$/);
assert.throws(function() {return frameParse(invalidExtraScores1)} , /invalid frame sequence - extra scores$/);
assert.throws(function() {return frameParse(invalidFrames)}, /invalid frame sequence$/);
