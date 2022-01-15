import { CurrencyAmount } from './currencyAmount';
import { Token } from '../token';
import JSBI from 'jsbi';
declare type BigintIsh = JSBI | bigint | string;
export declare class TokenAmount extends CurrencyAmount {
    readonly token: Token;
    constructor(token: Token, amount: BigintIsh);
    add(other: TokenAmount): TokenAmount;
    subtract(other: TokenAmount): TokenAmount;
}
export {};