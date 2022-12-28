import { styled, Button as ButtonMui } from '@mui/material'

const Button = styled(ButtonMui)(() => ({
  borderRadius: 64,
  textTransform: 'none',
  width: '100%',
}))

export default Button
