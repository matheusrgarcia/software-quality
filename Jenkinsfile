pipeline {
  agent any

  stages {

    stage('Install') {
      steps { bat 'npm install --registry https://registry.npmjs.com/ --auth=${npmToken} --always-auth=true' }
    }

    // stage('Angular CLI') {
    //   steps { bat 'npm install -g @angular/cli' }
    // }

    // stage('Angular') {
    //   steps { bat 'npm install --save-dev @angular-devkit/build-angular'}
    // }

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
