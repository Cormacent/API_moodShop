def dockerhub = "zakimaulana/apimoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline{
    agent any

    stages{
        stage('Install Dependencies') { 
            steps {
                nodejs('node14npm') {
                    sh 'npm install'
                }   
            }
        }
        stage('build docker image') { 
             steps {
                 script {
                    builder = docker.build(image_name, "--no-cache .")
                 }
            }
        }
        stage("remove unused docker image"){
            steps{
                script {
                    sh 'docker rmi -f \$(docker images -f "dangling=true" -q)'
                }
            }
        }
        stage('test docker image') { 
             steps {
                 script {
                    builder.inside {
                        sh 'echo passed'
                    }
                 }
            }
        }
        stage('Push Image to Registries') { 
            steps {
                script {
                    builder.push()
                }
            }
        }
    }
}
