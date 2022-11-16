# Test Driven Development

Test-driven development encourages good design, produces testable code, and keeps developers away from over-engineering systems because of flawed assumptions.
With executable tests, a developer could drive design every step of the way until the final implementation.

## Benefits

TDD plays a significant role in optimizing the delivery process. The primary benefits of test-driven development are:

- Improved design
- Better code quality and flexibility
- Good documentation as a by-product
- Lower development costs and increased developer productivity
- Enhanced developer satisfaction

In this article, I will explain how the benefits listed above can be realized when test-driven development is used correctly.

## Pitfalls

Why is it important to apply TDD appropriately? There are many pitfalls a developer could face. Common pitfalls could be:

### Individuals

- Forgetting to run tests frequently
- Writing too many tests at once
- Writing tests that are too large
- Writing tests that are overly trivial
- Writing tests for trivial code

### Teams may

- Use TDD inconsistently.
- Fail to maintain suites of tests, leading to overly long run times.
- Abandon TDD test suites due to overly long run times or team turnover.

In addition, detractors often say that TDD is an ideal that’s not suited for real-world problems in software development. These problems might include:

- Large, complex codebases
- Code that must interact with legacy systems
- Processes running under stringent real-time, memory, network, or performance constraints

## Laws of TDD

1. Do not write production code until you have written a failing unit test.
2. Do not write more of a unit test than is sufficient to fail, and not compiling is failing.
3. Do not write more production code than is sufficient to pass the currently failing test.

Both tests and production code are written together, with the tests a few seconds ahead of the production code. Our production code will be covered by these tests if we work this way.

In order to keep tests clean, they need to be updated as production code evolves. The dirtier the tests, the harder it is to change them. If the test code is tangled, you are more likely to spend more time writing new tests than writing new production code. Modifying production code causes old tests to fail, and messing up the test code makes it hard to pass them again. Consequently, tests are viewed as an ever-increasing liability.

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
  const rootUrl = "http://localhost:3000";

  it("GET /todos --> array todos", () => {});

  it("GET /todos/id --> specific todo by ID", () => {});

  it("POST /todos --> created todo", () => {});

  it("GET /todos --> validates request body", () => {});
});
```

If we run the tests now, all of them will succeed.

## First Failing Test

It is prudent to write a failing test that allows the test to pass. Why? Because you'll know that when you click the Run button in your IDE, the test you're working on is executed. Also, if the test fails, it means that the functionality you're testing for doesn't exist yet. If you see a green bar that you didn't expect, it means that an assumption you made about the code base is wrong. So write the first failing test starting with: **GET /todos --> array todos**.

```ts
import request from "supertest";

import app from "../app";

describe("Todos API", () => {
  const rootUrl = "http://localhost:3000";

  it("GET /todos --> array todos", async () => {
    const response = await request(app).get(`${rootUrl}/todos`);
    expect(response.status).toBe(200);
  });

  // Rest of code omitted for brevity
});
```

This results in a failing test:

```ts
 FAIL  src/__tests__/app.test.ts
  Todos API
    × GET /todos --> array todos (54 ms)
```

We now have a test that tells us when we're finished with that particular task. It will not tell us things like "you're 90% done" or "just five minutes more." We will know when the test passes or when the code conforms to our expectations.

First, fail the test on purpose to make sure that our test execution catches the failure and that we're really running the newly added test.
Then, implement the test and see the bar turn green again.

## Making the Test Succeed

We've written a single failing test to show us the way forward, added just enough production code to get the test to compile, and now we need to create the functionality our test requires.
We want the test to be simple and quick. We're seeing a red bar, which means our code is unstable. We want to get out of that state and back on solid ground as soon as possible. How do we make the test pass as quickly and easily as possible?
Although it may seem counterintuitive at first, pushing ourselves a little further to extract the desired behavior from our tests is beneficial. Let's expand our test to find the desired implementation.

## Writing Another Test

We've added... our hard-coded method will surely no longer pass this test, which was our goal.
This technique is appropriately named "triangulation," as it makes use of multiple bearings to point the implementation in the right direction.
Our test passes once more with little effort. Because we have that hard-coded part in there, our test isn't good enough yet, so let's keep triangulating to remove the last bits of literal strings from our code. Listing... shows how we change our test to show not only the hard-coded value of the variable, but also the [additional change].

Our hard-coded return statement is no longer sufficient. We are now faced with the task of... It’s time to discuss breadth and depth. (TODO: Re-read this chapter)

## Faking Things Longer

We're being disciplined and resisting the urge to "just write the code and be done with it." We'll get there in the end. Remember, baby steps? All tests have passed, we're on solid ground (as evidenced by a green bar), and we know exactly where we are. What’s next?
Refactoring is the next step. Do you see anything that needs to be refactored? Is there any duplication that bothers you? Are there any less-than-ideal code constructs?

When we discover that, for example, something is incorrectly implemented or missing entirely while working on one test, it's usually a good idea to jot down a brief reminder and continue working. This allows us to focus on one task at a time rather than overloading our brains by switching between multiple things (and likely messing up our code base in the process).

## Refactoring Code

For a moment, consider what we could improve in the test code: duplication, semantic redundancy,... anything that catches your eye. Is there anything we should clean up? See what kind of smells you detect in the code we have so far.

## Summary

Test-driven development is a powerful technique for creating better software faster. It accomplishes this by focusing on what is absolutely necessary right now, then making that tiny piece work, and finally cleaning up any mess we may have made while making it work, thus keeping the code base healthy. This cycle of first writing a test, then writing the code to pass it, and finally refactoring the design relies heavily on programming by intention, which means writing the test as if the ideal implementation already exists. This is a tool for making designs that are both usable and testable.
We've seen TDD in action, gone through the TDD cycle, and realized that our current design isn't quite cutting it. We set out to write software based on a small set of tests that specified the expected behavior, and we followed the test-code-refactor (or red-green-green) cycle all the way through. The code already meets most of our requirements (we have tests to prove it!) and would be useful in a variety of contexts as is. We can make rapid progress with the tests watching our backs, and we're not afraid to refactor because we know the safety net will catch us if we fail to retain functionality as is.
