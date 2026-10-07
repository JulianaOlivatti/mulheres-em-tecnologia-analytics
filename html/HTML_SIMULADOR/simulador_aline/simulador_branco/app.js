/* ==========================================================================
   PEOPLE ANALYTICS - CALCULADORA E SIMULADOR DE EQUIPARAÇÃO SALARIAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Base de Dados Sintética
  const DATA_STORE = {
    senioridades: ['Estagiário(a)', 'Júnior', 'Pleno', 'Sênior', 'Liderança / Gestão'],
    areas: ['Desenvolvimento', 'Dados & Analytics', 'Produto', 'Infra / DevOps', 'UX/UI Design'],
    salariosMedios: {
      'Estagiário(a)': { homens: 2800, mulheres: 2600 },
      'Júnior': { homens: 5500, mulheres: 4800 },
      'Pleno': { homens: 9800, mulheres: 8100 },
      'Sênior': { homens: 16500, mulheres: 13200 },
      'Liderança / Gestão': { homens: 24000, mulheres: 17500 }
    }
  };

  // 1. POPULAR FILTROS DA CALCULADORA
  const cSen = document.getElementById('c-senioridade');
  const cArea = document.getElementById('c-area');

  if (cSen) {
    cSen.innerHTML = DATA_STORE.senioridades.map(s => `<option value="${s}">${s}</option>`).join('');
  }
  if (cArea) {
    cArea.innerHTML = DATA_STORE.areas.map(a => `<option value="${a}">${a}</option>`).join('');
  }

  // 2. LÓGICA DA CALCULADORA SALARIAL
  const calcForm = document.getElementById('calc-form');
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const salary = parseFloat(document.getElementById('c-salario').value) || 0;
      const sen = document.getElementById('c-senioridade').value;
      const ref = DATA_STORE.salariosMedios[sen] || { homens: 10000, mulheres: 8000 };

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
      document.getElementById('b-user').style.width = `${Math.min(100, (salary / maxSal) * 100)}%`;
      document.getElementById('b-women').style.width = `${Math.min(100, (avgWomen / maxSal) * 100)}%`;
      document.getElementById('b-market').style.width = `${Math.min(100, (avgMarket / maxSal) * 100)}%`;
      document.getElementById('b-men').style.width = `${Math.min(100, (avgMen / maxSal) * 100)}%`;

      document.getElementById('calc-context').textContent = `Análise calculada com sucesso para o nível ${sen}!`;
    });
  }

  // 3. LÓGICA DO SIMULADOR (SLICER SEM MUDANÇA DE COR DE FUNDO)
  const simRange = document.getElementById('sim-range');

  function updateSimulator() {
    if (!simRange) return;

    const pct = parseInt(simRange.value, 10);

    // Atualizar badge percentual
    const simPct = document.getElementById('sim-pct');
    if (simPct) simPct.textContent = `${pct}%`;

    // Recalcular Acréscimo Mensal Estimado
    const baseInvest = 625000;
    const valorCalculado = baseInvest * (pct / 100);
    const simInvest = document.getElementById('sim-invest');
    if (simInvest) {
      simInvest.textContent = valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) + ' / mês';
    }

    // Recalcular Aumento Estimado da Folha (%)
    const simImpact = document.getElementById('sim-impact');
    if (simImpact) {
      simImpact.textContent = '+' + ((pct / 100) * 4.2).toFixed(2) + '%';
    }

    // Recalcular Mulheres Alcançadas
    const simAdjust = document.getElementById('sim-adjust');
    if (simAdjust) {
      const mulh = Math.round((pct / 100) * 142);
      simAdjust.textContent = `${mulh} profissionais`;
    }
  }

  if (simRange) {
    simRange.addEventListener('input', updateSimulator);
    simRange.addEventListener('change', updateSimulator);
  }

  // Inicializar valores do simulador na primeira carga
  updateSimulator();
});