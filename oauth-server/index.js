module.exports = async (req, res) => {
  const { method, url } = req;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const urlObj = new URL(url, `http://${req.headers.host}`);
  const pathname = urlObj.pathname;

  // Auth endpoint - redirect to GitHub
  if (pathname === '/auth') {
    const state = urlObj.searchParams.get('state') || '';
    const redirectUri = `https://${req.headers.host}/callback`;
    const scope = 'repo,user';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;

    res.writeHead(302, { Location: authUrl });
    res.end();
    return;
  }

  // Callback endpoint - exchange code for token
  if (pathname === '/callback') {
    const code = urlObj.searchParams.get('code');

    if (!code) {
      res.status(400).send('No code provided');
      return;
    }

    try {
      // Exchange code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        }),
      });

      const data = await tokenResponse.json();

      if (data.error) {
        throw new Error(data.error_description || data.error);
      }

      const token = data.access_token;

      // Return HTML that posts message to opener window
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
          <head><title>Authorizing...</title></head>
          <body>
            <p>Authorization successful. You can close this window.</p>
            <script>
              (function() {
                window.opener.postMessage(
                  'authorization:github:success:' + JSON.stringify({
                    token: '${token}',
                    provider: 'github'
                  }),
                  window.opener.location.origin
                );
                window.close();
              })();
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('OAuth error:', error);
      res.status(500).send(`Authentication failed: ${error.message}`);
    }
    return;
  }

  // Default response
  res.status(404).send('Not found');
};
