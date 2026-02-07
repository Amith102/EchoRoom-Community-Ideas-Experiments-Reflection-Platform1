# EchoRoom API Documentation

This document describes the backend API endpoints used in the EchoRoom platform.

---

## Base URL


> Replace `PORT` with the port defined in your environment configuration.

---

## Authentication
Currently, authentication is not enforced on all endpoints.  
Future versions may include JWT-based authentication.

---

## Endpoints

### 1. Health Check
**Method:** GET  
**Endpoint:** `/health`

**Description:**  
Checks whether the backend server is running.

**Response:**
```json
{
  "status": "ok"
}
```
### 2. Get All Experiments
**Method:** GET  
**Endpoint:** `/experiments`

**Description:**  
Returns a list of all experiments created by the community.

**Response:**
```json
[
  {
    "id": "1",
    "title": "Improve onboarding flow",
    "description": "Testing a new contributor onboarding process",
    "status": "active"
  },
  {
    "id": "2",
    "title": "Weekly reflection posts",
    "description": "Experimenting with weekly reflections",
    "status": "completed"
  }
]
```
### 3. Create a New Experiment

**Method:** POST
**Endpoint:** `/experiments`

**Description:**
Creates a new experiment in the system.

**Request Body:**
```json
{
  "title": "Experiment title",
  "description": "Experiment description"
}

```
**Response:**
```json
{
  "message": "Experiment created successfully"
}
```
**Error Handling**

All error responses follow this format:
```json
{
  "error": "Error message"
}