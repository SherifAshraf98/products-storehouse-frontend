## React Project

Website that represents a simple storehouse (inventory), where user can select a certain category then a list of products attached to this category is shown. User can then choose a certain product and proceed to view the summary of his/her selections.

It is built using React.js, and relies on a backend built using strapi.

## Backend

The Backend was built using <a href="https://docs.strapi.io/developer-docs/latest/getting-started/introduction.html">Strapi</a> which is an open-source headless CMS used for building fast and easily manageable APIs written in JavaScript. It enables developers to make flexible API structures easily using a beautiful user interface.

I used `Postgres` database, and here is the tables structure:
* Categories
  * id: number
  * name: string (required)

* Products
  * id: number
  * name: string (required)
  * price: number (required)

With one-to-many relationship between them

## Frontend

The UI was built using React.js. It was meant to have a very simple design since the goal was to show the functionality and integration with strapi rather than having a beautiful design.


## Packages Used:

* `Material UI`: Used for the UI components
* `Formik`: Used for handle form state
* `Yup`: used to provide validation schema for the form
* `Axios`: Used to make API calls to the backend
* `Prettier`: Used to code formatting


## Project Use case Scenario

* Fetch Categories and show them in a Select input
* User select one category from the first select input
* Get request is made to fetch the products of the selected category
* User select one product
* User clicks on Submit button
* A show page is shown showing the summary of the selected items


#### Website Link:

<a href="https://products-storehouse.herokuapp.com/">https://products-storehouse.herokuapp.com/</a>


## Installation and Setup Instructions

* Clone down this repository. You will need `node` and `npm` installed globally on your machine.  
* Open the project in any code editor (VsCode, WebStorm, etc.)
* Run the following commands:
  * `yarn install`: to install all the packages defined in the `package.json`
  * `yarn start`: to run the project locally
  * Using any browser open `localhost:3000`


## Project Screenshots

#### Home Page
![Home Page](https://i.ibb.co/pdTtVPS/Screen-Shot-2022-04-11-at-12-15-33-AM.png)

#### Trying to Submit without selecting all the required fields
![Trying to Submit without selecting all the required fields](https://i.ibb.co/pr07kY2/Screen-Shot-2022-04-11-at-12-16-39-AM.png)

#### Available Categories fetched from the database
![Available Categories fetched from the database](https://i.ibb.co/KsfrGkP/Screen-Shot-2022-04-11-at-12-17-34-AM.png)

#### Available Products fetched from the database based on the selected category
![Available Products fetched from the database based on the selected category](https://i.ibb.co/K6jmgDs/Screen-Shot-2022-04-11-at-12-16-14-AM.png)

#### Show Page (Summary Dialog) afte submitting the form
![Show Page (Summary Dialog) afte submitting the form](https://i.ibb.co/h2TqP2b/Screen-Shot-2022-04-11-at-12-16-31-AM.png)

