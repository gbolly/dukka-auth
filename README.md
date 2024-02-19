# dukka-auth
A speech-to-text user account creation with a voice-over welcome message

## PR Segmentation
- This PR https://github.com/gbolly/dukka-auth/pull/1 implements the folder structure for the project
- This PR  https://github.com/gbolly/dukka-auth/pull/2 implements the user auth flow
- This PR https://github.com/gbolly/dukka-auth/pull/3 implements the react  app
- This PR https://github.com/gbolly/dukka-auth/pull/4  implements  docker and readme updates

## Speech to text commands
When engaging with the web form for login and sign up, you have the option to input your credentials manually or utilize speech recognition if your browser supports it.

To activate the speech-to-text feature, simply click the microphone icon on the form. Then, you can verbally command which input field to fill, in any order you prefer.

Remember to click the microphone icon each time you want to give a command, and allow a few seconds after each command before giving the next one.

When the microphone is actively listening for input, it illuminates in green. Conversely, it defaults to grey when inactive.

Below, you'll find a list of commands you can use to interact with the form:

#### Login form commands
- Email: start your speech with `my email is ...` e.g. `"my email is <your email>"`
- Password: start your speech with  `my password is ...` e.g. `"my password is <your password>"`

#### Create account form commands
- Full name: start your speech with `my full name is ...` e.g. `"my full name is Jane Doe"`
- Email: start your speech with `my email is ...` e.g. `"my email is <your email>"`
- Phone number: start your speech with `my phone number is ...` e.g. `"my phone number is 0999939930"`
- Password: start your speech with  `my password is ...` e.g. `"my password is <your password>"`
- Confirm Password: start your speech with  `my password confirmation is ...` e.g. `"my password confirmation is <your password>"`
- Sex: start your speech with `my gender is ...` e.g. `"my gender is Female"`. There are only 3 supported options; Male, Female, Other.
- Country: start your speech with `my country is ...` e.g. `"my country is Nigeria"`. There are only 4 supported options; Algeria, Canada, Ghana, Nigeria.

> **__NOTE__**: Before submitting the forms, double-check the converted text for each field to ensure accuracy. Look out for inconsistencies in text case, spelling errors, or any misinterpretations that may have arisen due to pronunciation issues. It's crucial to review the entered text thoroughly to avoid any mistakes or misunderstandings.


## Running the project locally with Docker

### Prerequisites

Before running the project locally, ensure you have the following setup:

- Clone the repository:

   ```bash
   # for ssh
   git clone git@github.com:gbolly/dukka-auth.git

   # for https
   git clone https://github.com/gbolly/dukka-auth.git

- Create a `.env` file in the root of the project and set the required environment variables:

    ```bash
    export SECRET_KEY=<your-secret-key>
    export DB_NAME=<your-database-name>
    export DB_USER=<your-database-user>
    export DB_PASSWORD=<your-database-password>
    export DB_HOST=<your-database-host>
    export DB_PORT=<your-database-port>
    ```
    
    > **__NOTE__**: You can generate and copy a secret key for the django app by opening a django shell `django-admin shell` and running;

    ```python
    from django.core.management.utils import get_random_secret_key  
    get_random_secret_key()

### To run the project locally using Docker;

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)
- `cd` into the project directory
    ```bash
    cd dukka-auth
- Build and start the Docker containers by issuing the command:

    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images for the backend and frontend services and start the containers.

- Once the containers are running, you can access the application in your web browser:
    - Backend: http://localhost:8000/api/user
    - Frontend: http://localhost:3000

-  If you need to stop the running containers, you can use the following command:
    ```bash
    docker-compose down

### To run the project locally without Docker;

Before running the project locally, ensure you have the following installed:

- Python(3.10): [Installation Guide](https://www.python.org/downloads/)
- Node.js and npm(v21): [Installation Guide](https://nodejs.org/en/download/)

## Backend Setup

1. From the cloned repo, navigate to the `backend` directory:

   ```bash
   cd backend
2. You can setup a virtual environment for the project

    ```bash
    pip install virtualenv
3. Run command to create a virtual env;
    ```bash
    python3.10 -m venv <virtual-environment-name>
4. Activate the created env;
    ```bash
    source <virtual-environment-name>/bin/activate
5. Install Python dependencies:
    ```bash
    pip install -r requirements.txt
6. Set up the database:
    - Ensure you have PostgreSQL installed and running.
    - Create a database and user according to the value in your environmental variables.
7. Run migrations:
    ```bash
    python manage.py migrate
8. Run development server:
    ```bash
    python manage.py runserver
    ```
    To run unit test cases
    ```bash
    python manage.py test
The backend should now be running at http://localhost:8000.

## Frontend Setup

1. From the cloned repo, navigate to the `backend` directory:

   ```bash
   cd frontend/dukka
2. Install Node.js dependencies:

    ```bash
    npm install
3. Run development server:
    ```bash
    npm start
