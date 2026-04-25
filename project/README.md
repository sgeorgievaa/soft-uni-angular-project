# Running the Project
To run the application locally:

1. Navigate to the project folder:
   cd project

2. Install dependencies:
   npm install

3. Start the application:
   ng serve

4. Open your browser and go to:
   http://localhost:4200/

# Functional Guide

## Purpose of the Application
The Herbal App is a single-page application built with Angular that allows users to explore, create, and manage information about different herbs.

The main goal of the application is to provide a simple platform where users can:

- Discover herbs and their benefits
- Add their own herbs
- Manage (edit/delete) their own entries

## User Flow

### Guest Users
- Can access the Home page and Catalog
- Can view details of herbs
- Cannot create, edit, or delete herbs
- Can register or log in

### Registered Users
- Can log in and log out
- Can create new herbs
- Can edit and delete only their own herbs
- Can access a personal Dashboard showing their herbs

## Navigation flow
- Home: Shows latest added herbs
- Catalog: Displays all herbs with search functionality
- Details: Shows full information about a selected herb
- Create: Form for adding a new herb
- Edit: Form for editing an existing herb
- Dashboard: Shows only the logged-in user’s herbs

## Authentication
- Users can register and log in
- After registration, users are automatically logged in
- Guards protect routes based on authentication status

## Herb CRUD

### Create
Logged-in users can add new herbs
Each herb has:
- Name
- Benefits
- Usage
- Image URL
Each herb is associated with its creator

### Read
- Catalog displays all herbs
- Details page shows full information about a herb
- Home page displays the latest 3 added herbs

### Update
- Users can edit only their own herbs
- The edit form is pre-filled with existing data

### Delete
- Users can delete only their own herbs
- A confirmation dialog is shown before deletion

### Search Functionality
- Users can search herbs by name in the Catalog page
- Search is case-insensitive
- Results update dynamically as the user types

## User Dashboard
- Displays only herbs created by the logged-in user
- Helps users manage their own content easily