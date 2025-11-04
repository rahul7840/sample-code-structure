#!/bin/bash
echo "🚀 Starting deployment..."

# Login to ECR
aws ecr get-login-password --region ap-south-1 \
  | docker login --username AWS --password-stdin 208116833517.dkr.ecr.ap-south-1.amazonaws.com

# Stop old container
docker stop user-service || true
docker rm user-service || true

# Pull latest image
docker pull 208116833517.dkr.ecr.ap-south-1.amazonaws.com/user-service:latest

# Run new container
docker run -d --name user-service -p 11001:11001 208116833517.dkr.ecr.ap-south-1.amazonaws.com/user-service:latest

echo "✅ Deployment completed!"
