import { Container } from "./style"

import { ButtonTransparrent } from '../ButtonTransparent'
import { Button } from '../Button'

import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { api } from "../../services/api"

export const Cards = ({ title, img, id, description, price, setFavoriteP, setAllOrders, favoriteP,  ...rest }) => {

  const navigate = useNavigate()

  const [ favorite, setFavorite ] = useState(() => {
    
    const localData = localStorage.getItem("@foodexplorer:favorites")
    
    if(localData){
      
      const favorites = JSON.parse(localData)
      const isFavorite = favorites.filter(plate => plate == id)
      
      if(isFavorite.length === 1) {
        return true
      }
    }

    return false

  })
  const [ quantity, setQuantity ] = useState(1) 

  const handleFavorites = () => {
     
    setFavorite(!favorite)
    
    if(favorite) {
      const favoriteFiltered = favoriteP.filter(plate => plate !== id)
      setFavoriteP(favoriteFiltered)

    }else{
      setFavoriteP(prevState => [ ...prevState, id])
    }
  }

  const handleDetails = () => {
    navigate(`/details/${id}`)
  }

  const handleAddQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const handleRemoveQuantity = () => {
    if(quantity <= 1){  
      setQuantity(1)
      return alert('Quantidade mínima é 1')
    }
    setQuantity(prevState => prevState - 1)
  }

  const handleAllQuantity = () => {
    const plates = {
      id:id,
      name: title,
      img: img,
      price: price,
      quantity: quantity,
    }

    const savedPlates = JSON.parse(localStorage.getItem("@foodexplorer:plates"))
    
    if(!savedPlates){
      setAllOrders(prevState =>[...prevState, plates])
    }
    
    const filteredSavedPlates = savedPlates.filter(p => p.id !== plates.id)

    setAllOrders(filteredSavedPlates)

    setAllOrders(prevState =>[...prevState, plates])

  }


  return(
    <Container {...rest}>
      <ButtonTransparrent
        Icon={favorite ? AiFillHeart :  AiOutlineHeart}
        className='icon'
        iconSize={30}
        iconColor={favorite ? 'red' : ''}
        onClick={() => handleFavorites(id)}
      />

      <img src={`${api.defaults.baseURL}/plates/${img}`} alt="plate img" />
      
      <ButtonTransparrent
        className='name'
        title={title}
        onClick={handleDetails}

      />
      <p>{description}</p>

      <h4>R$ {price}</h4>

      <div className="quantity">
        <div>
          <button onClick={handleRemoveQuantity}>
            &minus;
          </button>
          <span>{quantity.toString().padStart(2,0)}</span>
          <button onClick={handleAddQuantity}>
              &#43;
          </button>
        </div>
        <Button
          title='incluir'
          onClick={handleAllQuantity}
        />
      </div>
    </Container>
  )
}