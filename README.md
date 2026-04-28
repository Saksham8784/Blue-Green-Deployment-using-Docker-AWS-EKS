# Blue-Green Deployment using Docker & AWS EKS
## Overview

This project demonstrates a zero-downtime deployment strategy using Blue-Green Deployment on AWS EKS.
Two versions of the application are deployed simultaneously, while only one version receives live traffic at a time.
#### 🔵 Blue → Stable (live production)
#### 🟢 Green → New version (ready for release)

Traffic is switched instantly without downtime using Kubernetes Service selectors.

## Architecture Diagram
<img width="1030" height="902" alt="diagram-export-28-04-2026-21_40_39" src="https://github.com/user-attachments/assets/60ac5127-8645-4041-a0e7-5965a7514a37" />

## Key Concepts Used
```bash id="p2z6hg"

Docker containerization
AWS EKS (managed Kubernetes)
LoadBalancer Service
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
#### Build Images:
```
docker build -t blue-image ./blue
docker build -t green-image ./green
```
#### Push to DockerHub:
```
docker tag blue-image <your-username>/blue-image
docker push <your-username>/blue-image

docker tag green-image <your-username>/green-image
docker push <your-username>/green-image
```
## ☸️ Kubernetes Deployment (EKS)
#### Apply all resources:
```
kubectl apply -f k8s/
```
##### Verify:
```
kubectl get pods
kubectl get svc
```

## 🌐 Load Balancer Configuration (Kubernetes Service)
This project uses a Kubernetes Service of type LoadBalancer to expose the application externally.
#### When the service is created:
```
kubectl apply -f k8s/service.yaml
```
Kubernetes automatically provisions an AWS Load Balancer and assigns a public DNS.

### How it Works
The LoadBalancer Service acts as the entry point
AWS automatically creates and manages the load balancer
Traffic is forwarded to Kubernetes Service
Service routes traffic to pods using label selectors

## 🌐 Access Application
#### Get external URL:
```
kubectl get svc my-service
```
#### Open in browser:
```
http://<LOAD-BALANCER-DNS>
```
## 🔁 Traffic Switching (Blue → Green)
```
kubectl edit svc my-service
```
Update selector:
```
version: blue → green
```
👉 Traffic is instantly routed to Green (zero downtime)

## 🔙 Rollback (Green → Blue)
```
kubectl edit svc my-service
```
Update selector:
```
version: green → blue
```
👉 Immediate rollback in case of failure

## Output
```
🔵 Blue version served initially
🟢 Green version after switch
⚡ Instant rollback capability
🚫 Zero downtime during deployment
```
