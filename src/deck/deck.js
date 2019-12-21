//Randomize the grid
function shuffle(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let index = Math.floor(Math.random() * 35);
    let temp = arr[i];
    arr[i] = arr[index];
    arr[index] = temp;
  }
  return arr;
}
//Initializing the board
export default function initializeDeck() {
  let id = 0;
  const tiles = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18"
  ].reduce((array, type) => {
    array.push({
      id: id++,
      type
    });
    array.push({
      id: id++,
      type
    });
    return array;
  }, []);
  return shuffle(tiles);
}
