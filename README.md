# Patient Management System

A web based Patient Record Management System for a Teaching
hospital, which automates the manual processes traditionally used to manage patient records Its
user friendly web interface enables doctors and healthcare staff to manage patient information in a
convenient efficient and streamlined manner

## Features
- Add new patients
- Update patient details by PID or First Name
- Delete patients by PID
- Search for patients using various query parameters

## Prerequisites
- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account (or local MongoDB instance)

## Setup Instructions

1. **Install dependencies**
   ```cmd
   npm install
   ```

1. **Start the server**
   ```cmd
   node index.js
   ```
   or
   ```cmd
   node .
   ```
   The API will run on `http://localhost:3000`.

## API Endpoints

### Add a Patient
- **POST** `/addpatient`
- Body: JSON object with all required patient fields

### Update Patient by PID
- **PUT** `/updatepatient/pid/:PID`
- Body: JSON object with fields to update

### Update Patient by First Name
- **PUT** `/updatepatient/firstname/:FirstName`
- Body: JSON object with fields to update

### Delete Patient by PID
- **DELETE** `/deletepatient/:PID`

### Search Patients
- **GET** `/searchpatients?PID=&FirstName=&LastName=&Email=&NearCity=&Doctor=&Guardian=`
- Query parameters are optional and can be combined

## Project Structure
```
index.js           # Main server file
package.json       # Project metadata and 
UI/                # Frontend HTML files
```

## Authors
The following individuals contributed project
- **M. A. Pathirana** (SA24610652)
- **J. A. N. C. Jayakody** (SA24610735)
- **H. A. S. Shevinu** (SA24610653)
- **A. W. M. T Henuka** (SA24610678)
- **G. T. K. Silva** (SA24610733)
- **B. B. D. Kumara** (SA24610751)