import { assert } from 'chai';
import { sum, elems, values, when } from "../src/index";

describe('`sum` method', () => {
    it('should return value by valid lens path', () => {
        assert.deepEqual(sum([elems, 'foo'], [{ foo: 1 }, { foo: 2 }, { foo: 3 }]), 6);

        assert.deepEqual(
            sum([elems, 'foo', elems], [{ foo: [1, 2] }, { foo: [3, 4] }, { foo: [5, 6] }]),
            21
        );

        assert.deepEqual(
            sum([elems, values], [{ foo: 1, bar: 2 }, { foo: 3, bar: 4 }, { foo: 5, bar: 6 }]),
            21
        );

        assert.deepEqual(
            sum([elems, values, when(v => v % 2 === 0)], [{ foo: 1, bar: 2 }, { foo: 3, bar: 4 }, { foo: 5, bar: 6 }]),
            12
        );
    });
});