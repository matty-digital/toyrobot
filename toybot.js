"use strict";

let mapDirections = ["north", "east", "south", "west"];
let botDirection  = "west";
let tableSize     = [5, 5];
let mapLength     = mapDirections.length;
let rotations     = 1;
let botCoords;

// Ok, now I want to know the bot's position!
let report = () => {
  console.log("Compliance! The bot is currently at " + botCoords + ", and is facing " + botDirection);
};

// Now check if the bot has been placed on the table, but no other commands until is
let botPlaced = () => {
  if (botCoords !== undefined && !botCoords.includes(null)) {
    return true;
  } else {
    console.log("Navigator, the bot is not on the table. Place the bot by using: place(x, y, 'direction')");
  }
};

// Let's place the robot
let place = (x, y, f) => {
  botCoords = [x, y];
  botDirection = f;
  console.log("The bot has been placed, Navigator");
  report();
};

// I want to move the robot now!
let move = () => {
  if (botPlaced()) {
    let newCoords = botCoords.slice(0);

    switch (botDirection) {
      case "north":
        newCoords[1]++;
        break;

      case "east":
        newCoords[0]++;
        break;

      case "south":
        newCoords[1]--;
        break;

      case "west":
        newCoords[0]--;
        break;

      default:
        console.log("Make the bot face in a direction, Navigator");
    }

    // Please don't let the robot fall off the table, Navigator
    if (newCoords.some(belowZero) || newCoords.some(exceedTableSize)) {
      console.log("Navigator, that will destroy the bot");
    } else {
      botCoords = newCoords;
      console.log("The bot has moved to " + botCoords + ", Navigator");
    }
  }
};

let left = () => {
  let botDirectionIndex = mapDirections.indexOf(botDirection);
  let leftIndex = (botDirectionIndex + mapLength - rotations) % mapLength;
  let newDirection = mapDirections[leftIndex];
  botDirection = newDirection;
};

let right = () => {
  let botDirectionIndex = mapDirections.indexOf(botDirection);
  let rightIndex = (botDirectionIndex + rotations) % mapLength;
  let newDirection = mapDirections[rightIndex];
  botDirection = newDirection;
};

// south - west bounds [0, 0]
let belowZero = (coord) => {
  return coord < 0;
};

// north - east bounds as furthest coords of tablesize
let exceedTableSize = (coord) => {
  for (let tableCoord of tableSize) {
    return coord > tableCoord;
  }
};



// a.) 
// place(0, 0, "north");
// move();
// report();
// Output: 0, 1, "north"

// b.)
// place(0, 0, "north");
// left();
// report();
// Output: 0, 0, "west"

// c.)
// place(1, 2, "east");
// move();
// move();
// left();
// move();
 // report();