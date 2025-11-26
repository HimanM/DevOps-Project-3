# Jenkins Configuration Walkthrough

This guide explains how to configure Jenkins to run the CI/CD pipelines for this project, specifically setting up the GitHub Token credential.

## 1. Prerequisites
-   Jenkins installed and running.
-   Docker installed on the Jenkins agent.
-   `Docker Pipeline` and `Pipeline` plugins installed.

## 2. Adding GitHub Token Credential
To allow Jenkins to push changes back to your GitHub repository (for GitOps), you need to add your GitHub Personal Access Token (PAT) as a credential.

1.  **Generate GitHub Token**:
    -   Go to GitHub -> Settings -> Developer settings -> Personal access tokens -> Tokens (classic).
    -   Generate a new token with `repo` scope (full control of private repositories).
    -   Copy the token.

2.  **Add to Jenkins**:
    -   Go to Jenkins Dashboard -> **Manage Jenkins** -> **Credentials**.
    -   Click on **(global)** domain (or your specific domain).
    -   Click **Add Credentials**.
    -   **Kind**: Select **Secret text**.
    -   **Scope**: Global.
    -   **Secret**: Paste your GitHub Token here.
    -   **ID**: Enter `github-token` (This matches the `GIT_CRED_ID` in `Jenkinsfile.deploy`).
    -   **Description**: e.g., "GitHub PAT for GitOps".
    -   Click **Create**.

## 3. Configuring Jobs

### Job 1: Build & Test (`DevOps-Build`)
This job builds the code and pushes Docker images.

1.  Create a new **Pipeline** job named `DevOps-Build`.
2.  **Pipeline Definition**:
    -   **Definition**: Pipeline script from SCM.
    -   **SCM**: Git.
    -   **Repository URL**: Your repo URL (e.g., `https://github.com/himanm/devops-project-3.git`).
    -   **Script Path**: `Jenkinsfile`.
3.  **Triggers**: Configure "Poll SCM" or "GitHub hook trigger" as needed.

### Job 2: Deploy (`DevOps-Deploy`)
This job updates the Kubernetes manifests with the new image tag.

1.  Create a new **Pipeline** job named `DevOps-Deploy`.
2.  **This project is parameterized**:
    -   Add a **String Parameter**.
    -   **Name**: `IMAGE_TAG`.
    -   **Default Value**: `latest`.
    -   **Description**: The Docker image tag to deploy.
3.  **Pipeline Definition**:
    -   **Definition**: Pipeline script from SCM.
    -   **SCM**: Git.
    -   **Repository URL**: Your repo URL.
    -   **Script Path**: `Jenkinsfile.deploy`.
