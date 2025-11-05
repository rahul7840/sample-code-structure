#!/bin/bash
exec > /tmp/postdeploy.log 2>&1
set -x

echo "🚀 Starting PM2 deployment..."

APP_DIR="/home/ec2-user/app"
SERVICES_DIR="$APP_DIR/services"

# Ensure PM2 is installed
if ! command -v pm2 &> /dev/null
then
  echo "⚠️ PM2 not found, installing globally..."
  sudo npm install -g pm2
fi

# Stop all running PM2 apps (so we can restart clean)
echo "🛑 Stopping existing PM2 services..."
pm2 stop all || true

cd "$SERVICES_DIR" || exit 1

# Loop through each service
for service in */ ; do
  if [ -d "$service" ]; then
    SERVICE_NAME=$(basename "$service")
    echo "🔧 Processing service: $SERVICE_NAME"

    cd "$service" || continue

    # Load .env (required for migrations & app start)
    if [ -f ".env" ]; then
      echo "📌 Loading env for $SERVICE_NAME"
      export $(grep -v '^#' .env | xargs)
    fi

    echo "📦 Installing dependencies..."
    npm install --production

    # Run migrate-mongo if installed
    if [ -f "node_modules/.bin/migrate-mongo" ]; then
      echo "🔄 Running migrations for $SERVICE_NAME..."
      npx migrate-mongo up
    else
      echo "ℹ️ No migrate-mongo found, skipping"
    fi

    echo "🚀 Starting $SERVICE_NAME with PM2..."
    pm2 start npm --name "$SERVICE_NAME" -- start

    cd ..
  fi
done

# Auto restart on server reboot
pm2 save
pm2 startup | bash

echo "✅ Deployment complete! Use: pm2 ls / pm2 logs <service>"
