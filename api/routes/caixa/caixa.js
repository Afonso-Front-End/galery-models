
const express = require('express');
const router = express.Router();
const Caixa = require('../../models/Caixa');
const HistoricoCaixa = require('../../models/HistoricoCaixa');
const Users = require('../../models/Users');
const isCaixaAberto = require('../caixa/isCaixaAberto');

router.post('/abrir-caixa', async (req, res) => {
  const { operador, saldoInicial } = req.body;
  // console.log(operador, saldoInicial)
  if (!operador || saldoInicial == null) {
    return res.status(400).json({ error: 'Operador e saldo inicial são obrigatórios' });
  }

  const { userId, username, usercpf, role } = operador;

  if (!userId || !username || usercpf == null || !role) {
    return res.status(400).json({ error: 'Dados do operador são inválidos' });
  }
  console.log(userId, username, usercpf, role)
  try {
    // Verifica se o operador existe na tabela Users
    const user = await Users.findOne({ username, usercpf, role });
    if (!user) {
      return res.status(404).json({ error: 'Operador não encontrado' });
    }

    if (!saldoInicial) {
      return res.status(404).json({ error: 'Digite o saldo inicial' });
    }

    const novoCaixa = new Caixa({
      operador: { userId, username, usercpf, role },
      saldoInicial
    });

    await novoCaixa.save();

    res.status(200).json({ message: 'Caixa aberto com sucesso', caixa: novoCaixa });
  } catch (error) {
    console.error('Erro ao abrir o caixa:', error);
    res.status(500).json({ error: 'Erro ao abrir o caixa' });
  }
});

router.post('/fechar-caixa', async (req, res) => {
  const { operador, saldoFinal } = req.body;

  const { userId, username, usercpf, role } = operador;

  if (!userId || !username || usercpf == null || !role) {
    return res.status(400).json({ error: 'Dados do operador são inválidos' });
  }

  if (!operador || saldoFinal == null) {
    return res.status(400).json({ error: 'Operador e saldo final são obrigatórios' });
  }

  try {
    // Verifica se o operador existe na tabela Users
    const user = await Users.findOne({ username, usercpf, role });
    if (!user) {
      return res.status(404).json({ error: 'Operador não encontrado' });
    }

    const caixa = await Caixa.findOne({ 'operador.username': username, 'operador.usercpf': usercpf, 'operador.role': role, aberto: true });
    if (!caixa) {
      return res.status(404).json({ error: 'Caixa não encontrado ou já fechado' });
    }

    const totalVendas = caixa.totalVendas;

    // Cria um registro no histórico do caixa com os itens do caixa atual
    const resultadoFinal = parseFloat(saldoFinal) - parseFloat(totalVendas)

    const historicoItems = caixa.items.map(item => ({
      codigo_venda: item.codigo_venda, // Adicione o código da venda se aplicável
      items: item.items.map(subItem => ({
        product_code: subItem.product_code,
        product_name: subItem.product_name,
        product_price: subItem.product_price,
        quantidade: subItem.quantidade,
        valor_total: subItem.valor_total,
        pagamentos: subItem.pagamentos,
        troco: subItem.troco
      })),
      pagamentos: item.pagamentos, // Adicione os pagamentos associados à venda
      troco: item.troco
    }));

    const historicoCaixa = new HistoricoCaixa({
      items: historicoItems, // Adiciona os itens do caixa atual ao histórico
      operador: caixa.operador,
      saldoInicial: caixa.saldoInicial,
      saldoFinal: saldoFinal,
      totalVendas: totalVendas,
      resultadoFinal: resultadoFinal,
      dataAbertura: caixa.dataAbertura,
      dataFechamento: new Date(),
    });

    await historicoCaixa.save();

    // Limpa o registro do caixa atual
    await Caixa.deleteOne({ _id: caixa._id });

    res.status(200).json({ message: 'Caixa fechado com sucesso', historicoCaixa });
  } catch (error) {
    console.error('Erro ao fechar o caixa:', error);
    res.status(500).json({ error: 'Erro ao fechar o caixa' });
  }
});

router.post('/verificar-caixa-aberto', isCaixaAberto, (req, res) => {
  res.status(200).json({ message: 'Caixa está aberto.', caixa: req.caixa });
});

module.exports = router;

