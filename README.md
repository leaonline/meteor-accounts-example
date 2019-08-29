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

After startup you need to open the mongo in the auth server:

```bash
$ meteor mongo
-> db.oauth_clients.find()
```

Copy the `client_id` and `secret` into the `settings.json of the `clientapp`.

Now you should be able to login with the authserver by opening the auth dialog.

