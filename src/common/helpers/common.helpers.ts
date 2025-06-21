import { customAlphabet } from "nanoid";
import { NUMBERS_AND_ALPHABETS } from "../constants/service-common.constants";

export class Helpers {
  public static maximumOccurrences(inputArray: Array<string> = []) {
    if (inputArray.length === 0) return '';
    let modeMap = {};
    let maxEl = inputArray[0],
      maxCount = 1;
    for (let i = 0; i < inputArray.length; i++) {
      let el = inputArray[i];
      if (modeMap[el] == null) modeMap[el] = 1;
      else modeMap[el]++;
      if (modeMap[el] > maxCount) {
        maxEl = el;
        maxCount = modeMap[el];
      }
    }
    return maxEl;
  }

  public static removePlusCode(address: string): string {
    if (address.includes('+')) {
      const addressSet = address.split(' ');
      addressSet.forEach((elem) => {
        if (elem.includes('+')) {
          let index = addressSet.indexOf(elem);
          addressSet.splice(index, 1);
        }
      });
      address = addressSet.join(' ');
    }
    return address;
  }

  public static calcCrow(
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number,
    isDistanceInKms = false,
  ): number {
    let R = 6371; // km
    let dLat = Helpers.toRad(toLat - fromLat);
    let dLon = Helpers.toRad(toLong - fromLong);
    let lat1 = Helpers.toRad(fromLat);
    let lat2 = Helpers.toRad(toLat);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 1000;
    if (isDistanceInKms && distance) {
      return distance / 1000;
    }
    return distance;
  }


  public static toRad(coordinate: number): number {
    return (coordinate * Math.PI) / 180;
  }

  public static constructFormattedAddress(
    address,
  ): string {
    if (address) {
      if (address.houseNo && address.street && address.locality) {
        const parts: string[] = [
          address.houseNo,
          address.street,
          address.locality,
          address?.landmark,
          address?.city,
          address?.state,
          address?.postalCode,
        ].filter(Boolean);
        const formattedAddress: string = parts.join(', ');
        return formattedAddress;
      } else {
        return address.mapAddress;
      }
    }
  }


  public static secondsToMinutes(time: number): number {
    return Math.floor(time / 60);
  };

  public static generateReferralCode() {
    return customAlphabet(NUMBERS_AND_ALPHABETS, 6)()
  }

  public static generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dateRange = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
  }

  public static enumToArray = (enumObject: Record<string, unknown>): unknown[] => {
    const enumArray = [];
    for (const enumName in enumObject) {
      enumArray.push(enumObject[enumName]);
    }
    return enumArray;
  };

  public static generateTempPassword(): string {
    return Math.random().toString(36).slice(-8) + 'aA1!';
  }
  public static parsePhoneNumber(phoneNumber: string) {
    // Remove all non-digit characters except leading +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');

    // If empty or invalid, throw error
    if (!cleaned || cleaned.length < 4) {
      throw new Error('Invalid phone number format');
    }

    // Check if number starts with +
    const hasPlus = cleaned.startsWith('+');
    const numericPart = hasPlus ? cleaned.slice(1) : cleaned;

    // Common country code lengths are 1-3 digits
    // This map helps identify common country codes
    const commonCountryCodes = {
      '1': ['US', 'CA'],
      '44': ['UK'],
      '86': ['CN'],
      '91': ['IN'],
      '81': ['JP'],
      '49': ['DE'],
      '33': ['FR'],
      '61': ['AU'],
      '55': ['BR'],
      '7': ['RU'],
      '234': ['NG'],
      '27': ['ZA']
    };

    // Try to detect country code length
    let countryCode = '';
    let number = '';

    // First try to match known country codes
    for (let i = 1; i <= 3; i++) {
      const potentialCode = numericPart.slice(0, i);
      if (commonCountryCodes[potentialCode]) {
        countryCode = potentialCode;
        number = numericPart.slice(i);
        break;
      }
    }

    // If no known country code found, use heuristic approach
    if (!countryCode) {
      // Default to treating first 2 digits as country code
      countryCode = numericPart.slice(0, 2);
      number = numericPart.slice(2);
    }

    return {
      countryCode: hasPlus ? `+${countryCode}` : countryCode,
      number: number
    };
  }

}
