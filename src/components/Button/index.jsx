import { Container } from "./style"
import { useAuth } from "../../hooks/auth"

export const Button= ({title,Icon = false, ...rest}) => {
  const {loading} = useAuth()
  return(
    <Container 
      type="button" 
      disabled={loading === true ? true : false}
      loading={loading === true ? true : false}
      {...rest}
    >
      {Icon && <Icon size={20}/>}
      {loading === true ? 'ESPERE' : title}
    </Container>
  )
}