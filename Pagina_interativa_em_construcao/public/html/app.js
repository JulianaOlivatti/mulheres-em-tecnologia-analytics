(function () {
  'use strict';

  /* ======================= DADOS ======================= */
  var C = { navy: '#123B5D', sage: '#A8C4A4', peach: '#F8C2A8', peachDeep: '#C8613A', blue: '#7FA0BC', grid: '#EEEAE1', muted: '#66727A' };

  var courseComparison = [
    { course: 'Análise e Desenv. de Sistemas', ingresso: 17.3, conclusao: 14.0 },
    { course: 'Engenharia de Computação', ingresso: 17.1, conclusao: 15.0 },
    { course: 'Sistemas de Informação', ingresso: 17.0, conclusao: 14.1 },
    { course: 'Ciência da Computação', ingresso: 16.9, conclusao: 14.8 },
    { course: 'Engenharia de Software', ingresso: 16.7, conclusao: 14.9 }
  ];
  var formationJourney = [
    { year: '2021', evasao: 62, ingressantes: 16.2, concluintes: 14.1 },
    { year: '2022', evasao: 64, ingressantes: 16.9, concluintes: 14.6 },
    { year: '2023', evasao: 63, ingressantes: 17.8, concluintes: 15.0 }
  ];
  var inepComparison = [
    { year: '2021', inep: 14.2, sintetica: 14.0 },
    { year: '2022', inep: 14.6, sintetica: 14.4 },
    { year: '2023', inep: 15.1, sintetica: 14.8 }
  ];
  var salaryBySeniority = [
    { level: 'Júnior', homens: 5200, mulheres: 4600, headcountF: 420 },
    { level: 'Pleno', homens: 9800, mulheres: 8300, headcountF: 260 },
    { level: 'Sênior', homens: 17600, mulheres: 14700, headcountF: 140 },
    { level: 'Lead / Staff', homens: 24800, mulheres: 19800, headcountF: 45 },
    { level: 'Diretoria / C-Level', homens: 41800, mulheres: 28900, headcountF: 12 }
  ];
  var representationGap = [
    { level: 'Pleno', gap: 16.61, mulheres: 22.39 },
    { level: 'Sênior', gap: 19.59, mulheres: 11.99 },
    { level: 'Lead / Staff', gap: 22.22, mulheres: 5.61 },
    { level: 'Diretoria / C-Level', gap: 26.72, mulheres: 4.44 }
  ];
  var filterOptions = {
    regiao: ['Todos', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    ano: ['Todos', '2021', '2022', '2023'],
    curso: ['Todos', 'Análise e Desenv. de Sistemas', 'Ciência da Computação', 'Engenharia de Computação', 'Engenharia de Software', 'Sistemas de Informação'],
    area: ['Todos', 'Dados', 'Desenvolvimento', 'Infraestrutura', 'Produto', 'Segurança'],
    senioridade: ['Todos', 'Júnior', 'Pleno', 'Sênior', 'Lead / Staff', 'Diretoria / C-Level']
  };
  var areaMultiplier = { 'Dados': 1.08, 'Desenvolvimento': 1, 'Infraestrutura': 0.96, 'Produto': 1.05, 'Segurança': 1.12 };
  var roles = [
    ['Analista de Dados', 'Dados', 'Júnior'],
    ['Cientista de Dados', 'Dados', 'Pleno'],
    ['Engenheira(o) de Dados', 'Dados', 'Sênior'],
    ['Desenvolvedor(a) Front-end', 'Desenvolvimento', 'Júnior'],
    ['Desenvolvedor(a) Back-end', 'Desenvolvimento', 'Pleno'],
    ['Desenvolvedor(a) Full Stack', 'Desenvolvimento', 'Sênior'],
    ['Tech Lead', 'Desenvolvimento', 'Lead / Staff'],
    ['Analista de Suporte', 'Infraestrutura', 'Júnior'],
    ['Engenheira(o) DevOps / SRE', 'Infraestrutura', 'Sênior'],
    ['Product Manager', 'Produto', 'Pleno'],
    ['Head de Produto', 'Produto', 'Diretoria / C-Level'],
    ['Analista de Segurança', 'Segurança', 'Pleno'],
    ['Staff Security Engineer', 'Segurança', 'Lead / Staff'],
    ['CTO', 'Desenvolvimento', 'Diretoria / C-Level']
  ];

  function seededRandom(seed) {
    var s = seed;
    return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }
  function buildScatter(count, seed, slope, base) {
    var rand = seededRandom(seed), out = [];
    for (var i = 0; i < count; i++) {
      var exp = Math.round(rand() * 160) / 10;
      var noise = (rand() - 0.5) * (4000 + exp * 1500);
      out.push({ x: exp, y: Math.round(Math.max(2500, base + exp * slope + noise)) });
    }
    return out;
  }

  /* ======================= FORMATADORES ======================= */
  var brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  var compact = new Intl.NumberFormat('pt-BR', { notation: 'compact', maximumFractionDigits: 1 });
  var pct = function (v, d) { return v.toLocaleString('pt-BR', { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d }) + '%'; };
  var money = function (v) { return 'R$ ' + compact.format(v); };

  /* ======================= CHART.JS DEFAULTS ======================= */
  Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
  Chart.defaults.font.size = 12;
  Chart.defaults.color = C.muted;
  Chart.defaults.plugins.legend.position = 'bottom';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 8;
  Chart.defaults.maintainAspectRatio = false;
  var gridOpts = { color: C.grid, drawTicks: false };

  /* ======================= FILTROS ======================= */
  document.querySelectorAll('select[data-options]').forEach(function (sel) {
    filterOptions[sel.dataset.options].forEach(function (o) { sel.add(new Option(o, o)); });
  });

  /* ======================= ABAS ======================= */
  var initialized = {};
  var initializers = {
    'tab-studies': initStudies,
    'tab-market': initMarket,
    'tab-equity': initEquity,
    'tab-calc': initCalc
  };
  var steps = Array.prototype.slice.call(document.querySelectorAll('.step'));

  function showTab(id) {
    document.querySelectorAll('.tab-panel').forEach(function (p) { p.hidden = p.id !== id; });
    steps.forEach(function (s) {
      var active = s.dataset.tab === id;
      s.setAttribute('aria-selected', active ? 'true' : 'false');
      s.tabIndex = active ? 0 : -1;
    });
    if (!initialized[id]) { initializers[id](); initialized[id] = true; }
    if (history.replaceState) history.replaceState(null, '', '#' + id.replace('tab-', ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  steps.forEach(function (s, i) {
    s.addEventListener('click', function () { showTab(s.dataset.tab); });
    s.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var next = steps[(i + (e.key === 'ArrowRight' ? 1 : steps.length - 1)) % steps.length];
      next.focus(); showTab(next.dataset.tab);
    });
  });

  /* ======================= ABA 1 ======================= */
  function initStudies() {
    var min = 13, max = 18;
    var pos = function (v) { return ((v - min) / (max - min)) * 100; };
    document.getElementById('dumbbell').innerHTML = courseComparison.map(function (c) {
      var a = pos(c.conclusao), b = pos(c.ingresso);
      return '<div class="db-row"><span>' + c.course + '</span><div class="db-track">' +
        '<span class="db-line" style="left:' + a + '%;width:' + (b - a) + '%"></span>' +
        '<span class="db-dot" style="left:' + a + '%;background:' + C.sage + '"></span>' +
        '<span class="db-val" style="left:' + a + '%">' + pct(c.conclusao, 1) + '</span>' +
        '<span class="db-dot" style="left:' + b + '%;background:' + C.navy + '"></span>' +
        '<span class="db-val" style="left:' + b + '%">' + pct(c.ingresso, 1) + '</span>' +
        '</div><span class="db-diff">−' + (c.ingresso - c.conclusao).toFixed(1).replace('.', ',') + ' p.p.</span></div>';
    }).join('');

    new Chart(document.getElementById('chart-dropout'), {
      type: 'doughnut',
      data: { labels: ['Evasão feminina', 'Evasão masculina'], datasets: [{ data: [53.84, 46.16], backgroundColor: [C.navy, C.sage], borderColor: '#fff', borderWidth: 2 }] },
      options: { cutout: '55%', plugins: { tooltip: { callbacks: { label: function (c) { return c.label + ': ' + pct(c.raw); } } } } }
    });

    new Chart(document.getElementById('chart-journey'), {
      data: {
        labels: formationJourney.map(function (d) { return d.year; }),
        datasets: [
          { type: 'bar', label: 'Evasão (%)', data: formationJourney.map(function (d) { return d.evasao; }), backgroundColor: C.navy, borderRadius: 4, yAxisID: 'y', order: 2 },
          { type: 'line', label: 'Ingressantes (%)', data: formationJourney.map(function (d) { return d.ingressantes; }), borderColor: C.sage, backgroundColor: C.sage, tension: 0.35, yAxisID: 'y1', order: 1 },
          { type: 'line', label: 'Concluintes (%)', data: formationJourney.map(function (d) { return d.concluintes; }), borderColor: C.peachDeep, backgroundColor: C.peachDeep, tension: 0.35, yAxisID: 'y1', order: 1 }
        ]
      },
      options: {
        scales: {
          x: { grid: { display: false } },
          y: { min: 0, max: 100, grid: gridOpts },
          y1: { position: 'right', min: 12, max: 19, grid: { display: false }, ticks: { callback: function (v) { return v + '%'; } } }
        }
      }
    });

    new Chart(document.getElementById('chart-inep'), {
      type: 'bar',
      data: {
        labels: inepComparison.map(function (d) { return d.year; }),
        datasets: [
          { label: 'Referência INEP', data: inepComparison.map(function (d) { return d.inep; }), backgroundColor: '#BFDDF2', borderRadius: 4 },
          { label: 'Base sintética', data: inepComparison.map(function (d) { return d.sintetica; }), backgroundColor: C.navy, borderRadius: 4 }
        ]
      },
      options: { scales: { x: { grid: { display: false } }, y: { min: 0, grid: gridOpts, ticks: { callback: function (v) { return v + '%'; } } } } }
    });
  }

  /* ======================= ABA 2 ======================= */
  function salaryBarChart(canvasId) {
    var data = salaryBySeniority.slice().reverse();
    return new Chart(document.getElementById(canvasId), {
      type: 'bar',
      data: {
        labels: data.map(function (d) { return d.level; }),
        datasets: [
          { label: 'Salário masculino', data: data.map(function (d) { return d.homens; }), backgroundColor: C.navy, borderRadius: 3, barPercentage: 0.8, categoryPercentage: 0.7 },
          { label: 'Salário feminino', data: data.map(function (d) { return d.mulheres; }), backgroundColor: C.sage, borderRadius: 3, barPercentage: 0.8, categoryPercentage: 0.7 }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: { x: { grid: gridOpts, ticks: { callback: function (v) { return compact.format(v); } } }, y: { grid: { display: false } } },
        plugins: { tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + brl.format(c.raw); } } } }
      }
    });
  }

  function initMarket() {
    new Chart(document.getElementById('chart-scatter'), {
      type: 'scatter',
      data: {
        datasets: [
          { label: 'Masculino', data: buildScatter(220, 42, 2400, 4200), backgroundColor: 'rgba(88,99,106,0.55)', pointStyle: 'triangle', pointRadius: 4 },
          { label: 'Feminino', data: buildScatter(70, 7, 1650, 3800), backgroundColor: C.peachDeep, pointStyle: 'rectRot', pointRadius: 4 }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Tempo de experiência (anos)' }, grid: gridOpts },
          y: { title: { display: true, text: 'Salário mensal' }, grid: gridOpts, ticks: { callback: function (v) { return compact.format(v); } } }
        },
        plugins: { tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + c.raw.x + ' anos · ' + brl.format(c.raw.y); } } } }
      }
    });
    salaryBarChart('chart-market-salary');
  }

  /* ======================= ABA 3 ======================= */
  function initEquity() {
    salaryBarChart('chart-equity-salary');

    var data = representationGap.slice().reverse();
    new Chart(document.getElementById('chart-representation'), {
      type: 'bar',
      data: {
        labels: data.map(function (d) { return d.level; }),
        datasets: [
          { label: 'Gap salarial', data: data.map(function (d) { return d.gap; }), backgroundColor: C.navy },
          { label: 'Mulheres (%)', data: data.map(function (d) { return d.mulheres; }), backgroundColor: C.sage }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: { x: { stacked: true, grid: gridOpts, ticks: { callback: function (v) { return v + '%'; } } }, y: { stacked: true, grid: { display: false } } },
        plugins: { tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + pct(c.raw); } } } }
      }
    });

    var range = document.getElementById('sim-range');
    var totalPayroll = salaryBySeniority.reduce(function (s, d) { return s + d.mulheres * d.headcountF * 12; }, 0);
    function updateSim() {
      var p = Number(range.value) / 100;
      var invest = 0, adjust = 0;
      salaryBySeniority.forEach(function (d) {
        invest += (d.homens - d.mulheres) * p * d.headcountF * 12;
        if (p > 0) adjust += d.headcountF;
      });
      document.getElementById('sim-pct').textContent = range.value + '%';
      document.getElementById('sim-invest').textContent = money(invest);
      document.getElementById('sim-impact').textContent = pct((invest / totalPayroll) * 100);
      document.getElementById('sim-adjust').textContent = adjust.toLocaleString('pt-BR');
    }
    range.addEventListener('input', updateSim);
    updateSim();
  }

  /* ======================= ABA 4 ======================= */
  function marketReference(level, area) {
    var base = salaryBySeniority.filter(function (s) { return s.level === level; })[0] || salaryBySeniority[0];
    var m = areaMultiplier[area] || 1;
    var homens = base.homens * m, mulheres = base.mulheres * m;
    return { homens: homens, mulheres: mulheres, media: (homens + mulheres) / 2 };
  }

  function initCalc() {
    var senSel = document.getElementById('c-senioridade');
    var areaSel = document.getElementById('c-area');
    filterOptions.senioridade.slice(1).forEach(function (o) { senSel.add(new Option(o, o)); });
    filterOptions.area.slice(1).forEach(function (o) { areaSel.add(new Option(o, o)); });
    senSel.value = 'Pleno';
    areaSel.value = 'Dados';

    var form = document.getElementById('calc-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var salInput = document.getElementById('c-salario');
      var hrsInput = document.getElementById('c-horas');
      var salario = Number(salInput.value);
      var horas = Number(hrsInput.value);
      salInput.classList.toggle('is-invalid', !(salario >= 1000));
      hrsInput.classList.toggle('is-invalid', !(horas >= 10 && horas <= 60));
      if (!(salario >= 1000) || !(horas >= 10 && horas <= 60)) return;

      var ref = marketReference(senSel.value, areaSel.value);
      var normalized = salario * (40 / horas);
      var gapMarket = ((normalized - ref.media) / ref.media) * 100;
      var ajuste = Math.max(0, (ref.homens - normalized) * (horas / 40));

      document.getElementById('calc-context').textContent = senSel.value + ' · ' + areaSel.value + ' · ' + horas + 'h semanais (valores normalizados para 40h)';
      document.getElementById('r-ajuste').textContent = ajuste > 0 ? brl.format(ajuste) : 'Sem ajuste';
      document.getElementById('r-ajuste-note').textContent = ajuste > 0
        ? 'Aumento de ' + pct((ajuste / salario) * 100, 1) + ' para atingir a média masculina'
        : 'Salário já igual ou acima da média masculina';
      document.getElementById('r-gap').textContent = (gapMarket > 0 ? '+' : '') + pct(gapMarket, 1);
      document.getElementById('r-gap-note').textContent = gapMarket < 0
        ? 'Abaixo da média de mercado (' + brl.format(ref.media) + ')'
        : 'Acima da média de mercado (' + brl.format(ref.media) + ')';

      var maxV = Math.max(normalized, ref.homens) * 1.05;
      [['user', normalized], ['women', ref.mulheres], ['market', ref.media], ['men', ref.homens]].forEach(function (pair) {
        document.getElementById('b-' + pair[0]).style.width = (pair[1] / maxV) * 100 + '%';
        document.getElementById('v-' + pair[0]).textContent = brl.format(pair[1]);
      });
    });
    form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit'));

    initScraper();
  }

  /* --------- Raspagem simulada (POST /api/scrape-market-data) --------- */
  var records = [];
  var sortState = { key: 'gap', dir: 'desc' };

  function jitter(spread) { return 1 + (Math.random() - 0.5) * spread; }
  function roundTo(v, step) { return Math.round(v / step) * step; }
  function buildSnapshot() {
    return roles.map(function (r, i) {
      var ref = marketReference(r[2], r[1]);
      var homens = roundTo(ref.homens * jitter(0.06), 10);
      var mulheres = roundTo(ref.mulheres * jitter(0.06), 10);
      return { id: i, cargo: r[0], area: r[1], senioridade: r[2], homens: homens, mulheres: mulheres, gap: Math.round(((homens - mulheres) / homens) * 10000) / 100 };
    });
  }

  function initScraper() {
    var areaSel = document.getElementById('tbl-area');
    filterOptions.area.forEach(function (o) { areaSel.add(new Option(o === 'Todos' ? 'Todas as áreas' : o, o)); });
    areaSel.addEventListener('change', renderTable);
    document.getElementById('tbl-search').addEventListener('input', renderTable);
    document.querySelectorAll('[data-sort]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.sort;
        sortState = { key: key, dir: sortState.key === key && sortState.dir === 'desc' ? 'asc' : 'desc' };
        renderTable();
      });
    });

    var runBtn = document.getElementById('t-run');
    var live = document.getElementById('t-live');
    var timer = null;
    runBtn.addEventListener('click', runScrape);
    live.addEventListener('change', function () {
      clearInterval(timer);
      if (live.checked) timer = setInterval(runScrape, 30000);
    });
    runScrape();
  }

  var running = false;
  function runScrape() {
    if (running) return;
    running = true;
    var logEl = document.getElementById('t-log');
    var status = document.getElementById('t-status');
    var meta = document.getElementById('t-meta');
    var btn = document.getElementById('t-run');
    btn.disabled = true;
    status.className = 'badge-status loading';
    status.textContent = 'Processando...';
    meta.textContent = 'Conectando às fontes de mercado';
    logEl.innerHTML = '';

    var started = performance.now();
    var time = function () { return new Date().toLocaleTimeString('pt-BR'); };
    var lines = [
      ['t-info', '$ curl -X POST /api/scrape-market-data -H "Content-Type: application/json"'],
      ['', '→ Iniciando sessão de raspagem...'],
      ['', '→ Conectando: vagas-tech.br, salarios-ti.br, pesquisa-dev-brasil'],
      ['t-warn', '→ Respeitando robots.txt e rate limit (2 req/s)'],
      ['', '→ Coletando ' + roles.length + ' cargos em 5 áreas...'],
      ['', '→ Normalizando salários para jornada de 40h'],
      ['', '→ Calculando médias por gênero e gap salarial']
    ];
    var i = 0;
    function step() {
      if (i < lines.length) {
        appendLog(lines[i][0], '[' + time() + '] ' + lines[i][1]);
        i++;
        setTimeout(step, 280 + Math.random() * 220);
        return;
      }
      records = buildSnapshot();
      var ms = Math.round(performance.now() - started);
      appendLog('t-ok', '[' + time() + '] ✓ HTTP/1.1 200 OK — ' + records.length + ' registros (' + ms + ' ms)');
      status.className = 'badge-status ok';
      status.textContent = 'Status: 200 OK';
      meta.textContent = 'Dados atualizados em tempo real · ' + time();
      btn.disabled = false;
      running = false;
      renderTable(true);
    }
    step();
  }

  function appendLog(cls, text) {
    var logEl = document.getElementById('t-log');
    var span = document.createElement('span');
    if (cls) span.className = cls;
    span.textContent = text + '\n';
    logEl.appendChild(span);
    logEl.scrollTop = logEl.scrollHeight;
  }

  function renderTable(flash) {
    var q = document.getElementById('tbl-search').value.trim().toLowerCase();
    var area = document.getElementById('tbl-area').value;
    var rows = records.filter(function (r) {
      return (area === 'Todos' || r.area === area) && r.cargo.toLowerCase().indexOf(q) !== -1;
    });
    rows.sort(function (a, b) {
      var va = a[sortState.key], vb = b[sortState.key];
      var cmp = typeof va === 'string' ? va.localeCompare(vb, 'pt-BR') : va - vb;
      return sortState.dir === 'asc' ? cmp : -cmp;
    });
    document.querySelectorAll('[data-sort]').forEach(function (btn) {
      btn.classList.remove('asc', 'desc');
      if (btn.dataset.sort === sortState.key) btn.classList.add(sortState.dir);
      btn.closest('th').setAttribute('aria-sort', btn.dataset.sort === sortState.key ? (sortState.dir === 'asc' ? 'ascending' : 'descending') : 'none');
    });

    var body = document.getElementById('tbl-body');
    if (!rows.length) {
      body.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhum cargo encontrado.</td></tr>';
    } else {
      body.innerHTML = '';
      rows.forEach(function (r) {
        var tr = document.createElement('tr');
        if (flash === true) tr.className = 'flash';
        var cls = r.gap < 12 ? 'gap-low' : r.gap < 20 ? 'gap-mid' : 'gap-high';
        tr.innerHTML =
          '<td><div class="fw-semibold"></div><div class="small text-muted"></div></td>' +
          '<td class="text-end">' + brl.format(r.homens) + '</td>' +
          '<td class="text-end">' + brl.format(r.mulheres) + '</td>' +
          '<td class="text-end"><span class="gap-pill ' + cls + '">' + pct(r.gap) + '</span></td>';
        tr.querySelector('.fw-semibold').textContent = r.cargo;
        tr.querySelector('.small').textContent = r.area + ' · ' + r.senioridade;
        body.appendChild(tr);
      });
    }
    var avg = rows.length ? rows.reduce(function (s, r) { return s + r.gap; }, 0) / rows.length : 0;
    document.getElementById('tbl-caption').textContent = rows.length + ' cargos · gap médio ' + pct(avg) + ' · clique no cabeçalho para ordenar';
  }

  /* ======================= INÍCIO ======================= */
  var fromHash = { studies: 'tab-studies', market: 'tab-market', equity: 'tab-equity', calc: 'tab-calc' }[location.hash.slice(1)];
  showTab(fromHash || 'tab-studies');
})();
