// const mongoose = require('mongoose');
const Aprazo = require('../models/Aprazo'); 

async function adicionarJurosVendasPendentes() {
    console.log('Iniciando adição de juros para vendas pendentes...');

    const jurosDiario = 0.007; // 0,7% de juros por dia
    const hoje = new Date();

    let ultimaDataProcessamento = new Date(); 
    const ultimoRegistro = await Aprazo.findOne().sort({ ultimaDataProcessamento: -1 });
    if (ultimoRegistro) {
        ultimaDataProcessamento = ultimoRegistro.ultimaDataProcessamento;
    }

    const vendasPendentes = await Aprazo.find({
        pagamento: 'pendente',
        dataVencimento: { $lt: hoje }
    });

    if (vendasPendentes.length === 0) {
        console.log('Não há vendas pendentes com data de vencimento atrasada.');
        return;
    }

    for (const venda of vendasPendentes) {
        const jurosJaAdicionados = venda.juros.some(juros => saoMesmoDia(juros.dataJurosAdicionado, hoje));
        if (jurosJaAdicionados) {
            console.log(`Juros já foram adicionados hoje à venda: ${venda.codigo_venda}.`);
            continue; 
        }

        const diasAtraso = Math.ceil((hoje - venda.dataVencimento) / (1000 * 60 * 60 * 24));

        if (diasAtraso > 0) { 
            const juros = venda.valorTotal * jurosDiario * diasAtraso;

            venda.juros.push({
                jurosAcumulados: juros,
                dataJurosAdicionado: hoje
            });

            venda.valorTotal += juros;
        }
    }

    ultimaDataProcessamento = hoje;

    await Promise.all(vendasPendentes.map(venda => venda.save()));

    console.log('Adição de juros para vendas pendentes concluída.');
}

function saoMesmoDia(data1, data2) {
    if (!data1 || !data2) {
        return false;
    }
    return data1.getFullYear() === data2.getFullYear() &&
        data1.getMonth() === data2.getMonth() &&
        data1.getDate() === data2.getDate();
}

module.exports = { adicionarJurosVendasPendentes };
