# FurFinder

## Project Description (1)
**FurFinder** is a user-friendly web application committed to reuniting lost pets with their families. Why us? First, we are safe. All the users must register to browse our forum, which guarantees the authenticity of the forum content. Besides, we are fast. Once someone comments on your post, an email will be sent immediately to ensure that you don’t miss a little chance of getting your pet back. Finally, we are smart. We leverage an integrated mapping feature to display pets' last-seen locations and employ an intelligent algorithm to suggest potential connections between posts. Whether you've lost a pet or found one, FurFinder is your go-to platform for swift and reliable assistance.

## Goals Completion Check (2)
### Initial Minimal Requirements:
> be able to create✅, update✅, and close a thread✅* \
> under a thread, be able to comment✅ and reply to comments✅ \
> be able to create✅, update✅, and delete a post✅**

\* & **: We've merged the concepts of threads and posts. In our final project, we have "Lost Pet Thread" and "Witness Thread", which correspond to our original "thread" and "post" ideas. "Close a thread" and "delete a post" are merged into "delete a thread" correspondingly.

### Initial Standard Requirements:
> user login✅ / sign up✅ \
> be able to favour a thread/post✅ \
> be able to search a thread/post✅, filter or list threads/posts in different orders✅ \
> be able to integrate a thread map under a thread✅ \
> be able to convert a post to a point on the main map✅
> 
### Initial Stretch Requirements:
> link a post to a thread by developing pet matching algorithm ✅ \
> send notifications to thread owners✅ \
> draw a target area on the map❕️* 

\*: Partially implemented.

## Tech from Course (3):

### Unit 1 – HTML, CSS, JS
 - HTML was used to structure the user interface within React components, integrating with Ant Design components to create interactive elements like menus, and forms;
 - CSS was applied all over our application, including responsive design and styling of Ant Design components, with an organized structure using classes and specific style files for maintainability.
 - JavaScript was leveraged to implement dynamic functionalities, utilizing React and Redux for component interaction, asynchronous operations with Axios for API communication, and custom hooks and thunks to encapsulate complex logic.

### Unit 2 – React & Redux
 - We crafted our whole frontend using React, employing functional components and the useEffect and useState hooks to manage component lifecycle and state.
 - For global state management, Redux was utilized, allowing us to efficiently manage the forum's threads, pages, and display status across different parts of the application.
 - Leveraging React-Redux, we were able to synchronize thread fetching and pagination by connecting components to the Redux store, thus providing a seamless and responsive user experience in the forum's various views such as the Card View, List View, and Map View.

### Unit 3 – Node & Express
 - Our backend was constructed using Node.js, where we designed a robust architecture that includes routers, controllers, services, models, and middlewares, all working in unison to manage the application's logic and connect with the MongoDB database.
 - Utilizing Express, we structured the API routes for different thread types, enabling seamless communication with the frontend and the ability to fetch, create, and manage threads in the forum.
 - The controllers and services were carefully implemented to handle specific business logic, while middleware functions ensured proper authentication and error handling, enhancing the overall security and robustness of the application. 

### Unit 4 - MongoDB
 - In our project, MongoDB served as the primary database solution, with distinct collections created for various entities such as comments, pets, threads, and users. This structure allowed us to organize and manage the different types of data within the forum efficiently.
 - During the development phase, we utilized third-party APIs to generate mock data, enabling us to simulate the real-world environment and test our application's functionality.
 - We leveraged various built-in MongoDB APIs and methods for handling data operations, including queries, updates, indexing, etc.

### Unit 5 – Builds and Deployment
 - Both our frontend and backend are deployed on Render.com, and each push to master is built and deployed automatically.
 - Backend is dockerized to ensure environment consistency since we also use Python in our project.
 - This approach helped us reduce deployment time, and maintain consistency across different environments, enhancing the overall stability and reliability of our application.

## Above and Beyond (4):
### Relevant Thread Algorithm
 - In order to link new Witness Threads to newly created Lost Pet Threads, we developed a pet-matching algorithm to calculate a petRelevance index, representing the probability that two pets are the same pet. We utilized properties of the pet model, including pet's breed, size, color, last seen time, and last seen location.
 - We used CIEDE2000 to calculate the color difference, used the exponential decay models returned by a Python script to compare last seen time, and an Inverse Distance Weighted (IDW) Interpolation model to calculate the last seen location index.
 - We have conducted research ourselves to accumulate the data points used to train our models.
 
### Map Integration with Google Maps API
 - Our project features a comprehensive integration with the Google Maps API, allowing us to render maps, plot locations, and compute distances between geographical coordinates.
 - We customized the markers on the map to render pet cards (our another component), creating a visually engaging experience on both the map view page and individual thread pages. This customization adds a layer of interactivity and user engagement to the map feature.
 - We used functions from the spherical-geometry-js library to compute distances between geographical points, essential for our relevant thread algorithm.

### Google Login and Authentication
 - We implemented Google Login functionality, providing users with a convenient and secure way to authenticate into our application.
 - By utilizing the Google Login API, we were able to offload the complexities of managing passwords and credentials, thereby enhancing the security of our application.
 - The integration with Google Login also streamlined the user experience, allowing for quick and hassle-free access to our application's features.

