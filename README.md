Altruistic Mango - Ripple

Ripple is an iOS/Android app built using Ionic with full cross platform compatibility. The app allows users to take photos using their mobile device, share the photos with other users with a specific radius by broadcasting the photo, and re-broadcast photos that other users have shared. All photos have a temporary lifespan during which they are available to other signed-in users, with further broadcasts extending that lifespan. Photos that users would like to keep on their devices can be saved to an album and viewed at any time.

The web component of the app allows users to view all photos ever made by users, with visual data showing the amount of recipients of that photo and any subsequent broadcasts made by users. This web page dashboard displays the photos and the recipients on a Google Maps interface with overlaid GPS points representing users and circles representing broadcast distance.

The mobile client app was coded according to John Papa’s Angular style guide and separates Controller/Factory functionality for every feature of the app. Users can create an account and login or use their Facebook account for authentication and future sign-ins. All photos are stored on an Amazon s3 bucket and readily accessible regardless of whether they are connected to the Ripple server.

The web client was built using React and utilizes the Google Maps api to show the history of an initial broadcast and any broadcasts that other users made. This dashboard can be visited at http://ripple.photos/dashboard and is hosted on an instance of an Amazon ECS server.

The server portion of the app tracks all users with a quadtree data structure that lives in volatile memory and is continually cleaned of expired data and re-populated by the mobile client every one minute. The quadtree optimizes the entry and search of GPS coordinates to provide rapid communication between the client and the server to keep users constantly updated when new photos are taken and broadcast. As more and more users sign in on the app and are entered into the quadtree, it will subdivide and collapse quadrants when necessary and is fully self-maintaining.
![spppq5](https://cloud.githubusercontent.com/assets/7958636/8152700/7c582ffa-12d5-11e5-8aa8-5b2639e4cfc0.gif)

All photos are uploaded to an Amazon s3 bucket using a temporary signed policy that allows uploads from the devices and expires after a limited time. The server must sign and provide this policy to the client when a photo is taken, ensuring that proper security is upheld and preventing mass uploads of data or other manipulation.
![ripplePhoto](https://cloud.githubusercontent.com/assets/7958636/8152686/6beff634-12d5-11e5-9e4d-4fcb474a715c.png)

Mobile Client Structure

The mobile client’s modules, controllers, factories and views are organized in the Shout directory according to their purpose. 

The app makes use of the cordova camera plugin, with custom code modifying the image for upload and passing the data to the review controller and allowing the user to add a caption to the photo before uploading. The user can also set the time to live of texpire. 

Users will receive the photo in their inbox if they are within the limits set by the photo taker, and can choose to broadcast the image, save it to their album for further viewing or delete the photo from their inbox. The inbox is regularly cleaned of expired images by the server, though the users can still view them in their album or on the web dashboard.

Location data is provided by the Cordova Geolocation plugin, and updates every minute. When a location is updated, the user will receive an updated version of their inbox, though the inbox also implements a pull to refresh feature to update the inbox immediately on-demand.

Server Structure

The server uses Node.js, Express and MongoDB to save photo metadata, broadcast history and user data. A quadtree data structure and queue system are used to keep location data current and immediately retrievable. Stress testing has shown the system is capable of handling over one million simultaneous users without hampering the user experience.

The server is hosted on an Amazon ECS instance running Ubuntu 14.10 and  setup with continuous integration with Gulp and secure ssh connections between the development team, GitHub and Amazon. 
