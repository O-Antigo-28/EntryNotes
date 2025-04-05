export interface IPixNote{
    "Data da venda": string; // Data em formato string (ajustar para Date, se necessário)
    "Cód. de autorização": string; // Código de autorização da venda
    "Valor bruto": string; // Valor bruto da venda
    "Terminal": string; // Número do terminal onde a venda foi realizada
    "Número do estabelecimento": string; // Número do estabelecimento que realizou a venda
    "Status": string; // Status da venda (aprovada, cancelada, etc.)
}