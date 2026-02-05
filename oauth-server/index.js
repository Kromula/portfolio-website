const express = require('express');
const simpleOauth2 = require('simple-oauth2');
const cors = require('cors');

const app = express();
app.use(cors());

const oauth2 = simpleOauth2.create({
  client: {
    id: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_CLIENT_SECRET,
  },
  auth: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizePath: '/login/oauth/authorize',
  },
});

app.get('/auth', (req, res) => {
  const authorizationUri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: process.env.REDIRECT_URL,
    scope: 'repo,user',
    state: req.query.state,
  });
  res.redirect(authorizationUri);
});

app.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  try {
    const result = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: process.env.REDIRECT_URL,
    });
    const token = result.access_token;

    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage('authorization:github:success:${JSON.stringify({
              token,
              provider: 'github'
            })}', '*');
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Access Token Error', error);
    res.send('Authentication failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`OAuth server listening on port ${PORT}`);
});
