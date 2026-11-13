pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Downloading HTML source code'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Checking HTML project files'
                script {
                    if (isUnix()) {
                        sh 'ls -la'
                    } else {
                        bat 'dir'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image'
                script {
                    if (isUnix()) {
                        sh 'docker build -t my-html-website:latest .'
                    } else {
                        bat 'docker build -t my-html-website:latest .'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying HTML website'
                script {
                    if (isUnix()) {
                        sh '''
                        docker rm -f my-html-container >/dev/null 2>&1 || true
                        docker run -d --name my-html-container -p 8081:80 my-html-website:latest
                        '''
                    } else {
                        bat '''
                        docker rm -f my-html-container 2>NUL
                        docker run -d --name my-html-container -p 8081:80 my-html-website:latest
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Website deployed successfully!'
        }
        failure {
            echo 'Deployment failed. Check the console output.'
        }
    }
}