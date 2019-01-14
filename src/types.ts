export type Morphism<A, B> = (value: A) => B;
export type Applicative<T> = T;

export type IAlgebra = IApplicative;
export type Algebra<T> = Applicative<T>;

export type MapF<T, U> = (x: T, key?: number | string) => Algebra<U>;
export type Optic<T, U, V> = (F: IAlgebra) => (x2yF: MapF<T, U>) => (ds: V, key?: number | string) => Algebra<U>;

export type AnyOptic = Optic<any, any, any>;
export type OpticPart = AnyOptic | number | string;

export interface IApplicative {
    map<A, B>(f: Morphism<A, A | B>, x: A): Applicative<A | B>
    ap<A, B>(fA: Applicative<Morphism<A, A | B>>, x: A): Applicative<A | B>
    of<U>(x: U): Applicative<U>
}
