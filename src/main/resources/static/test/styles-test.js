/** Simple browser-based CSS smoke tests.
 * A smoke test is a very fast check that critical assets and basic UI styles load.
 * - Runs simple computed-style assertions and an HTTP HEAD check for /styles.css?v=TEST
 * - Loads elements from the test HTML page and asserts computed style properties.
 * - Results are written to `#results` and also logged to the console.
 */

// Cache reference to results container (present in the test HTML).
const resultsEl = document.getElementById('results');
// If the results element is missing, log an error — tests can still run but won't show on page.
if (!resultsEl) {
    console.error('styles-test: #results element not found');
}

/** Define test cases. Each entry specifies:
 * - Name: Human-readable test description
 * - Selector: Element to query in the page
 * - Prop: CSS property to check (uses getComputedStyle)
 * - Expected | match | test: different ways to validate the property value
 */
const tests = [
    {
        name: 'Title font-size is set (px)',
        selector: '#title',
        prop: 'font-size',
        // Expect a numeric pixel value like "16px" — use a regex to allow decimals.
        match: /^[\d.]+px$/
    },
    {
        name: 'Primary button background is not transparent',
        selector: '#primary-btn',
        prop: 'background-color',
        // Custom validator that rejects "transparent" and fully-transparent rgba values.
        test: v => {
            if (!v) return false;
            const val = v.trim().toLowerCase();
            if (val === 'transparent') return false;
            if (val === 'rgba(0, 0, 0, 0)' || val === 'rgba(0,0,0,0)') return false;
            return true;
        }
    },
    {
        name: 'Banner is block-level',
        selector: '#banner',
        prop: 'display',
        // Exact match expectation (e.g. "block")
        expected: 'block'
    }
];

// Write summary text to the page (if available) and always log to console.
function renderSummary(text) {
    if (resultsEl) resultsEl.textContent = text;
    console.log(text);
}

/**
 * Perform an HTTP HEAD check for /styles.css?v=TEST to validate status and Content-Type.
 * If HEAD indicates a problem, also perform a GET and inspect the body to detect HTML error pages.
 * Returns an object: { ok: boolean, lines: string[] }
 */
async function checkCssHttp() {
    const lines = [];
    const url = '/styles.css?v=TEST';
    try {
        const headResp = await fetch(url, { method: 'HEAD' });
        const status = headResp.status;
        const ct = headResp.headers.get('content-type') || 'none';
        lines.push(`[HTTP HEAD] status: ${status}, Content-Type: ${ct}`);
        const ok = status === 200 && ct.toLowerCase().includes('text/css');

        if (!ok) {
            // Try to GET the body to see if the server returned an HTML error page
            try {
                const getResp = await fetch(url);
                const text = await getResp.text();
                const looksLikeHtml = /^\s*<!doctype|<html/i.test(text) || /<title|<body/i.test(text);
                lines.push(`[HTTP GET] body length: ${text.length}, looksLikeHtml: ${looksLikeHtml}`);
                if (looksLikeHtml) {
                    lines.push('[HTTP GET] body appears to be HTML (likely an error page)');
                }
            } catch (e) {
                lines.push(`[HTTP GET] failed: ${e && e.message ? e.message : e}`);
            }
        }

        return { ok, lines };
    } catch (err) {
        lines.push(`[HTTP HEAD] request failed: ${err && err.message ? err.message : err}`);
        return { ok: false, lines };
    }
}

// Main runner: queries elements, reads computed styles, applies validators,
// accumulates pass/fail messages and renders a summary.
async function run() {
    try {
        const out = []; // lines of output (pass/fail messages)
        let passed = 0;

        // 0) HTTP check for CSS
        const httpResult = await checkCssHttp();
        out.push(...httpResult.lines);
        if (httpResult.ok) {
            passed++;
            out.push('[PASS] CSS HTTP check (status 200 and Content-Type includes text/css)');
        } else {
            out.push('[FAIL] CSS HTTP check (status or Content-Type incorrect)');
        }

        // Computed-style tests
        for (const t of tests) {
            // Find the target element for this test.
            const el = document.querySelector(t.selector);
            if (!el) {
                // Element not present on page — count as failure for this test.
                out.push(`[FAIL] ${t.name} — element ${t.selector} not found`);
                continue;
            }

            // Read the computed style value for the requested property.
            const cs = getComputedStyle(el);
            const value = cs.getPropertyValue(t.prop).trim();

            // Determine pass/fail using one of the validator forms.
            let ok = false;
            if (t.expected !== undefined) {
                ok = value === t.expected; // exact string equality
            } else if (t.match) {
                ok = t.match.test(value); // regex match
            } else if (t.test) {
                ok = Boolean(t.test(value)); // custom predicate
            } else {
                ok = value.length > 0; // fallback: any non-empty value
            }

            // Record result and increment pass counter when appropriate.
            if (ok) {
                passed++;
                out.push(`[PASS] ${t.name} — ${t.prop}: ${value}`);
            } else {
                out.push(`[FAIL] ${t.name} — ${t.prop}: ${value}`);
            }
        }

        // Compose summary and render it.
        const totalTests = tests.length + 1; // include the HTTP check
        const summary = `Tests: ${passed}/${totalTests} passed\n\n` + out.join('\n');
        renderSummary(summary);

        // Visual class for result container
        if (out.some(l => l.includes('[FAIL]') || l.toLowerCase().includes('failed') || l.includes('appears to be HTML'))) {
            if (resultsEl) resultsEl.className = 'fail';
        } else {
            if (resultsEl) resultsEl.className = 'pass';
        }
    } catch (err) {
        // Catch unexpected runtime errors and surface them both on-page and in console.
        const msg = `styles-test: runtime error — ${err && err.message ? err.message : err}`;
        if (resultsEl) resultsEl.textContent = msg;
        console.error(msg, err);
    }
}

// Run tests after the DOM is ready so elements exist and styles have applied.
window.addEventListener('DOMContentLoaded', run);