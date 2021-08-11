# Refactoring a First Example

## Requirments

The users wants:
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
