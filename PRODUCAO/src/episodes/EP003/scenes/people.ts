/** As cinco pessoas do episódio (fictícias). A mesma ordem/identidade atravessa todas as cenas. */
export type Person = {
  id: string;
  name: string;
  ini: string;
  bg: string;
  msg: string;
  intent: string;
  time: string;
  etapa: string;
  prazo: string;
  group: "combinado" | "novo";
};

export const PEOPLE: Person[] = [
  { id: "ana", name: "Ana R.", ini: "AR", bg: "#5A4A7A", msg: "Posso visitar amanhã às 10h?", intent: "AGENDAR VISITA", time: "09:12", etapa: "Visita marcada", prazo: "amanhã 10h", group: "combinado" },
  { id: "bruno", name: "Bruno L.", ini: "BL", bg: "#3F5E52", msg: "Me manda a lista de documentos?", intent: "DOCUMENTAÇÃO", time: "09:08", etapa: "Documentos", prazo: "hoje", group: "combinado" },
  { id: "carla", name: "Carla M.", ini: "CM", bg: "#6A5338", msg: "Ainda tô decidindo o bairro…", intent: "ESCOLHENDO BAIRRO", time: "09:15", etapa: "Descoberta", prazo: "sem pressa", group: "novo" },
  { id: "diego", name: "Diego S.", ini: "DS", bg: "#3B5370", msg: "Tem mais foto da sala?", intent: "PERGUNTA GERAL", time: "09:03", etapa: "1º contato", prazo: "hoje", group: "novo" },
  { id: "elisa", name: "Elisa P.", ini: "EP", bg: "#6B3E4C", msg: "Dá pra negociar o valor?", intent: "NEGOCIAÇÃO", time: "09:05", etapa: "Negociação", prazo: "esta semana", group: "novo" },
];
