# nuxt-madison

## Local Development Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Deploy to Production

1. Login through SSH to the InMotion Hosting account.
2. Navigation to source folder

```bash
$ cd public_html/madisoncounty-nuxt/
```

3. Pull latest code from Github

```bash
$ git pull origin main
```

4. Run the production build script

```bash
$ npm run build
```

5. Access the screen where the server is running. The screen remains active even if we log out of the server.

```bash
$ screen -r
```

6. Restart the Nuxt Server using `Ctrl + C` to kill the server then running the start script

```bash
$ npm start
```

7. Detach from the screen by using `Ctrl + A + D`

Make sure to always check that screen is active by using

```bash
$ screen -ls
```

**Visit the website to make sure the site is running.**

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
