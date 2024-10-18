## to deploy it locally 
Create .env file
``` 
MONGO_URI="your atlas value"
PORT="4000 || 5000"
```
to run the project
```
node src/index.js
```

## API Documentation for Patient Health Dashboard

This API provides endpoints to manage patient information and authorization requests in a healthcare system.

### Base URL

```
https://your-api-base-url.com/api
```

Replace `your-api-base-url.com` with the actual base URL of your API.

### Endpoints

#### Patients

##### Get All Patients

Retrieves a list of all patients.

- **URL:** `/patients`
- **Method:** `GET`
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of patient objects
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "message": "Error message" }`

##### Create a New Patient

Creates a new patient record.

- **URL:** `/patients/post`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "name": "John Doe",
    "age": 30,
    "condition": "Healthy",
    "medicalHistory": ["No major illnesses"],
    "treatmentPlan": "Regular check-ups"
  }
  ```
- **Success Response:**
  - **Code:** 200
  - **Content:** Created patient object
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "message": "Error message" }`

##### Get Patient by ID

Retrieves a specific patient's information.

- **URL:** `/patients/:id`
- **Method:** `GET`
- **URL Params:** `id=[MongoDB ObjectId]`
- **Success Response:**
  - **Code:** 200
  - **Content:** Patient object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Patient not found" }`
  - **Code:** 500
  - **Content:** `{ "message": "Error message" }`

#### Authorization Requests

##### Create Authorization Request

Submits a new authorization request.

- **URL:** `/authorizations/post`
- **Method:** `POST`
- **Data Params:**
  ```json
  {
    "patientId": "60d5ecb8b6e2a82b6c9e4a7f",
    "treatmentType": "Surgery",
    "insurancePlan": "Blue Cross",
    "dateOfService": "2023-06-15T00:00:00.000Z",
    "diagnosisCode": "J45.901",
    "doctorNotes": "Patient requires immediate attention"
  }
  ```
- **Success Response:**
  - **Code:** 201
  - **Content:** 
    ```json
    {
      "success": true,
      "message": "Authorization request submitted successfully",
      "data": {Created AuthorizationRequest object}
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "message": "Error message" }`

##### Get Authorization Requests by Patient ID

Retrieves all authorization requests for a specific patient.

- **URL:** `/authorizations/:id`
- **Method:** `GET`
- **URL Params:** `id=[MongoDB ObjectId]` (Patient ID)
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "success": true,
      "data": [Array of AuthorizationRequest objects]
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:** `{ "success": false, "message": "Invalid patient ID format" }`
  - **Code:** 404
  - **Content:** `{ "success": false, "message": "Patient not found" }`
  - **Code:** 200 (with no requests)
  - **Content:** `{ "success": false, "message": "No Authorization Requests found for this patient" }`
  - **Code:** 500
  - **Content:** `{ "success": false, "message": "Server error" }`

### Models

#### Patient

- `name` (String, required): The name of the patient
- `age` (Number, required): The age of the patient
- `condition` (String): The current health condition of the patient
- `medicalHistory` (Array of Strings): List of past medical conditions or treatments
- `treatmentPlan` (String): Current treatment plan for the patient

#### AuthorizationRequest

- `patientId` (MongoDB ObjectId, required): Reference to the Patient model
- `treatmentType` (String, required): Type of treatment requiring authorization
- `insurancePlan` (String, required): Patient's insurance plan
- `dateOfService` (Date, required): Proposed date of service
- `diagnosisCode` (String, required): Diagnosis code for the treatment
- `status` (String, enum: ['pending', 'approved', 'denied'], default: 'pending'): Current status of the authorization request
- `doctorNotes` (String): Additional notes from the doctor

### Error Handling

The API uses standard HTTP response codes to indicate the success or failure of requests. In case of errors, a JSON response with a `message` field will provide more details about the error.

### Authentication

This API currently does not implement authentication. It is recommended to add proper authentication and authorization mechanisms before deploying to production.

### Rate Limiting

There are currently no rate limits in place for this API. Consider implementing rate limiting for production use to prevent abuse.

---

For any additional information or support, please contact the API development team.
