# Assure Health Insurance App


## Overview


**Assure Health Insurance App** is a health insurance policy booking website. An user can book a health insurance policy from a list of available policies, for itself and its family, with the help of this app. Also, the user can make a claim (direct claim, call claim, or hospital claim) for a booked policy. To use this web-app, an user has to register with the application and sign in to it.


## Technologies Used


To bring this project into reality we used : **HTML, CSS, Javascript, JAVA, and Spring Boot**. Our UI design contributer used **Figma** to design the UI of this app.


## Features


* User can **book a policy** by making successful payment.
* User can see the details of the **latest claim** made.
* User can find details of all the **policies booked** in the profile section.
* User can make a **direct claim** for a chosen policy.
* User can make a **hospital claim only from policy-partnered hospitals**.
* User can alse make a **call claim**.
* User can see all available health insurance policies, for its family, based on provided details.
* User finds pre-calculated policy premiums based on members' ages in the catalogue.


## How it works


The entry point of this website is *index.html*. User first lands in the **login page** of the website. If the user is registered, then the user must login to the website giving the correct credentials, and **enterring the correct otp** which is sent to the user's mobile phone. If the user is not already registered, it must **register** to our app, following the option in the login page. On successful login/registration, user will land on the dashboard.

In the dashboard, the user can see the membership id, and latest claim made. The user can claim or explore other policies. By clicking on **explore** the user will be redirected to choose a health policy, whereafter the user will choose the family members, the user wants to cover in the policy. The user then specifies the **ages** of the family members it wants to cover. After giving some more details, the user can see the catalogue of policies. The user can choose a policy and select one of the supported premiums and tenures for the booking. Thereafter the user needs to fill the details of all the members to be covered and make a successfull payment by a payment method (debit card). On successful booking of the policy, the user will see a confirmation page, whereafter it will be redirected to the dashboard.

By clicking on the **profile** section from the bottom navbar, the user will be redirected to the profile page where the user will be able to see the list of all policies booked by it. The latest booked policy will appear at the top.

By clicking on the **claim** section from the bottom navbar, the user will be redirected to the **claims** page. From there, the user can choose to make either a direct claim, hospital claim, or a call claim.

By clicking on **direct claim**, the user will be redirected to a page where it has to fill all the details required to make the claim. On successfully filling the details and uploading the required documents, the user can submit a direct claim request successfully!

By clicking on **hospital claim**, the user will be redirected to a page where it has to choose the policy to claim from, a **policy-supported** hospital and it's location. On successfully filling the details, the user can submit a hospital claim request successfully! 

By clicking on **call claim**, the user will be redirected to a page where it make a phone call to the authorized representative, and can submit a call claim request successfully! 


## Few Snapshots

![Login Page](https://github.com/meravimane/assure/tree/main/FrontEnd/images/log.PNG)

![Registration Page](https://github.com/meravimane/assure/tree/main/FrontEnd/images/login.PNG)

![Dashboard](https://github.com/meravimane/assure/tree/main/FrontEnd/images/latest.PNG)

![Explore Age Choosing Page](https://github.com/meravimane/assure/tree/main/FrontEnd/images/s2.PNG)


## Developed by


* Prottay Ray
* Mukul Howale
* Shashwat Awasthi
* Abhinav Gujral
* Ravi Mane

## UI designed by

* Saman Kumar
