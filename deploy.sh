#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'corona.maxuniverse.de' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# Set credentials
git config --global user.email "${{ secrets.USER_EMAIL }}"
git config --global user.name "${{ secrets.USER_NAME }}"

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Mugetsu15/corona.git master:gh-pages

cd -
