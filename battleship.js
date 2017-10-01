$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    //ships with their lengths
    const carrier = 5; 
    const battleship = 4; 
    const cruiser = 3; 
    const submarine = 3; 
    const destroyer = 2; 

    //reset battleground
    clearBattleground();

    //find and draw
    createRandomPattern(carrier);
    createRandomPattern(battleship);
    createRandomPattern(cruiser);
    createRandomPattern(submarine);
    createRandomPattern(destroyer);
  });

  

});

function createRandomPattern(length){
  var result = [];
  while(result.length < length){ //do it as long as a correct pattern is found
    var randomDirection = Math.floor(Math.random()*2); // number between 0 and 1 (1 = horizontally, 0 = vertically)
    var randomRow = Math.floor(Math.random()*9);      // random number between 0 and 9 to select a row
    var randomColumn = Math.floor(Math.random()*9);  // random number between 0 and 9 to select a column
    
    for(x = 0; x < length; x ++){
      switch(randomDirection){
        case 1: //horizontally
          if(x==0){
            if(checkFirst(randomRow, randomColumn)){ //if the first field has no "neighbour" ships
              result.push('td[data-r='+randomRow+'][data-c='+(randomColumn+x)+']'); //the field gets added to the result
            }else{
              result = [];  //otherwise the result gets reset and jumps out of the for-loop (new numbers gets created)
              x = length;
            }
          }else if((randomColumn+length < 10) && checkNeighboursVertically(randomRow, (randomColumn+x))){ //if the next element has no ship in their "neighbourhood"
            result.push('td[data-r='+randomRow+'][data-c='+(randomColumn+x)+']');
          }else{
            result = [];
            x = length;
          }
          break;

        case 0: //vertically
          if(x==0){
            if(checkFirst(randomRow, randomColumn)){ //if the first field has no "neighbour" ships
              result.push('td[data-r='+(randomRow+x)+'][data-c='+randomColumn+']'); //the field gets added to the result
            }else{
              result = []; //otherwise the result gets reset and jumps out of the for-loop (new numbers gets created)
              x = length;
            }
          }else if((randomRow+length < 10) && checkNeighboursHorizontally((randomRow+x), randomColumn)){ //if the next element has no ship in their "neighbourhood"
            result.push('td[data-r=' + (randomRow+x) + '][data-c=' + randomColumn + ']');
          }else{
            result = [];
            x = length;
          }
          break;

        default:
          result = [];
          x = length;
      }
    }
  }
  drawPattern(result);  //draw result
}

function checkNeighboursHorizontally(row, column){
  if($('td[data-r='+row+'][data-c='+column+']').hasClass('water')){ //check if the field itself is water
    if($('td[data-r='+(row)+'][data-c='+(column-1)+']').hasClass('ship')) return false; 
    if($('td[data-r='+(row)+'][data-c='+(column+1)+']').hasClass('ship')) return false; 
    if($('td[data-r='+(row+1)+'][data-c='+(column)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column-1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    return true;
  }else{
    return false;
  }
}

function checkNeighboursVertically(row, column){
  if($('td[data-r='+row+'][data-c='+column+']').hasClass('water')){
    if($('td[data-r='+(row-1)+'][data-c='+(column)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row-1)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    return true;
  }else{
    return false;
  }
}

function checkFirst(row, column){
  if($('td[data-r='+row+'][data-c='+column+']').hasClass('water')){
    if($('td[data-r='+(row-1)+'][data-c='+(column)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row)+'][data-c='+(column-1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row-1)+'][data-c='+(column-1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column-1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row-1)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    if($('td[data-r='+(row+1)+'][data-c='+(column+1)+']').hasClass('ship')) return false;
    return true;
  }else{
    return false;
  }
}

function drawPattern(array){
  for(let i = 0; i < array.length; i++){
    $(array[i]).removeClass('water').addClass('ship');
  }
}

function clearBattleground(){
  for (let row = 0; row < 10; row++) {
    for (let column = 0; column < 10; column++) {
      $('td[data-r='+row+'][data-c='+column+']').removeClass('ship').addClass('water');
    }
  }
}