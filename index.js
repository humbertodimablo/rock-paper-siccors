 // Possible choices for the game
  const choices = ['Rock', 'Paper', 'Scissors'];
  const totalRounds = 5;  // Total number of rounds in one game
  // Scores and round tracker initialization
let playerScore = 0;
  let computerScore = 0;
  let roundsPlayed = 0; 
  // DOM elements for dynamic updates
  const playerScoreEl = document.getElementById('playerScore');
  const computerScoreEl = document.getElementById('computerScore');
  const roundsContainer = document.getElementById('roundsContainer');
  const winnerMessage = document.getElementById('winnerMessage');
  const resetBtn = document.getElementById('resetBtn');
  const choiceButtons = document.querySelectorAll('.choice-btn');
  /**
   * Generates a random choice for the computer.
   * @returns {string} - One of 'Rock', 'Paper', or 'Scissors'
   */
  function computerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

    /**
   * Determines the winner of a single round.
   * @param {string} playerChoice - The player's choice.
   * @param {string} compChoice - The computer's choice.
   * @returns {number} - 1 if player wins, -1 if computer wins, 0 if tie.
   */
  function playRound(playerChoice, compChoice) {
    if (playerChoice === compChoice) {
      return 0; // Tie
    }
    // Winning conditions for the player
    if (
      (playerChoice === 'Rock' && compChoice === 'Scissors') ||
      (playerChoice === 'Paper' && compChoice === 'Rock') ||
      (playerChoice === 'Scissors' && compChoice === 'Paper')
    ) {
      return 1; // Player wins
    }
    return -1; // Computer wins
  }
  /**
   * Updates scores, displays the result of the round, and checks for game end.
   * @param {number} result - The round result (1, 0, or -1).
   * @param {string} playerChoice - Player's choice this round.
   * @param {string} compChoice - Computer's choice this round.
   */
  function updateScoresAndDisplay(result, playerChoice, compChoice) {
    roundsPlayed++;
   
    // Message for the round result
    let roundResultText = '';
    if (result === 1) {
      playerScore++;
      roundResultText = 'You win this round!';
    } else if (result === -1) {
      computerScore++;
      roundResultText = 'Computer wins this round!';
    } else {
      roundResultText = "It's a tie this round!";
    }

    // Update the live scoreboard
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    // Create a new div to show this round's details
    const roundDiv = document.createElement('div');
    roundDiv.classList.add('round');
    roundDiv.textContent = `Round ${roundsPlayed}: You chose ${playerChoice} | Computer chose ${compChoice}. ${roundResultText}`;
    roundsContainer.appendChild(roundDiv);

        // Scroll down to the latest round
    roundsContainer.scrollTop = roundsContainer.scrollHeight;
    // Check if game ended after this round
    if (roundsPlayed === totalRounds) {
      endGame();
    }
  }

  /**
   * Handles the end of the game:
   * Disables buttons and displays the final winner message.
   */
  function endGame() {
    // Disable all choice buttons so game can't continue beyond 5 rounds
    choiceButtons.forEach(btn => btn.disabled = true);
    // Display winner or tie message
    if (playerScore > computerScore) {
      winnerMessage.textContent = `Game Over - You won! 🎉 Final score: ${playerScore} to ${computerScore}`;
    } else if (computerScore > playerScore) {
      winnerMessage.textContent = `Game Over - Computer won! 🤖 Final score: ${computerScore} to ${playerScore}`;
    } else {
      winnerMessage.textContent = `Game Over - It's a tie! Final score: ${playerScore} to ${computerScore}`;
    }
    // Show the reset button to play again
    resetBtn.style.display = 'inline-block';
  }

/**
   * Resets the game state and UI elements to start a new game.
   */

    function resetGame() {
    playerScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    // Reset scores on screen
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
    // Clear previous rounds results
    roundsContainer.innerHTML = '';
    winnerMessage.textContent = '';
    // Hide reset button
    resetBtn.style.display = 'none';
    // Enable buttons again
    choiceButtons.forEach(btn => btn.disabled = false);
  }
  // Event listeners for player's choice buttons
  choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const playerChoice = button.getAttribute('data-choice');
      const compChoice = computerChoice();
      const result = playRound(playerChoice, compChoice);
      updateScoresAndDisplay(result, playerChoice, compChoice);
    });
  });
  // Event listener for reset button to restart the game
  resetBtn.addEventListener('click', resetGame);