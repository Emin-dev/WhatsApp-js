const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

// Small DOM/jQuery test double: no packages, browser, or network access required.
function loadPage(filename = 'index.html') {
    const html = fs.readFileSync(path.join(root, filename), 'utf8');
    const nodes = new Map();
    const requests = [];
    const makeNode = (attributes = '') => ({
        value: '', children: [], events: {}, attributes,
        scrollHeight: 0, scrollTo() {},
    });
    for (const match of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g)) {
        nodes.set('#' + match[1], makeNode(match[0]));
    }
    const document = {
        ...makeNode(),
        querySelector(selector) { return nodes.get(selector) || null; },
    };
    function wrap(node) {
        return {
            ready(callback) { callback(); return this; },
            click(callback) { return this.on('click', callback); },
            on(type, callback) {
                if (node) (node.events[type] ||= []).push(callback);
                return this;
            },
            val(value) {
                if (arguments.length === 0) return node?.value;
                if (node) node.value = value;
                return this;
            },
            append(value) { if (node && value) node.children.push(value); return this; },
            html(value) { if (node) node.html = value; return this; },
        };
    }
    function $(value) {
        if (value === document) return wrap(document);
        if (typeof value !== 'string') return value;
        return wrap(value.startsWith('<') ? makeNode(value) : nodes.get(value));
    }
    function recordRequest() {
        // Count requests without recording URLs or credentials in a failing test.
        requests.push(true);
        return Promise.resolve({ json: async () => ({ name: '', main: {} }) });
    }
    $.ajax = $.get = $.getJSON = recordRequest;
    vm.runInNewContext(source, {
        $, document, fetch: recordRequest,
        XMLHttpRequest: function () { this.open = recordRequest; this.send = recordRequest; },
        console: { log() {} },
    }, { filename: 'app.js', timeout: 1000 });
    function dispatch(selector, type, which) {
        const node = selector === 'document' ? document : nodes.get(selector);
        const event = { which, key: which === 13 ? 'Enter' : '', target: node, preventDefault() {} };
        for (const callback of node?.events[type] || []) callback(event);
        if (node !== document) {
            for (const callback of document.events[type] || []) callback(event);
        }
    }
    return { nodes, requests, dispatch };
}

test('browser assets contain no weather credential or direct provider URL', () => {
    // Assert booleans so a regression never prints the source or a credential.
    for (const text of [source, index]) {
        assert.equal(/\bappid\s*[=:]/i.test(text), false, 'Weather credential parameter found');
        assert.equal(/api\.openweathermap\.org/i.test(text), false, 'Direct weather provider URL found');
    }
});

test('weather is visibly unconfigured and both controls are disabled', () => {
    const { nodes } = loadPage();
    assert.equal(/id="weather-status" role="status">Weather is not configured\. Search is unavailable\./.test(index), true);
    for (const selector of ['#myWeather', '#btn']) {
        const attributes = nodes.get(selector).attributes;
        assert.equal(/\sdisabled(?:\s|>)/.test(attributes), true);
        assert.equal(attributes.includes('aria-describedby="weather-status"'), true);
    }
    assert.equal(nodes.get('#myWeather').attributes.includes('aria-label="City"'), true);
    assert.equal(nodes.get('#btn').attributes.startsWith('<button type="button"'), true);
});

test('startup, repeated weather clicks, and Enter never request weather', async () => {
    const page = loadPage();
    page.nodes.get('#myWeather').value = 'Baku';
    for (let i = 0; i < 3; i++) {
        // Intentionally dispatch even to disabled controls to catch accidental handlers.
        page.dispatch('#btn', 'click');
        for (const selector of ['#myWeather', '#inputme', '#inputyou', 'document']) {
            page.dispatch(selector, 'keypress', 13);
            page.dispatch(selector, 'keydown', 13);
        }
    }
    await Promise.resolve();
    assert.equal(page.requests.length, 0);
});

test('both chat send controls still append messages and clear the input', () => {
    const page = loadPage();
    for (const [input, button] of [['#inputme', '#me'], ['#inputyou', '#you']]) {
        page.nodes.get(input).value = 'Hello';
        page.dispatch(button, 'click');
        assert.equal(page.nodes.get(input).value, '');
    }
    assert.equal(page.nodes.get('#messageyou').children.length, 2);
    assert.equal(page.nodes.get('#messageme').children.length, 2);
    assert.equal(page.requests.length, 0);
});

test('empty chat input does not append a message', () => {
    const page = loadPage();
    page.dispatch('#me', 'click');
    page.dispatch('#you', 'click');
    assert.equal(page.nodes.get('#messageyou').children.length, 0);
    assert.equal(page.nodes.get('#messageme').children.length, 0);
});

test('shop transformation still works and Enter makes no network request', () => {
    const page = loadPage('shop.html');
    page.nodes.get('#anw').value = 'hello world';
    page.dispatch('#big', 'click');
    assert.equal(page.nodes.get('#anw').value, 'Hello World');
    page.dispatch('#anw', 'keypress', 13);
    assert.equal(page.requests.length, 0);
});
