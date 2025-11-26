pipeline {
    agent any
    environment {
        DOCKER_CRED = credentials('dockerhub-username')
        // Use Jenkins BUILD_NUMBER as the image tag
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Code Quality') {
            steps {
                echo 'Running linting...'
                sh 'cd frontend && npm install && npm run lint'
            }
        }
        stage('Unit Tests') {
            steps {
                echo 'Running tests...'
                sh 'pip install --break-system-packages pytest flask prometheus_client werkzeug'
                sh 'cd backend && /var/lib/jenkins/.local/bin/pytest'
            }
        }
        stage('Build Docker Images') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        sh 'docker build -t $DOCKER_CRED_USR/devops-project-3-frontend:$IMAGE_TAG ./frontend'
                        sh 'docker build -t $DOCKER_CRED_USR/devops-project-3-backend:$IMAGE_TAG ./backend'
                    }
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    sh 'echo $DOCKER_CRED_PSW | docker login -u $DOCKER_CRED_USR --password-stdin'
                    sh 'docker push $DOCKER_CRED_USR/devops-project-3-frontend:$IMAGE_TAG'
                    sh 'docker push $DOCKER_CRED_USR/devops-project-3-backend:$IMAGE_TAG'
                }
            }
        }
    }
    post {
        success {
            // Trigger the deployment pipeline with the new tag
            build job: 'DevOps-Deploy', parameters: [string(name: 'IMAGE_TAG', value: "${env.BUILD_NUMBER}")], wait: false
        }
    }
}
