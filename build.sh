# Vite build script
# Author: Jay Horsfall

npm run build

cd dist
echo "jayhorsfall.com" > CNAME

git add *
git commit -m "automated deploy"
git push

cd ../