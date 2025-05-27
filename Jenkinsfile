pipeline{
    agent any

    environment{
        IMAGE_NAME = "svb18/nodejs-demo-app"
    }

    stages{
        stage('Test Workspace') {
            steps {
                echo "Workspace is: ${env.WORKSPACE}"
                sh 'pwd'
                sh 'ls -la'
            }
        }
        // stage('Clone'){
        //     steps{
        //         git 'https://github.com/Bharath18sv/nodejs-demo-app.git'
        //     }
        // }
        stage('Install Dependencies'){
            steps{
                sh 'npm install'
            }
        }
        stage('Test'){
            steps{
                sh 'npm test'
            }
        }
        stage('Build Docker Image'){
            steps{
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Push Docker Image'){
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS',
                    )
                ])
                {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }
    }
}