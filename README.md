# API Documentation

## Endpoints

---

### 1. **Register User**
- **URL**: `/register`
- **Method**: `POST`
- **Request Body**:
  - `name`: string
  - `password`: string
  - `email`: string
  - `gender`: string
- **Response**:  
  **error**: false,  
  **message**: "User registered successfully"

---

### 2. **Login**
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  - `email`: string
  - `password`: string
- **Response**:  
  **error**: false,  
  **message**: "Login successful",  
  **token**: "ygdqwsbhqbshdyjsbdhjx"

---

### 3. **Edit User Profile**
- **URL**: `/profile/:id`
- **Method**: `PUT`
- **Request Body**:
  - `id`: integer
  - `name`: string
  - `email`: string
  - `gender`: string
- **Response**:  
  **error**: false,  
  **message**: "Profile updated successfully"

---

### 4. **Delete User Profile**
- **URL**: `/profile/:id`
- **Method**: `DELETE`
- **Request Body**:
  - `id`: integer
- **Response**:  
  **error**: false,  
  **message**: "Profile deleted successfully"

---

### 5. **Save Scan Data**
- **URL**: `/scans`
- **Method**: `POST`
- **Request Body**:
  - `userId`: integer
  - `fruitName`: string
  - `fruitImageUrl`: string
  - `scanDate`: string
  - `fruitCondition`: string
  - `fruitWeight`: double
  - `nutritionInfo`: string
- **Response**:  
  **error**: false,  
  **message**: "Scan data saved successfully"
