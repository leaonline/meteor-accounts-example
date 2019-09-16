# meteor-accounts-example
Status: work in progress.

Example repo for the custom accounts logins

## Intallation

Run the install script from the project root:

```bash
$ ./scripts/install.sh
```

## Run

Go to the apps and hit the run script:

```bash
$ cd authserver
$ ./run.sh
```

and in another terminal


```bash
$ cd clientapp
$ ./run.sh
```

### Register the client app


1. Go to the client app at `http://localhost:4000/` and click `Register client`

2. Copy the redirect Url, because we need it in the next step. Keep the tab and the form open, we need it in step 4.

3. Open the auth server's registration page at `http://localhost:3030/registerClient` and enter at least

* the title
* the homepage (just for ensuring unique entries based on URI)
* the redirect url

and submit.

4. Copy the credentials from the submit result and paste them into the registration form, finally submit.

5. Go to `http://localhost:3030/createUser` and create a new user. This will be the resource owner.

6. Now you can login with the created user on `http://localhost:4000/` by clicking login with lea

7. Authorize resources and continue to view the received user credentials.


