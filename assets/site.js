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
  // series buttons jump to the archive filter
  document.querySelectorAll('.series button').forEach(function (s) {
    s.addEventListener('click', function () {
      var f = document.querySelector('.filters'); if (!f) return;
      var b = [].find.call(f.querySelectorAll('button'), function (x) { return x.dataset.f === s.dataset.go; });
      if (b) b.click(); document.getElementById('archive').scrollIntoView({behavior: 'smooth'});
    });
  });
  // save recipe (stored in this browser only)
  var saved = JSON.parse(localStorage.getItem('thea-saved') || '[]');
  document.querySelectorAll('.btn.save').forEach(function (b) {
    var s = b.dataset.slug; if (saved.indexOf(s) > -1) { b.classList.add('on'); b.textContent = 'Saved'; }
    b.addEventListener('click', function () {
      var i = saved.indexOf(s); if (i > -1) { saved.splice(i, 1); b.classList.remove('on'); b.textContent = 'Save'; } else { saved.push(s); b.classList.add('on'); b.textContent = 'Saved'; }
      localStorage.setItem('thea-saved', JSON.stringify(saved));
    });
  });
})();
