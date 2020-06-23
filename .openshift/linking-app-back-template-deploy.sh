#!/bin/bash
####
# Red Hat
# @author: Asier Cidon
# @date: 20200330
####
#
# Process template to deploy a NodeJS App (Linking-app-images)
#

usage() {
echo "Usage: $0 <project_name> <git_user> <git_password> <images_user> <images_password> <jwt_secret> <nodemailer_password> <openshift_domain>"
echo "Example:"
echo "   sh linking-app-back-template-deploy.sh linking-app linkingappspain pass123 adminimages pass123 secret123 pass123 example.com"
exit 1
}

[[ $# -eq 0 ]] && usage

PROJECT_NAME=$1
DOMAIN=$8
MONGODB_DATABASE="linking"
SERVICE_NAME="linking-app-back"
APP_SERVICE_CORS="https://linking-app-front-${PROJECT_NAME}.${DOMAIN}"
SERVICE_GIT_URL="https://github.com/acidonper/linking-app-back.git"
SERVICE_GIT_USER=$2
SERVICE_GIT_PASSWORD=$3
IMAGE_USER=$4
IMAGE_PASSWORD=$5
# IMAGE_SERVICE="https://linking-app-images-${PROJECT_NAME}.${DOMAIN}/photos"
IMAGE_SERVICE="http://linking-app-images:5001/photos"
APP_ADMIN_NAME=$4
APP_ADMIN_PASS=$5
JWT_SECRET=$6
JWT_EXPIRES="3000"
USER_NODEMAILER="linkingappspain@gmail.com"
PASSWORD_NODEMAILER=$7
URL_CONFIRM_NODEMAILER="https://linking-app-back-${PROJECT_NAME}.${DOMAIN}/api/users/confirm"
CONFIRMATION_NODEMAILER="false"


# Create a deployment config object charged with the container creation and inject environment variables 
oc process -f linking-app-back-template.yaml  \
-p NAMESPACE=$PROJECT_NAME \
-p MONGODB_DATABASE=$MONGODB_DATABASE \
-p SERVICE_NAME=$SERVICE_NAME  \
-p APP_SERVICE_CORS=$APP_SERVICE_CORS \
-p SERVICE_GIT_URL=$SERVICE_GIT_URL \
-p SERVICE_GIT_USER=$SERVICE_GIT_USER  \
-p SERVICE_GIT_PASSWORD=$SERVICE_GIT_PASSWORD \
-p IMAGE_SERVICE=$IMAGE_SERVICE  \
-p IMAGE_USER=$IMAGE_USER  \
-p IMAGE_PASSWORD=$IMAGE_PASSWORD \
-p APP_ADMIN_NAME=$APP_ADMIN_NAME \
-p APP_ADMIN_PASS=$APP_ADMIN_PASS \
-p USER_NODEMAILER=$USER_NODEMAILER \
-p PASSWORD_NODEMAILER=$PASSWORD_NODEMAILER \
-p URL_CONFIRM_NODEMAILER=$URL_CONFIRM_NODEMAILER \
-p CONFIRMATION_NODEMAILER=$CONFIRMATION_NODEMAILER \
-p JWT_SECRET=$JWT_SECRET \
-p JWT_EXPIRES=$JWT_EXPIRES  | oc apply -f - -n $PROJECT_NAME


# Start build image
oc start-build bc/$SERVICE_NAME -n $PROJECT_NAME

