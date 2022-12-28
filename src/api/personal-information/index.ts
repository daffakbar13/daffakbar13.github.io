import { personalInformation } from 'src/data'
import callApi from '../base-api'

export async function getPersonalInformations(): Promise<typeof personalInformation> {
  return callApi({
    method: 'GET',
    url: 'personal-informations',
  }).then((res) => res.data)
}
