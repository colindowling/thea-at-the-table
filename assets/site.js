// THEA at the Table: small progressive enhancements
(function () {
  // recipe filter chips
  var f = document.querySelector('.filters');
  if (f) f.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    f.querySelectorAll('button').forEach(function (x) { x.classList.toggle('on', x === b); });
    var v = b.dataset.f;
    document.querySelectorAll('#grid .card').forEach(function (c) {
      c.hidden = v && (' ' + c.dataset.course + ' ').indexOf(v) === -1;
    });
  });
  // recipe search (title match), works with filter chips
  var q = document.getElementById('search');
  if (q) q.addEventListener('input', function () {
    var t = q.value.trim().toLowerCase();
    document.querySelectorAll('#grid .card').forEach(function (c) {
      c.hidden = t && c.querySelector('h3').textContent.toLowerCase().indexOf(t) === -1;
    });
  });
  if (q && location.hash === '#search') q.focus();
  // tap to check off ingredients
  document.querySelectorAll('.r-ing li').forEach(function (li) {
    li.addEventListener('click', function () { li.classList.toggle('done'); });
  });
})();
