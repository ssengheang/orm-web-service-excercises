// Task 1: Merging two arrays
const arr1 = [0, 1, 2, 3, 4];
const arr2 = [5, 6, 7, 8, 9];
const mergedArr = arr1.concat(arr2);

console.log('Merged Array:', mergedArr);

// Task 2: Displaying the desired shape
function displayShape() {
  const rows = 5; // Number of rows in the pattern

  for (let i = 0; i < rows; i++) {
    let rowPattern = '';
    for (let j = 0; j < rows - i; j++) {
      rowPattern += '*  ';
    }
    console.log(rowPattern.trim());
  }
}

displayShape();
