# Refactoring a First Example

This program might not really need a big refactor but, you should
imagine this as bigger project at small scale.

## Requirements

The users wants:
- To support HTML printed version of the statement
- Add more kinds of plays

Below the ordered list of refactoring suggested by Martin Fowler in chapter 1.

## Decompose the statement function

Identify points that separate different parts

- Extract Function `amountFor` and rename variables :
  - `thisAmount` -> `result` to make clear the function output
  - `perf` -> `aPerformance` to make clear that it's an instance
- Replace Temp with Query `play`
  - temps are useful to give a name to things but local scope complicates extraction
  - play might be computed by the performance
- Change Function Declaration `amountFor`
- Inline Variable `thisAmount`
- Extract function `volumeCreditsFor` and rename variables
- Change function variable to declared function `format` and Change function declaration to `usd`
- Split Loop
  - Slide Statement `volumeCredits`
  - Replace Temp with Query `totalVolumeCredits()`
- Split Loop and slide Statements
  - Slide Statement `totalAmount`
  - Replace Temp with Query `totalAmount()`

## Status: Lots of Nested Functions

Now there is more cohesion with the code that renders the text, but still extremely coupled.

- Split Phase: calculate data, render to txt and html
  - Extract function `statement` to `renderPlainText`
    - Parameters passed to render method are too generic, probably a new data structure just for render is needed.
  - Introduce Parameter Object `statementData`
    - Move `customer` under `statementData`
    - Move `performances` under `statementData`
  - Enrich `performance` with data from `play`
  - Enrich `performance` with calculated data `amount`
  - Enrich `performance` with calculated data `volumeCredits`
  - Add `totalAmount` and `volumeCredits` to `statementData`
  - Replace Loop with Pipeline
  - Extract function `createStatementData` and put in its own file (phase 1)
  - Statement rendering for both HTML and TXT (phase 2)
- Add HTML Statement feature is now easy modifying only the rendering phase

## Status separated into two files (and phases)

- Replace Conditional with Polymorphism: support more categories of play
  - Create a new class `PerformanceCalculator`
  - Change Function Declaration to add `play`
  - Move Function `amountFor`
  - Inline Function `amountFor`
  - Move and Inline Function `volumeCreditsFor`
  - Replace Constructor with Factory Function `createPerformanceCalculator`
  - Replace Type Code with Subclasses `TragedyCalculator` and `ComedyCalculator`
  - Replace Conditional with Polymorphism `amount`
  - Replace Conditional with Polymorphism `volumeCredits`
