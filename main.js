document.querySelector(".control-buttons span").onclick=function(){
    let yourName=prompt("What's your name?")
    if (yourName == null || yourName == "") {

        // Set Name To Unknown
        document.querySelector(".name span").innerHTML = 'Unknown';
    
      // Name Is Not Empty
      } else {
    
        // Set Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;
    
      }
document.querySelector(".control-buttons").remove();    
}

let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelectorAll(".block");
let container=document.querySelector(".game-blocks");
console.log(blocksContainer)
// Create Array From Game Blocks
let blocks = Array.from(blocksContainer);
console.log(blocks)
// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];

let orderRange = Array.from(Array(blocks.length).keys());

 //console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {

  // Add CSS Order Property
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener('click', function () {

    // Trigger The Flip Block Function
    flipBlock(block);

  });

});
function shuffle(array){
  let current=array.length,temp,random;
  while(current>0){
    random=Math.floor(Math.random()*current)
    current--;
    temp=array[current];
    array[current]=array[random];
    array[random]=temp;
  }
return array;
}
function flipBlock(selectedBlock) {

  // Add Class is-flipped
  selectedBlock.classList.add('is-flipped');

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {

     console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

  }

}



function stopClicking() {

  // Add Class No Clicking on Main Container
  container.classList.add('no-clicking');

  // Wait Duration
  setTimeout(() => {

    // Remove Class No Clicking After The Duration
    container.classList.remove('no-clicking');

  }, duration);

}
function checkMatchedBlocks(firstBlock, secondBlock) {

  let triesElement = document.querySelector('.tries span');

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');

    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');

    document.getElementById('success').play();

  } else {

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {

      firstBlock.classList.remove('is-flipped');
      secondBlock.classList.remove('is-flipped');

    }, duration);

    document.getElementById('fail').play();

  }

}

