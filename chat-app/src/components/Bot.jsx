function Bot(message) {
    const transformations = [
      (msg) => `Word count: ${msg.split(' ').length}`,
      (msg) => `Vowels count: ${msg.match(/[aeiouAEIOU]/g)?.length || 0}`,
      (msg) => `Most frequent letter: ${getMostFrequentLetter(msg)}`,
      (msg) => `Reversed text: ${msg.split('').reverse().join('')}`,
      (msg) => `Uppercase: ${msg.toUpperCase()}`,
      (msg) => `Lowercase: ${msg.toLowerCase()}`,
      (msg) => `Palindrome check: ${isPalindrome(msg) ? "Yes" : "No"}`,
      (msg) => `Word frequency: ${JSON.stringify(getWordFrequency(msg))}`,
      (msg) => `First and last word: ${getFirstAndLastWord(msg)}`,
      (msg) => `Character count (excluding spaces): ${msg.replace(/\s+/g, '').length}`,
      (msg) => `Number of sentences: ${msg.split(/[.!?]/).filter(Boolean).length}`,
      (msg) => `ASCII values: ${msg.split('').map(char => char.charCodeAt(0)).join(', ')}`,
      (msg) => `Text without spaces: ${msg.replace(/\s+/g, '')}`,
      (msg) => `Leetspeak: ${toLeetSpeak(msg)}`,
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
  

  function getFirstAndLastWord(str) {
    const words = str.trim().split(/\s+/);
    if (words.length < 2) return `Only one word: ${words[0]}`;
    return `First: ${words[0]}, Last: ${words[words.length - 1]}`;
  }

  function toLeetSpeak(str) {
    const leetDict = { a: '4', e: '3', i: '1', o: '0', s: '5', t: '7' };
    return str.replace(/[aeiost]/gi, (char) => leetDict[char.toLowerCase()] || char);
  }

  
  export default Bot;
  