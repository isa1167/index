// Dados de exemplo realistas de monitoramento logístico
const dados = {
    entregas: [
        // Entregas Atrasadas - Alta Prioridade
        {
            id: 'PED-001',
            cliente: 'Cliente Premium A',
            transportadora: 'Express Logística',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 10),
            dataEntrega: new Date(2024, 4, 18),
            diasAtraso: 8,
            status: 'atrasada',
            valor: 2500.00,
            prioridade: 'crítica'
        },
        {
            id: 'PED-002',
            cliente: 'Varejo XYZ',
            transportadora: 'RápidoShip',
            regiao: 'Sul',
            dataPrevista: new Date(2024, 4, 12),
            dataEntrega: new Date(2024, 4, 22),
            diasAtraso: 10,
            status: 'atrasada',
            valor: 4200.00,
            prioridade: 'crítica'
        },
        {
            id: 'PED-003',
            cliente: 'Distribuidor Central',
            transportadora: 'LogísticaBr',
            regiao: 'Nordeste',
            dataPrevista: new Date(2024, 4, 11),
            dataEntrega: new Date(2024, 4, 20),
            diasAtraso: 9,
            status: 'atrasada',
            valor: 3100.00,
            prioridade: 'crítica'
        },
        {
            id: 'PED-004',
            cliente: 'Loja Online',
            transportadora: 'TransFast',
            regiao: 'Centro-Oeste',
            dataPrevista: new Date(2024, 4, 13),
            dataEntrega: new Date(2024, 4, 19),
            diasAtraso: 6,
            status: 'atrasada',
            valor: 1800.00,
            prioridade: 'alta'
        },
        {
            id: 'PED-005',
            cliente: 'Supermercado Beta',
            transportadora: 'Express Logística',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 14),
            dataEntrega: new Date(2024, 4, 19),
            diasAtraso: 5,
            status: 'atrasada',
            valor: 3500.00,
            prioridade: 'alta'
        },
        {
            id: 'PED-006',
            cliente: 'Industria Tech',
            transportadora: 'LogísticaBr',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 9),
            dataEntrega: new Date(2024, 4, 17),
            diasAtraso: 8,
            status: 'atrasada',
            valor: 5800.00,
            prioridade: 'crítica'
        },
        {
            id: 'PED-007',
            cliente: 'Loja Física',
            transportadora: 'RápidoShip',
            regiao: 'Norte',
            dataPrevista: new Date(2024, 4, 15),
            dataEntrega: new Date(2024, 4, 21),
            diasAtraso: 6,
            status: 'atrasada',
            valor: 2200.00,
            prioridade: 'alta'
        },
        {
            id: 'PED-008',
            cliente: 'Varejo Online',
            transportadora: 'TransFast',
            regiao: 'Sul',
            dataPrevista: new Date(2024, 4, 10),
            dataEntrega: new Date(2024, 4, 16),
            diasAtraso: 6,
            status: 'atrasada',
            valor: 1500.00,
            prioridade: 'alta'
        },

        // Entregas No Prazo
        {
            id: 'PED-009',
            cliente: 'Cliente A',
            transportadora: 'Express Logística',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 16),
            dataEntrega: new Date(2024, 4, 16),
            diasAtraso: 0,
            status: 'entregue',
            valor: 1200.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-010',
            cliente: 'Cliente B',
            transportadora: 'LogísticaBr',
            regiao: 'Nordeste',
            dataPrevista: new Date(2024, 4, 17),
            dataEntrega: new Date(2024, 4, 17),
            diasAtraso: 0,
            status: 'entregue',
            valor: 800.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-011',
            cliente: 'Cliente C',
            transportadora: 'RápidoShip',
            regiao: 'Sul',
            dataPrevista: new Date(2024, 4, 15),
            dataEntrega: new Date(2024, 4, 15),
            diasAtraso: 0,
            status: 'entregue',
            valor: 950.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-012',
            cliente: 'Cliente D',
            transportadora: 'TransFast',
            regiao: 'Centro-Oeste',
            dataPrevista: new Date(2024, 4, 18),
            dataEntrega: new Date(2024, 4, 18),
            diasAtraso: 0,
            status: 'entregue',
            valor: 1100.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-013',
            cliente: 'Cliente E',
            transportadora: 'Express Logística',
            regiao: 'Norte',
            dataPrevista: new Date(2024, 4, 14),
            dataEntrega: new Date(2024, 4, 14),
            diasAtraso: 0,
            status: 'entregue',
            valor: 2100.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-014',
            cliente: 'Cliente F',
            transportadora: 'LogísticaBr',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 19),
            dataEntrega: new Date(2024, 4, 19),
            diasAtraso: 0,
            status: 'entregue',
            valor: 1350.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-015',
            cliente: 'Cliente G',
            transportadora: 'RápidoShip',
            regiao: 'Nordeste',
            dataPrevista: new Date(2024, 4, 13),
            dataEntrega: new Date(2024, 4, 13),
            diasAtraso: 0,
            status: 'entregue',
            valor: 680.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-016',
            cliente: 'Cliente H',
            transportadora: 'TransFast',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 20),
            dataEntrega: new Date(2024, 4, 20),
            diasAtraso: 0,
            status: 'entregue',
            valor: 2300.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-017',
            cliente: 'Cliente I',
            transportadora: 'Express Logística',
            regiao: 'Sul',
            dataPrevista: new Date(2024, 4, 21),
            dataEntrega: new Date(2024, 4, 21),
            diasAtraso: 0,
            status: 'entregue',
            valor: 1700.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-018',
            cliente: 'Cliente J',
            transportadora: 'LogísticaBr',
            regiao: 'Centro-Oeste',
            dataPrevista: new Date(2024, 4, 18),
            dataEntrega: new Date(2024, 4, 18),
            diasAtraso: 0,
            status: 'entregue',
            valor: 920.00,
            prioridade: 'normal'
        },

        // Entregas em Trânsito
        {
            id: 'PED-019',
            cliente: 'Cliente K',
            transportadora: 'Express Logística',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 22),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'em_transito',
            valor: 1450.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-020',
            cliente: 'Cliente L',
            transportadora: 'RápidoShip',
            regiao: 'Norte',
            dataPrevista: new Date(2024, 4, 23),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'em_transito',
            valor: 2800.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-021',
            cliente: 'Cliente M',
            transportadora: 'LogísticaBr',
            regiao: 'Nordeste',
            dataPrevista: new Date(2024, 4, 24),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'em_transito',
            valor: 1600.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-022',
            cliente: 'Cliente N',
            transportadora: 'TransFast',
            regiao: 'Sul',
            dataPrevista: new Date(2024, 4, 20),
            dataEntrega: null,
            diasAtraso: 1,
            status: 'em_transito',
            valor: 3200.00,
            prioridade: 'media'
        },

        // Entregas em preparação
        {
            id: 'PED-023',
            cliente: 'Cliente O',
            transportadora: 'Express Logística',
            regiao: 'Centro-Oeste',
            dataPrevista: new Date(2024, 4, 25),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'preparando',
            valor: 980.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-024',
            cliente: 'Cliente P',
            transportadora: 'LogísticaBr',
            regiao: 'Sudeste',
            dataPrevista: new Date(2024, 4, 26),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'preparando',
            valor: 1550.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-025',
            cliente: 'Cliente Q',
            transportadora: 'RápidoShip',
            regiao: 'Sul',
            dataPrevista: new Date(2024, 4, 27),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'preparando',
            valor: 2450.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-026',
            cliente: 'Cliente R',
            transportadora: 'TransFast',
            regiao: 'Nordeste',
            dataPrevista: new Date(2024, 4, 28),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'preparando',
            valor: 1800.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-027',
            cliente: 'Cliente S',
            transportadora: 'Express Logística',
            regiao: 'Norte',
            dataPrevista: new Date(2024, 4, 25),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'preparando',
            valor: 2100.00,
            prioridade: 'normal'
        },
        {
            id: 'PED-028',
            cliente: 'Cliente T',
            transportadora: 'LogísticaBr',
            regiao: 'Centro-Oeste',
            dataPrevista: new Date(2024, 4, 29),
            dataEntrega: null,
            diasAtraso: 0,
            status: 'preparando',
            valor: 1300.00,
            prioridade: 'normal'
        },
    ],

    transportadoras: [
        { nome: 'Express Logística', codigo: 'EXP' },
        { nome: 'RápidoShip', codigo: 'RPS' },
        { nome: 'LogísticaBr', codigo: 'LOG' },
        { nome: 'TransFast', codigo: 'TRF' }
    ],

    regioes: [
        'Sudeste',
        'Sul',
        'Nordeste',
        'Centro-Oeste',
        'Norte'
    ]
};

// Exportar dados para uso global
window.dados = dados;
