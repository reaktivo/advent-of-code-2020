function range(value, min, max) {
  return Number(value) >= min && Number(value) <= max;
}

function digits(value, d = 4) {
  return value.length === d;
}

export default {
  /** 
   * byr (Birth Year) - four digits; at least 1920 and at most 2002.
   * @param {string} value
   */
  byr(value) {
    return range(value, 1920, 2002) && digits(value);
  },

  /** 
   * iyr (Issue Year) - four digits; at least 2010 and at most 2020. 
   * @param {string} value
   * */
  iyr(value) {
    return range(value, 2010, 2020) && digits(value);
  },

  /**
   * eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
   * @param {string} value
   */
  eyr(value) {
    return range(value, 2010, 2030) && digits(value);
  },

  /**
   * hgt (Height) - a number followed by either cm or in:
   *   If cm, the number must be at least 150 and at most 193.
   *   If in, the number must be at least 59 and at most 76.
   * @param {string} value
   */
  hgt(value) {
    const unit = value.substr(-2);
    const height = Number(value.replace(unit, ''));
    
    switch(unit) {
      case 'cm': return range(height, 150, 193);
      case 'in': return range(height, 59, 76);
      default: return false;
    }
  },

  /**
   * hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
   * @param {string} value
   */
  hcl(value) {
    const validChars = '0123456789abcdef'.split('');
    // another option to get valid hex chars is, but as with regexp,
    // I'm avoiding some solutions for simplicity's sake
    // const validChars = Array.from({ length: 16 }).map((_, i) => i.toString(16));
    
    const hexString = value.substr(1);
    const containsOnlyValidHex = value
      .substr(1)
      .split('')
      .every(char => validChars.includes(char))
    
    return value[0] === '#' && hexString.length === 6 && containsOnlyValidHex;
  },

  /**
   * ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
   * @param {string} value 
   */
  ecl(value) {
    const validOptions = 'amb blu brn gry grn hzl oth'.split(' ');
    return validOptions.includes(value);
  },

  /**
   * pid (Passport ID) - a nine-digit number, including leading zeroes.
   * @param {string} value 
   */
  pid(value) {
    const validChars = '0123456789'.split('');
    const chars = value.split('');
    return chars.length === 9 && chars.every(char => validChars.includes(char));
  },

  /**
   * cid (Country ID) - ignored, missing or not.
   * @param {string} value 
   */
  cid(value) {
    return true;
  }
}