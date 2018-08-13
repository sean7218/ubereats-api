# **Uber Eats API - Express.js**

![Bitrise](https://app.bitrise.io/app/622442f8e92ee3f3/status.svg?token=Hzg0GmfBVIPX2_5KPYrNRQ)
![node version](https://badge.fury.io/js/node.svg)
![Follow me](https://img.shields.io/twitter/follow/sean7218.svg?style=social&label=Follow)
![Github Followers](https://img.shields.io/github/watchers/sean7218/ubereats-api.svg?style=social&label=Follow)
![Test Coverage](https://img.shields.io/badge/test%20coverage-85%25-orange.svg)

# Table of Contents
1. [User](#User)
2. [Endpionts](#)
3. [CI/CD](#Continous-Integration)
------------------------------------------------------------
# User

* **URL**

  _https://api.zxsean.com/user/register_

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   `name=[string]` ,
   `email=[string]` ,
   `password=[string]` ,
   `phone=[integer]` 

   **Optional:**
 
   `id=[integer]`

* **Data Params**

    ```json
    {
        "name": "Sean Zhang",
        "email": "sean@randomemail.com",
        "password": "psw123",
        "phone": 2023334444
    }
    ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "registration error" }`

------------------------------------------------------------

* **URL**

  _https://api.zxsean.com/user/:id_

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

    ```json
    {
        "id": 1,
    }
    ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `{ id : 11 }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "can't find user" }`

------------------------------------------------------------
* **URL**

  _https://api.zxsean.com/user_

* **Method:**

  `GET`
  
*  **URL Params**
 
  `NONE`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "id": 1,
            "name": "Kevin Hart",
            "email": "kevin@gmail.com",
            "password": "$2a$10$cVR6XquMOMHlKQzay8lErui3w6/.j2ZtVm5ai5IeeY90ZeYGXGGza",
            "phone": 1231231122,
            "createdAt": "2018-08-11",
            "updatedAt": "2018-08-11"
        },
        {
            "id": 2,
            "name": "2 Pac",
            "email": "twopac@gmail.com",
            "password": "$2a$10$5COzp14UCuBBPxqvxOAxNesRkbwLdtVdD24I9SJIat9Nxumg3z0WW",
            "phone": 1231231122,
            "createdAt": "2018-08-11",
            "updatedAt": "2018-08-11"
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "users can be listed" }`
------------------------------------------------------------
* **URL**

  _https://api.zxsean.com/yelp_

* **Method:**

  `GET`
  
*  **URL Params**

   `term=[string]`, `lat=[double]`, `long=[double]`, `x-access-token=[string]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "name": "Vero Pizza Napoletana",
            "url": "https://s3-media4.fl.yelpcdn.com/bphoto/OjoO-z3WBwRzlHifvP0vcA/o.jpg",
            "rating": 4,
            "price": "$$",
            "review_count": 156
        },
        {
            "name": "Dewey's Pizza",
            "url": "https://s3-media1.fl.yelpcdn.com/bphoto/iOboHiGvLgp24eOkVRyEiQ/o.jpg",
            "rating": 4.5,
            "price": "$$",
            "review_count": 147
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "business can be listed" }`
------------------------------------------------------------
# Continous Integration
- The api is build on Bitrise and deployed to the dev server
- If you are contributing and want to build the dev server, please DM [sean7218](https://twitter.com/sean7218)
- The api test needs to be written and test needs to be running every day trigger on the Bitrise

