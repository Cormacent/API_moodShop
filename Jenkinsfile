def dockerhub = "zakimaulana/apimoodshop"
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder

pipeline{
    agent any

    parameters {
        choice(name: 'DEPLOY', choices: ['DEV','PROD'])
    }

    stages{
        stage('Install Dependencies') { 
            steps {
                nodejs('node14npm') {
                    sh 'npm install'
                    sh 'printf "MODE=DEV\
                        \nDB_HOST=postgres\
                        \nDB_USER=cormac\
                        \nDB_PASS=c0b4d1b4c4\
                        \nDB_DATABASE=moodshop\
                        \nDB_PORT=5432\
                        \n\n# REDIS\
                        \nREDIS_HOST=redis\
                        \nREDIS_PORT=6379\
                        \nREDIS_PASS=c0b4d1b4c4\
                        \n\n# JWT\
                        \nJWT_KEYS=rahasiakuterbongkarsudah\
                        \n\n# CLOUDINARY\
                        \nCLOUD_KEY=676327326565441\
                        \nCLOUD_SECRET=A4FazLHEsU2TArM4oWcjVxSJZM4\
                        \nCLOUD_NAME=devops-engineer\
                        \nCLOUD_ENV=cloudinary://676327326565441:A4FazLHEsU2TArM4oWcjVxSJZM4@devops-engineer" > .env'
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
                    sh 'docker rmi \$(docker images -f "dangling=true" -q)'
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
        stage("Deploy to other server"){
            parallel {
                stage("DEV"){
                    when {
                        expression {
                            params.DEPLOY == "DEV"
                        }
                    }
                    steps{
                        script {
                            sshPublisher(
                                publishers: [
                                    sshPublisherDesc(
                                        configName: 'development',
                                        verbose: false,
                                        transfers: [
                                            sshTransfer(
                                                execCommand: "docker pull ${image_name}; cd /home/developer/app; docker-compose down; docker rmi -f \$(docker images -f 'dangling=true' -q)",
                                                execTimeout: 1200000
                                            )
                                        ]
                                    )
                                ]
                            )
                        }
                    }
                }
                stage("PROD"){
                    when {
                        expression {
                            params.DEPLOY == "PROD"
                        }
                    }
                    steps{
                        script {
                            sshPublisher(
                                publishers: [
                                    sshPublisherDesc(
                                        configName: 'production',
                                        verbose: false,
                                        transfers: [
                                            sshTransfer(
                                                execCommand: "docker pull ${image_name}; cd /home/production/app; docker-compose down; docker rmi -f \$(docker images -f 'dangling=true' -q)",
                                                execTimeout: 1200000
                                            )
                                        ]
                                    )
                                ]
                            )
                        }
                    }
                }
            }
        }
    }
}
