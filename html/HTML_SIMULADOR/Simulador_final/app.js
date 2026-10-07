/* ==========================================================================
   PEOPLE ANALYTICS - CALCULADORA E SIMULADOR DE EQUIPARAÇÃO SALARIAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Base de Dados do Mercado Tech
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

  // 3. LÓGICA DO SIMULADOR (PARAMETRIZADO CONFORME POWER BI / IMAGEM DE REFERÊNCIA)
  const simRange = document.getElementById('sim-range');

  function updateSimulator() {
    if (!simRange) return;

    const pct = parseInt(simRange.value, 10);

    // Atualizar badge percentual
    const simPct = document.getElementById('sim-pct');
    if (simPct) simPct.textContent = `${pct}%`;

    // Parâmetros exatos a 100% da base e dashboard:
    // Acréscimo Mensal Estimado a 100%: R$ 763.840,00 (763,84 Mil)
    // Aumento Estimado da Folha a 100%: 2,40%
    // Mulheres Alcançadas a 100%: 530 profissionais

    const baseInvest100 = 763840; // 763,84 Mil
    const baseFolha100 = 2.40;    // 2,40%
    const baseMulheres100 = 530;  // 530 profissionais

    const valorInvestCalculado = baseInvest100 * (pct / 100);
    const valorFolhaCalculado = (baseFolha100 * (pct / 100)).toFixed(2);
    const valorMulheresCalculado = Math.round(baseMulheres100 * (pct / 100));

    // Formatação em Milhares (ex: 763,84 Mil ou R$ no padrão monetário)
    const simInvest = document.getElementById('sim-invest');
    if (simInvest) {
      if (valorInvestCalculado >= 1000) {
        const emMil = (valorInvestCalculado / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        simInvest.textContent = `${emMil} Mil`;
      } else {
        simInvest.textContent = valorInvestCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
    }

    // Aumento Estimado da Folha
    const simImpact = document.getElementById('sim-impact');
    if (simImpact) {
      simImpact.textContent = `${valorFolhaCalculado.replace('.', ',')}%`;
    }

    // Mulheres Alcançadas
    const simAdjust = document.getElementById('sim-adjust');
    if (simAdjust) {
      simAdjust.textContent = `${valorMulheresCalculado}`;
    }
  }

  if (simRange) {
    simRange.addEventListener('input', updateSimulator);
    simRange.addEventListener('change', updateSimulator);
  }

  // Inicializar simulação na carga da página
  updateSimulator();
});