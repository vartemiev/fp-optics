import { assert } from 'chai';
import { get, replace } from "../src";

describe('`get` method', () => {
    it('should return value by valid lens path', () => {
        assert.equal(get(2, [1, 2, 3, 4, 5]), 3);

        assert.equal(get(['foo', 1], { foo: [1, 2], bar: [3, 4] }), 2);
    });

    it('should works fine with `replace` optic', () => {
        assert.equal(get(['foo', 0, replace(1, 42)], { foo: [1, 2], bar: [3, 4] }), 42);
    });
});