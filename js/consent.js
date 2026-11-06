/* STVTRADE: cookie notice, Yandex Metrika (loaded only after consent) and goal tracking */
(function () {
  var METRIKA_ID = 50328466; /* номер счётчика Яндекс Метрики */
  var KEY = 'stv-cookie-consent'; /* значения: 'all' | 'necessary' */

  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ---------- Yandex Metrika ---------- */
  var loaded = false;
  function loadMetrika() {
    if (loaded || !METRIKA_ID) return;
    loaded = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < e.scripts.length; j++) { if (e.scripts[j].src === r) { return; } }
      k = e.createElement(t); a = e.getElementsByTagName(t)[0]; k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(METRIKA_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }
  function goal(name) { if (loaded && window.ym) { try { window.ym(METRIKA_ID, 'reachGoal', name); } catch (e) {} } }

  /* clicks on phone, messengers, Max, e-mail */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a,button') : null;
    if (!el) return;
    var h = el.getAttribute('href') || '';
    if (h.indexOf('tel:') === 0) goal('call');
    else if (h.indexOf('https://t.me/') === 0) goal('telegram');
    else if (h.indexOf('https://wa.me/') === 0) goal('whatsapp');
    else if (h.indexOf('mailto:') === 0) goal('email');
    else if (el.hasAttribute('data-copy')) goal('max');
  }, true);

  /* ---------- cookie notice ---------- */
  var css = [
    '.ck{position:fixed;z-index:60;left:16px;right:16px;bottom:16px;margin:0 auto;max-width:760px;background:#16293A;color:#E8EDF1;border:1px solid #2B4255;border-radius:16px;box-shadow:0 18px 40px -18px rgba(0,0,0,.6);padding:18px 20px;display:flex;gap:16px 20px;align-items:center;flex-wrap:wrap;font:15px/1.5 "Golos Text",system-ui,sans-serif}',
    '.ck[hidden]{display:none}',
    '.ck p{margin:0;flex:1 1 320px;color:#C5D1DB}',
    '.ck a{color:#E8EDF1;text-underline-offset:3px}',
    '.ck .ck-b{display:flex;gap:8px;flex-wrap:wrap}',
    '.ck button{height:44px;padding:0 18px;border-radius:12px;font:600 15px/1 "Golos Text",system-ui,sans-serif;cursor:pointer;border:1.5px solid transparent}',
    '.ck .ck-yes{background:#F5B800;color:#0F1D29}',
    '.ck .ck-yes:hover{background:#FFC926}',
    '.ck .ck-no{background:transparent;color:#E8EDF1;border-color:#2B4255}',
    '.ck .ck-no:hover{border-color:#9DB0C0}',
    '.ck button:focus-visible{outline:3px solid #F5B800;outline-offset:3px}',
    '@media (max-width:560px){.ck{left:8px;right:8px;bottom:8px;padding:16px}.ck .ck-b{width:100%}.ck button{flex:1 1 0}}'
  ].join('\n');

  function docHref(n) { return location.pathname.indexOf(n) !== -1 ? '#top' : n + '.html'; }

  var box;
  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    box = document.createElement('div');
    box.className = 'ck'; box.hidden = true;
    box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Уведомление о cookie');
    box.innerHTML =
      '<p>Сайт использует cookie и сервис Яндекс Метрика, чтобы понимать, какие разделы полезны посетителям. ' +
      'Нажимая «Принять», вы даёте <a href="' + docHref('soglasie') + '">согласие на обработку персональных данных</a>. ' +
      'Подробнее — в <a href="' + docHref('politika') + '">политике</a>.</p>' +
      '<div class="ck-b"><button type="button" class="ck-no">Только необходимые</button>' +
      '<button type="button" class="ck-yes">Принять</button></div>';
    document.body.appendChild(box);
    box.querySelector('.ck-yes').addEventListener('click', function () { setChoice('all'); box.hidden = true; loadMetrika(); });
    box.querySelector('.ck-no').addEventListener('click', function () { setChoice('necessary'); box.hidden = true; });
  }

  function init() {
    build();
    var c = getChoice();
    if (c === 'all') loadMetrika();
    else if (c !== 'necessary') box.hidden = false;
    document.querySelectorAll('[data-cookie-settings]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); box.hidden = false; box.querySelector('.ck-yes').focus(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
