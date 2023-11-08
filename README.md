# Dynamic Forms

## Overview
This project is a Dynamic Form Generator with features including Query Chat using socket.io, Excel sheet exports for responses, custom form generation, successful response mails, verification account email service and editor access with form edit lock functionality for a single person editing at a time. The app also supports multiple form modes such as draft, active, and inactive, allowing users to create, manage, and collaborate on forms efficiently.

## Features

### 1. Dynamic Form Generation
- Create and customize forms with a user-friendly interface.
- Add various form fields like text, multi-choice, multi-select, and more.
- Define validation rules and conditions for form fields.

### 2. Query Group Chat
- Collaborate in real-time with other users via a group chat integrated into the form system.
- Discuss form-related issues, ask questions, and share updates.

### 3. Excel Sheet Exports
- Export form responses to Excel sheets for easy data analysis and reporting.

### 4. Response Viewing
- View and analyze form responses in an organized and easy-to-read format.

### 5. Editor Access with Form Edit Lock
- Collaborate with team members securely with editor access control.
- Ensure data integrity with form edit locks that allow only one person to edit a form at a time.

### 6. Form Modes
- Manage forms with different modes:
  - Draft: Create and edit forms without enabling submit response.
  - Active: Publish forms for data collection.
  - Inactive: Archive or temporarily disable forms.

### 7. Email Functionality
- Response Email sent to the user who submitted a response.
- Email verfication service via verrification email

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Avninder99/Dynamic-Forms.git
   ```

2. Install dependencies in backend server:

   ```bash
   cd backend
   npm install
   ```

3. Install dependencies in frontend server:

   ```bash
   cd frontend
   npm install
   ```

4. Setting up env variables

   * In backend - create a .env file with all the env variables mentioned in the .env.example in backend directory
   
   * In frontend - Create an environments folder and add environment.ts file to it, then all variables similar to ones present in .env.example

3. Start the application:

   ```bash
   cd backend
   npm run dev


   cd frontend
   npm run dev
   ```

4. Access the application in your web browser at [http://localhost:4200](http://localhost:4200).

## Usage

1. Sign in or create an account to access the system.
2. Create a new form or edit an existing one in draft mode.
3. Customize the form fields and required rule.
4. Activate the form to make it available for users to fill out.
5. Monitor responses, chat with the responders, and export data as needed.
6. Manage form modes to control the availability of forms.

## Contact

If you have any questions or suggestion, please contact us at [avninderpreet99@gmail.com](mailto:avninderpreet99@example.com).

---

Feel free to customize this README file to include specific setup instructions, usage guidelines, and additional information about your project.
At last this is a project made by me to explore angular and it's working, so not much effort was give to User Interface.
Made by Avninder Preet Singh
