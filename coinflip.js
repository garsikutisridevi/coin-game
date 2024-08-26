
// coinflip.js

export function flipCoin() {
    return Math.random() < 0.5 ? 'heads' : 'tails';
}

export function checkWin(selectedSide, flipResult) {
    return selectedSide === flipResult;
}