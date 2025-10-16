export async function login(username, password) {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Login failed: ${res.status} ${text}`);
    }

    return await res.json();
}