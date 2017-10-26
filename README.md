# Issue Tracker Application

## Docs
See the report of Issue Tracker Application [here](https://github.com/avounotr/issue-tracker-app/blob/master/docs/IssueTrackerReport.pdf) and
[here](https://s3.eu-central-1.amazonaws.com/asterios-issue-tracker/IssueTrackerReport.pdf)

## Demo of the Application
Issue tracker Backend deployed on EC2 server and the Frontend application uploaded on
S3. So, this is the [Demo](http://asterios-issue-tracker.s3-website.eu-central-1.amazonaws.com/)

## Setup the application locally

- Download the API from https://github.com/avounotr/issue-tracker-api  
- Read APIs documentation in order to deploy it locally  
- Download the Application from https://github.com/avounotr/issue-tracker-app  
- Create a new OATH project from https://github.com/settings/developers and
set Homepage URL: http://localhost:3020 (or the PORT where the application is
going to run) and Authorization callback URL: http://localhost:3020/login.  
- Add Client ID to config/development file.  

## Run the application locally  

- Run API locally according to the API guide  
- npm install  
- npm run  

## Test the application locally  

- Set ENV_ACCESS_KEY = [Personal Key from github] (https://github.com/settings/tokens)  
- npm install  
- npm test   

TODO: Istanbul should be added to the project in order to check the code coverage from testing  

## Deploy the application  

- npm run build  
- Get files dist-prod/index.html and dist-prod/index-[hash].js and upload them to a server  

## Statistics  

In order to see statistics about the Application product, you should run:  

- npm run build  

And then, you could open the dist-prod/statistics.html file with a browser.   
