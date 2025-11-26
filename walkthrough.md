# Walkthrough - Kubernetes Deployment

I have created the `k8s` directory with the following manifests to deploy your full-stack application:

## Manifests

1.  **`01-namespace.yaml`**: Creates the `fullstack` namespace.
2.  **`02-configmap.yaml`**: Sets `NEXT_PUBLIC_API_URL` to `https://fullstack.himanmanduja.fun/api`.
3.  **`03-secret.yaml`**: Contains a placeholder `API_SECRET_KEY`.
4.  **`04-backend-pvc.yaml`**: Requests 1Gi of storage for the backend.
5.  **`05-backend-deploy.yaml`**: Deploys 2 replicas of the backend, mounting the PVC and injecting env vars.
6.  **`06-backend-service.yaml`**: Exposes the backend on port 5000 (ClusterIP).
7.  **`07-frontend-deploy.yaml`**: Deploys the frontend, injecting the API URL.
8.  **`08-frontend-service.yaml`**: Exposes the frontend on port 3000 (ClusterIP).
9.  **`09-ingress.yaml`**: Configures Ingress to route `devops3.himanmanduja.fun` to frontend (`/`) and backend (`/api`), enabling TLS.
10. **`argocd-application.yaml`**: Defines an ArgoCD Application to sync this repository.
11. **`argocd-ingress.yaml`**: Exposes ArgoCD UI via Ingress (`argocd.himanmanduja.fun`).

## Important Notes

-   **Docker Images**: You must update the image names in `05-backend-deploy.yaml` and `07-frontend-deploy.yaml` with your actual DockerHub username.
-   **Domain**: The Ingress is configured for `devops3.himanmanduja.fun`. Update this if needed.
-   **Cert Resolver**: The Ingress assumes a Cert Resolver or ClusterIssuer is configured.

## Deployment

### Option 1: Manual Deployment
To deploy manually, run:
```bash
kubectl apply -f k8s/
```

### Option 2: ArgoCD Deployment
1.  **Install ArgoCD** (if not already installed):
    ```bash
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    ```
2.  **Apply Application Manifest**:
    -   Edit `k8s/argocd-application.yaml` and replace `https://github.com/YOUR_USERNAME/devops-project-3.git` with your actual Git repository URL.
    -   Run:
        ```bash
        kubectl apply -f k8s/argocd-application.yaml
        ```

### Accessing ArgoCD Dashboard
**Recommended**: Use the Ingress at `https://argocd.himanmanduja.fun` (requires applying `k8s/argocd-ingress.yaml`).

**Fallback (Port Forward)**:
1.  **Port Forward**:
    ```bash
    kubectl port-forward svc/argocd-server -n argocd 8082:443
    ```
2.  **Get Password**:
    ```bash
    kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
    ```
3.  **Login**:
    -   Open [https://localhost:8082](https://localhost:8082)
    -   Username: `admin`
    -   Password: (Output from step 2)

## CI/CD Pipelines

### 1. Build Pipeline (`Jenkinsfile`)
-   Triggers on commit.
-   Builds Docker images with tag `${BUILD_NUMBER}`.
-   Pushes images to DockerHub.
-   Triggers `DevOps-Deploy` job.

### 2. Deploy Pipeline (`Jenkinsfile.deploy`)
-   **Job Name**: `DevOps-Deploy`
-   **Parameter**: `IMAGE_TAG` (string)
-   Updates `k8s/05-backend-deploy.yaml` and `k8s/07-frontend-deploy.yaml` with the new tag.
-   Commits and pushes changes to GitHub.
-   ArgoCD detects changes and syncs the cluster.

## Additional Documentation
-   [Jenkins Configuration](walkthrough_jenkins.md)
-   [ArgoCD Configuration](walkthrough_argocd.md)
