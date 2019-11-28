import { assert } from 'chai';
import { collect, elems, values, when } from "../src/index";

describe('`collect` method', () => {
    it('should return value by valid lens path', () => {
        assert.deepEqual(collect([elems, 'foo'], [{ foo: 1 }, { foo: 2 }, { foo: 3 }]), [1, 2, 3]);

        assert.deepEqual(
            collect([elems, 'foo', elems], [{ foo: [1, 2] }, { foo: [3, 4] }, { foo: [5, 6] }]),
            [1, 2, 3, 4, 5, 6]
        );

        assert.deepEqual(
            collect([elems, values], [{ foo: 1, bar: 2 }, { foo: 3, bar: 4 }, { foo: 5, bar: 6 }]),
            [1, 2, 3, 4, 5, 6]
        );

        assert.deepEqual(
            collect([elems, values, when(v => v % 2 === 0)], [{ foo: 1, bar: 2 }, { foo: 3, bar: 4 }, { foo: 5, bar: 6 }]),
            [2, 4, 6]
        );
    });
});