import { assert } from 'chai';

import { over, replace, elems, values, when, insert } from '../src/index';


describe('`over` method', () => {
    it('should update value and return origin data structure by valid lens path', () => {
        assert.deepEqual(over(2, x => x * 2, [1, 2, 3, 4, 5]), [1, 2, 6, 4, 5]);

        assert.deepEqual(
            over(['foo', 1], x => x * 21, { foo: [1, 2], bar: [3, 4] }),
            { foo: [1, 42], bar: [3, 4] }
        );
    });

    it('should return immutable copy of origin data structure', () => {
        const ds = {
            foo: {
                bar: { boo: [1, 2, 3] , baz: [4, 5, 6]},
                zoo: 10,
            },
            boo: {
                kek: 'kek',
                lol: 20,
            }
        };

        const changedDs = over(['foo', 'bar', 'boo', 1], x => x * 21, ds);

        assert.deepEqual(changedDs, {
            foo: {
                bar: { boo: [1, 42, 3] , baz: [4, 5, 6]},
                zoo: 10,
            },
            boo: {
                kek: 'kek',
                lol: 20,
            }
        });

        assert.isTrue(ds !== changedDs);
        assert.isTrue(ds.boo === changedDs.boo);
        assert.isTrue(ds.foo !== changedDs.foo);
        assert.isTrue(ds.foo.bar !== changedDs.foo.bar);
        assert.isTrue(ds.foo.bar.baz === changedDs.foo.bar.baz);
        assert.isTrue(ds.foo.bar.boo !== changedDs.foo.bar.boo);
    });

    it('should works fine with `replace` optic', () => {
        assert.deepEqual(
            over(['foo', 0, replace(42, null)], x => null, { foo: [1, 2, 3] }),
            { foo: [42, 2, 3] }
        );
    });

    it('should works fine with `elems`, optic', () => {
        assert.deepEqual(
            over(['foo', elems], x => x * 2, { foo: [1, 2, 3] }),
            { foo: [2, 4, 6] }
        );
    });

    it('should works fine with `values`, optic', () => {
        assert.deepEqual(
            over(values, x => x * 2, { foo: 1, bar: 2, baz: 3 }),
            { foo: 2, bar: 4, baz: 6 }
        );
    });

    it('should works fine with `elems` and `when`, optics', () => {
        assert.deepEqual(
            over(['foo', elems, when(x => x % 2 === 0)], x => x * 2, { foo: [1, 2, 3] }),
            { foo: [1, 4, 3] }
        );

        assert.deepEqual(
            over(['foo', elems, when((x, i) => i === 1)], x => x * 2, { foo: [1, 2, 3] }),
            { foo: [1, 4, 3] }
        );
    });

    it('should works fine with `values` and `when`, optics', () => {
        assert.deepEqual(
            over([values, when(x => x % 2 === 0)], x => x * 2, { foo: 1, bar: 2, baz: 3 }),
            { foo: 1, bar: 4, baz: 3 }
        );

        assert.deepEqual(
            over([values, when((x, k) => k === 'bar')], x => x * 2, { foo: 1, bar: 2, baz: 3 }),
            { foo: 1, bar: 4, baz: 3 }
        );
    });

    it('should works fine with `insert` optic', () => {
        assert.deepEqual(
            over(insert(2), x => x * 2, [1, 2, 3, 4]),
            [1, 2, 6, 3, 4]
        );
    });

});