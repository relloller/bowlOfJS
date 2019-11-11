//validation occurs on subsequent frame parsing

function frameParse(scoreArr) {
    let n = 0;
    let score = 0;
    let frames = [];
    let frameScoreStatus;
    for (let frame = 0; frame < 10; frame++) {

        if (scoreArr[n] === 'x') { // strike
            frameScoreStatus = 'Strike';
            frames.push([scoreArr[n]]);
            score = strike(scoreArr[n + 1], scoreArr[n + 2], score);
            n += 1
        } else if (Number.isInteger(scoreArr[n]) && scoreArr[n + 1] === '/') { //spare
            frameScoreStatus = 'Spare';
            frames.push([scoreArr[n], scoreArr[n + 1]]);
            score = spare(scoreArr[n + 2], score);
            n += 2;
        } else if (Number.isInteger(scoreArr[n]) && Number.isInteger(scoreArr[n + 1])) { //reg - less than 10 pins 
            frameScoreStatus = 'Less10';
            frames.push([scoreArr[n], scoreArr[n + 1]]);
            score = lt10(scoreArr[n], scoreArr[n + 1], score);
            n += 2;
        } else {
            throw new Error('invalid frame sequence');
        }

        if (frame === 9) {
            if (frameScoreStatus === 'Strike' && n + 2 === scoreArr.length) frames[9].push(scoreArr[n], scoreArr[n + 1]);
            else if (frameScoreStatus === 'Spare' && n + 1 === scoreArr.length) frames[9].push(scoreArr[n]);
            else if (frameScoreStatus === 'Less10' && n === scoreArr.length) true;
            else throw new Error('invalid frame sequence - extra scores');
        }
    }
    return score;
}


function strike(p1, p2, score) {
    score += 10;
    if (p1 === 'x') score += 10;
    else score += p1;

    if (p2 === 'x') score += 10;
    else if (p2 === '/') score += 10 - p1;
    else score += p2;
    return score;
}

function spare(p, score) {
    score += 10;
    if (p === 'x') score += 10;
    else score += p;
    return score;
}

function lt10(p1, p2, score) {
    score += p1 + p2;
    return score;
}

module.exports = frameParse;
