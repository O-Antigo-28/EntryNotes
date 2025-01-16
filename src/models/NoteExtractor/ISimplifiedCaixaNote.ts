export interface ISimplifiedCaixaNote{

    "Data da venda": string; // Data em formato string (ajustar para Date, se necessário)
    "Cód. de autorização": string; // Código de autorização
    "Produto": string; // Nome do produto
    "Parcelas": string; // Número de parcelas
    "Bandeira": string; // Bandeira do cartão
    "Canal": string; // Canal de venda
    "Valor original da venda": string; // Valor original da venda
    "Valor bruto": string; // Valor bruto da venda
    "Valor da taxa": string; // Valor da taxa cobrada
    "Valor líquido": string; // Valor líquido após taxas
    "Valor cancelado": string; // Valor cancelado, se aplicável
    "Status": string; // Status da venda
    "Número do terminal": string; // Número do terminal
    "Comprovante da venda": string; // Código ou identificador do comprovante
    "Cód. do pedido": string; // Código do pedido
    "Número do estabelecimento": string; // Número do estabelecimento
    "Nome do estabelecimento": string; // Nome do estabelecimento
    "Num cartão": string; // Número (ou parte) do cartão
    "Cód. Ref. Cartão": string; // Código de referência do cartão
  }
  