# Deploying Tektonis (tektonis.in) to Cloudflare Pages

This guide outlines how to deploy your **Tektonis** web application to **Cloudflare Pages** using your GitHub repository.

---

## 1. Project Configuration (Already Pre-configured)

Your project already includes the required Cloudflare Pages configurations:
- **`public/_redirects`**: Configured with `/*  /index.html  200` to handle client-side SPA routing and deep links.
- **`public/_headers`**: Pre-configured with security headers (`X-Content-Type-Options`, `Referrer-Policy`) and immutable asset caching.
- **`public/robots.txt` & `public/sitemap.xml`**: Pre-configured for `https://tektonis.in`.
- **`wrangler.toml`**: Configured with `pages_build_output_dir = "dist"`.

---

## 2. Step-by-Step Deployment via Cloudflare Dashboard

### Step 1: Log in to Cloudflare
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and log in.
2. In the left navigation, click **Workers & Pages**.
3. Click the **Create application** button, then select the **Pages** tab.
4. Click **Connect to Git**.

### Step 2: Select Your GitHub Repository
1. Authorize Cloudflare to access your GitHub account.
2. Select your repository that is synchronized with AI Studio.
3. Click **Begin setup**.

### Step 3: Configure Build & Deployment Settings
Use the following settings:
- **Project name**: `tektonis` (or your preferred name)
- **Production branch**: `main`
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave blank or default)

*(Optional) Environment variables*:
- If using Node.js 18 or 20, you can add an environment variable:
  - Variable name: `NODE_VERSION`
  - Value: `20`

4. Click **Save and Deploy**. Cloudflare Pages will clone your repository, run `npm run build`, and deploy your site in ~1 minute.

---

## 3. Connecting Your Custom Domain (`tektonis.in`)

Once the initial build finishes:
1. In your Cloudflare Pages project, click the **Custom domains** tab.
2. Click **Set up a custom domain**.
3. Enter `tektonis.in` (and optionally `www.tektonis.in`).
4. Click **Continue**.

### If your domain DNS is managed by Cloudflare:
- Cloudflare will automatically create the `CNAME` record pointing `tektonis.in` to your Cloudflare Pages domain (e.g. `tektonis.pages.dev`).
- SSL/TLS certificate (HTTPS) will be issued automatically within a few minutes.

### If your domain is registered elsewhere (Namecheap, GoDaddy, etc.):
- Cloudflare will show you the DNS record to add at your registrar:
  - **Type**: `CNAME`
  - **Name**: `@` (or `tektonis.in`)
  - **Target**: `<your-project-name>.pages.dev`
- Alternatively, you can change your domain's nameservers to Cloudflare's free DNS for automatic DDoS protection, CDN caching, and instant SSL.

---

## 4. Continuous Deployment
Whenever you make updates in AI Studio and push them to your GitHub repository, Cloudflare Pages will automatically trigger a new production build and deploy it globally within seconds.
