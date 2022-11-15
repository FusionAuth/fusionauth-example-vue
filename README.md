# Example: Using Vue with FusionAuth
This project contains an example project that illustrates using FusionAuth with a Vue front-end and a NodeJS/Express backend. This application will use an OAuth Authorization Code workflow and the PKCE (PKCE stands for Proof Key for Code Exchange, and is often pronounced “pixie”) extension to log users in and a NodeJS backend to store your access token securely.

You can read the blog post here: TODO

## Prerequisites
You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/): Presumably you already have this on your machine if you are looking at this project locally; if not, use your platform's package manager to install git, and `git clone` this repo.
* [NodeJS](https://nodejs.org): This will install the NodeJS runtime, which includes the package management tool `npm` needed for pulling down the various dependencies.
* OPTIONAL: [Docker](https://www.docker.com): If you wish to run FusionAuth from within a Docker container.

## Installation
To install, do the following in a shell/Terminal window:

* `git clone https://github.com/fusionauth/fusionauth-example-vue` or `gh repo clone fusionauth/fusionauth-example-vue`
* `cd fusionauth-example-vue`: This is the root of the example.
* `cd client; npm install`: This will bring all the node modules onto the machine.
* `cd ../server; npm install`: Likewise.

## FusionAuth Configuration
This example assumes that you will run FusionAuth from a Docker container. In the root of this project directory (next to this README) are two files [a Docker compose file](./docker-compose.yml) and an [environment variables configuration file](./.env). Assuming you have Docker installed on your machine, a `docker-compose up` will bring FusionAuth up on your machine.

The FusionAuth configuration files also make use of a unique feature of FusionAuth, called Kickstart: when FusionAuth comes up for the first time, it will look at the [Kickstart file](./kickstart/kickstart.json) and mimic API calls to configure FusionAuth for use. It will perform all the necessary setup to make this demo work correctly, but if you are curious as to what the setup would look like by hand, the "FusionAuth configuration (by hand)" section of this README describes it in detail.

For now, get FusionAuth in Docker up and running (via `docker-compose up`) if it is not already running; to see, [click here](http://localhost:9011/) to verify it is up and running.

> **NOTE**: If you ever want to reset the FusionAuth system, delete the volumes created by docker-compose by executing `docker-compose down -v`. FusionAuth will only apply the Kickstart settings when it is first run (e.g., it has no data configured for it yet).


## Running
To run, do the following:

* In one shell, run `docker-compose up`
* In another shell, `cd server` and `npm run start`
* In a third shell, `cd client` and `npm run serve`

[Open a browser to the Vue app](http://localhost:4200/). The app will automatically reload if you change any of the source files.

> **NOTE**: Again, as noted above, if you ever want to reset the FusionAuth system, delete the volumes created by docker-compose by executing `docker-compose down -v`.


## Architecture
The app has three parts, each running on a different `localhost` port:

- `localhost:8080` is the Vue app. It has a single route (`/`) and makes calls to the Express app.
- `localhost:3000` is the Express app. It has several routes (like `/login` and `/logout`), which are used by the Vue front-end. The Express app makes calls to FusionAuth.
- `localhost:9011` is your instance of FusionAuth. It has several endpoints (like `/authorize` and `/introspect`). It accepts calls from the Express app and sends back information, such as access tokens and user registration data.

So, the parts connect like this: 

`Vue (8080) <---> Express (3000) <---> FusionAuth (9011)`

The Vue app never talks directly to FusionAuth. This is important, because the Vue app can be easily picked apart by anyone online (it's Javascript, which means the source is directly visible to anyone with a browser), which means you can't keep confidential information there. While some calls directly to FusionAuth are safe, it's usually important to keep things separated like this.

**TODO** Fill in details here


## FusionAuth configuration (by hand)
Again, remember that all of this is already automated for you as part of the [Kickstart file](kickstart/kickstart.json) that will be executed the first time FusionAuth comes up, and if you ever need to regenerate it, you can delete the Docker volumes (`docker-compose down -v`) to remove them entirely (which will then cause FusionAuth to initialize itself from the Kickstart file on the next startup).

If you wish to run FusionAuth directly from your machine, check out the [FusionAuth download page](https://fusionauth.io/download) for different ways to install locally, depending on your operating system and/or package manager of choice:

* **Windows/PowerShell**: Execute this command: `bash -c "curl -fsSL https://raw.githubusercontent.com/FusionAuth/fusionauth-install/master/install.sh | bash -s"`. This installation method installs the FusionAuth ZIP packages into the current working directory. You'll also need to manually install a database for FusionAuth to work. You can learn more about our Fast Path installation in our [Fast Path Installation Guide](https://fusionauth.io/docs/v1/tech/installation-guide/fast-path).

* **Windows/WSL**: If you have the Windows Subsystem for Linux installed, you can use the **Linux/Debian** instructions below.

* **macOS/Homebrew**: Tap the FusionAuth cask with `brew tap fusionauth/homebrew-fusionauth`, then install with `brew install fusionauth-app`. If you want FusionAuth to always start when your machine boots, enable it as a service with `brew services start fusionauth-app`. You'll also need to manually install a database for FusionAuth to work. You can also review our [Homebrew Installation Guide](https://fusionauth.io/docs/v1/tech/installation-guide/homebrew) for more information.

* **macOS/Manual**: Execute this command: `bash -c "curl -fsSL https://raw.githubusercontent.com/FusionAuth/fusionauth-install/master/install.sh | bash -s"`. This installation method installs the FusionAuth ZIP packages into the current working directory. You'll also need to manually install a database for FusionAuth to work. You can learn more about our Fast Path installation in our Fast [Path Installation Guide](https://fusionauth.io/docs/v1/tech/installation-guide/fast-path).

* **Linux/Manual**: Execute this command: `bash -c "curl -fsSL https://raw.githubusercontent.com/FusionAuth/fusionauth-install/master/install.sh | bash -s"`. This installation method installs the FusionAuth ZIP packages into the current working directory. You'll also need to manually install a database for FusionAuth to work. You can learn more about our Fast Path installation in our [Fast Path Installation Guide](https://fusionauth.io/docs/v1/tech/installation-guide/fast-path). You'll need to run the `startup.sh` script as well.

* **Linux/Debian**: Copy and paste the shell command below: 

    ```bash
    VERSION=$(curl -fsSL https://license.fusionauth.io/api/latest-version) && \
    curl -fsSL https://files.fusionauth.io/products/fusionauth/${VERSION}/fusionauth-app_${VERSION}-1_all.deb > fusionauth-app_${VERSION}-1_all.deb && \
    sudo dpkg -i fusionauth-app_${VERSION}-1_all.deb && \
    systemctl start fusionauth-app
    ```

    This installation method installs the FusionAuth platform packages (DEBs) and will require sudo access. You'll also need to manually install a database for FusionAuth to work.

* **Linux/RedHat**: Copy and paste the shell command below:

    ``bash
    VERSION=$(curl -fsSL https://license.fusionauth.io/api/latest-version) && \
    curl -fsSL https://files.fusionauth.io/products/fusionauth/${VERSION}/fusionauth-app-${VERSION}-1.noarch.rpm > fusionauth-app-${VERSION}-1.noarch.rpm && \
    sudo rpm -i fusionauth-app-${VERSION}-1.noarch.rpm && \
    systemctl start fusionauth-app
    ```

    This installation method installs the FusionAuth platform packages (RPMs) and will require sudo access. You'll also need to manually install a database for FusionAuth to work.

Once FusionAuth is running locally on port 9011 (the default), go [here](http://localhost:9011/admin) to log in as an admin and configure an asymmetric key, an application, and two users. If you have never run FusionAuth locally before, you will need to create an admin user (next).

If you prefer to run FusionAuth from a remote server (such as the cloud), ...

### Create the Admin user
This will only be necessary

### Create the asymmetric key

### Create the application

### Configure the application to use the asymmetric key you created

### Register the admin user to the application

### Create a non-admin user

### Register the non-admin user to the application

