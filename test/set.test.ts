import { assert } from 'chai';

import { set, replace, elems, values, when, insert } from '../src';


describe('`set` method', () => {
    it('should set value and return origin data structure by valid lens path', () => {
        assert.deepEqual(set(2, 42, [1, 2, 3, 4, 5]), [1, 2, 42, 4, 5]);

        assert.deepEqual(
            set(['foo', 1], 42, { foo: [1, 2], bar: [3, 4] }),
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

        const changedDs = set(['foo', 'bar', 'boo', 2], 42, ds);

        assert.deepEqual(changedDs, {
            foo: {
                bar: { boo: [1, 2, 42] , baz: [4, 5, 6]},
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
            set(['foo', 0, replace(42, null)], null, { foo: [1, 2, 3] }),
            { foo: [42, 2, 3] }
        );
    });

    it('should works fine with `elems`, optic', () => {
        assert.deepEqual(
            set(['foo', elems], 42, { foo: [1, 2, 3] }),
            { foo: [42, 42, 42] }
        );
    });

    it('should works fine with `values`, optic', () => {
        assert.deepEqual(
            set(values, 42, { foo: 1, bar: 2, baz: 3 }),
            { foo: 42, bar: 42, baz: 42 }
        );
    });

    it('should works fine with `elems` and `when`, optics', () => {
        assert.deepEqual(
            set(['foo', elems, when(x => x % 2 === 0)], 42, { foo: [1, 2, 3] }),
            { foo: [1, 42, 3] }
        );

        assert.deepEqual(
            set(['foo', elems, when((x, i) => i === 1)], 42, { foo: [1, 2, 3] }),
            { foo: [1, 42, 3] }
        );
    });

    it('should works fine with `values` and `when`, optics', () => {
        assert.deepEqual(
            set([values, when(x => x % 2 === 0)], 42, { foo: 1, bar: 2, baz: 3 }),
            { foo: 1, bar: 42, baz: 3 }
        );

        assert.deepEqual(
            set([values, when((x, k) => k === 'bar')], 42, { foo: 1, bar: 2, baz: 3 }),
            { foo: 1, bar: 42, baz: 3 }
        );
    });

    it('should works fine with `insert` optic', () => {
        assert.deepEqual(
            set(insert(2), 6, [1, 2, 3, 4]),
            [1, 2, 6, 3, 4]
        );

        assert.deepEqual(
            set(insert(2), [10, 11, 12], [1, 2, 3, 4]),
            [1, 2, 10, 11, 12, 3, 4]
        );

        assert.deepEqual(
            set(insert(10), [10, 11, 12], [1, 2, 3, 4]),
            [1, 2, 3, 4, 10, 11, 12]
        );
    });

});