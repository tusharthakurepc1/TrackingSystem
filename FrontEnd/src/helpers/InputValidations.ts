export const validateEmail = (email: string, setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setIsEmailValid(true);
    return true
  } else {
    setIsEmailValid(false);
    return false
  }
};

export const validateName = (name: string, setIsNameValid: React.Dispatch<React.SetStateAction<boolean>>) => {
  const namePattern = /^[a-z ,.'-]+$/i
  if (!namePattern.test(name)) {
    setIsNameValid(false);
    return false
  } else {
    setIsNameValid(true);
    return true
  }
};

export const validateOtp = (otp: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
  const inputValue = otp

  // Remove any non-numeric characters
  const numericValue = inputValue.replace(/\D/g, '');

  // Limit input to 6 characters
  const truncatedValue = numericValue.slice(0, 6);

  // Update the state with the sanitized value
  setValue(truncatedValue);
};