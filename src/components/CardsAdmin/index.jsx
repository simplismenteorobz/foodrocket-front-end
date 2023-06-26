import { Container } from "./style"

import { useNavigate } from "react-router-dom"

import { ButtonTransparrent } from '../ButtonTransparent'

import { AiOutlineClose} from 'react-icons/ai'
import { api } from "../../services/api"

export const CardsAdmin = ({title, id, img, price, description, ...rest}) => {

  const navigate = useNavigate()

  const handleDetails = () => {
    navigate(`/att/${id}`)
  }

  const handleDelete = async () => {

    try{
      await api.delete(`/plates/${id}`)
      
      return alert('Prato deletado')
    }catch {
      
      return alert('ERROR, favor tentar novamente')
    }

  }

  return(
    <Container {...rest}>
      <ButtonTransparrent
        Icon={AiOutlineClose}
        className='icon'
        iconSize={20}
        iconColor='red'
        onClick={handleDelete}
      />

      <img src={`${api.defaults.baseURL}/plates/${img}`} alt="plate img" />
      
      <ButtonTransparrent
        className='name'
        title={title}
        onClick={handleDetails}
      />
      
      <p>{description}</p>

      <h4>R$ {price}</h4>
    </Container>
  )
}