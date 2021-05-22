pipeline {
  agent any

  stages {

    stage('Install') {
      steps { bat 'npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false' }
    }

    stage('Angular install') {
      steps { bat 'npm install -g npm@latest' }
    }

     stage('Angular CLI') {
      steps { bat 'npm install -g @angular/cli' }
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
