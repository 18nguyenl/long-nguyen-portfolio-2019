export const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
export const lerp = (a, b, n) => (1 - n) * a + n * b;