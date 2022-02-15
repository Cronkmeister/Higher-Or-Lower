const app = document.getElementById("app");
const highBtn = document.getElementById("high");
const lowBtn = document.getElementById("low");
let deckID;
let card1;
let previousCardValue;
let newCardValue;

//generate card deck
const deck = axios
  .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((response) => {
    deckID = response.data.deck_id;
    //draw first card
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    );
  })
  .then((response1) => {
    console.log(response1);
    //display it on screen
    card1 = document.createElement("img");
    card1.setAttribute("src", response1.data.cards[0].image);
    card1.classList.add("card"); //add a class
    app.appendChild(card1);
    console.log(response1.data.cards[0]);
    //storeing value
    previousCardValue = response1.data.cards[0].value;
  });

/*function to change words to numbers
Ace -> 14
King -> 13
Queen -> 12
Jack -> 11
*/

//change format of value for cards into numbers
function checkValue(event) {
  if (event === "ACE") {
    const valueConverted = 14;
    return valueConverted;
  } else if (event === "KING") {
    const valueConverted = 13;
    return valueConverted;
  } else if (event === "QUEEN") {
    const valueConverted = 12;
    return valueConverted;
  } else if (event === "JACK") {
    const valueConverted = 11;
    return valueConverted;
  } else {
    const valueConverted = parseInt(event, 10);
    console.log(valueConverted);
    return valueConverted;
  }
}

function compare(operator) {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((response) => {
      //draw new card and add it to the screen
      const card1 = document.createElement("img");
      console.log(response);
      card1.setAttribute("src", response.data.cards[0].image);
      //add a class card
      card1.classList.add("card");
      app.appendChild(card1);
      //storing new card value
      newCardValue = response.data.cards[0].value;
      //running function "check" to compare value and change into numbers
      previousCardValue = checkValue(previousCardValue);
      newCardValue = checkValue(newCardValue);

      // Checking the cards values deppending on user input
      if (operator === ">") {
        if (newCardValue >= previousCardValue) {
          console.log(true);
          const answer = document.getElementById("answerRight");
          answer.classList.toggle("answerRightToggle");
          function toggle(toggle) {
            answer.classList.toggle("answerRightToggle");
          }
          setTimeout(toggle, 1000, (toggle));
        } else {
          const answer = document.getElementById("answerWrong");
          answer.classList.add("answerWrongToggle");
          highBtn.setAttribute("disabled", "");
          lowBtn.setAttribute("disabled", "");
          console.log(false);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      } else {
        if (newCardValue <= previousCardValue) {
          console.log(true);
          const answer = document.getElementById("answerRight");
          answer.classList.toggle("answerRightToggle");
          setTimeout(() => {
            answer.classList.toggle("answerRightToggle");
          }, 1000);
        } else { 
          const answer = document.getElementById("answerWrong");
          answer.classList.add("answerWrongToggle");
          highBtn.setAttribute("disabled", "");
          lowBtn.setAttribute("disabled", "");
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
      // new card is now old card to use in next comparison
      previousCardValue = newCardValue;
    });
}

// button listener that run the function that create a n
highBtn.addEventListener("click", function () {
  compare(">");
});

lowBtn.addEventListener("click", function () {
  compare("<");
});

// -- Create a new card - randon card done (compare function) - new card done
//     -- compare function:  TO-DO
//            --newcard with previouscard

// if correct -> generate a new card
// if incorrect -> reset the game from the beginning

// score counter