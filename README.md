# JSONForms application

Sample json forms application that builds functional web forms from JSON schemas and patterns

## Features

- Navigate between tabs to discover different forms types and schemas
- Try by yourself using the *upload* tab, just copy and paste the json schema and UI schema
- Go a step further and try using AI generation, enable the running server, OCI model and see AI magic

## Setup

1. For the web side only, enter the ```client``` folder and do ```npm start```, this page contains functional json forms samples and also the playgroupd to try the forms itself.
2. You can find the shcemas used over ```client/src/schema``` folder, discover from the simple to complex applications
3. To use the AI mode, install python dependencies, set up the ```.env``` file with OCI models credentials and make sure to adjust the ```oci_config.json``` file to your current user.
4. Ruin the AI server using uvicorn from ```client/app/server/main``` use port 8000 as default in react app.