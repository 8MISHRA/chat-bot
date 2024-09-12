function Bot(message) {
    const transformations = [
      (msg) => `Word count: ${msg.split(' ').length}`,
      (msg) => `Vowels count: ${msg.match(/[aeiouAEIOU]/g)?.length || 0}`,
      (msg) => `Most frequent letter: ${getMostFrequentLetter(msg)}`,
      (msg) => `Reversed text: ${msg.split('').reverse().join('')}`,
      (msg) => `Uppercase: ${msg.toUpperCase()}`,
      (msg) => `Lowercase: ${msg.toLowerCase()}`,
      (msg) => `Palindrome check: ${isPalindrome(msg) ? "Yes" : "No"}`,
      (msg) => `Word frequency: ${JSON.stringify(getWordFrequency(msg))}`    
    ];
  
    const transform = transformations[Math.floor(Math.random() * transformations.length)];
    return transform(message);
  }
  
  function getMostFrequentLetter(str) {
    const frequency = {};
    let maxFreq = 0;
    let mostFrequent = '';
    for (const char of str) {
      if (char.match(/[a-zA-Z]/)) {
        frequency[char.toLowerCase()] = (frequency[char.toLowerCase()] || 0) + 1;
        if (frequency[char.toLowerCase()] > maxFreq) {
          maxFreq = frequency[char.toLowerCase()];
          mostFrequent = char;
        }
      }
    }
    return mostFrequent || 'None';
  }
  
  function isPalindrome(str) {
    const cleanStr = str.replace(/[\W_]/g, '').toLowerCase();
    return cleanStr === cleanStr.split('').reverse().join('');
  }
  
  function getWordFrequency(str) {
    const words = str.toLowerCase().match(/\b\w+\b/g) || [];
    return words.reduce((freq, word) => {
      freq[word] = (freq[word] || 0) + 1;
      return freq;
    }, {});
  }
  
  export default Bot;
  