import { BaseSeeder } from '@adonisjs/lucid/seeders'
import InfoState from '#models/info_state'

const states = [
  {
    uf: 'AC',
    name: 'Acre',
  },
  {
    uf: 'AL',
    name: 'Alagoas',
  },
  {
    uf: 'AM',
    name: 'Amazonas',
  },
  {
    uf: 'AP',
    name: 'Amapá',
  },
  {
    uf: 'BA',
    name: 'Bahia',
  },
  {
    uf: 'CE',
    name: 'Ceará',
  },
  {
    uf: 'DF',
    name: 'Distrito Federal',
  },
  {
    uf: 'ES',
    name: 'Espírito Santo',
  },
  {
    uf: 'GO',
    name: 'Goiás',
  },
  {
    uf: 'MA',
    name: 'Maranhão',
  },
  {
    uf: 'MG',
    name: 'Minas Gerais',
  },
  {
    uf: 'MS',
    name: 'Mato Grosso Do Sul',
  },
  {
    uf: 'MT',
    name: 'Mato Grosso',
  },
  {
    uf: 'PA',
    name: 'Pará',
  },
  {
    uf: 'PB',
    name: 'Paraíba',
  },
  {
    uf: 'PE',
    name: 'Pernambuco',
  },
  {
    uf: 'PI',
    name: 'Piauí',
  },
  {
    uf: 'PR',
    name: 'Paraná',
  },
  {
    uf: 'RJ',
    name: 'Rio De Janeiro',
  },
  {
    uf: 'RN',
    name: 'Rio Grande Do Norte',
  },
  {
    uf: 'RO',
    name: 'Rondônia',
  },
  {
    uf: 'RR',
    name: 'Roraima',
  },
  {
    uf: 'RS',
    name: 'Rio Grande Do Sul',
  },
  {
    uf: 'SC',
    name: 'Santa Catarina',
  },
  {
    uf: 'SE',
    name: 'Sergipe',
  },
  {
    uf: 'SP',
    name: 'São Paulo',
  },
  {
    uf: 'TO',
    name: 'Tocantins',
  },
]
export default class extends BaseSeeder {
  async run() {
    await InfoState.createMany(states)
  }
}
