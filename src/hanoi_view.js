class View {
  constructor(game, $domEle) {
    this.game = game;
    this.$domEle = $domEle;
    this.selected = null;
    this.setupTowers();
  }

  setupTowers() {
    this.render();
  }

  render() {
    this.$domEle.empty();
    this.game.towers.forEach((tower, id) => {
      const $tower = $("<ul>");
      tower.forEach(disk => {
        const $disk = $("<li>");
        $disk.toggleClass(`disc-${disk}`);
        $tower.prepend($disk);
      });
      $tower.on("click", () => {
        console.log(`selected: ${this.selected}`);
        if (this.selected !== null) {
          console.log(`moved ${this.selected} to ${id}`);
          this.game.move(this.selected, id);
          this.selected = null;
          $tower.toggleClass("selected");
          this.render();
        } else {
          this.selected = id;
          $tower.toggleClass("selected");

        }
      })
      this.$domEle.append($tower);
      if (this.game.isWon()) {
        const $winningMessage = $("#message");
        $winningMessage.text("You Win!")
      }
    });
  }

}

module.exports = View;