/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:util:position
 * @fileoverview Test suite for `mdast-util-position`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var position = require('./index.js');

/*
 * Fixture.
 */

var properties = {
    'position': {
        'start': {
            'line': 1,
            'column': 1,
            'indent': [],
            'offset': 0
        },
        'end': {
            'line': 1,
            'column': 2,
            'indent': [],
            'offset': 1
        }
    }
};

var objects = {
    'position': {
        'start': {},
        'end': {}
    }
};

var values = {
    'position': {}
};

var none = {};

var pos = {
    'line': null,
    'column': null,
    'offset': null,
    'indent': null
};

/*
 * Tests.
 */

test('mdast-util-position', function (t) {
    ['start', 'end'].forEach(function (type) {
        t.test(type, function (st) {
            var fn = position[type];

            st.same(
                fn(),
                pos,
                'should not throw without node'
            );

            st.same(
                fn(properties),
                properties.position[type],
                'should get type'
            );

            st.same(
                fn(objects),
                pos,
                'should return an empty object without objects'
            );

            st.same(
                fn(values),
                pos,
                'should return an empty object without values'
            );

            st.same(
                fn(none),
                pos,
                'should return an empty object without position'
            );

            st.end();
        });
    });

    t.test('generated', function (st) {
        st.equal(
            position.generated(),
            true,
            'should not throw without node'
        );

        st.equal(
            position.generated(properties),
            false,
            'should return false when with properties'
        );

        st.equal(
            position.generated(objects),
            true,
            'should return true when without properties'
        );

        st.equal(
            position.generated(values),
            true,
            'should return true when without objects'
        );

        st.equal(
            position.generated(none),
            true,
            'should return true when without position'
        );

        st.end();
    });

    t.end();
});
