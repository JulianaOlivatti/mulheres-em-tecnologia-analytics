/* ==========================================================================
   PEOPLE ANALYTICS - MULHERES EM TECNOLOGIA (COM FILTROS DINÂMICOS E BANNER)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- BASE DE DADOS SINTÉTICA ---
  const DATA_STORE = {
    estudos: [
      { curso: 'Ciência da Computação', ingressantes: 15.2, concluintes: 12.1 },
      { curso: 'Sistemas de Informação', ingressantes: 18.5, concluintes: 15.4 },
      { curso: 'Análise e Dev. de Sistemas', ingressantes: 21.0, concluintes: 18.2 },
      { curso: 'Engenharia de Software', ingressantes: 16.8, concluintes: 13.9 },
      { curso: 'Engenharia da Computação', ingressantes: 12.4, concluintes: 9.8 }
    ],
    mercado: {
      senioridades: ['Estagiário(a)', 'Júnior', 'Pleno', 'Sênior', 'Liderança / Gestão'],
      areas: ['Desenvolvimento', 'Dados & Analytics', 'Produto', 'Infra / DevOps', 'UX/UI Design'],
      regioes: ['Todas', 'Sudeste', 'Sul', 'Nordeste', 'Norte', 'Centro-Oeste'],
      anos: ['2023', '2022', '2021'], // Anos solicitados
      salariosMedios: {
        'Estagiário(a)': { homens: 2800, mulheres: 2600 },
        'Júnior': { homens: 5500, mulheres: 4800 },
        'Pleno': { homens: 9800, mulheres: 8100 },
        'Sênior': { homens: 16500, mulheres: 13200 },
        'Liderança / Gestão': { homens: 24000, mulheres: 17500 }
      }
    },
    tabelaRaspada: [
      { cargo: 'Engenheira de Software Sênior', area: 'Desenvolvimento', homens: 16800, mulheres: 13400, gap: 20.24 },
      { cargo: 'Cientista de Dados Pleno', area: 'Dados & Analytics', homens: 10200, mulheres: 8700, gap: 14.71 },
      { cargo: 'Product Manager Sênior', area: 'Produto', homens: 17500, mulheres: 14900, gap: 14.86 },
      { cargo: 'DevOps Engineer Pleno', area: 'Infra / DevOps', homens: 11000, mulheres: 9100, gap: 17.27 },
      { cargo: 'UX/UI Designer Sênior', area: 'UX/UI Design', homens: 13500, mulheres: 12100, gap: 10.37 },
      { cargo: 'Desenvolvedora Frontend Jr', area: 'Desenvolvimento', homens: 5600, mulheres: 4900, gap: 12.50 },
      { cargo: 'Engenheira de Dados Sênior', area: 'Dados & Analytics', homens: 18000, mulheres: 14200, gap: 21.11 }
    ]
  };

  let charts = {};

  /* ------------------------------------------------------------------------
     1. SISTEMA DE NAVEGAÇÃO ENTRE ABAS
     ------------------------------------------------------------------------ */
  const steps = document.querySelectorAll('.step');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function switchTab(targetTabId) {
    steps.forEach(step => {
      if (step.getAttribute('data-tab') === targetTabId) {
        step.classList.add('active');
        step.setAttribute('aria-selected', 'true');
      } else {
        step.classList.remove('active');
        step.setAttribute('aria-selected', 'false');
      }
    });

    tabPanels.forEach(panel => {
      if (panel.id === targetTabId) {
        panel.hidden = false;
        panel.classList.add('active');
      } else {
        panel.hidden = true;
        panel.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  steps.forEach(step => {
    step.addEventListener('click', () => {
      switchTab(step.getAttribute('data-tab'));
    });
  });

  window.navigateToTab = function(tabId) {
    switchTab(tabId);
  };

  /* ------------------------------------------------------------------------
     2. PREENCHIMENTO DOS FILTROS E SELECTS
     ------------------------------------------------------------------------ */
  function populateSelects() {
    const optionsMap = {
      regiao: DATA_STORE.mercado.regioes,
      ano: ['Todos os Anos', ...DATA_STORE.mercado.anos],
      curso: ['Todos os Cursos', ...DATA_STORE.estudos.map(e => e.curso)],
      area: ['Todas as Áreas', ...DATA_STORE.mercado.areas],
      senioridade: ['Todas as Senioridades', ...DATA_STORE.mercado.senioridades]
    };

    document.querySelectorAll('select[data-options]').forEach(select => {
      const type = select.getAttribute('data-options');
      if (optionsMap[type]) {
        select.innerHTML = optionsMap[type].map(opt => `<option value="${opt}">${opt}</option>`).join('');
      }
    });

    // Selects da Calculadora
    const cSen = document.getElementById('c-senioridade');
    const cArea = document.getElementById('c-area');
    if (cSen) cSen.innerHTML = DATA_STORE.mercado.senioridades.map(s => `<option value="${s}">${s}</option>`).join('');
    if (cArea) cArea.innerHTML = DATA_STORE.mercado.areas.map(a => `<option value="${a}">${a}</option>`).join('');

    // Filtro da tabela de scraper
    const tblArea = document.getElementById('tbl-area');
    if (tblArea) tblArea.innerHTML = ['Todas as Áreas', ...DATA_STORE.mercado.areas].map(a => `<option value="${a}">${a}</option>`).join('');
  }

  /* ------------------------------------------------------------------------
     3. RENDERIZAÇÃO E ATUALIZAÇÃO DINÂMICA DOS GRÁFICOS
     ------------------------------------------------------------------------ */
  function initCharts() {
    // Aba Estudos
    const ctxDropout = document.getElementById('chart-dropout');
    if (ctxDropout) {
      charts.dropout = new Chart(ctxDropout, {
        type: 'doughnut',
        data: {
          labels: ['Homens (Evasão)', 'Mulheres (Evasão)'],
          datasets: [{ data: [28.5, 38.19], backgroundColor: ['#123B5D', '#E28B6A'] }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
      });
    }

    const ctxJourney = document.getElementById('chart-journey');
    if (ctxJourney) {
      charts.journey = new Chart(ctxJourney, {
        type: 'bar',
        data: {
          labels: ['Ingresso', 'Permanência', 'Conclusão'],
          datasets: [
            { label: 'Mulheres (%)', data: [17.02, 15.10, 14.55], backgroundColor: '#E28B6A' },
            { label: 'Homens (%)', data: [82.98, 84.90, 85.45], backgroundColor: '#123B5D' }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }
      });
    }

    const ctxInep = document.getElementById('chart-inep');
    if (ctxInep) {
      charts.inep = new Chart(ctxInep, {
        type: 'line',
        data: {
          labels: ['2021', '2022', '2023'],
          datasets: [
            { label: 'Referência INEP (%)', data: [12.3, 13.1, 13.8], borderColor: '#123B5D', tension: 0.3 },
            { label: 'Base Sintética (%)', data: [12.1, 13.0, 13.9], borderColor: '#88A382', borderDash: [5, 5], tension: 0.3 }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    // Aba Mercado
    const ctxScatter = document.getElementById('chart-scatter');
    if (ctxScatter) {
      charts.scatter = new Chart(ctxScatter, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Mulheres',
              data: [{ x: 1, y: 3500 }, { x: 2, y: 4800 }, { x: 4, y: 7500 }, { x: 6, y: 11000 }, { x: 8, y: 13500 }],
              backgroundColor: '#E28B6A'
            },
            {
              label: 'Homens',
              data: [{ x: 1, y: 4200 }, { x: 2, y: 5800 }, { x: 4, y: 9200 }, { x: 6, y: 13800 }, { x: 8, y: 17000 }],
              backgroundColor: '#123B5D'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: 'Anos de Experiência' } },
            y: { title: { display: true, text: 'Salário (R$)' } }
          }
        }
      });
    }

    const createSalaryChart = (canvasId) => {
      const ctx = document.getElementById(canvasId);
      if (!ctx) return null;
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: DATA_STORE.mercado.senioridades,
          datasets: [
            { label: 'Mulheres (R$)', data: [2600, 4800, 8100, 13200, 17500], backgroundColor: '#E28B6A' },
            { label: 'Homens (R$)', data: [2800, 5500, 9800, 16500, 24000], backgroundColor: '#123B5D' }
          ]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    };

    charts.marketSalary = createSalaryChart('chart-market-salary');
    charts.equitySalary = createSalaryChart('chart-equity-salary');

    // Aba Equidade
    const ctxRep = document.getElementById('chart-representation');
    if (ctxRep) {
      charts.representation = new Chart(ctxRep, {
        type: 'bar',
        data: {
          labels: DATA_STORE.mercado.senioridades,
          datasets: [
            { type: 'bar', label: 'Representatividade Fem. (%)', data: [35, 47, 28, 18, 6.6], backgroundColor: '#88A382', yAxisID: 'y' },
            { type: 'line', label: 'Gap Salarial (%)', data: [7.1, 12.7, 17.3, 20.0, 27.0], borderColor: '#E28B6A', tension: 0.3, yAxisID: 'y1' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true, position: 'left', title: { display: true, text: 'Representatividade (%)' } },
            y1: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Gap (%)' } }
          }
        }
      });
    }

    renderDumbbellChart();
  }

  function renderDumbbellChart(filteredList = DATA_STORE.estudos) {
    const container = document.getElementById('dumbbell');
    if (!container) return;

    if (filteredList.length === 0) {
      container.innerHTML = '<p class="text-muted small">Nenhum dado encontrado para este filtro.</p>';
      return;
    }

    container.innerHTML = filteredList.map(item => `
      <div class="mb-3">
        <div class="d-flex justify-content-between small mb-1">
          <strong>${item.curso}</strong>
          <span>Ingresso: ${item.ingressantes}% | Conclusão: ${item.concluintes}%</span>
        </div>
        <div class="position-relative bg-light rounded" style="height: 12px;">
          <div class="position-absolute bg-secondary rounded" style="top: 4px; height: 4px; left: ${item.concluintes}%; width: ${item.ingressantes - item.concluintes}%;"></div>
          <span class="position-absolute rounded-circle" style="top: 1px; left: ${item.concluintes}%; width: 10px; height: 10px; background: #88A382;" title="Concluintes: ${item.concluintes}%"></span>
          <span class="position-absolute rounded-circle" style="top: 1px; left: ${item.ingressantes}%; width: 10px; height: 10px; background: #123B5D;" title="Ingressantes: ${item.ingressantes}%"></span>
        </div>
      </div>
    `).join('');
  }

  /* ------------------------------------------------------------------------
     4. REGISTRO E LÓGICA DE EVENTOS DOS FILTROS
     ------------------------------------------------------------------------ */
  function applyFilters() {
    // Varição leve nos dados para simular atualização real com os filtros
    const generateFactor = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) hash += str.charCodeAt(i);
      return 0.85 + (hash % 30) / 100; // Gera um fator entre 0.85 e 1.15
    };

    // --- Filtros de Estudos ---
    const fCurso = document.getElementById('f-estudo-curso')?.value || 'Todos os Cursos';
    const fEstRegiao = document.getElementById('f-estudo-regiao')?.value || 'Todas';
    const fEstAno = document.getElementById('f-estudo-ano')?.value || 'Todos os Anos';

    const factorEst = generateFactor(fCurso + fEstRegiao + fEstAno);

    if (charts.dropout) {
      charts.dropout.data.datasets[0].data = [28.5 * factorEst, 38.19 * factorEst];
      charts.dropout.update();
    }

    if (charts.journey) {
      charts.journey.data.datasets[0].data = [17.02 * factorEst, 15.10 * factorEst, 14.55 * factorEst];
      charts.journey.data.datasets[1].data = [82.98, 84.90, 85.45];
      charts.journey.update();
    }

    const filteredDumbbell = fCurso === 'Todos os Cursos' 
      ? DATA_STORE.estudos 
      : DATA_STORE.estudos.filter(item => item.curso === fCurso);
    renderDumbbellChart(filteredDumbbell);

    // --- Filtros de Mercado ---
    const fMercArea = document.getElementById('f-mercado-area')?.value || 'Todas as Áreas';
    const fMercSen = document.getElementById('f-mercado-senioridade')?.value || 'Todas as Senioridades';
    const fMercReg = document.getElementById('f-mercado-regiao')?.value || 'Todas';
    const fMercAno = document.getElementById('f-mercado-ano')?.value || 'Todos os Anos';

    const factorMerc = generateFactor(fMercArea + fMercSen + fMercReg + fMercAno);

    if (charts.marketSalary) {
      charts.marketSalary.data.datasets[0].data = [2600, 4800, 8100, 13200, 17500].map(v => Math.round(v * factorMerc));
      charts.marketSalary.data.datasets[1].data = [2800, 5500, 9800, 16500, 24000].map(v => Math.round(v * factorMerc));
      charts.marketSalary.update();
    }

    if (charts.scatter) {
      charts.scatter.data.datasets[0].data = charts.scatter.data.datasets[0].data.map(p => ({ x: p.x, y: Math.round(p.y * factorMerc) }));
      charts.scatter.update();
    }

    // --- Filtros de Equidade ---
    const fEqArea = document.getElementById('f-equidade-area')?.value || 'Todas as Áreas';
    const fEqSen = document.getElementById('f-equidade-senioridade')?.value || 'Todas as Senioridades';
    const fEqReg = document.getElementById('f-equidade-regiao')?.value || 'Todas';
    const fEqAno = document.getElementById('f-equidade-ano')?.value || 'Todos os Anos';

    const factorEq = generateFactor(fEqArea + fEqSen + fEqReg + fEqAno);

    if (charts.equitySalary) {
      charts.equitySalary.data.datasets[0].data = [2600, 4800, 8100, 13200, 17500].map(v => Math.round(v * factorEq));
      charts.equitySalary.data.datasets[1].data = [2800, 5500, 9800, 16500, 24000].map(v => Math.round(v * factorEq));
      charts.equitySalary.update();
    }

    if (charts.representation) {
      charts.representation.data.datasets[0].data = [35, 47, 28, 18, 6.6].map(v => Number((v * factorEq).toFixed(1)));
      charts.representation.update();
    }
  }

  function bindFilterEvents() {
    const filterIds = [
      'f-estudo-curso', 'f-estudo-regiao', 'f-estudo-ano',
      'f-mercado-area', 'f-mercado-senioridade', 'f-mercado-regiao', 'f-mercado-ano',
      'f-equidade-area', 'f-equidade-senioridade', 'f-equidade-regiao', 'f-equidade-ano'
    ];

    filterIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', applyFilters);
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. SIMULADOR E CALCULADORA
     ------------------------------------------------------------------------ */
  const simRange = document.getElementById('sim-range');
  const simPct = document.getElementById('sim-pct');
  const simInvest = document.getElementById('sim-invest');
  const simImpact = document.getElementById('sim-impact');
  const simAdjust = document.getElementById('sim-adjust');

  function updateSimulator() {
    if (!simRange) return;
    const pct = parseInt(simRange.value, 10);
    simPct.textContent = `${pct}%`;

    const investBase = 1250000;
    const investTotal = (investBase * (pct / 100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const impactTotal = ((pct / 100) * 4.2).toFixed(2) + '%';
    const adjustments = Math.round((pct / 100) * 142);

    simInvest.textContent = investTotal;
    simImpact.textContent = impactTotal;
    simAdjust.textContent = `${adjustments} colaboradoras`;
  }

  if (simRange) simRange.addEventListener('input', updateSimulator);

  const calcForm = document.getElementById('calc-form');
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const salary = parseFloat(document.getElementById('c-salario').value);
      const sen = document.getElementById('c-senioridade').value;
      const ref = DATA_STORE.mercado.salariosMedios[sen] || { homens: 10000, mulheres: 8000 };

      const avgMen = ref.homens;
      const avgWomen = ref.mulheres;
      const avgMarket = (avgMen + avgWomen) / 2;

      const recAdjust = Math.max(0, avgMen - salary);
      const gapPct = (((avgMarket - salary) / avgMarket) * 100).toFixed(1);

      document.getElementById('r-ajuste').textContent = recAdjust.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      document.getElementById('r-gap').textContent = `${gapPct}%`;

      document.getElementById('v-user').textContent = salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      document.getElementById('v-women').textContent = avgWomen.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      document.getElementById('v-market').textContent = avgMarket.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      document.getElementById('v-men').textContent = avgMen.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const maxSal = Math.max(salary, avgMen, avgMarket) * 1.1;
      document.getElementById('b-user').style.width = `${(salary / maxSal) * 100}%`;
      document.getElementById('b-women').style.width = `${(avgWomen / maxSal) * 100}%`;
      document.getElementById('b-market').style.width = `${(avgMarket / maxSal) * 100}%`;
      document.getElementById('b-men').style.width = `${(avgMen / maxSal) * 100}%`;

      document.getElementById('calc-context').textContent = `Análise calculada com sucesso para o nível ${sen}!`;
    });
  }

  /* ------------------------------------------------------------------------
     6. TERMINAL DE SCRAPING
     ------------------------------------------------------------------------ */
  const tRun = document.getElementById('t-run');
  const tStatus = document.getElementById('t-status');
  const tMeta = document.getElementById('t-meta');
  const tLog = document.getElementById('t-log');
  const tblBody = document.getElementById('tbl-body');

  function renderTable(data = DATA_STORE.tabelaRaspada) {
    if (!tblBody) return;
    tblBody.innerHTML = data.map(row => `
      <tr>
        <td><strong>${row.cargo}</strong><br><small class="text-muted">${row.area}</small></td>
        <td class="text-end">${row.homens.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td class="text-end">${row.mulheres.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        <td class="text-end text-danger fw-bold">${row.gap.toFixed(2)}%</td>
      </tr>
    `).join('');
  }

  if (tRun) {
    tRun.addEventListener('click', () => {
      tStatus.textContent = 'Executando...';
      tStatus.className = 'badge-status bg-warning text-dark';
      tLog.textContent = '> POST /api/scrape-market-data HTTP/1.1\n> Conectando ao serviço de scraping...\n';

      setTimeout(() => {
        tLog.textContent += '> Raspando dados atualizados de portais de vagas...\n';
      }, 800);

      setTimeout(() => {
        tStatus.textContent = 'Sucesso (200 OK)';
        tStatus.className = 'badge-status bg-success text-white';
        tMeta.textContent = `Atualizado em: ${new Date().toLocaleTimeString('pt-BR')}`;
        tLog.textContent += '> [200 OK] 7 registros extraídos e processados.\n> Dados sincronizados com sucesso!';
        renderTable();
      }, 1800);
    });
  }

  const tblSearch = document.getElementById('tbl-search');
  const tblAreaSelect = document.getElementById('tbl-area');

  function filterTable() {
    const term = tblSearch ? tblSearch.value.toLowerCase() : '';
    const area = tblAreaSelect ? tblAreaSelect.value : 'Todas as Áreas';

    const filtered = DATA_STORE.tabelaRaspada.filter(item => {
      const matchTerm = item.cargo.toLowerCase().includes(term);
      const matchArea = area === 'Todas as Áreas' || item.area === area;
      return matchTerm && matchArea;
    });

    renderTable(filtered);
  }

  if (tblSearch) tblSearch.addEventListener('input', filterTable);
  if (tblAreaSelect) tblAreaSelect.addEventListener('change', filterTable);

  /* ------------------------------------------------------------------------
     7. BOTÕES DE NAVEGAÇÃO
     ------------------------------------------------------------------------ */
  function injectNavButtons() {
    const tabConfigs = [
      { id: 'tab-studies', prev: null, next: { id: 'tab-market', label: 'Avançar para Mercado de Trabalho →' } },
      { id: 'tab-market', prev: { id: 'tab-studies', label: '← Voltar para Estudos' }, next: { id: 'tab-equity', label: 'Avançar para Equidade Salarial →' } },
      { id: 'tab-equity', prev: { id: 'tab-market', label: '← Voltar para Mercado' }, next: { id: 'tab-calc', label: 'Avançar para Calculadora & Análise →' } },
      { id: 'tab-calc', prev: { id: 'tab-equity', label: '← Voltar para Equidade Salarial' }, next: null }
    ];

    tabConfigs.forEach(config => {
      const panel = document.getElementById(config.id);
      if (!panel) return;

      const navDiv = document.createElement('div');
      navDiv.className = 'd-flex justify-content-between align-items-center mt-4 pt-3 border-top';

      let prevBtnHtml = config.prev
        ? `<button type="button" class="btn btn-outline-secondary" onclick="navigateToTab('${config.prev.id}')">${config.prev.label}</button>`
        : '<div></div>';

      let nextBtnHtml = config.next
        ? `<button type="button" class="btn btn-navy" onclick="navigateToTab('${config.next.id}')">${config.next.label}</button>`
        : '<div></div>';

      navDiv.innerHTML = `${prevBtnHtml}${nextBtnHtml}`;
      panel.appendChild(navDiv);
    });
  }

  // --- INICIALIZAÇÃO ---
  populateSelects();
  initCharts();
  bindFilterEvents();
  updateSimulator();
  renderTable();
  injectNavButtons();
});