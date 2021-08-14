# Refactoring a First Example

## Requirements

The users want:
- To support HTML printed version of the statement
- Add more kinds of plays 

Below the ordered list of refactoring suggested by Martin Fowler in chapter 1.

## Decompose the statement function

- Extract Function `amountFor` and rename variables `thisAmount` and `perf`
Replace Temp with Query `play`
- Change Function Declaration `amountFor`
- Inline Variable `thisAmount`
- Extract function `volumeCreditsFor` and rename variables
- Split Loop and slide Statements
- Replace Temp with Query `totalVolumeCredits`
- Split Loop and slide Statements and Replace Temp with Query `totalAmount`

## Status: Lots of Nested Functions

- Split Phase: calculate data, render to txt and html
  - Extract function `renderPlainText`
  - Introduce Parameter Object `statementData`
  - Enrich `performance` with data from `play`
  - Enrich `performance` with calculated data `amount`
  - Enrich `performance` with calculated data `volumeCredits`
  - Add total `amount` and `volumeCredits` to `statementData`
  - Replace Loop with Pipeline
  - Extract function `createStatementData` and put in its own file (phase 1)
  - Statement rendering for both HTML and TXT (phase 2) 

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
