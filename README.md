# Patient Portal

This is a (very) simple web app for a "patient portal" that provides a list of 
patient data and a feature to add new patients. This is a small demo to practice 
some of the useful features that Firebase provides for authentication.

## Demo in Firebase Auth
This demo uses Firebase Authentication to enable users to sign-in with their Google account.
In order to even view the patient portal, users must sign in using the provided
pop-up window. 

There are only two endpoints in this demo -- one to get a list of all patient data, 
and one to add a new patient profile to the list. For both of these, the token associated with the 
logged-in user is sent as part of the request to the endpoints ([see it here](./frontend/src/PatientPortal.tsx)). In the backend express router, this token is verified using Firebase Auth before the 
request can be fulfilled ([see it here](./backend/index.ts)).

One step further, this token can be used to keep track of "admins" since the 
logged-in user's email can be decoded from the token. For this example, only 
users with Cornell emails (@cornell.edu) are allowed to create new patient data ([see it here](./frontend/src/PatientPortal.tsx)).

So, this example demoes two features of Firebase Auth -- authenticating requests
and allowing a form of permissions for certain endpoints. 

## Acknowledgements
Some of the code for this demo was derived from or inspired by the lecture material from the [Trends in Web Development](https://webdev.cornelldti.org/) course run by [Cornell DTI](https://www.cornelldti.org/).

