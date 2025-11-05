#!/bin/bash
exec > /tmp/postdeploy.log 2>&1
set -x

echo "🚀 Starting deployment..."

# Ensure Docker is running
sudo systemctl start docker || true

# Stop old container if running
sudo docker stop sample-server || true
sudo docker rm sample-server || true

# Pull latest image from ECR (auth handled by ECR Credential Helper)
echo "📦 Pulling latest image..."
sudo docker pull 208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest

# Run new container
echo "🚀 Starting new container..."
sudo docker run -d --restart unless-stopped --name sample-server -p 11001:11001 \
  208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest

echo "✅ Deployment completed successfully!"
