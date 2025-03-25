// apps/web/src/sum.test.ts
function sum(a: number, b: number): number {
    return a + b;
}

describe('sum function', () => {
    it('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
