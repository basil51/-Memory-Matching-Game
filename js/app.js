/*
 * Create a list that holds all of your cards
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function init() {
	let cardslist=[];
	axios.get('files/fa.txt').then(response => {
		const fa=response.data.split(",");
		for (let i=0;i<16;i+=2){
			const node = document.createElement("LI");    // Create a <li> node
			node.className ="card miss";
			const inode = document.createElement("I");         // Create a text node
			inode.className="fa "+fa[Math.floor(Math.random()*49)+49*i]
			node.appendChild(inode); 	// Append the text to <li>
			cardslist[i]=node;
			cardslist[i+1]=node.cloneNode(true);
		}
		cardslist = shuffle(cardslist);
		for (let i=0;i<16;i++) document.getElementById("deck").appendChild(cardslist[i]);
	});
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const h1 = document.getElementById('time'); let seconds = 0, minutes = 0, hours = 0;
function timing() {
    seconds++;
    if (seconds >= 60) { seconds = 0; minutes++; if (minutes >= 60) {minutes = 0; hours++; }}
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
	if (!playerwin) setTimeout(timing, 1000);
}

function stars1(){
	const sta=document.getElementById("stars");sta.innerHTML='';
	new Audio('files/down.mp3').play();
	if (stars>1) stars--;
	for (let i=0;i<stars;i++){
		const node = document.createElement("LI");    // Create a <li> node
		const inode = document.createElement("I");         // Create a text node
		inode.className="fa fa-star"
		node.appendChild(inode); 	// Append the text to <li>
		sta.appendChild(node)
	}
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
