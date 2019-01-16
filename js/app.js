/*
 * Create a list that holds all of your cards
 */

let playerwin = false, stars=4;

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
    let currentIndex = array.length, temporaryValue, randomIndex;

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

function wingame() {
	new Audio('files/win.mp3').play();
	setTimeout(function(){
		const y=confirm("Congratulation; you win the game.\nyou win in: "+h1.textContent+
			"\nyour rating is: "+stars+"/3\nWould you like to play again ?");
		if (y) location.reload();
		else playerwin=true;
	}, 1000);
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

function game() {
	let correct=0, card1=0, count=0;

	document.getElementById('restart').addEventListener('click', function (){location.reload(); });
	document.getElementById('deck').addEventListener('click', function (evt) {
		const card2=evt.target;
		if (card2.className=="card miss"){
			document.getElementById('moves').textContent=++count+' Moves';
			if (count%17===0) stars1();
			new Audio('files/click.mp3').play();
			card2.className="card test";
			if (!card1) card1=card2;
			else {
				if (card1.innerHTML==card2.innerHTML) {
					correct++;
					card1.className="card match";
					card2.className="card match";
					if (correct==8) wingame(3);
					else new Audio('files/correct.mp3').play();
				}
				else {
					card1.className="card not";
					card2.className="card not";
					new Audio('files/wrong.mp3').play();
					setTimeout(function(){
						tem=document.querySelectorAll(".not");
						tem[1].className="card miss";
						tem[0].className="card miss";
					}, 1000);
				}
				card1=0;
			}
		}
	});
}

stars1();
timing();
init();
game();