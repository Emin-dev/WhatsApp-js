# [students](https://emin-dev.github.io/WhatsApp-js/)https://emin-dev.github.io/WhatsApp-js/

## Weather

Weather search is unavailable until a server-side integration is configured.
The static site does not send weather requests. Shared API credentials must
never be placed in browser JavaScript or client-side environment variables.

## Checks

With Node.js 24, run:

```sh
node --check app.js
node --test tests/*.test.cjs
```

The dependency-free tests cover the disabled weather controls, absence of
weather requests and embedded credential parameters, and the existing chat
and shop handlers. They use a DOM/jQuery test double, not a full browser.
