pipeline {
  agent any

  stages {

    stage('Login') {
      steps { bat 'npm login' }
    }

    stage('Install') {
      steps { bat 'npm install' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { bat 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { bat 'npm run-script test' }
        }
      }
    }

    stage('Build') {
      steps { bat 'npm run-script build' }
    }
  }
}
