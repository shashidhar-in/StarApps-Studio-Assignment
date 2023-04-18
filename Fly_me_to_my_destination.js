function minimumPlanesRequired(arr) {
  const n = arr.length;
  let planes = 1; // start at airport 1 with 1 unit of fuel available
  let maxFuel = arr[0]; // maximum amount of fuel available from previous airports
  let remainingFuel = arr[0]; // remaining fuel to reach the next airport

  for (let i = 1; i < n; i++) {
    remainingFuel--;

    if (remainingFuel < 0) {
      // not enough fuel to reach the next airport
      if (maxFuel === 0) {
        // no planes available from previous airports
        return -1;
      }
      planes++; // hire a new plane
      remainingFuel = maxFuel - 1; // fly to the airport with the maximum amount of fuel available
    }

    maxFuel = Math.max(maxFuel, arr[i]); // update maximum amount of fuel available
  }

  return planes;
}


// testcases
const Array=[2,1,2,3,1];
console.log(minimumPlanesRequired(Array)); //output should be 2
const Array2 = [1,6,3,4,5,0,0,0,6];
console.log(minimumPlanesRequired(Array2)); //output should be 3



