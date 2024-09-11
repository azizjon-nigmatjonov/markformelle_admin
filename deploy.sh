echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

ssh-keygen -R 10.40.15.10

echo "Deploying files to server..."
scp -r dist/* ladmin@10.40.12.40:/var/www/mfdashboard/

echo "Done!"