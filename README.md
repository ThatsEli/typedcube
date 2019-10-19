# typedcube

### What is typedcube?
Typedcube is an Typescript lib that solves the Rubiks cube using primitive methods. It is not very fast but I created this for fun (and a school project)

## How it works
It works by solvving the upper face first. Then it solved the first and second row of the sides(relative to the top). Then it goes on to solving the bottom face. After that it completes the cube by solving the third row(again, relative to the top side)

## The structure
There are a few classes to model the cube and its faces(Cube and Face).

The main structure consists out of testers and helpers. The tester test if a condition is met, e.g. a face is solved or if there is a corner piece on a face. Then there are the helpers: These do the actual solving. For example solving the upper cross or solving the second layer. In the end it tries to optimize the algorthm to shorten it down a bit.

## Documentation
Comming soon (tm)

## Performance / Moves to solve
The lib calculates the solution in a very unefficient way. This doesn't really matter, as efficiency wasn't the main goal of this project. Maybe there is some room for improvements later on.
