pipeline {
  agent any

  stages {

    stage('Login') {
      steps { bat 'npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false' }
      steps { bat 'vsts-npm-auth -config .npmrc' }

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
