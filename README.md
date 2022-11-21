# Test Driven Development

Test-driven development keeps developers away from over-engineering systems because of flawed assumptions. With executable tests, a developer could drive design every step of the way until the final implementation.

## Benefits

TDD plays a significant role in optimizing the delivery process. The primary benefits of test-driven development are:

- Improved design
- Better code quality and flexibility
- Good documentation as a by-product
- Lower development costs and increased developer productivity
- Enhanced developer satisfaction

In this article, I will explain how the benefits listed above can be realized when test-driven development is used correctly.

## Laws of TDD

1. Do not write production code until you have written a failing unit test.
2. Do not write more of a unit test than is sufficient to fail, and not compiling is failing.
3. Do not write more production code than is sufficient to pass the currently failing test.

Both tests and production code are written together, with the tests a few seconds ahead of the production code. Production code will be covered by these tests if we work this way. In order to keep tests clean, they need to be updated as production code evolves.

The dirtier the tests, the harder it is to change them. If the test code is dirty, you are more likely to spend more time writing new tests than writing new production code. Modifying production code causes old tests to fail, and messing up the test code makes it hard to pass them again. Consequently, tests are viewed as an ever-increasing liability.

Writing test code is just as important as writing production code. It necessitates thought, design, and consideration. It must be maintained in the same manner as production code.

Unit tests ensure that our code is flexible, maintainable, and reusable. The reason is simple. If you have tests, you have no qualms about modifying the code! Without tests, every change could introduce a bug. Without tests, you will be hesitant to make changes due to the fear of introducing undetected bugs, regardless of how flexible your architecture or how well-separated your design may be.

## Clean tests

What makes a test clean? There are three factors to consider. Readability must come first, second, and third. When writing unit tests, readability may be even more important than when writing code for real use. How are tests made readable? Clarity, simplicity, and expression density are the same factors that make all code readable. In a test, you want to say a lot with as few expressions as possible.

## Before we start

In this project, we're building a simple TODO API application.
Initially, the **/src/app.ts** looks like this:

```ts
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

export default app;
```

Furthermore, you should turn requirements into a list of tests, such as in **app.test.ts**:

```ts
describe("Todos API", () => {
  it("GET /todos --> array todos", () => {});

  it("GET /todos/id --> specific todo by ID", () => {});

  it("POST /todos --> created todo", () => {});

  it("GET /todos --> validates request body", () => {});
});
```

If we run the tests now, all of them will succeed.

## First Failing Test

It is prudent to write a failing test that allows the test to pass. Why? Because you'll know that when you run the test, the test you're working on is executed. Also, if the test fails, it means that the functionality you're testing for doesn't exist yet. If you see a green bar that you didn't expect, it means that an assumption you made about the code base is wrong. So write the first failing test starting with: **GET /todos --> array todos** in **app.test.ts** as shown below.

```ts
import request from "supertest";

import app from "../app";

describe("Todos API", () => {
  it("GET /todos --> array todos", async () => {
    const response = await request(app).get(`/todos`);
    expect(response.status).toBe(200);
  });

  // Rest of code omitted for brevity
});
```

When you run the test, it will result in a failed test:

```console
 Expected: 200
 Received: 404

       8 |   it("GET /todos --> array todos", async () => {
       9 |     const response = await request(app).get(`${rootUrl}/todos`);
    > 10 |     expect(response.status).toBe(200);
         |                             ^
      11 |   });
      12 |
      13 |   // it("GET /todos/id --> specific todo by ID", () => {});

      at src/__tests__/app.test.ts:10:29
      at fulfilled (src/__tests__/app.test.ts:5:58)
```

We now have a test that tells us when we're finished with that particular task. It will not tell us things like "you're 90% done" or "just five minutes more." We will know when the test passes or when the code conforms to our expectations.

First, fail the test on purpose to make sure that our test execution catches the failure and that we're really running the newly added test.

## Making the Test Succeed

The test results show that the page cannot be found because a 404 status code is returned rather than a 200 status code. By implementing the solution only for returning the page, we can ensure that our test only tests this single functionality.

We want the test to be simple and quick. A red bar indicates that our code is unstable. We want to get out of that state and back on solid ground as soon as possible. How do we make the test pass as quickly and easily as possible? We'll send a blank response in this instance, as shown below.

```ts
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

app.get("/todos/", (req, res) => {
  res.send();
});

export default app;
```

The test will now succeed and display the following result:

```console
 PASS  src/__tests__/app.test.ts
  Todos API
    √ GET /todos --> array todos (328 ms)
```

Although it may seem counterintuitive at first, pushing ourselves a little further to extract the desired behavior from our tests is beneficial.
We've written a single failing test to show us the way forward, added just enough production code to get the test to compile, and now we need to create the functionality our test requires.
