---
title: how to get things done
description: this is greate
tags: money, income, coding
conver_image: ayobami.jpg
---

### Create Your first Napnux App2

1. Create a new file named `app.js` in your project directory.
2. Open `app.js` in a text editor and add the following code:

```javascript
const napnux = require("napnux");
const app = napnux();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

#### Run Your App

In your terminal, navigate to the project directory if you're not already there.
Run your napnux app using Node.js: node app.js

#### Test Your App

Visit http://localhost:3000 in your browser.

You should see the message "Hello, World!" displayed in your browser.
Congratulations! You've successfully created a basic "Hello, World!" app using napnux.js.
