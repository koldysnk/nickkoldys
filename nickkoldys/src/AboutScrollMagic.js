let tracker = 0


window.onscroll = function(e) {
    // print "false" if direction is down and "true" if up
    console.log(this.oldScroll > this.scrollY);
    this.oldScroll = this.scrollY;
  }