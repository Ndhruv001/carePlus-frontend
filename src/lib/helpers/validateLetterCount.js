const MAX_CHARACTERS = 250;

function validateLetterCount(value) {
  const totalLetters = value.length;
  return (
    totalLetters <= MAX_CHARACTERS ||
    `Message should not exceed ${MAX_CHARACTERS} characters. Currently at ${totalLetters} characters.`
  );
}

export default validateLetterCount;
