// ============================================
// DASHBOARD LOGÍSTICO - LÓGICA E FUNCIONALIDADES
// ============================================

// Estado global
let estadoFiltros = {
    regiao: '',
    transportadora: '',
    status: ''
};

let graficos = {
    chartTransportadora: null,
    chartRegiao: null,
    chartComparativo: null
};

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard iniciando...', dados);
    atualizarTimestamp();
    preencherOpcoesFiltros();
    atualizarDashboard();
    configurarEventosFiltros();
    configurarMenuLateral();
    setInterval(atualizarTimestamp, 1000);
});

// ============================================
// UTILITÁRIOS
// ============================================

function atualizarTimestamp() {
    const agora = new Date();
    const horario = agora.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('timestamp').textContent = horario;
}

function obterDadosFiltrados() {
    return dados.entregas.filter(entrega => {
        let atendeFiltro = true;

        if (estadoFiltros.regiao) {
            atendeFiltro = atendeFiltro && entrega.regiao === estadoFiltros.regiao;
        }

        if (estadoFiltros.transportadora) {
            atendeFiltro = atendeFiltro && entrega.transportadora === estadoFiltros.transportadora;
        }

        if (estadoFiltros.status) {
            atendeFiltro = atendeFiltro && entrega.status === estadoFiltros.status;
        }

        return atendeFiltro;
    });
}

// ============================================
// PREENCHIMENTO DOS FILTROS
// ============================================

function preencherOpcoesFiltros() {
    // Regiões únicas
    const regioes = [...new Set(dados.entregas.map(e => e.regiao))].sort();
    const selectRegiao = document.getElementById('filterRegion');
    regioes.forEach(regiao => {
        const option = document.createElement('option');
        option.value = regiao;
        option.textContent = '📍 ' + regiao;
        selectRegiao.appendChild(option);
    });

    // Transportadoras únicas
    const transportadoras = [...new Set(dados.entregas.map(e => e.transportadora))].sort();
    const selectTransportadora = document.getElementById('filterTransportadora');
    transportadoras.forEach(transportadora => {
        const option = document.createElement('option');
        option.value = transportadora;
        option.textContent = '🚛 ' + transportadora;
        selectTransportadora.appendChild(option);
    });
}

// ============================================
// CONFIGURAÇÃO DE EVENTOS DOS FILTROS
// ============================================

function configurarEventosFiltros() {
    document.getElementById('filterRegion').addEventListener('change', function(e) {
        estadoFiltros.regiao = e.target.value;
        atualizarDashboard();
    });

    document.getElementById('filterTransportadora').addEventListener('change', function(e) {
        estadoFiltros.transportadora = e.target.value;
        atualizarDashboard();
    });

    document.getElementById('filterStatus').addEventListener('change', function(e) {
        estadoFiltros.status = e.target.value;
        atualizarDashboard();
    });

    document.getElementById('resetFilters').addEventListener('click', function() {
        estadoFiltros = { regiao: '', transportadora: '', status: '' };
        document.getElementById('filterRegion').value = '';
        document.getElementById('filterTransportadora').value = '';
        document.getElementById('filterStatus').value = '';
        atualizarDashboard();
    });
}

// ============================================
// CONFIGURAÇÃO DO MENU LATERAL
// ============================================

function configurarMenuLateral() {
    const menuItems = document.querySelectorAll('nav a.menu-item');
    
    menuItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove classe active de todos os itens
            menuItems.forEach(m => m.classList.remove('active'));
            
            // Adiciona classe active ao item clicado
            this.classList.add('active');
            
            // Define o comportamento de cada menu
            const menuLabels = {
                0: 'Dashboard',
                1: 'Entregas',
                2: 'Transportadoras',
                3: 'Regiões',
                4: 'Configurações'
            };
            
            const label = menuLabels[index];
            const content = document.querySelector('.content');
            
            // Scroll suave para seções
            if (label === 'Dashboard') {
                const section = document.querySelector('.kpis-section');
                if (section && content) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (label === 'Entregas') {
                const section = document.querySelector('.critical-section');
                if (section && content) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (label === 'Transportadoras') {
                const section = document.querySelector('.analysis-section');
                if (section && content) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (label === 'Regiões') {
                const section = document.querySelector('.analysis-section');
                if (section && content) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else if (label === 'Configurações') {
                alert('⚙️ Configurações em breve!\n\nEm desenvolvimento para versão futura.');
                this.classList.remove('active');
            }
        });
    });
}

