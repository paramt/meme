# Deep linking
The calculators support [deep-linking](https://en.wikipedia.org/wiki/Deep_linking) through URL parameters.
All URL parameters are *required*.

## Break Even
| Base URL | https://www.param.me/meme/calculator/break-even/ |
| --- | --- |
| Upvotes at investment | `upvotes` |

**Example:** https://www.param.me/meme/calculator/break-even/?upvotes=100

## Investment Return
| Base URL | https://www.param.me/meme/calculator/investment-return/ |
| --- | --- |
| Upvotes at investment | `old` |
| Upvotes upon maturity | `new` |
| Net worth | `balance` |

**Example:** https://www.param.me/meme/calculator/investment-return/?old=100&new=200&balance=1000
