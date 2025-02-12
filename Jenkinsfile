pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build --no-cache -t storyvord-frontend-dev ."
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh "docker compose down"
                    
                    // Start new containers
                    sh "docker compose up -d"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