// ============================================
// CÁLCULO DE KPIs
// ============================================

function calcularKPIs(entregasFiltradas) {
    const allEntregas = entregasFiltradas;

    // Total de entregas
    const totalEntregas = allEntregas.length;

    // Entregas atrasadas
    const entregasAtrasadas = allEntregas.filter(e => e.diasAtraso > 0).length;

    // Taxa de atraso
    const taxaAtraso = totalEntregas > 0 ? ((entregasAtrasadas / totalEntregas) * 100).toFixed(1) : 0;

    // Dias acumulados de atraso
    const diasAcumulados = allEntregas.reduce((total, entrega) => total + entrega.diasAtraso, 0);

    // Maior atraso
    const maiorAtraso = allEntregas.length > 0 ? Math.max(...allEntregas.map(e => e.diasAtraso)) : 0;

    // Entregas no prazo
    const entregasNoPrazo = allEntregas.filter(e => e.diasAtraso === 0).length;

    return {
        totalEntregas,
        entregasAtrasadas,
        taxaAtraso,
        diasAcumulados,
        maiorAtraso,
        entregasNoPrazo
    };
}

// ============================================
// ATUALIZAR DASHBOARD
// ============================================

function atualizarDashboard() {
    const entregasFiltradas = obterDadosFiltrados();
    const kpis = calcularKPIs(entregasFiltradas);

    // Atualizar KPIs
    atualizarKPIs(kpis);

    // Atualizar gráficos
    atualizarGraficos(entregasFiltradas);

    // Atualizar tabela de entregas críticas
    atualizarTabelaCritica(entregasFiltradas);

    // Atualizar análise
    atualizarAnalise(entregasFiltradas);
}

// ============================================
// ATUALIZAR KPIs NA INTERFACE
// ============================================

function atualizarKPIs(kpis) {
    document.getElementById('totalEntregas').textContent = kpis.totalEntregas.toString();
    document.getElementById('entregasAtrasadas').textContent = kpis.entregasAtrasadas.toString();
    document.getElementById('taxaAtraso').textContent = kpis.taxaAtraso + '%';
    document.getElementById('diasAcumulados').textContent = kpis.diasAcumulados.toString();
    document.getElementById('maiorAtraso').textContent = kpis.maiorAtraso.toString();
    document.getElementById('entregasNoPrazo').textContent = kpis.entregasNoPrazo.toString();
}

// ============================================
// GRÁFICOS
// ============================================

function atualizarGraficos(entregasFiltradas) {
    atualizarGraficoTransportadora(entregasFiltradas);
    atualizarGraficoRegiao(entregasFiltradas);
    atualizarGraficoComparativo(entregasFiltradas);
}

