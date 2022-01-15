import JSBI from 'jsbi';
import { Rounding } from '../../constants';
declare type BigintIsh = JSBI | bigint | string;
export declare const enum RoundingMode {
    /**
     * Rounds towards zero.
     * I.e. truncate, no rounding.
     */
    RoundDown = 0,
    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds away from zero.
     */
    RoundHalfUp = 1,
    /**
     * Rounds towards nearest neighbour.
     * If equidistant, rounds towards even neighbour.
     */
    RoundHalfEven = 2,
    /**
     * Rounds away from zero.
     */
    RoundUp = 3
}
export declare class Fraction {
    readonly numerator: JSBI;
    readonly denominator: JSBI;
    constructor(numerator: BigintIsh, denominator?: BigintIsh);
    get quotient(): JSBI;
    get remainder(): Fraction;
    invert(): Fraction;
    add(other: Fraction | BigintIsh): Fraction;
    subtract(other: Fraction | BigintIsh): Fraction;
    lessThan(other: Fraction | BigintIsh): boolean;
    equalTo(other: Fraction | BigintIsh): boolean;
    greaterThan(other: Fraction | BigintIsh): boolean;
    multiply(other: Fraction | BigintIsh): Fraction;
    divide(other: Fraction | BigintIsh): Fraction;
    toSignificant(significantDigits: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces: number, format?: object, rounding?: Rounding): string;
}
export {};
