#!/bin/bash
#execute from inside /var/www/page.com/html directory

pm2 delete srv
sudo git clone "https://github.com/RubikovaSocka/f1online-nextjs"
cd f1online-nextjs
sudo npm install
sudo npm run build
sudo cp -r .next/ _next/
pm2 start npm --name "srv" -- start
