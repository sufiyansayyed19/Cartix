# Security Features Testing Guide

## How to Test Your Security Implementation

### 1. Test Rate Limiting

#### Test Login Rate Limiting (Should block after 5 attempts)
```bash
# Try 6 login attempts in quick succession
for i in {1..6}; do
  echo "Attempt $i"
  curl -X POST http://localhost:4000/api/user/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}' && echo ""
done
```

**Expected Result**: First 5 attempts should return "Invalid credentials", 6th attempt should return "Too many login attempts from this IP, please try again after 15 minutes."

---

#### Test Registration Rate Limiting (Should block after 3 attempts)
```bash
# Try 4 registration attempts in quick succession
for i in {1..4}; do
  echo "Attempt $i"
  curl -X POST http://localhost:4000/api/user/register \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@test.com\",\"password\":\"Test123!\",\"name\":\"Test User\"}" && echo ""
done
```

**Expected Result**: 4th attempt should be blocked with rate limit message.

---

### 2. Test Password Validation

#### Test Weak Password (Should Fail)
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"weak","name":"Test User"}'
```

**Expected Result**: "Password must be at least 8 characters long"

---

#### Test Password Without Special Characters (Should Fail)
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test1234","name":"Test User"}'
```

**Expected Result**: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"

---

#### Test Strong Password (Should Pass)
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@test.com","password":"Test123!@#","name":"Test User"}'
```

**Expected Result**: Success with token returned

---

### 3. Test NoSQL Injection Prevention

#### Test MongoDB Operator Injection (Should Fail)
```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":{"$gt":""},"password":{"$gt":""}}'
```

**Expected Result**: "Invalid credentials" (sanitization removes the MongoDB operators)

---

#### Test $where Operator Injection (Should Fail)
```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":{"$where":"return true"}}'
```

**Expected Result**: "Invalid credentials"

---

### 4. Test Email Validation

#### Test Invalid Email Format (Should Fail)
```bash
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"notanemail","password":"Test123!@#","name":"Test User"}'
```

**Expected Result**: "Please enter a valid email"

---

### 5. Test JWT Token Expiration

#### Test Without Token (Should Fail)
```bash
curl -X POST http://localhost:4000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId":"123","quantity":1}'
```

**Expected Result**: "Not authorized login please"

---

#### Test With Invalid Token (Should Fail)
```bash
curl -X POST http://localhost:4000/api/cart/add \
  -H "Content-Type: application/json" \
  -H "token: invalid_token_here" \
  -d '{"productId":"123","quantity":1}'
```

**Expected Result**: "Invalid token, please login again"

---

### 6. Test File Upload Validation

#### Test Non-Image File Upload (Should Fail)
```bash
# Create a test text file
echo "This is not an image" > test.txt

# Try to upload it
curl -X POST http://localhost:4000/api/product/add \
  -H "token: YOUR_ADMIN_TOKEN_HERE" \
  -F "image1=@test.txt" \
  -F "name=Test Product" \
  -F "description=Test" \
  -F "price=100" \
  -F "category=Men"
```

**Expected Result**: "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed."

---

#### Test Large File Upload (Should Fail if > 5MB)
```bash
# Create a large dummy file (10MB)
dd if=/dev/zero of=large.jpg bs=1M count=10

# Try to upload it
curl -X POST http://localhost:4000/api/product/add \
  -H "token: YOUR_ADMIN_TOKEN_HERE" \
  -F "image1=@large.jpg" \
  -F "name=Test Product" \
  -F "description=Test" \
  -F "price=100" \
  -F "category=Men"
```

**Expected Result**: File size limit error

---

### 7. Test CORS Configuration

#### Test From Unauthorized Origin (Should Fail)
```bash
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -H "Origin: https://malicious-site.com" \
  -d '{"email":"test@test.com","password":"Test123!@#"}'
```

**Expected Result**: CORS error (depending on browser, curl might not enforce)

---

### 8. Test HTTP Security Headers

#### Check Security Headers
```bash
curl -I http://localhost:4000/api/user/login
```

**Expected Headers**:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 0` (or 1; mode=block)
- `Strict-Transport-Security` (in production with HTTPS)

---

## Using Postman for Testing

### Create a Postman Collection with these requests:

1. **Valid Registration**
   - Method: POST
   - URL: `http://localhost:4000/api/user/register`
   - Body: 
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "SecurePass123!@#"
     }
     ```

2. **Weak Password Test**
   - Same as above but password: `"weak"`

3. **Login**
   - Method: POST
   - URL: `http://localhost:4000/api/user/login`
   - Body:
     ```json
     {
       "email": "john@example.com",
       "password": "SecurePass123!@#"
     }
     ```