function atualizarGraficoTransportadora(entregasFiltradas) {
    // Agrupar atrasos por transportadora
    const atrasosPorTransportadora = {};
    entregasFiltradas.forEach(entrega => {
        if (!atrasosPorTransportadora[entrega.transportadora]) {
            atrasosPorTransportadora[entrega.transportadora] = {
                total: 0,
                atrasadas: 0,
                diasAtraso: 0
            };
        }
        atrasosPorTransportadora[entrega.transportadora].total++;
        if (entrega.diasAtraso > 0) {
            atrasosPorTransportadora[entrega.transportadora].atrasadas++;
            atrasosPorTransportadora[entrega.transportadora].diasAtraso += entrega.diasAtraso;
        }
    });

    const labels = Object.keys(atrasosPorTransportadora);
    const dados_atrasadas = labels.map(t => atrasosPorTransportadora[t].atrasadas);
    const dados_dias = labels.map(t => atrasosPorTransportadora[t].diasAtraso);

    const ctx = document.getElementById('chartTransportadora').getContext('2d');

    if (graficos.chartTransportadora) {
        graficos.chartTransportadora.destroy();
    }

    graficos.chartTransportadora = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Entregas Atrasadas',
                    data: dados_atrasadas,
                    backgroundColor: 'rgba(220, 38, 38, 0.7)',
                    borderColor: 'rgba(220, 38, 38, 1)',
                    borderWidth: 1.5,
                    borderRadius: 6
                },
                {
                    label: 'Dias de Atraso',
                    data: dados_dias,
                    backgroundColor: 'rgba(234, 88, 12, 0.7)',
                    borderColor: 'rgba(234, 88, 12, 1)',
                    borderWidth: 1.5,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: { size: 11 }
                    }
                },
                x: {
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

function atualizarGraficoRegiao(entregasFiltradas) {
    // Agrupar atrasos por região
    const atrasosPorRegiao = {};
    entregasFiltradas.forEach(entrega => {
        if (!atrasosPorRegiao[entrega.regiao]) {
            atrasosPorRegiao[entrega.regiao] = {
                total: 0,
                atrasadas: 0,
                diasAtraso: 0
            };
        }
        atrasosPorRegiao[entrega.regiao].total++;
        if (entrega.diasAtraso > 0) {
            atrasosPorRegiao[entrega.regiao].atrasadas++;
            atrasosPorRegiao[entrega.regiao].diasAtraso += entrega.diasAtraso;
        }
    });

    const labels = Object.keys(atrasosPorRegiao).sort();
    const dados_atrasadas = labels.map(r => atrasosPorRegiao[r].atrasadas);
    const dados_dias = labels.map(r => atrasosPorRegiao[r].diasAtraso);

    const ctx = document.getElementById('chartRegiao').getContext('2d');

    if (graficos.chartRegiao) {
        graficos.chartRegiao.destroy();
    }

    graficos.chartRegiao = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Entregas Atrasadas',
                    data: dados_atrasadas,
                    backgroundColor: 'rgba(8, 145, 178, 0.7)',
                    borderColor: 'rgba(8, 145, 178, 1)',
                    borderWidth: 1.5,
                    borderRadius: 6
                },
                {
                    label: 'Dias de Atraso',
                    data: dados_dias,
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1.5,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: { size: 11 }
                    }
                },
                x: {
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

function atualizarGraficoComparativo(entregasFiltradas) {
    // Comparativo: Entregue vs Atrasada vs Em Trânsito vs Preparando
    const contarPorStatus = {};
    entregasFiltradas.forEach(entrega => {
        if (!contarPorStatus[entrega.status]) {
            contarPorStatus[entrega.status] = 0;
        }
        contarPorStatus[entrega.status]++;
    });

    const labels = ['✅ Entregue', '⏰ Atrasada', '🚛 Em Trânsito', '📦 Preparando'];
    const valores = [
        contarPorStatus['entregue'] || 0,
        contarPorStatus['atrasada'] || 0,
        contarPorStatus['em_transito'] || 0,
        contarPorStatus['preparando'] || 0
    ];

    const ctx = document.getElementById('chartComparativo').getContext('2d');

    if (graficos.chartComparativo) {
        graficos.chartComparativo.destroy();
    }

    graficos.chartComparativo = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    data: valores,
                    backgroundColor: [
                        'rgba(22, 163, 74, 0.8)',
                        'rgba(220, 38, 38, 0.8)',
                        'rgba(8, 145, 178, 0.8)',
                        'rgba(234, 88, 12, 0.8)'
                    ],
                    borderColor: [
                        'rgba(22, 163, 74, 1)',
                        'rgba(220, 38, 38, 1)',
                        'rgba(8, 145, 178, 1)',
                        'rgba(234, 88, 12, 1)'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15
                    }
                }
            }
        }
    });
}

// ============================================
// TABELA DE ENTREGAS CRÍTICAS
// ============================================

