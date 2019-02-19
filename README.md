# Maily
[![Build status](https://build.appcenter.ms/v0.1/apps/edd9b357-3ecc-4229-9fcf-9e2bd123cbc8/branches/master/badge)](https://appcenter.ms)

## Getting Started

This is a mail client built using react-native for Android. The app has two views on a single screen.
The navigation view is a pure react-component and is called the "MailList" component which is responsible for loading the List of emails.
The email list provided has been mocked to represent an original server call using "Mocky".
Another Component called the "ContentComponent" is responsible for displaying the content of the selected mails.
The ContentComponent hosts a Native View called "ContentView" which is a native android VIEW and is updated using the props provided in the ContentViewManager Class. 

The ContentView native component is created as a dependency so as to encourage maitaniability of the code, and also the view should be independent of the main app's native code(following clean design). This resides in a package called "react-native-content-view".

The app uses "react-native-easystore" to create and manage the shared store i.e the data source shared by all the screens/pages/components of the app. This is simple and useful library Similiar to Mobx.

The app also uses another custom framework called "uRnFramework-basic-components" which host a lot of commonly used code and dependecies for general component creation.

## How it all works:

A User can navigate through his/her mails.
The selected mail is highlighted and the user can see the content of the mail on the ContentComponent along with a button to mark the mail as read/Unread.
The button press action results in a store update which in turns re-renders the UI for both the Components(Maillist and ContentComponent) as the components are subscribed to the store change events.

# How is the native code linked to react-native?

Native code can be used with react-native using react-native-bridge.
This bridge provides a means for the javaScript realm and the native code realm to talk to one another.This is also how the react-native uses JSX to render the Native UI, thus giving us the native feel through JS code.

This communication can work in one of the following ways : 
1. Promise
2. Callbacks

The promise and callbacks are two popular ways through which native code can call the JS code, However this is may not be the most ideal case all the time.

3. BatchedBridge is another such method which shares a JS class or function to the native realm just like we share the native code java Class to the JS realm.
In the app i have shown a demostration of using a batched bridge, which calls the JS calls "LinkerUtil's" specified method on click of the button.
This action executes the JS code and updates the store, which inturn results in re-render of the speicific's of the components.

## IOS 

The app will run and work on IOS, however it will fail when we click on the mailItem of the mailList as the IOS-native component is not yet written.

## Android 

To build the app on android please follow these steps:
1. Clone the project.
2. "npm install" on the project directory.
3. "npm run debug-android" to run the application in debug-mode on an android device or simulator.
4. To create a release build we need to have the Signed KeyStore, the credentials are checked in for the keystore i made in my local, but the file is not present as part of the repo, so you may need to create your own Keystore file and change the properties in gradle.properties.
