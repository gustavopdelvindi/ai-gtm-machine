const fs = require("fs");
// uso: node filtrar-e-juntar.js <pasta com comments.json e reactions.json (opcional)> <pasta signals com engajamento.csv, bruto.csv e clientes-concorrente.csv>
const [S, SIG] = process.argv.slice(2);
const NOW = new Date("2026-10-12");

// ---------- CSV helpers ----------
function parseCSV(txt) {
  txt = txt.replace(/^﻿/, "").replace(/\r/g, "");
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (q) { if (c === '"') { if (txt[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  const h = rows.shift();
  return rows.filter(r => r.length > 1).map(r => Object.fromEntries(h.map((k, i) => [k, r[i] || ""])));
}
const q = v => { v = v == null ? "" : String(v).replace(/\n/g, " "); return /[",]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
const toCSV = (cols, rows) => "﻿" + cols.join(",") + "\n" + rows.map(r => cols.map(c => q(r[c])).join(",")).join("\n") + "\n";

// ---------- PASSO 4: filtro de pessoa sobre engajamento ----------
const eng = parseCSV(fs.readFileSync(SIG + "/engajamento.csv", "utf8"));
const COMPETIDOR = /pagbrasil|cloudwalk|infinitepay|\bokto\b|cielo|\bstone\b|pagar\.?me|asaas|iugu|mercado ?pago|pagseguro|pagbank|getnet|\brede\b|juspay|belvo|adyen|stripe|recargapay|pagou/i;
const P03 = /\b(ceo|cfo|coo|cto|cmo|chief|founder|co-?founder|fundador|fundadora|s[óo]cio|(?<!product )(?<!product-)owner|presidente|propriet[áa]ri)/i;
const P04 = /\b(diretor|diretora|director|vp|vice|head|gerente|manager|superintendente|gm)\b/i;
const P02 = /pagament|payment|financ|fintech|e-?commerce|checkout|assinatur|subscription|cobran|\bpix\b|cr[ée]dito|credit|growth/i;

const pessoas = new Map();
for (const r of eng) {
  const id = (r.nome||"").toLowerCase().trim() + "|" + (r.cargo||"").toLowerCase().slice(0,25);
  if (!id) continue;
  const p = pessoas.get(id) || { nome: r.nome, cargo: r.cargo, linkedin_url: r.linkedin_url, linkedin_identifier: r.linkedin_identifier, origens: new Set(), tipos: new Set() };
  p.origens.add(r.origem + " (" + r.tipo + ")"); p.tipos.add(r.tipo);
  if (!p.cargo && r.cargo) p.cargo = r.cargo;
  pessoas.set(id, p);
}
const pessoasLista = [...pessoas.values()];
const reprov = {};
const conta = (k) => (reprov[k] = (reprov[k] || 0) + 1);
const passam = [];
for (const p of pessoasLista) {
  const cargo = p.cargo || "";
  if (/followers/i.test(cargo)) { // página de empresa, não pessoa
    p.tipo = "empresa";
    p.motivo = "página de empresa que comentou; critérios de empresa não verificados (sem CNPJ ou site)";
    passam.push(p); continue;
  }
  const dp01 = COMPETIDOR.test(cargo);
  const p03 = P03.test(cargo), p04 = P04.test(cargo), p02 = P02.test(cargo);
  if (dp01) { conta("DP01 trabalha em concorrente"); continue; }
  if (!(p03 || (p04 && p02))) { conta(cargo.trim().length < 4 ? "sem cargo legível" : "P01/P03 cargo fora da lista-alvo"); continue; }
  p.tipo = "pessoa";
  p.motivo = "passa: " + [p03 ? "P03 (C-level, sócio ou fundador)" : "", p04 && p02 ? "P01 (cargo de gestão + tema pagamentos/financeiro/e-commerce)" : "", "DP01 não (cargo sem concorrente)"].filter(Boolean).join("; ") +
    " | não verificado: P11, P12, P13, P14, P15, DP02, DP03 e todos os critérios de empresa";
  passam.push(p);
}
const listaInf = passam.map(p => ({
  origem: [...p.origens].map(o => "influenciador:" + o.replace("influenciador:", "")).join("; "),
  tipo: p.tipo, nome: p.nome, cargo: p.cargo, linkedin_url: p.linkedin_url,
  linkedin_identifier: p.linkedin_identifier, site: "", motivo: p.motivo
}));
fs.writeFileSync(SIG + "/lista-influenciador.csv", toCSV(["origem", "tipo", "nome", "cargo", "linkedin_url", "linkedin_identifier", "site", "motivo"], listaInf));
const stat4 = { linhas: eng.length, pessoasUnicas: pessoasLista.length, passam: passam.length, reprov };

// ---------- JUNÇÃO ----------
const bruto = parseCSV(fs.readFileSync(SIG + "/bruto.csv", "utf8"));
const clientes = parseCSV(fs.readFileSync(SIG + "/clientes-concorrente.csv", "utf8"));
const base = [];
for (const b of bruto) base.push({ origem: b.origem, tipo: "empresa", nome: b.razao_social, cnpj: b.cnpj, site: "", linkedin_identifier: "", linkedin_url: "", cargo: "", uf: b.uf, situacao_cadastral: b.situacao_cadastral, porte: b.porte, mei: b.mei, data_abertura: b.data_abertura, cnae_principal_codigo: b.cnae_principal_codigo, url_case: "" });
for (const c of clientes) base.push({ origem: "cliente de concorrente: " + c.origem, tipo: "empresa", nome: c.empresa, cnpj: "", site: c.site, linkedin_identifier: "", linkedin_url: "", cargo: "", uf: "", situacao_cadastral: "", porte: "", mei: "", data_abertura: "", cnae_principal_codigo: "", url_case: c.url_case });
for (const l of listaInf) base.push({ origem: l.origem, tipo: l.tipo, nome: l.nome, cnpj: "", site: l.site, linkedin_identifier: l.linkedin_identifier, linkedin_url: l.linkedin_url, cargo: l.cargo, uf: "", situacao_cadastral: "", porte: "", mei: "", data_abertura: "", cnae_principal_codigo: "", url_case: "" });
const entraram = { bruto: bruto.length, clientes: clientes.length, influenciador: listaInf.length, total: base.length };

const vistos = new Map(); const bruta = []; let dup = 0, semChave = 0;
for (const r of base) {
  const k = (r.linkedin_identifier && "li:" + r.linkedin_identifier.toLowerCase()) || (r.site && "site:" + r.site.toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")) || (r.cnpj && "cnpj:" + r.cnpj);
  if (!k) { semChave++; bruta.push(r); continue; }
  if (vistos.has(k)) { dup++; vistos.get(k).origem += "; " + r.origem; continue; }
  vistos.set(k, r); bruta.push(r);
}
const COLS = ["origem", "tipo", "nome", "cnpj", "site", "linkedin_identifier", "linkedin_url", "cargo", "uf", "situacao_cadastral", "porte", "mei", "data_abertura", "cnae_principal_codigo", "url_case"];
fs.writeFileSync(SIG + "/lista-bruta.csv", toCSV(COLS, bruta));

// ---------- filtros.md: critérios verificáveis ----------
const refinada = []; const rejeitados = {};
const rej = (k) => (rejeitados[k] = (rejeitados[k] || 0) + 1);
for (const r of bruta) {
  if (r.cnpj) { // empresa com dados da Receita
    const falhas = [], ok = [];
    if (r.situacao_cadastral === "ATIVA") ok.push("E04 CNPJ ativo"); else falhas.push("E04 CNPJ " + r.situacao_cadastral.toLowerCase());
    if (r.mei === "true") falhas.push("E05 MEI"); else ok.push("E05 não é MEI");
    ok.push("E09 sede no Brasil");
    if (["SP", "RJ", "MG", "ES", "PR", "SC", "RS"].includes(r.uf)) ok.push("E11 Sudeste/Sul"); else falhas.push("E11 fora do Sudeste e Sul");
    const ab = new Date(r.data_abertura); if ((NOW - ab) / 86400000 >= 365) ok.push("E18 CNPJ com 12 meses ou mais"); else falhas.push("E18 CNPJ com menos de 12 meses");
    if (falhas.length) { falhas.forEach(rej); continue; }
    r.motivo = "passa: " + ok.join(", ") + " | não verificado: E01, E02 (lista de CNAE A definir), E03, E06, E07, E08, E10, E12 a E17, E19 a E26 e desqualificadores DE01 a DE06 (sem site nem checkout)";
  } else if (r.tipo === "empresa") {
    r.motivo = "não verificado: nenhum critério de empresa (sem CNPJ nem site). Cliente de concorrente, ou página de empresa que engajou";
  }
  else r.motivo = listaInf.find(l => l.linkedin_identifier === r.linkedin_identifier)?.motivo || "";
  refinada.push(r);
}
fs.writeFileSync(SIG + "/lista-refinada.csv", toCSV([...COLS, "motivo"], refinada));
console.log(JSON.stringify({ stat4, entraram, dup, semChave, bruta: bruta.length, rejeitados, refinada: refinada.length, refinadaPorTipo: refinada.reduce((a, r) => (a[r.tipo] = (a[r.tipo] || 0) + 1, a), {}) }, null, 1));
