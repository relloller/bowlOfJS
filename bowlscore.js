



//validation occurs on subsequent frame parsing
let score = 0;
function frameParse(scoreArr) {
	let n = 0;
	score=0;
	let frames = [];
	let frameScoreStatus;
    for (let frame = 0; frame < 10; frame++) {
        if (scoreArr[n] === 'x') { // strike
        	frameScoreStatus = 'Strike';
        	frames.push([scoreArr[n]]);
        	strike(scoreArr[n + 1], scoreArr[n + 2]);
            n += 1
        } else if (Number.isInteger(scoreArr[n]) && scoreArr[n + 1] === '/') { //spare
        	frameScoreStatus = 'Spare';
        	frames.push([scoreArr[n], scoreArr[n+1]]);
            spare(scoreArr[n + 2]);
            n += 2;
        } else if (Number.isInteger(scoreArr[n]) && Number.isInteger(scoreArr[n+1])) { //reg - less than 10 pins 
        	frameScoreStatus = 'Less10';
        	frames.push([scoreArr[n], scoreArr[n+1]]);
            lt10(scoreArr[n], scoreArr[n + 1]);
            n += 2;
        } 
        else {
        	throw new Error('invalid frame sequence');
        }

    	if(frame === 9) {
			if( frameScoreStatus === 'Strike' && n + 2 === scoreArr.length) frames[9].push(scoreArr[n], scoreArr[n+1]);
			else if( frameScoreStatus === 'Spare' && n + 1 === scoreArr.length) frames[9].push(scoreArr[n]);
			else if( frameScoreStatus === 'Less10' && n === scoreArr.length) true;
			else throw new Error('invalid frame sequence - extra scores');
		}
    }
        return score;
}


function strike(p1, p2) {           
    score += 10;
    if (p1 === 'x') score += 10;
    else score += p1;

    if (p2 === 'x') score += 10;
    else if (p2 === '/') score += 10 - p1;
    else score += p2;
}

function spare(p) {
    score += 10;
    if (p === 'x') score += 10;
    else score += p;
}

function lt10(p1, p2) {
    score += p1 + p2;
}

module.exports = frameParse;