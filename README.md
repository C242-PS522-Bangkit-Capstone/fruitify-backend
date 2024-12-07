# API Documentation

# Endpoint


# Register Endpoint
- URL : /register
- Method : POST
- Request Body :
  -  name as string
  -  password as string
  -  email as string
  -  gender as string
- Response 
  {
    "error" : false,
    "message" : "User registered successfully"
  }

# Login Endpoint
- URL : /login
- Method : POST
- Request Body :
  - email as string
  - password as string
- Response
{
    "error" : false,
    "message" : "Login successful"
}

# Editing User Profile Endpoint
- URL : /profile/:id
- Method : PUT
- Request Body :
  - name as string
  - email as string
  - gender as string
  - id as integer
- Response
{
    "error" : false,
    "message" : "Profile updated successfully"
}

# Deleting User Profile Endpoint
- URL : /profile/:id
- Method : DELETE
- Request Body :
  - id as string
- Response
{
    "error" : false,
    "message" : "Profile deleted successfully"
}