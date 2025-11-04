#!/bin/bash
echo "✅ Running post-deploy script..."

# Go to deployment dir
cd /home/ec2-user/deploy

# Pull latest image & restart container
docker pull 208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest
docker stop sample-server || true
docker rm sample-server || true
docker run -d --name sample-server -p 3000:3000 208116833517.dkr.ecr.ap-south-1.amazonaws.com/sample-server:latest

echo "🚀 Deployment completed!"
