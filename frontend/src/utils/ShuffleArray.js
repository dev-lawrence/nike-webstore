export const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex,
    tempValue;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
};

// export const shuffleArray = (array) => {
//   return array.sort(() => Math.random() - 0.5);
// };
