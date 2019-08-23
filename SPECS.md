# Specifications

## Purpose

This application is intended to provide a sophisticated user management system. 
It runs as a standalone application, which is to be integrated into a greater application landscape.

It is intended to be

* easy to configure
* safe to use
* as secure as the underlying technologies and frameworks are
* easy to connect with external Meteor applications
* well documented

The application bases on the following main compartments 

* accounts management
* client app management
* client user authentication
* client resource authorization


## Accounts management

### Administrator accounts

#### Root administrator

also named initial administrator

* An admin account is required to execute tasks that require most special permissions
* If no users are locatable the app has to require an admin to be created first
* To create an admin account the user has to open the root page of the app after successful server start and provide login credentials
* The administrator should never be "shared" in terms of the OAuth flow
* The administrator has most highest permissions and can overcome permissions of any created group or role
* The initial administrator account can't be deleted

#### Other administrators

also named sub administrator

* The initial administrator can create other administrator accounts
* A sub-admin has all the permissions of the initial-admin except CRUD admins
* An administrator account, created by the initial administrator can only be deleted by the initial administrator

#### Non administrators

* All other accounts are considered non administrators

### Managing groups and roles

* It must be possible to CRUD groups and roles
* Only administrative accounts should be able to CRUD



### Managing user accounts

* A user account is any non-administrative account
* Permission levels can be defined by using various groups and roles

### Local management vs. remote management

#### Local management using administrative account

* It must be possible to fully CRUD manage all accounts using the web UI and an administrative account

#### Remote management using authorized clients



## Client app management

### Register a client application

* It should be possible to register a client using a Meteor settings file
* To register a client using a settings file, the following entries are required:
  * Title
  * ... what else?
  
* An administrator should be able to register a client application using a certain ui route, providing a registration form
* It should not be possible for an arbitrary user account to register a client app

## Client user authentication

### Receive an access token

### Receive a refresh token

## Client resource authorization

### Basic authorization

### Access core user data

### Access user profile data

### Access resources from an external resource server