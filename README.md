# DevOps Project 3: Full-Stack GitOps Deployment

![Project Landing Page](docs/home.png)

## Overview

This project demonstrates a production-grade **GitOps** workflow for deploying a full-stack application on Kubernetes. It leverages **Jenkins** for Continuous Integration (CI) and **ArgoCD** for Continuous Deployment (CD), ensuring that the state of the cluster always matches the configuration in the Git repository.

The application consists of:
*   **Frontend**: A Next.js application serving the user interface.
*   **Backend**: A Python Flask API handling data requests.
*   **Infrastructure**: K3s Kubernetes cluster with Ingress management.

---

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Infrastructure Setup](#infrastructure-setup)
    *   [Installing K3s](#installing-k3s)
    *   [Installing Jenkins](#installing-jenkins)
    *   [Installing ArgoCD](#installing-argocd)
3.  [Configuration Guide](#configuration-guide)
    *   [Jenkins Configuration](#jenkins-configuration)
    *   [ArgoCD Configuration](#argocd-configuration)
4.  [Deployment Workflow](#deployment-workflow)
5.  [Visual Reference](#visual-reference)

---

## Prerequisites

Before starting, ensure you have the following:

*   **Linux Server** (Ubuntu 20.04+ recommended) or a local VM.
*   **Root Access** or sudo privileges.
*   **Ingress Controller** (Optional):
    *   Not required if you use **NodePort** to access the application via IP.
    *   Required only if you want to use a domain name with **Traefik** or **Nginx**.
*   **Domain Name** (Optional).
*   **DockerHub Account** for storing container images.
*   **GitHub Account** for hosting the repository.

---

## Infrastructure Setup

### Installing K3s

K3s is a lightweight, certified Kubernetes distribution. We will use it to host our application and tools.

1.  **Install K3s**:
    ```bash
    curl -sfL https://get.k3s.io | sh -
    ```

2.  **Verify Installation**:
    ```bash
    sudo kubectl get nodes
    ```
    *You should see your node in a `Ready` state.*

3.  **Configure Access**:
    Copy the kubeconfig to your user directory to run `kubectl` without sudo:
    ```bash
    mkdir -p ~/.kube
    sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
    sudo chown $(id -u):$(id -g) ~/.kube/config
    ```

### Installing Nginx Ingress Controller (Optional)

K3s comes with Traefik by default. If you prefer Nginx, you must install the controller:

1.  **Install via Helm**:
    ```bash
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update
    helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
    ```

2.  **Disable Traefik (Recommended if using Nginx)**:
    If you want Nginx to be the primary controller on ports 80/443, you may need to disable Traefik in K3s config or ensure they don't conflict.
    *   *Quick Fix*: Edit `/etc/systemd/system/k3s.service` and add `--disable traefik` to the `ExecStart` command, then run `sudo systemctl daemon-reload && sudo systemctl restart k3s`.

### Installing Jenkins

You can install Jenkins **anywhere** (Kubernetes, Docker, or your local machine). As long as it can access GitHub and DockerHub, it will work.

Below is a standard deployment on Kubernetes:

1.  **Create Namespace**:
    ```bash
    kubectl create namespace jenkins
    ```

2.  **Deploy Jenkins**:
    You can use the official Helm chart or a manifest. For simplicity, here is a standard deployment approach:
    ```bash
    # Add Jenkins Helm Repo
    helm repo add jenkins https://charts.jenkins.io
    helm repo update

    # Install Jenkins
    helm install jenkins jenkins/jenkins -n jenkins
    ```

3.  **Unlock Jenkins**:
    Retrieve the initial admin password:
    ```bash
    kubectl exec --namespace jenkins -it svc/jenkins -c jenkins -- /bin/cat /var/jenkins_home/secrets/initialAdminPassword
    ```
    *Access Jenkins at `http://<YOUR-SERVER-IP>:8080` (you may need to port-forward or configure Ingress).*

### Installing ArgoCD

ArgoCD will manage the deployment of our application manifests.

1.  **Create Namespace**:
    ```bash
    kubectl create namespace argocd
    ```

2.  **Install ArgoCD**:
    ```bash
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    ```

3.  **Access ArgoCD CLI**:
    Download the CLI tool:
    ```bash
    curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
    sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
    rm argocd-linux-amd64
    ```

4.  **Retrieve Password**:
    ```bash
    kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
    ```

---

## Configuration Guide

### Jenkins Configuration

Jenkins needs access to DockerHub (to push images) and GitHub (to update manifests).

#### 1. Configure Credentials
Navigate to **Manage Jenkins > Credentials > System > Global credentials**.

*   **DockerHub Credentials**:
    *   **Kind**: Username with password
    *   **ID**: `dockerhub-username`
    *   **Username**: Your DockerHub username
    *   **Password**: Your DockerHub password/token

*   **GitHub Token**:
    *   **Kind**: Secret text
    *   **ID**: `github-token`
    *   **Secret**: Your GitHub Personal Access Token (PAT) with `repo` scope.

#### 2. Create Pipelines

**Build Pipeline (`DevOps-Build`)**:
*   Create a new Pipeline job.
*   **Definition**: Pipeline script from SCM.
*   **SCM**: Git.
*   **Repository URL**: `https://github.com/himanmanduja/devops-project-3.git`
*   **Script Path**: `Jenkinsfile`

**Deploy Pipeline (`DevOps-Deploy`)**:
*   Create a new Pipeline job.
*   **Definition**: Pipeline script from SCM.
*   **SCM**: Git.
*   **Repository URL**: `https://github.com/himanmanduja/devops-project-3.git`
*   **Script Path**: `Jenkinsfile.deploy`
*   **This project is parameterized**: Check this box.
    *   Add String Parameter: `IMAGE_TAG`

### ArgoCD Configuration

Connect ArgoCD to your Git repository to start syncing.

1.  **Create Application**:
    Apply the provided manifest to configure the app:
    ```bash
    kubectl apply -f k8s/argocd-application.yaml
    ```
    *Ensure you update the `repoURL` in `k8s/argocd-application.yaml` to point to your fork.*

2.  **Setup Webhook (Optional)**:
    To trigger syncs immediately on push:
    *   In GitHub, go to **Settings > Webhooks**.
    *   Add your ArgoCD URL (e.g., `https://argocd.himanmanduja.fun/api/webhook`).
    *   Select **Just the push event**.

---

## Deployment Workflow

1.  **Developer Commits Code**: Changes are pushed to the `main` branch.
2.  **Jenkins Build**:
    *   Detects the commit.
    *   Builds Docker images for Frontend and Backend.
    *   Tags images with the Build ID.
    *   Pushes images to DockerHub.
3.  **Jenkins Deploy**:
    *   Triggered automatically by the Build job.
    *   Updates `k8s/05-backend-deploy.yaml` and `k8s/07-frontend-deploy.yaml` with the new image tag.
    *   Commits and pushes these changes back to GitHub.
4.  **ArgoCD Sync**:
    *   Detects the change in the Kubernetes manifests.
    *   Automatically syncs the cluster to match the new state.
    *   Performs a rolling update of the pods.

---

## Visual Reference

### Jenkins Pipelines Overview
![Architecture](docs/jenkins_project_3_pipelines_overview.png)

### Jenkins Pipelines
**CI Pipeline Execution**:
![CI Pipeline](docs/jenkins_ci_pipeline.png)

**CD Pipeline Execution**:
![CD Pipeline](docs/jenkins_devops_deploy_pipeline.png)

### ArgoCD Dashboard
**Application Status**:
![ArgoCD App](docs/argocd-app-detail.png)

**Resource Map**:
![ArgoCD Pods](docs/argocd-podview.png)

### Kubernetes Resources
**Cluster State**:
![Kubectl Get All](docs/kubectl-get-all.png)

---

## License

This project is **free to use** and was created for **educational purposes**. Feel free to fork, modify, and learn from it!
