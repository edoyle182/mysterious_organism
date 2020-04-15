// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

// Returns obj containing properties specimenNum & dna that
// correspond w/ parameters provided
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate() {
      console.log(`Mutating specimen ${this.specimenNum}, with bases: ${this.dna}`);
      
      // Selects random index of base to change
      const randIndex = Math.floor(Math.random() * this.dna.length);
      console.log('DNA Base to change at index: ' + randIndex);
      
      // New random base to replace
      let newRandBase = returnRandBase();
      console.log('New random DNA base to insert: ' + newRandBase);
      
      // Runs loop until new random base is different from previous base
      while (this.dna[randIndex] === newRandBase) {
        console.log('The two DNA bases are equal... Generating new random base');
        newRandBase = returnRandBase();
      }
      
      // Replaces original base selection w/ new random base
      this.dna[randIndex] = newRandBase;
      return this.dna;
      console.log(`Newly Mutated DNA Strand: ${this.dna}`);
    }
  }
};

// Creates sample object
let pAequorSampleObj = pAequorFactory(1, mockUpStrand());

// Logs test of .mutate() method on sample object
console.log(pAequorSampleObj.mutate());