## Next Steps (5):
 - Algorithm Improvement: We plan to evolve our current algorithm by incorporating a machine learning model to recognize cat and dog faces, allowing for more accurate and adaptive predictions. By using a data-driven approach, we aim to enhance the system's responsiveness and effectiveness.
 - Automatic Poster Generation: In line with our original goals, we're working on an auto-poster generation feature powered by OpenAI APIs. This will enable lost pet owners to effortlessly create and customize pet posters, streamlining the process and providing additional support in stressful situations.
 - On-Site Notifications: To complement our existing email notifications, we intend to implement on-site notifications. This will provide users with immediate alerts within the platform, enhancing user experience and engagement with the content.
 - Incentive Points System: We plan to add a redeemable points system to offer rewards for witnesses who actively help in the process of finding lost pets.

## List of contributions (6):
\* Alphabetized by Last Names
### Hank Chen (j4q1b)
- Developed and animated a responsive Home Page
- Designed both frontend and backend aspects of authentication (login/logout/signup)
- Created and routinely executed a db seeding script (populate db with reasonably looking data)
- Focused on improving specific aspects of create thread form (breed selector, media upload)
- Handled misc. bug fixes and UX/UI improvements

### Yaosheng Cheng (j1a4n)
- Designed the requirements of the project. Responsible for setting up basic project infrastructure including express and API structure, testing framework, MongoDB, and React.
- Designed and implemented thread models and initial thread-related CRUD APIs. Implemented the error-handling structure in the backend. Redesigned and implemented the forum component. Implemented the search functionality for both frontend and backend. Implemented the map functionality for both frontend and backend (in createThread and mapView more specifically). Designed and implemented the pet matching algorithm for both frontend and backend.
- Responsible for deploying the project on Render.com
- Served as the scrum master, creating and maintaining JIRA.
### Han Li (x2h3l)
- Built Navbar and Footer component using ant design
- Implemented backend of user’s comment service and both frontend and backend of users’ favourite function and split threads into “Lost Pet” and “Witness” categories.
- Worked on other assigned tasks like support multiple picture upload and preview, users’ post history and favourites of profile page and other small bugs fix.
### Xuanya Liu (CSID: t5n0b)
- Contributed to implementing the frontend of the forum in Card and List views.
- Developed comment functionality, including frontend implementation, Redux setup, and backend connection.
- Implemented user profile picture uploads, email service subscriptions and frontend of the user profile page.
- Incorporated email notification to alert users about new comments and relevant threads.
### Huiwen Zuo (n7l4u)
- Developed all Thread-related frontends, including the Thread page, Pet Card, Update Thread form, Thread map, and Relevant Threads bar.
- Implemented Thread-related functionalities, including the Update Thread reducers and backend endpoint, Delete Thread endpoint and middlewares.
- Helped with other backend settings, including the backend of uploading multiple pictures, Link Relevant Threads endpoints and Thread-related module settings.
- Played a major role in various bug fixing and documentation work in the team, making sure the project was well-understood and maintainable for the entire team.
----
## Initial Planning
### Project Description
Who is it for?
- The missing pet tracking web app is for pet owners who have lost their cats or dogs (losers) and for other users who want to help locate missing pets (finders).
    
What will it do? (What "human activity" will it support?)
- Generally, our web app facilitates the activity of searching for and locating missing pets by enabling information sharing between losers and finders.

What type of data will it store?
- The site will store data including but not limited to user information, threads, pictures, text, and geolocations.

What will users be able to do with this data?
- Users will be able to create and browse lost pet threads, view and upload pictures and textual descriptions, and report possible sightings.

What is some additional functionality you can add/remove based on time constraints?
- Providing an option for users to subscribe to email or push notifications for updates on relevant lost pet threads.
- Implementing a reporting system for inappropriate or false information.

### Project Task Requirements
- Minimal requirements (will definitely complete)
  - be able to create, update, and close a thread 
  - under a thread, be able to comment and reply to comments
  - be able to create, update, and delete a post
- Standard requirements (will most likely complete)
  - user login / sign up 
  - be able to favour a thread/post
  - be able to search a thread/post, filter or list threads/posts in different orders
  - be able to integrate a thread map under a thread
  - be able to convert a post to a point on the main map
- Stretch requirements (plan to complete at least 1!)
  - link a post to a thread by developing pet matching algorithms
  - send notifications to thread owners
  - draw a target area on the map

### Minimal Requirements Break-down
1. Be able to create, update, and close a thread
- user can create a thread with essential information such as pet name, ID, sex, breed, last seen location and time, etc.
- user can update a thread and change or add any related information
- user can close (archive) or delete his/her threads
2. Under a thread, be able to comment and reply to comments
- under a thread, other users can add comments related to the missing pet
- under a thread, the original poster can reply to comments
- under a thread, other users can reply to any comments as well

### Sketch Prototypes
![page1](public/Page1.jpg)
![page2](public/Page2.jpg)
![page3](public/Page3.jpg)


