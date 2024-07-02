import React, { useState } from 'react';
import supabase from './supabaseClient';
import './App.css';

function App() {
  const [resultados, setResultados] = useState([]);
  const [valorInicial, setValorInicial] = useState(0);
  const [dataInicio, setDataInicio] = useState('');
  const [dataTermino, setDataTermino] = useState('');
  const [indices, setIndices] = useState({ ipca: false, poupanca: false });
  const [feriasDatas, setFeriasDatas] = useState(['']);
  const [error, setError] = useState(null);
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const fetchIndexData = async (indice) => {
    const { data, error } = await supabase
      .from(indice)
      .select("ano, mes, valor");

    if (error) {
      console.error(`Erro ao buscar dados do índice ${indice}:`, error);
      setError(`Erro ao buscar os dados do índice ${indice}.`);
      return {};
    }

    const formattedData = {};
    data.forEach(item => {
      formattedData[item.ano] = formattedData[item.ano] || {};
      formattedData[item.ano][item.mes] = item.valor;
    });
    return formattedData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Input validation
      if (!dataInicio || !dataTermino || (!indices.ipca && !indices.poupanca)) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
      
      if (new Date(dataInicio) >= new Date(dataTermino)) {
        setError("A data de início deve ser anterior à data de término.");
        return;
      }

      const indexData = {};
      if (indices.ipca) indexData.ipca = await fetchIndexData('ipca');
      if (indices.poupanca) indexData.poupanca = await fetchIndexData('poupanca');

      let saldo = parseFloat(valorInicial);
      let dataAtual = new Date(dataInicio);
      const dataFim = new Date(dataTermino);
      const resultadosTemp = [];
      let saldoTemp = 0;

      while (dataAtual <= dataFim) {

        saldoTemp = saldo;
        const ano = dataAtual.getFullYear();
        const mes = meses[dataAtual.getMonth()];

        const acrescimoPercentualIpca = indexData.ipca?.[ano]?.[mes] || 0;
        const acrescimoPercentualPoupanca = indexData.poupanca?.[ano]?.[mes] || 0;

        const acrescimoIpca = saldo * (acrescimoPercentualIpca / 100);
        const acrescimoPoupanca = saldo * (acrescimoPercentualPoupanca / 100);
        saldo += acrescimoIpca + acrescimoPoupanca;

        const isFerias = feriasDatas.some(date => new Date(date).getTime() === dataAtual.getTime());
        const ferias = isFerias ? saldo / 3 : 0;
        saldo += ferias;

        

        resultadosTemp.push({
          mes: `${mes}/${ano}`,
          saldoInicial: parseFloat(saldoTemp.toFixed(2)),
          acrescimoPercentualIpca,
          acrescimoValorIpca: parseFloat(acrescimoIpca.toFixed(2)),
          acrescimoPercentualPoupanca,
          acrescimoValorPoupanca: parseFloat(acrescimoPoupanca.toFixed(2)),
          saldoFinal: parseFloat(saldo.toFixed(2)),
          ferias: parseFloat(ferias.toFixed(2)),
        });

        dataAtual.setMonth(dataAtual.getMonth() + 1);
      }
      setResultados(resultadosTemp);
    } catch (error) {
      console.error("Erro ao calcular valores:", error);
      setError("Ocorreu um erro ao calcular os valores.");
    }
  };

  const addFeriasDate = () => {
    setFeriasDatas([...feriasDatas, '']);
  };

  const handleFeriasDateChange = (index, value) => {
    const newFeriasDatas = [...feriasDatas];
    newFeriasDatas[index] = value;
    setFeriasDatas(newFeriasDatas);
  };

  const removeFeriasDate = (index) => {
    const newFeriasDatas = feriasDatas.filter((_, i) => i !== index);
    setFeriasDatas(newFeriasDatas);
  };

  return (
    <div className="App">
      <h1>Calculadora de Custos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Valor Inicial (R$):
          <input type="number" name="valorInicial" value={valorInicial} onChange={(e) => setValorInicial(parseFloat(e.target.value))} required />
        </label>
        <label>
          Data de Início:
          <input type="date" name="dataInicio" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} required />
        </label>
        <label>
          Data de Término:
          <input type="date" name="dataTermino" value={dataTermino} onChange={(e) => setDataTermino(e.target.value)} required />
        </label>
        <label>
          Índices:
          <label>
            <input type="checkbox" name="ipca" checked={indices.ipca} onChange={(e) => setIndices({ ...indices, ipca: e.target.checked })} />
            IPCA
          </label>
          <label>
            <input type="checkbox" name="poupanca" checked={indices.poupanca} onChange={(e) => setIndices({ ...indices, poupanca: e.target.checked })} />
            Poupança
          </label>
        </label>
        <label>
          Férias:
          {feriasDatas.map((data, index) => (
            <div key={index}>
              <input
                type="date"
                value={data}
                onChange={(e) => handleFeriasDateChange(index, e.target.value)}
              />
              {index > 0 && <button type="button" onClick={() => removeFeriasDate(index)}>Remover</button>}
            </div>
          ))}
          <button type="button" onClick={addFeriasDate}>+</button>
        </label>
        <button type="submit">Calcular</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <h2>Resultados</h2>
      {resultados.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Mês/Ano</th>
              <th>Saldo Inicial</th>
              <th>Acréscimo IPCA (%)</th>
              <th>Acréscimo IPCA (R$)</th>
              <th>Acréscimo Poupança (%)</th>
              <th>Acréscimo Poupança (R$)</th>
              <th>Saldo Final</th>
              <th>Férias (R$)</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((resultado, index) => (
              <tr key={index}>
                <td>{resultado.mes}</td>
                <td>{resultado.saldoInicial}</td>
                <td>{resultado.acrescimoPercentualIpca}</td>
                <td>{resultado.acrescimoValorIpca}</td>
                <td>{resultado.acrescimoPercentualPoupanca}</td>
                <td>{resultado.acrescimoValorPoupanca}</td>
                <td>{resultado.saldoFinal}</td>
                <td>{resultado.ferias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {resultados.length > 0 && (
        <div className="total-saldo">
          <h3>Total Final: R$ {resultados[resultados.length - 1].saldoFinal}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
