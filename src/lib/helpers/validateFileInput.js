const validateFileInput = (files) => {
  const file = files[0];
  if (!file) {
    return "No file selected";
  }
  const acceptedFormats = ["image/jpeg", "image/png", "application/pdf"];
  const maxSize = 2 * 1024 * 1024;

  if (!acceptedFormats.includes(file.type)) {
    return "Only JPEG, PNG and PDF formats are allowed.";
  }
  if (file.size > maxSize) {
    return "File size must be less than 2MB.";
  }
  return true;
};

export default validateFileInput;