4. **Rate Limit Test**
   - Run the login request 6 times quickly

5. **Protected Route Test**
   - Method: GET
   - URL: `http://localhost:4000/api/cart/get`
   - Headers: `token: YOUR_JWT_TOKEN`

---

## Automated Testing Script

Create a file `test-security.sh`:

```bash
#!/bin/bash

echo "🔐 Testing Cartix Security Features"
echo "===================================="
echo ""

BASE_URL="http://localhost:4000"

# Test 1: Weak Password
echo "Test 1: Weak Password Validation"
response=$(curl -s -X POST $BASE_URL/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test1@test.com","password":"weak","name":"Test"}')
echo "Response: $response"
echo ""

# Test 2: Invalid Email
echo "Test 2: Invalid Email Validation"
response=$(curl -s -X POST $BASE_URL/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"email":"notanemail","password":"Test123!@#","name":"Test"}')
echo "Response: $response"
echo ""

# Test 3: NoSQL Injection
echo "Test 3: NoSQL Injection Prevention"
response=$(curl -s -X POST $BASE_URL/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":{"$gt":""},"password":{"$gt":""}}')
echo "Response: $response"
echo ""

# Test 4: Rate Limiting
echo "Test 4: Rate Limiting (6 rapid login attempts)"
for i in {1..6}; do
  echo "Attempt $i:"
  curl -s -X POST $BASE_URL/api/user/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}' | jq -r '.message'
done
echo ""

echo "✅ Security Testing Complete!"
```

Run with: `bash test-security.sh`

---

## Manual Testing Checklist

- [ ] Weak password is rejected
- [ ] Strong password is accepted
- [ ] Invalid email format is rejected
- [ ] Rate limiting blocks after threshold
- [ ] NoSQL injection attempts are sanitized
- [ ] Invalid JWT tokens are rejected
- [ ] Expired tokens show appropriate error
- [ ] File uploads validate MIME types
- [ ] File size limits are enforced
- [ ] CORS blocks unauthorized origins
- [ ] Security headers are present in responses

---

## Recording Test Results for Portfolio

### Create Screenshots/Videos of:

1. **Postman Collection** showing all security tests
2. **Rate Limiting** in action (show blocked request)
3. **Password Validation** rejecting weak passwords
4. **NoSQL Injection** being prevented
5. **JWT Token Expiration** error message
6. **File Upload Validation** rejecting non-images

### Document in README:

```markdown
## Security Testing Results

✅ **Rate Limiting**: Blocks after 5 failed login attempts
✅ **Password Validation**: Enforces strong password requirements
✅ **NoSQL Injection**: Successfully prevents MongoDB operator injection
✅ **JWT Security**: Tokens expire after 7 days with proper error handling
✅ **File Upload**: Only accepts images under 5MB
✅ **CORS**: Blocks requests from unauthorized origins
```

---

## Performance Testing

### Test Rate Limiter Impact:

```bash
# Benchmark before rate limiting (if you have a version without it)
ab -n 1000 -c 10 http://localhost:4000/api/user/login

# Benchmark with rate limiting
ab -n 1000 -c 10 http://localhost:4000/api/user/login
```

**Expected**: Minimal performance impact (< 5ms per request)

---

## For Interviews

### Be Ready to Demonstrate:

1. **Live Demo**: Open Postman and show rate limiting in action
2. **Code Walkthrough**: Explain the rate limiter middleware code
3. **Security Headers**: Use browser DevTools to show Helmet headers
4. **Password Hashing**: Show bcrypt comparison in code
5. **JWT Structure**: Decode a JWT on jwt.io to show expiration

### Sample Interview Question Responses:

**Q: "How do you test your security features?"**

*"I test security through multiple methods. For rate limiting, I use curl to make rapid requests and verify blocking occurs. For input validation, I test with weak passwords and invalid emails to ensure rejection. I use Postman collections to test NoSQL injection attempts by sending MongoDB operators. I also verify JWT expiration by manually adjusting token timestamps. Additionally, I run npm audit regularly to check for vulnerable dependencies."*

---

## Monitoring in Production

### Add Logging to Track:

```javascript
// In rateLimiter.js
export const authLimiter = rateLimit({
    // ... existing config
    handler: (req, res) => {
        console.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.json({ success: false, message: 'Too many attempts' });
    }
});
```

### Track These Metrics:

- Failed login attempts per IP
- Rate limit violations
- Invalid token attempts
- File upload rejections
- CORS violations

---

**Pro Tip**: Create a video demonstrating these security features for your portfolio website!
