pipeline {
    agent any

    environment {
        IMAGE_NAME = "reactjs-auth-backend-docker"
        CONTAINER_NAME = "reactjs-auth-backend-docker-container"
        APP_PORT = "8180"
    }

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Cloning the backend repo...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Run Docker Container') {
            steps {
                bat 'docker rm -f %CONTAINER_NAME% || echo Container not found'
                bat 'docker run -d -p %APP_PORT%:8180 --name %CONTAINER_NAME% %IMAGE_NAME%'
            }
        }
    }


}