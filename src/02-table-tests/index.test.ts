import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    
    { a: 1, b: 2, action: Action.Subtract, expected: -1 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0 },
    { a: 3, b: 2, action: Action.Subtract, expected: 1 },
    
    { a: 1, b: 4, action: Action.Multiply, expected: 4 },
    { a: 2, b: 4, action: Action.Multiply, expected: 8 },
    { a: 3, b: 9, action: Action.Multiply, expected: 27 },
    
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 4, b: 1, action: Action.Divide, expected: 4 },
    { a: 8, b: 2, action: Action.Divide, expected: 4 },
    
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    
    { a: 1, b: 2, action: 'InvalidAction', expected: null },
    { a: 1, b: 2, action: 'InvalidAction', expected: null },
    { a: 2, b: 2, action: undefined, expected: null },
    { a: 3, b: 2, action: 0, expected: null},
    
    { a: null, b: 2, action: Action.Add, expected: null},
    { a: "a", b: 2, action: Action.Add, expected: null},
    { a: 3, b: undefined, action: Action.Add, expected: null},
  
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test('should return expected values', () => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  });
});
