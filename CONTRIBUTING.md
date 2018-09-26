# CONTRIBUTING

Contributions are always welcome, no matter how large or small. Before contributing,
please read the [code of conduct](CODE_OF_CONDUCT.md).

## Setup

> Install node on your system: [Node](https://nodejs.org/en/download)

### Install dependencies

> Only required on the first run, subsequent runs can use `npm run serve` to run the development server.

```sh
$ git clone https://gitlab.com/saleina/SaleinaCMS
$ cd SaleinaCMS
$ npm install
```

### Run locally

```sh
$ npm run serve
```

## Pull Requests

We actively welcome your pull requests!

If you need help with Git or our workflow, please ask on [Telegram](tg://resolve?domain=saleinacmsdiscussions). We want your contributions even if you're just learning Git. Our maintainers are happy to help!

Saleina CMS uses the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#forking-workflow) + [Feature Branches](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow). Additionally, PR's should be [rebased](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) on master when opened, and again before merging.

1. Fork the repo.
2. Create a branch from `master`. If you're addressing a specific issue, prefix your branch name with the issue number.
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. PR's must be rebased before merge (feel free to ask for help).
6. PR should be reviewed by two maintainers prior to merging.

## License

By contributing to Saleina CMS, you agree that your contributions will be licensed
under its [MIT license](LICENSE).
