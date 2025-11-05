#!/bin/bash
echo "🚀 Starting deployment..."

# Ensure Docker is running
systemctl start docker || true

# Stop old container if running
docker stop sample-server || true
docker rm sample-server || true

# Pull latest image from ECR (auth handled by ECR Credential Helper)
echo "📦 Pulling latest image..."
docker pull 208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest

# Run new container
echo "🚀 Starting new container..."
docker run -d --name sample-server -p 11001:11001 \
  208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest

echo "✅ Deployment completed successfully!"
