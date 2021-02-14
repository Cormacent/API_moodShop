def dockerhub = "zakimaulana/apimoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline{
    agent any

    stages{
        stage('Install Dependencies') { 
            steps {
                nodejs('node14') {
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
            // steps {
            //     script {
            //         builder.push()
            //     }
            // }
            steps {
                script {
                    checkout scm
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-creds-zaki') {
                        builder.push()
                    }
                }
            }
        }
    }
}