function atualizarTabelaCritica(entregasFiltradas) {
    // Filtrar apenas entregas atrasadas e ordenar por dias de atraso (descendente)
    const entregasCriticas = entregasFiltradas
        .filter(e => e.diasAtraso > 0)
        .sort((a, b) => b.diasAtraso - a.diasAtraso);

    const tbody = document.getElementById('criticalTableBody');
    tbody.innerHTML = '';

    if (entregasCriticas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #16a34a; font-weight: 600;">✅ Nenhuma entrega atrasada! Sistema em perfeito funcionamento.</td></tr>';
        return;
    }

    entregasCriticas.forEach(entrega => {
        const row = document.createElement('tr');

        const prioridade = entrega.diasAtraso > 7 ? 'crítica' : entrega.diasAtraso > 3 ? 'alta' : 'media';

        row.innerHTML = `
            <td><strong>${entrega.id}</strong></td>
            <td>${entrega.transportadora}</td>
            <td>${entrega.regiao}</td>
            <td><span class="prioridade-badge prioridade-${prioridade}">${entrega.diasAtraso}d</span></td>
            <td><span class="status-badge status-${entrega.status}">${entrega.status.replace('_', ' ')}</span></td>
            <td><span class="prioridade-badge prioridade-${prioridade}">${prioridade.toUpperCase()}</span></td>
        `;

        tbody.appendChild(row);
    });
}

// ============================================
// ANÁLISE AUTOMÁTICA
// ============================================

function atualizarAnalise(entregasFiltradas) {
    atualizarAnaliseTransportadora(entregasFiltradas);
    atualizarAnaliseRegiao(entregasFiltradas);
    atualizarAnaliseRecomendacoes(entregasFiltradas);
}

function atualizarAnaliseTransportadora(entregasFiltradas) {
    const atrasosPorTransportadora = {};
    entregasFiltradas.forEach(entrega => {
        if (!atrasosPorTransportadora[entrega.transportadora]) {
            atrasosPorTransportadora[entrega.transportadora] = {
                total: 0,
                atrasadas: 0,
                diasAtraso: 0,
                percentualAtraso: 0
            };
        }
        atrasosPorTransportadora[entrega.transportadora].total++;
        if (entrega.diasAtraso > 0) {
            atrasosPorTransportadora[entrega.transportadora].atrasadas++;
            atrasosPorTransportadora[entrega.transportadora].diasAtraso += entrega.diasAtraso;
        }
    });

    // Calcular percentuais
    Object.keys(atrasosPorTransportadora).forEach(t => {
        const dados = atrasosPorTransportadora[t];
        dados.percentualAtraso = dados.total > 0 ? ((dados.atrasadas / dados.total) * 100).toFixed(1) : 0;
    });

    // Ordenar por percentual de atraso
    const transportadoras = Object.entries(atrasosPorTransportadora)
        .sort((a, b) => parseFloat(b[1].percentualAtraso) - parseFloat(a[1].percentualAtraso));

    const container = document.getElementById('analysisTransportadora');
    container.innerHTML = '';

    transportadoras.forEach(([nome, dados], index) => {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        item.innerHTML = `
            <div class="analysis-item-title">
                ${index === 0 ? '🔴' : index === 1 ? '🟠' : '🟡'} ${nome}
            </div>
            <div class="analysis-item-value">
                <strong>${dados.percentualAtraso}%</strong> de atraso | 
                <span class="analysis-item-highlight">${dados.atrasadas}</span> entregas atrasadas de ${dados.total} | 
                <strong>${dados.diasAtraso}</strong> dias acumulados
            </div>
        `;
        container.appendChild(item);
    });
}

