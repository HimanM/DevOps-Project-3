# ArgoCD Configuration Walkthrough

This guide explains how to set up ArgoCD to automatically sync your Kubernetes manifests when changes are detected in the `k8s` folder.

## 1. Prerequisites
-   Kubernetes cluster (e.g., K3s) running.
-   ArgoCD installed in the cluster.
    ```bash
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    ```
-   `argocd` CLI installed (optional, but helpful).

## 2. Accessing ArgoCD
### Option A: Via Ingress (Recommended)
1.  **Apply Ingress**:
    ```bash
    kubectl apply -f k8s/argocd-ingress.yaml
    ```
2.  **Access**:
    -   URL: `https://argocd.himanmanduja.fun`
    -   Username: `admin`
    -   Password: Get it via `kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d`

### Option B: Port Forward (Fallback)
1.  **Port Forward**:
    ```bash
    kubectl port-forward svc/argocd-server -n argocd 8082:443
    ```
2.  **Login**:
    -   URL: `https://localhost:8082`
    -   Username: `admin`
    -   Password: (Same as above)

## 3. Creating the Application
We have already created a manifest for the ArgoCD application at `k8s/argocd-application.yaml`.

1.  **Apply the Manifest**:
    ```bash
    kubectl apply -f k8s/argocd-application.yaml
    ```
    *Make sure you have updated the `repoURL` in this file to point to your repository.*

2.  **Verify in UI**:
    -   Go to the ArgoCD UI.
    -   You should see the `fullstack-app` application.
    -   It should be `Healthy` and `Synced`.

## 4. Configuring Webhooks (Trigger on Change)
By default, ArgoCD polls the Git repository every 3 minutes. To trigger a sync immediately upon a push (e.g., when Jenkins updates the image tag), you should configure a GitHub Webhook.

1.  **Expose ArgoCD Server**:
    -   Since you are running locally or on a private VPS, you need to expose the ArgoCD server to the internet so GitHub can reach it.
    -   You can use an Ingress (if you have a domain) or a tunnel like `ngrok`.
    -   **Ingress Method**: Ensure your Ingress Controller routes traffic to `argocd-server` service.

2.  **Add Webhook in GitHub**:
    -   Go to your Repository -> **Settings** -> **Webhooks**.
    -   Click **Add webhook**.
    -   **Payload URL**: `https://argocd.himanmanduja.fun/api/webhook`
    -   **Content type**: `application/json`.
    -   **Secret**: (Optional) Configure a shared secret in ArgoCD settings if needed.
    -   **Events**: Select **Just the push event**.
    -   Click **Add webhook**.

3.  **Testing**:
    -   Push a change to the `k8s` folder (or let Jenkins do it).
    -   ArgoCD should receive the webhook event and immediately start syncing the application.

## 5. Directory Specific Sync
The `argocd-application.yaml` is configured with `path: k8s`.
```yaml
source:
  path: k8s
```
This means ArgoCD **only** looks for manifests inside the `k8s` directory. Changes to other files (like `frontend/` code) will NOT trigger a sync unless they are accompanied by a change in the `k8s` folder (which is exactly what our Jenkins pipeline does—it updates the image tags in `k8s/`).
