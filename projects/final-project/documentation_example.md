
# Local Dogs for Adoption

---

Name: Sashank Thupukari

Date: April 2nd, 2017

Project Topic: Local Dogs for Adoption

URL: http://103.283.293.13:3000/
 ---

### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name               `Type: String`
- `Field 2`: Breed              `Type: String`
- `Field 3`: Weight             `Type: Number`
- `Field 4`: Age                `Type: Number`
- `Field 5`: Characteristics    `Type: [String]`

Schema: 
```javascript
{
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    }, 
    characteristics: [String]
}
```

### 2. Add New Data

HTML form route: `/addDog`

POST endpoint route: `/api/addDog`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addDog',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
        name: 'Cupcake', 
        breed: 'German Shepherd',
        image: "http://i.imgur.com/iGLcfkN.jpg",
        age: 6
        characteristics: ["Brown", "Black", "Sleepy", "Lazy"]
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/...`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. Heavy Dogs -> `/heaviest`
2. Select a Breed -> `/breed/:breed_name`
3. Young Dog -> `/youngest`
4. Random Dog -> `/random`
5. Alphabetical Dogs -> `/alphabetical`
