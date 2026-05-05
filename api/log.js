export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, userAgent } = req.body || {};

  const payload = {
    content: "New image click logged",
    embeds: [
      {
        title: "Image Click Event",
        fields: [
          { name: "URL", value: url || "N/A" },
          { name: "User-Agent", value: userAgent || "N/A" },
          { name: "Timestamp", value: new Date().toISOString() },
        ],
      },
    ],
  };

  try {
    await fetch("https://discord.com/api/webhooks/1501284240484995307/Ov6tKqjQmDxbMaKTYoEfN7QHTEPjqv0XyCnkl3d91dMVM5tlFA6l3B00tsBoOvdYo7kq", {
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
