import mut from './module.js'; 

describe('sum()', () => {
  test('adds two positive numbers', () => {
    expect(mut.sum(12, 18)).toBe(30);
  });
});

describe('div()', () => {
  test('divides evenly', () => {
    expect(mut.div(10, 2)).toBe(5);
  });

  test('divides into a fraction', () => {
    expect(mut.div(5, 2)).toBeCloseTo(2.5);
  });

  test('division by zero yields Infinity', () => {
    expect(mut.div(1, 0)).toBe(Infinity);
  });
});

describe('containsNumbers()', () => {
  test('returns true when text has digits', () => {
    expect(mut.containsNumbers('abc123xyz')).toBe(true);
  });

  test('returns false when text has no digits', () => {
    expect(mut.containsNumbers('hello')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(mut.containsNumbers('')).toBe(false);
  });

  test('should return false for a space-only string', () => {
    expect(mut.containsNumbers(' ')).toBe(false);
  });
});
