interact('.draggable').draggable({
  inertia: true,
  restrict: {
    restriction: "parent",
    endOnly: true,
    elementRect: { top: 0, left: 4, bottom: 1, right: 1 }
  },
  onmove: function (event) {
    var target = event.target;   
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform =
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  },
  onend: function(event) {
      // console.log(event);
  }
}).on('move', function (event) {
var interaction = event.interaction;
if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.getAttribute('clonable') != 'false') {
var original = event.currentTarget;
var clone = event.currentTarget.cloneNode(true);
var x = clone.offsetLeft;
var y = clone.offsetTop;
clone.setAttribute('clonable','false');
clone.style.position = "absolute";
clone.style.left = original.offsetLeft+"px";
clone.style.top = original.offsetTop+"px";
original.parentElement.appendChild(clone);
interaction.start({ name: 'drag' },event.interactable,clone);
}
});