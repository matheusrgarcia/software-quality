pipeline {
  agent any

  stages {

    stage('Set registry') {
      steps { bat 'npm set https://registry.npmjs.com'}
    }

    stage('Set auth token') {
      steps { bat 'npm config set //registry.npmjs.com/:_authToken "03408764-0cb4-49a8-ba08-ab88ef2b6874"'}
    }

    stage('Set always auth') {
      steps { bat 'npm config set //registry.npmjs.com/:always-auth true'}
    }

     stage('lOGIN') {
      steps { bat 'npm login'}
    }

    stage('Install') {
      steps { bat 'npm install'}
    }

    stage('Angular CLI') {
      steps { bat 'npm install -g @angular/cli' }
    }

    stage('Angular') {
      steps { bat 'npm install --save-dev @angular-devkit/build-angular'}
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
