# Linking App Back in OpenShift

This procedure tries to give an overview of the procedure involved in deploy Linking-App-Back in an OpenShift environment, in particular OpenShift 4.2 environment.

## Requisites

- An OCP Cluster (Tested in OpenShift 4.2)
- An OpenShift Project
- An user with developer rights in previous OpenShift project
- openshift-client installed
- bash console installed

## Overview

Basically, the procedure included in this document tries to perform the following tasks:

- Create an image stream in OCP which will be used to build nodejs project (based on NODDEJS official image stream)
- Create a build config object in order to create a new image based on our image stream with GITHUB repository content (Project nodejs)
- Generate a new image stream version (latest) with GITHUB code based on the build config created in the previous step
- Create a service in order to allow access to nodejs container
- Create a deployment config object charged with the container creation and inject environment variables
- Start image build process
- Start deployment process

**IMPORTANT: It is required to replace variables with current values in linking-app-back-template-deploy.sh file**

## Procedure

In order to deploy this NodeJS project in OpenShift with all dependencies included, it is necessary execute the following commands in a bash console:

```
$ oc login -u user -p password https://console-openshift-console.example.com
$ oc project projectexample01
$ vi linking-app-back-template-deploy.sh
$ sh linking-app-back-template-deploy.sh projectexample01 <project_name> <git_user> <git_password> <images_user> <images_password> <jwt_secret> <nodemailer_password>
```

## Test

Once the procedure execution is finished, it is possible to test Linking App Back following next steps:

- Manually testing pods deployment and other objects creation

```
$ watch oc get all -n projectexample01
```

## Author

Asier Cidon
