// Sound effects
const winSound = new Audio('win-sound.wav');
const loseSound = new Audio('fail-sound.mp3');

// Variables to keep track of counts
let headsCount = 0;
let tailsCount = 0;

function triggerConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    
    // Number of confetti pieces
    const confettiCount = 100;
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#FF33F6', '#33FF57', '#3357FF'];

    for (let i = 0; i < confettiCount; i++) {
        const confettiElement = document.createElement('div');
        confettiElement.className = 'confetti';

        // Randomize the size, position, color, and animation duration
        confettiElement.style.left = `${Math.random() * 100}vw`;
        confettiElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiElement.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confettiElement.style.transform = `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(confettiElement);

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.removeChild(confettiElement);
        }, 5000); // Adjust timing as needed
    }

    console.log('Confetti triggered');
}

// Function to handle the coin flip
function flipCoin() {
    const resultElement = document.getElementById("result");
    const headsCountElement = document.getElementById("headsCount");
    const tailsCountElement = document.getElementById("tailsCount");

    return new Promise((resolve) => {
        resultElement.style.transform = "rotateY(360deg)";
        setTimeout(() => {
            const outcome = Math.random() < 0.5 ? "HEADS" : "TAILS";
            resultElement.innerText = outcome;
            resultElement.style.transform = "rotateY(0deg)";

            if (outcome === "HEADS") {
                headsCount++;
                headsCountElement.innerText = headsCount;
            } else {
                tailsCount++;
                tailsCountElement.innerText = tailsCount;
            }

            resolve(outcome); // Resolve the outcome after the animation
        }, 500);
    });
}

// Function to check if the user won
function checkWin(selectedSide, flipResult) {
    return selectedSide.toUpperCase() === flipResult;
}

// Event listener for the flip button
document.getElementById('flipButton').addEventListener('click', async () => {
    const selectedSide = document.getElementById("selectedSide").value.toUpperCase(); // Fetch the selected side and convert to uppercase
    const betAmount = parseFloat(document.getElementById("betAmount").value); // Get bet amount
    const selectedToken = document.getElementById("tokenSelect").value; // Get selected token

    // Execute the coin flip and wait for the result
    const result = await flipCoin(); 

    setTimeout(async () => {
        const isWin = checkWin(selectedSide, result);
        const outcomeMessage = document.getElementById("outcomeMessage");

        if (isWin) {
            outcomeMessage.textContent = "You won!";
            triggerConfetti(); // Trigger confetti on win
            winSound.play(); // Play win sound
            // Handle win - double the bet amount and interact with blockchain
            await executeFlip(betAmount * 2, selectedToken, true);
        } else {
            outcomeMessage.textContent = "You lost!";
            loseSound.play(); // Play lose sound
            
            await executeFlip(betAmount, selectedToken, false);
        }
    }, 500); // Time to wait for the rotation and result display
});
