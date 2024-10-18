
### Authentication

No authentication is required for accessing the public API endpoints.

### Endpoints

#### **1. Patients**

##### **GET /patients**

- **Description**: Retrieve a list of all patients.
- **Response**:
  - **Status Code**: 200 OK
  - **Body**: 
    ```json
    [
      {
        "_id": "patient_id",
        "name": "Patient Name",
        "age": 30,
        "condition": "Condition Description",
        "treatmentPlan": "Treatment Plan Description",
        "medicalHistory": ["History Item 1", "History Item 2"]
      },
      ...
    ]
    ```

##### **POST /patients/post**

- **Description**: Add a new patient to the database.
- **Request Body**:
  ```json
  {
    "name": "Patient Name",
    "age": 30,
    "condition": "Condition Description",
    "treatmentPlan": "Treatment Plan Description",
    "medicalHistory": ["History Item 1", "History Item 2"]
  }
