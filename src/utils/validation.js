export function sanitizeRacingNumber(value) {
  return value.replace(/\D/g, '').slice(0, 3);
}

export function validateRacingNumber(value, usedNumbers = [], t = (key) => key) {
  if (!value) return { valid: false, message: '' };

  if (!/^[1-9][0-9]{0,2}$/.test(value)) {
    return {
      valid: false,
      message: t('validation.invalidNumber'),
    };
  }

  const number = Number(value);
  if (usedNumbers.includes(number)) {
    return {
      valid: false,
      message: t('validation.usedNumber', { number }),
    };
  }

  return {
    valid: true,
    message: t('validation.availableNumber', { number }),
  };
}
