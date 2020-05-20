// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function for creating many objects - 
// Containing properties specimenNum & dna that correspond w/ parameters provided
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Changes a random base in the mockup strand to a new random base
    mutate() {
      console.log(
        `Mutating specimen ${this.specimenNum}, with bases: ${this.dna}`
      );

      // Selects random index of base to change
      const randIndex = Math.floor(Math.random() * this.dna.length);
      console.log('DNA Base to change at index: ' + randIndex);

      // New random base to replace
      let newRandBase = returnRandBase();
      console.log('New random DNA base to insert: ' + newRandBase);

      // Runs loop until new random base is different from previous base
      while (this.dna[randIndex] === newRandBase) {
        console.log(
          'The two DNA bases are equal... Generating new random base'
        );
        newRandBase = returnRandBase();
      }

      // Replaces original base selection w/ new random base
      this.dna[randIndex] = newRandBase;
      return this.dna;
      console.log(`Newly Mutated DNA Strand: ${this.dna}`);
    },
    
    compareDNA(otherOrganism) {
      const homogeneities = this.dna.reduce((acc, curr, idx, arr) => {
        // If 2 bases are equal, increase counter by 1
        if (arr[idx] === otherOrganism.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      // Calculate % of common bases
      const percentDNAsim = (homogeneities / this.dna.length) * 100;

      // Limit % in common to 2 decimal places
      const percentTo2Decimals = percentDNAsim.toFixed(2);

      // Log commonality statement on 2 compared bases
      console.log(
        `${this.specimenNum} and ${otherOrganism.specimenNum} have ${percentTo2Decimals}% DNA in common.`
      );
    },
    // Determines likelihood of P. aequor surviving 
    // Returns true (higher chance of survival) if at least 60% of DNA bases are 'C' OR 'G'
    willLikelySurvive() {
      // Use .filter() method to create new array containing only C/G elements
      const cOrG = this.dna.filter((el) => el === 'C' || el === 'G');
      // Divide length of newly filtered C/G array by length of original DNA array
      // If >= sixty percent, return true - If not, return false
      return cOrG.length / this.dna.length >= 0.6;
    },
  };
};

const pAequorSurvivors = []; // Create array to store pAequor specimen that survive
let idCounter = 1; // Create variable idCounter (counter up until 30)

// Create 30 instances of pAequor that can survive (.willLikelySurvive() returns true)
while (pAequorSurvivors.length < 30) {
  // Loop until pAequorSurvivors array includes 30 specimens
  let newOrg = pAequorFactory(idCounter, mockUpStrand()); // Generate new organism
  if (newOrg.willLikelySurvive()) {
    // If .willLikelySurvive returns true, push newOrg to array
    pAequorSurvivors.push(newOrg);
  }
  idCounter++; // Increase idCounter by 1 up until 30
}

console.log(pAequorSurvivors); // Log pAequorSurvivors array

// Creates sample objects
let pAequorSampleObj1 = pAequorFactory(1, mockUpStrand());
let pAequorSampleObj2 = pAequorFactory(8, mockUpStrand());

// Logs test of .mutate() method on sample object
console.log(pAequorSampleObj1.mutate());

// Logs test of .compareDNA method on sample objects
pAequorSampleObj1.compareDNA(pAequorSampleObj2);
