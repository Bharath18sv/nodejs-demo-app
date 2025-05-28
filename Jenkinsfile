pipeline{
    agent any

    environment{
        IMAGE_NAME = "svb18/nodejs-demo-app"
    }

    stages{
        stage('Clone Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Bharath18sv/nodejs-demo-app.git',
                credentialsId: 'Github' 
            }
        }
        stage('Install Dependencies'){
            steps{
                sh '''
                    export PATH="/opt/homebrew/bin:$PATH"
                    npm install
                '''
            }
        }
        stage('Test'){
            steps{
                sh '''
                    export PATH="/opt/homebrew/bin:$PATH"
                    npm test
                '''
            }
        }
        stage('Build Docker Image'){
            steps{
                sh '''
                    export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
                    security unlock-keychain -p "MyMacPass" ~/Library/Keychains/login.keychain-db
                    docker build -t $IMAGE_NAME .
                '''
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
                    sh '''
                        export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }
    }
}