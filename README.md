Calorifer  |  List of endpoints.

### Calorifer

List of endpoints.

-   **[Authorization](#Authorization)**
    -   [Change password](#jump-Authorization-Changepassword)
    -   [Forgot password](#jump-Authorization-Forgotpassword)
    -   [Login](#jump-Authorization-Login)
    -   [Update Password](#jump-Authorization-UpdatePassword)
    -   [logout](#jump-Authorization-logout)
    -   [registration](#jump-Authorization-registration)
    -   [update credentials](#jump-Authorization-updatecredentials)
-   **[Days](#Days)**
    -   [Create Day](#jump-Days-CreateDay)
    -   [Delete day](#jump-Days-Deleteday)
    -   [Edit days name](#jump-Days-Editdaysname)
    -   [get all days](#jump-Days-getalldays)
    -   [get single day](#jump-Days-getsingleday)
-   **[Food](#Food)**
    -   [Get single food](#jump-Food-Getsinglefood)
    -   [addFoodToTheMeal](#jump-Food-addFoodToTheMeal)
    -   [create food](#jump-Food-createfood)
-   **[Meals](#Meals)**
    -   [Create meal](#jump-Meals-Createmeal)
    -   [Delete Meal](#jump-Meals-DeleteMeal)
    -   [Edit Meal](#jump-Meals-EditMeal)
    -   [Get meal](#jump-Meals-Getmeal)
-   **[Users](#Users)**
    -   [Edit user details](#jump-Users-Edituserdetails)
    -   [Get details](#jump-Users-Getdetails)
    -   [createuserdetails](#jump-Users-createuserdetails)

### Authorization 7 {#Authorization .panel-title}

Endpoints for authorization.

raw [](#collapse-Authorization-Changepassword)

#### **Change password**  |  **PUT**   http://localhost:5000/api/v1/auth/updatepassword {.panel-title}

##### Description {.label .label-default}

\

Change password.\
\

##### Body {.label .label-primary}

{ "currentPassword": "123456", "newPassword": "123123" }

raw [](#collapse-Authorization-Forgotpassword)

#### **Forgot password**  |  **POST**   http://localhost:5000/api/v1/auth/forgotpassword {.panel-title}

##### Description {.label .label-default}

\

Request for updating forgotten password.\
\

##### Body {.label .label-primary}

{ "email": "vzdrizhni@gmail.com" }

raw [](#collapse-Authorization-Login)

#### **Login**  |  **POST**   http://localhost:5000/api/v1/auth/login {.panel-title}

##### Description {.label .label-default}

\

User login.\
\

##### Body {.label .label-primary}

{ "name": "User", "email": "example@mail.com", "password": "123321" }

raw [](#collapse-Authorization-UpdatePassword)

#### **Update Password**  |  **PUT**   http://localhost:5000/api/v1/auth/resetpassword/fc003eabbfe5b6cc23fa5128f1d2d83d1abf3e90 {.panel-title}

##### Description {.label .label-default}

\

Updates the password based on key that was send with an email.\
\

##### Body {.label .label-primary}

{ "password": "123456" }

[](#collapse-Authorization-logout)

#### **logout**  |  **DELETE**   http://localhost:5000/api/v1/auth/logout {.panel-title}

##### Description {.label .label-default}

\

User logout.\
\

raw [](#collapse-Authorization-registration)

#### **registration**  |  **POST**   http://localhost:5000/api/v1/auth/register {.panel-title}

##### Description {.label .label-default}

\

User registraion.\
\

##### Body {.label .label-primary}

{ "name": "User", "email": "example@mail.com", "password": "123321" }

raw [](#collapse-Authorization-updatecredentials)

#### **update credentials**  |  **PUT**   http://localhost:5000/api/v1/auth/updatedetails {.panel-title}

##### Description {.label .label-default}

\

Change user name.\
\

##### Body {.label .label-primary}

{ "name": "John Doe" }

### Days 5 {#Days .panel-title}

List of endpoints for the application. Most of endpoints require to be
logged in.

[](#collapse-Days-CreateDay)

#### **Create Day**  |  **POST**   http://localhost:5000/api/v1/days {.panel-title}

##### Description {.label .label-default}

\

Creates a day for user.\
\

[](#collapse-Days-Deleteday)

#### **Delete day**  |  **DELETE**   http://localhost:5000/api/v1/days/604f520b6c69023150d99378 {.panel-title}

##### Description {.label .label-default}

\

Deletes the day.\
\

raw [](#collapse-Days-Editdaysname)

#### **Edit days name**  |  **PUT**   http://localhost:5000/api/v1/days/60589c63a7607c30343ee549 {.panel-title}

##### Description {.label .label-default}

\

Changes a days name(If for some reason user wants a different from
default one).\
\

##### Body {.label .label-primary}

{ "name": "Dinner" }

[](#collapse-Days-getalldays)

#### **get all days**  |  **GET**   http://localhost:5000/api/v1/days {.panel-title}

##### Description {.label .label-default}

\

Returns all days for the current user.\
\

[](#collapse-Days-getsingleday)

#### **get single day**  |  **GET**   http://localhost:5000/api/v1/days/604f5aebccdbf60be0979abd {.panel-title}

##### Description {.label .label-default}

\

Returns certain day based on a current user and url params.\
\

### Food 3 {#Food .panel-title}

Endpoints for food.

[](#collapse-Food-Getsinglefood)

#### **Get single food**  |  **GET**   http://localhost:5000/api/v1/food/123 {.panel-title}

##### Description {.label .label-default}

\

Retrieves single food.\
\

raw [](#collapse-Food-addFoodToTheMeal)

#### **addFoodToTheMeal**  |  **POST**   http://localhost:5000/api/v1/days/604f80c9714c382170369eed/meals/604f620db230251becad1b03/addFood {.panel-title}

##### Description {.label .label-default}

\

Adds food to the meal document.\
\

##### Body {.label .label-primary}

{"food": { "name": "Cod Liver Oil", "calories": 902 }, "weight":10 }

raw [](#collapse-Food-createfood)

#### **create food**  |  **POST**   http://localhost:5000/api/v1/food {.panel-title}

##### Description {.label .label-default}

\

Creates a food.\
\

##### Body {.label .label-primary}

{ "name": "bread", "calories": 350 }

### Meals 4 {#Meals .panel-title}

Endpoints for Meals based on a user and a day.

[](#collapse-Meals-Createmeal)

#### **Create meal**  |  **POST**   http://localhost:5000/api/v1/days/60589c63a7607c30343ee549/meals {.panel-title}

##### Description {.label .label-default}

\

Creates a meal.\
\

[](#collapse-Meals-DeleteMeal)

#### **Delete Meal**  |  **DELETE**   http://localhost:5000/api/v1/days/604f82dcd27a6a0570565c09/meals/60589c83a7607c30343ee54a {.panel-title}

##### Description {.label .label-default}

\

Deletes a meal.\
\

raw [](#collapse-Meals-EditMeal)

#### **Edit Meal**  |  **PUT**   http://localhost:5000/api/v1/days/604f5aebccdbf60be0979abd/meals/60589c83a7607c30343ee54a {.panel-title}

##### Description {.label .label-default}

\

Updates a meal.\
\

##### Body {.label .label-primary}

{ "name": "Meal-1614182637055", "totalCalories": 4000, "\_id":
"60589c83a7607c30343ee54a", "day": "604f5aebccdbf60be0979abd", "food":
[], "createdAt": "2021-02-24T16:04:15.870Z", "updatedAt":
"2021-02-24T16:16:43.712Z", "\_\_v": 0 }

[](#collapse-Meals-Getmeal)

#### **Get meal**  |  **GET**   http://localhost:5000/api/v1/days/60589c63a7607c30343ee549/meals/60589c83a7607c30343ee54a {.panel-title}

##### Description {.label .label-default}

\

Retrieves a certain meal.\
\

### Users 3 {#Users .panel-title}

Endpoints for user personal information.

raw [](#collapse-Users-Edituserdetails)

#### **Edit user details**  |  **PUT**   http://localhost:5000/api/v1/users/edituserdetails/6059c18e9434ca074433d2a3 {.panel-title}

##### Description {.label .label-default}

\

Updates user’s body parameters.\
\

##### Body {.label .label-primary}

{ "height": 167, "weight": 120, "age": 32, "gender": "male" }

[](#collapse-Users-Getdetails)

#### **Get details**  |  **GET**   http://localhost:5000/api/v1/users/getuserdetails/6059c18e9434ca074433d2a3 {.panel-title}

##### Description {.label .label-default}

\

Retrieves users details.\
\

raw [](#collapse-Users-createuserdetails)

#### **createuserdetails**  |  **POST**   http://localhost:5000/api/v1/users/createuserdetails {.panel-title}

##### Description {.label .label-default}

\

Creates a document with user body parameters.\
\

##### Body {.label .label-primary}

{ "height": 167, "weight": 123, "age": 32, "gender": "male" }

\
\

Made with *♥* by [thedevsaddam](https://github.com/thedevsaddam) |
Generated at: 2021-03-25 18:23:02 by
[docgen](https://github.com/thedevsaddam/docgen)
