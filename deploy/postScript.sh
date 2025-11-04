#!/bin/bash
echo "🚀 Starting deployment..."

# Login to ECR
aws ecr get-login-password --region ap-south-1 \
  | docker login --username AWS --password-stdin 208116833517.dkr.ecr.ap-south-1.amazonaws.com

# Stop old container
docker stop sample-server || true
docker rm sample-server || true

# Pull latest image
docker pull 208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest


# Run new container
docker run -d --name sample-server -p 11001:11001 208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest

echo "✅ Deployment completed!"
