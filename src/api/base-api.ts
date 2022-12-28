import axios, { AxiosRequestConfig } from 'axios'
import { env } from 'src/configs'

export default function callApi(props: AxiosRequestConfig) {
  return axios.request({ baseURL: env.LOCAL_API_URL, ...props })
}
