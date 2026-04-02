/**
 * Formats a string as an international phone number.
 * If no country code is provided (starts with +), assumes US (+1).
 * @param {string} input - The raw input string.
 * @returns {string} The formatted phone number.
 */
export function formatPhoneNumber(input) {
  if (!input) return '';

  const trimmed = input.trim();
  const hasPlus = trimmed.startsWith('+');
  
  // Strip all non-digits
  const digits = input.replace(/\D/g, '');

  // If the input contains letters and doesn't look like a phone number,
  // return raw input (per specification requirements).
  if (digits.length === 0 && /[a-zA-Z]/.test(input)) {
    return input;
  }

  if (digits.length === 0) {
    return input;
  }

  let countryCode = '';
  let rest = '';

  if (hasPlus || digits.startsWith('1')) {
    // Determine country code length by checking common prefixes
    // List of some 3-digit and 2-digit codes for better heuristic
    const cc3 = ['353', '354', '358', '359', '370', '371', '372', '373', '374', '375', '376', '377', '378', '380', '381', '382', '385', '386', '387', '389', '420', '421', '423', '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', '596', '597', '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '685', '686', '687', '688', '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961', '962', '963', '964', '965', '966', '967', '968', '970', '971', '972', '973', '974', '975', '976', '977', '992', '993', '994', '995', '996', '998'];
    
    if (digits.startsWith('1')) {
      countryCode = '+1';
      rest = digits.slice(1);
    } else if (cc3.includes(digits.slice(0, 3))) {
      countryCode = '+' + digits.slice(0, 3);
      rest = digits.slice(3);
    } else if (digits.length >= 2) {
      // Default to 2-digit CC for non-US
      countryCode = '+' + digits.slice(0, 2);
      rest = digits.slice(2);
    } else {
      // If we don't know the CC, assume it's the start
      return (hasPlus ? '+' : '+1 ') + digits;
    }
  } else {
    // No plus and doesn't start with 1, assume US (+1)
    countryCode = '+1';
    rest = digits;
  }

  // Format the result
  let result = countryCode;
  
  if (countryCode === '+1') {
    // US format: +1 555-123-4567
    if (rest.length > 0) {
      result += ' ' + rest.slice(0, 3);
    }
    if (rest.length > 3) {
      result += '-' + rest.slice(3, 6);
    }
    if (rest.length > 6) {
      result += '-' + rest.slice(6, 10);
    }
  } else {
    // International format: +CC <rest>
    if (rest.length > 0) {
      result += ' ' + rest;
    }
  }

  return result;
}