function atualizarAnaliseRegiao(entregasFiltradas) {
    const atrasosPorRegiao = {};
    entregasFiltradas.forEach(entrega => {
        if (!atrasosPorRegiao[entrega.regiao]) {
            atrasosPorRegiao[entrega.regiao] = {
                total: 0,
                atrasadas: 0,
                diasAtraso: 0,
                percentualAtraso: 0
            };
        }
        atrasosPorRegiao[entrega.regiao].total++;
        if (entrega.diasAtraso > 0) {
            atrasosPorRegiao[entrega.regiao].atrasadas++;
            atrasosPorRegiao[entrega.regiao].diasAtraso += entrega.diasAtraso;
        }
    });

    // Calcular percentuais
    Object.keys(atrasosPorRegiao).forEach(r => {
        const dados = atrasosPorRegiao[r];
        dados.percentualAtraso = dados.total > 0 ? ((dados.atrasadas / dados.total) * 100).toFixed(1) : 0;
    });

    // Ordenar por percentual de atraso
    const regioes = Object.entries(atrasosPorRegiao)
        .sort((a, b) => parseFloat(b[1].percentualAtraso) - parseFloat(a[1].percentualAtraso));

    const container = document.getElementById('analysisRegiao');
    container.innerHTML = '';

    regioes.forEach(([nome, dados], index) => {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        item.innerHTML = `
            <div class="analysis-item-title">
                ${index === 0 ? '🔴' : index === 1 ? '🟠' : '🟡'} ${nome}
            </div>
            <div class="analysis-item-value">
                <strong>${dados.percentualAtraso}%</strong> de atraso | 
                <span class="analysis-item-highlight">${dados.atrasadas}</span> entregas atrasadas de ${dados.total} | 
                <strong>${dados.diasAtraso}</strong> dias acumulados
            </div>
        `;
        container.appendChild(item);
    });
}

function atualizarAnaliseRecomendacoes(entregasFiltradas) {
    const container = document.getElementById('analysisRecomendacoes');
    container.innerHTML = '';

    // Calcular métricas
    const totalEntregas = entregasFiltradas.length;
    const entregasAtrasadas = entregasFiltradas.filter(e => e.diasAtraso > 0).length;
    const diasAcumulados = entregasFiltradas.reduce((total, e) => total + e.diasAtraso, 0);
    const maiorAtraso = totalEntregas > 0 ? Math.max(...entregasFiltradas.map(e => e.diasAtraso)) : 0;
    const taxaAtraso = totalEntregas > 0 ? (entregasAtrasadas / totalEntregas) * 100 : 0;

    const recomendacoes = [];

    // Análise e recomendações
    if (taxaAtraso > 10) {
        recomendacoes.push({
            tipo: 'crítica',
            texto: 'Taxa de atraso elevada (>10%). Recomenda-se reunião urgente com transportadoras.'
        });
    } else if (taxaAtraso > 5) {
        recomendacoes.push({
            tipo: 'alta',
            texto: 'Taxa de atraso acima da meta (>5%). Aumentar monitoramento de rotas.'
        });
    } else {
        recomendacoes.push({
            tipo: 'sucesso',
            texto: 'Taxa de atraso dentro da meta (<5%). Manter monitoramento contínuo.'
        });
    }

    if (maiorAtraso > 10) {
        recomendacoes.push({
            tipo: 'crítica',
            texto: 'Maior atraso registrado: ' + maiorAtraso + ' dias. Investigação urgente necessária.'
        });
    }

    if (entregasAtrasadas > 5) {
        recomendacoes.push({
            tipo: 'alta',
            texto: 'Múltiplas entregas atrasadas (' + entregasAtrasadas + '). Priorizar resoluções imediatas.'
        });
    }

    recomendacoes.push({
        tipo: 'info',
        texto: 'Total de entregas: ' + totalEntregas + ' | Dias acumulados de atraso: ' + diasAcumulados
    });

    recomendacoes.forEach(recom => {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        
        let emoji = '💡';
        if (recom.tipo === 'crítica') emoji = '🔴';
        else if (recom.tipo === 'alta') emoji = '🟠';
        else if (recom.tipo === 'sucesso') emoji = '✅';
        
        item.innerHTML = `
            <div class="analysis-item-value">
                ${emoji} ${recom.texto}
            </div>
        `;
        container.appendChild(item);
    });
}

// ============================================
// EXECUÇÃO INICIAL
// ============================================

console.log('Dashboard Logístico Carregado com Sucesso!');
