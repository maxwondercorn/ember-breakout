# Changelog

All notable changes to this project will be documented in this file.

## [v0.1.0](https://github.com/maxwondercorn/ember-breakout/compare/v0.0.0...v0.1.0) - 2021-03-08

### Merged

- MVP [`#5`](https://github.com/maxwondercorn/ember-breakout/pull/5)
- Create Canvas, Paddle and Brick classes to isolate functionality [`#4`](https://github.com/maxwondercorn/ember-breakout/pull/4)
- Feature fill styles [`#3`](https://github.com/maxwondercorn/ember-breakout/pull/3)
- Change license to CC0 [`#2`](https://github.com/maxwondercorn/ember-breakout/pull/2)
- Modify license [`#1`](https://github.com/maxwondercorn/ember-breakout/pull/1)

### Commits

- DOC: Initial readme - description only [`31c0e9b`](https://github.com/maxwondercorn/ember-breakout/commit/31c0e9bcc69e6fccecd7b1216a11d44dc9548fa3)
- Delete old license [`765b5bf`](https://github.com/maxwondercorn/ember-breakout/commit/765b5bf52cbeb6ba2c38c751775fc0e794a3ecc6)
- Delete LICENSE.md [`053129b`](https://github.com/maxwondercorn/ember-breakout/commit/053129b3976fb5ac0094ca7b473160a1e91f16fc)
- FEAT: Initial game code and dummy app [`f558456`](https://github.com/maxwondercorn/ember-breakout/commit/f55845624e231e9127eeb827833e0ee9bc666e63)
- FIX: tutorial code had brick rows and columns switched [`d1dc681`](https://github.com/maxwondercorn/ember-breakout/commit/d1dc6817086b452e29c80630b0b9e845d78c3177)
- CHORE:  add legally to track dependency licenses [`297ab86`](https://github.com/maxwondercorn/ember-breakout/commit/297ab861babc7aa2a4c6a71838cc83e215f26103)
- CHORE:  add auto-changelog [`01c42c7`](https://github.com/maxwondercorn/ember-breakout/commit/01c42c776c6f2010381b93b528903ed0160b776c)
- CHORE:  update ember dependencies [`37f9a0a`](https://github.com/maxwondercorn/ember-breakout/commit/37f9a0a86f681d6a9ae1d07f05ddcd2b8c4f8720)
- FIX: add super to willDestroy hook [`95262e8`](https://github.com/maxwondercorn/ember-breakout/commit/95262e854a5b9419f03214cb023d5ffa51a08894)
- CHORE:  add changelog to .npmignore [`7ca3d47`](https://github.com/maxwondercorn/ember-breakout/commit/7ca3d47594a5c6f66fba8871abe9eb546313e2b5)
- DOC: add JSDoc comments [`1c871be`](https://github.com/maxwondercorn/ember-breakout/commit/1c871be53eea2743a46cfe44d86bf8ad9a66f915)
- fest: uncomment game over alert [`3ad8122`](https://github.com/maxwondercorn/ember-breakout/commit/3ad8122720314e62a93aa611959d6d81446f598f)
- FEAT: add ability to specify fill colors for ball, paddle and bricks [`22a6bd0`](https://github.com/maxwondercorn/ember-breakout/commit/22a6bd018ea6de098fb3810bdf8c824f2f55c58f)
- FEAT: isolate createBricks, drawBall and drawPaddle from class this.variables [`0ce39b7`](https://github.com/maxwondercorn/ember-breakout/commit/0ce39b779ffdd48810fa83157be903281886af58)
- FIX: remove remaining this.ctx from drawPaddle() [`f242af1`](https://github.com/maxwondercorn/ember-breakout/commit/f242af1d9662b4c765fe6e2b45006d1c5caed40c)
- FEAT: create Canvas class to handle canvas and ctx manipulation [`df13f9e`](https://github.com/maxwondercorn/ember-breakout/commit/df13f9e03904c651666497811f2ed5ce76fcb79a)
- feat (Canvas): add clearClass method [`ee2644f`](https://github.com/maxwondercorn/ember-breakout/commit/ee2644f91770609473239203d12f59cede8bf946)
- feat (Canvas): add getter for canvas.offsetLeft - needed for mousemove event handler [`6cac84c`](https://github.com/maxwondercorn/ember-breakout/commit/6cac84ce1124c928799c80fb546a99a2d857cc20)
- FEAT: create Paddle class [`1ea43dd`](https://github.com/maxwondercorn/ember-breakout/commit/1ea43ddeff500c07108260199fcd3c7f2410506a)
- FEAT: simplify Paddle class and add paddle draw method [`efa8e5f`](https://github.com/maxwondercorn/ember-breakout/commit/efa8e5fce6018cad28b4cfa6eeefd29a48d629b7)
- FEAT: create Brick class [`24799a5`](https://github.com/maxwondercorn/ember-breakout/commit/24799a564e011ca741f152bf4c53790b8fce71b0)
- refactor (Canvas): rename variable canvasElement to element [`e414db4`](https://github.com/maxwondercorn/ember-breakout/commit/e414db49a5a57d349d4f71377f729c774b409a6e)
- feat (Paddle): add default style color to contstructor [`c984c15`](https://github.com/maxwondercorn/ember-breakout/commit/c984c1572e1add9c2327ee7f74c957435772dc94)

## v0.0.0 - 2021-03-08

### Commits

- And so it begins... [`7385f6d`](https://github.com/maxwondercorn/ember-breakout/commit/7385f6d63d1c4b295b747c148b33a859f7e63750)
