import { assert } from 'chai';

import { remove, replace, elems, values, when } from '../src';


describe('`remove` method', () => {
    it('should update value and return origin data structure by valid lens path', () => {
        assert.deepEqual(remove(2, [1, 2, 3, 4, 5]), [1, 2, 4, 5]);

        assert.deepEqual(
            remove(['foo', 1], { foo: [1, 2], bar: [3, 4] }),
            { foo: [1], bar: [3, 4] }
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

        const changedDs = remove(['foo', 'bar', 'boo', 1], ds);

        assert.deepEqual(changedDs, {
            foo: {
                bar: { boo: [1, 3] , baz: [4, 5, 6]},
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

    it('should works fine with `elems`, optic', () => {
        assert.deepEqual(
            remove(['foo', elems], { foo: [1, 2, 3] }),
            { foo: [] }
        );
    });

    it('should works fine with `elems` and `replace` optic', () => {
        assert.deepEqual(
            remove(['foo', replace(undefined, []), elems], { foo: [1, 2, 3] }),
            {}
        );
    });

    it('should works fine with `values`, optic', () => {
        assert.deepEqual(
            remove(values, { foo: 1, bar: 2, baz: 3 }),
            {}
        );
    });

    it('should works fine with `elems` and `when`, optics', () => {
        assert.deepEqual(
            remove(['foo', elems, when(x => x % 2 === 0)], { foo: [1, 2, 3] }),
            { foo: [1, 3] }
        );

        assert.deepEqual(
            remove(['foo', elems, when((x, i) => i === 1)], { foo: [1, 2, 3] }),
            { foo: [1, 3] }
        );
    });

    it('should works fine with `values` and `when`, optics', () => {
        assert.deepEqual(
            remove([values, when(x => x % 2 === 0)], { foo: 1, bar: 2, baz: 3 }),
            { foo: 1, baz: 3 }
        );

        assert.deepEqual(
            remove([values, when((x, k) => k === 'bar')], { foo: 1, bar: 2, baz: 3 }),
            { foo: 1, baz: 3 }
        );
    });

});