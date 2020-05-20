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

// Returns obj containing properties specimenNum & dna that
// correspond w/ parameters provided
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      console.log(
        `\nMutating specimen ${this.specimenNum}, with bases: ${this.dna}`
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
      console.log('Newly Mutated DNA Strand: ');
      return this.dna;
    },
    compareDNA(otherOrganism) {
      const homogeneities = this.dna.reduce((acc, curr, idx, arr) => {
        // If two bases are equal, increase counter by one
        if (arr[idx] === otherOrganism.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      // Calculate % of common bases
      const percentDNAsim = (homogeneities / this.dna.length) * 100;

      // Limit % in common to two decimal places
      const percentTo2Decimals = percentDNAsim.toFixed(2);

      // Log commonality statement on two compared bases
      console.log(
        `\n${this.specimenNum} and ${otherOrganism.specimenNum} have ${percentTo2Decimals}% DNA in common.`
      );
    },
    // Returns true if at least sixty percent of DNA bases are 'C' OR 'G'
    willLikelySurvive() {
      // Use .filter() method to create new array containing only C/G elements
      const cOrG = this.dna.filter((el) => el === 'C' || el === 'G');
      // Divide length of newly filtered C/G array by length of original DNA array
      // If >= sixty percent, return true - If not, return false
      return cOrG.length / this.dna.length >= 0.6;
    },

    complementStrand() {
      let dnaMap = new Map([
        ['A', 'T'],
        ['T', 'A'],
        ['C', 'G'],
        ['G', 'C'],
      ]);
      let compStrand = this.dna.map((dna) => dnaMap.get(dna));
      return `\n Generating complementary DNA strand...
      Original DNA Strand: ${this.dna}
      Complementary DNA Strand: ${compStrand}`;
    },
  };
};

const pAequorSurvivors = []; // Create array to store pAequor specimen that survive
let idCounter = 1; // Create variable name for id counter (counter up until 30)

// Create 30 instances of pAequor that can survive (.willLikelySurvive() returns true)
while (pAequorSurvivors.length < 30) {
  // Loop until pAequorSurvivors array includes 30 specimens
  let newOrg = pAequorFactory(idCounter, mockUpStrand()); // Generate new organism
  if (newOrg.willLikelySurvive()) {
    // If .willLikelySurvies returns true, push newOrg to array
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

// Logs test of .complementStrand method on sample object
console.log(pAequorSampleObj1.complementStrand());
