import JSBI from 'jsbi';
import { SolidityType } from './constants';
declare type BigintIsh = JSBI | bigint | string;
export declare function validateSolidityTypeInstance(value: JSBI, solidityType: SolidityType): void;
export declare function validateAndParseAddress(address: string): string;
export declare function parseBigintIsh(bigintIsh: BigintIsh): JSBI;
export declare function sqrt(y: JSBI): JSBI;
export declare function sortedInsert<T>(items: T[], add: T, maxSize: number, comparator: (a: T, b: T) => number): T | null;
export {};
