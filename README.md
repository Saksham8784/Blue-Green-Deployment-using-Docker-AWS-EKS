# Blue-Green Deployment using Docker & AWS EKS
## Overview

This project demonstrates a zero-downtime deployment strategy using Blue-Green Deployment on AWS EKS.
Two versions of the application run simultaneously:

#### 🔵 Blue → Stable (live production)
#### 🟢 Green → New version (ready for release)

Traffic is switched instantly without downtime using Kubernetes Service selectors.

## Architecture Diagram
<img width="2816" height="1536" alt="blue_green" src="https://github.com/user-attachments/assets/3114024d-3262-45ec-b7f2-171b3d84641e" />


## Key Concepts Used
```bash id="p2z6hg"

Docker containerization
Kubernetes Deployments & Services
AWS EKS (managed Kubernetes)
LoadBalancer Service (auto AWS ELB creation)
Blue-Green Deployment strategy
Liveness & Readiness Probes
High Availability using Replicas

```

## 📁 Project Structure

```bash id="p2z6hg"
.
├── blue/                  # 🔵 Blue version (stable production app)
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
│
├── green/                 # 🟢 Green version (new release)
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
│
├── k8s/                   # ☸️ Kubernetes manifests
│   ├── blue-deployment.yaml
│   ├── green-deployment.yaml
│   └── service.yaml
│
└── README.md              # 📘 Project documentation
```

### 🔍 Explanation

* **blue/** → Stable version of the application (live traffic)
* **green/** → New version of the application (ready for deployment)
* **k8s/** → Kubernetes configuration files for deploying and managing both versions
* **service.yaml** → Controls traffic routing between Blue and Green versions
* **README.md** → Documentation and usage guide

## 🐳 Docker Setup
Build Images
docker build -t blue-image ./blue
docker build -t green-image ./green
Push to DockerHub
docker tag blue-image <your-username>/blue-image
docker push <your-username>/blue-image

docker tag green-image <your-username>/green-image
docker push <your-username>/green-image

## ☸️ Kubernetes Deployment (EKS)
Apply all resources
kubectl apply -f k8s/
Verify
kubectl get pods
kubectl get svc

## 🌐 Access Application

Get external URL:

kubectl get svc my-service

Open in browser:

http://EXTERNAL-IP

## 🔁 Traffic Switching (Blue → Green)
kubectl edit svc my-service

Update selector:

version: blue → green

👉 Traffic is instantly routed to Green (zero downtime)

## 🔙 Rollback (Green → Blue)
kubectl edit svc my-service

Update selector:

version: green → blue

👉 Immediate rollback in case of failure

## Output
```
🔵 Blue version served initially
🟢 Green version after switch
⚡ Instant rollback capability
🚫 Zero downtime during deployment
```
