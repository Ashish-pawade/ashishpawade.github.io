# ashishpawade.in — Personal Portfolio

Your personal portfolio website. Hosted on GitHub Pages with a custom domain.

## Deploy to GitHub Pages (5-minute setup)

### Step 1: Create the GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `ashishpawade.github.io`
3. Set to **Public**
4. Click **Create repository**

### Step 2: Upload your site
1. Click **"uploading an existing file"** on the empty repo page
2. Drag and drop `index.html` and `CNAME`
3. Commit message: "Initial portfolio site"
4. Click **Commit changes**

### Step 3: Enable GitHub Pages
1. Go to repo **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Your site will be live at `https://ashishpawade.github.io` in ~2 minutes

### Step 4: Connect your custom domain (ashishpawade.in)
1. In repo Settings → Pages → Custom domain, enter: `ashishpawade.in`
2. Check **Enforce HTTPS**
3. Go to **Namecheap** → Domain List → your domain → **Advanced DNS**
4. Delete existing records, then add:

   | Type    | Host  | Value                          |
   |---------|-------|--------------------------------|
   | A       | @     | 185.199.108.153                |
   | A       | @     | 185.199.109.153                |
   | A       | @     | 185.199.110.153                |
   | A       | @     | 185.199.111.153                |
   | CNAME   | www   | ashishpawade.github.io         |

5. Wait 10–30 minutes for DNS propagation
6. Your site will be live at `https://ashishpawade.in`

## Customisation

### Update your email
In `index.html`, find `ashish.pawade@email.com` and replace with your actual email.

### Update GitHub link
Find `https://github.com/Ashish-Pawade` and update if your username is different.

### Add a profile photo
To add your photo, place it in the repo as `photo.jpg` and add an `<img>` tag in the hero or about section.

## Files

| File       | Purpose                                  |
|------------|------------------------------------------|
| index.html | Your complete portfolio (single file)    |
| CNAME      | Tells GitHub Pages your custom domain    |
| README.md  | This deployment guide                    |
