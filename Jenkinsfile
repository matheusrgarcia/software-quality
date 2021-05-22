pipeline {
  agent any

  stages {

    stage('Install') {
      steps { bat 'npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false' }
    }

    stage('Angular install') {
      steps { bat 'npm install --save-dev @angular-devkit/build-angular --registry https://registry.npmjs.com --always-auth false' }
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
