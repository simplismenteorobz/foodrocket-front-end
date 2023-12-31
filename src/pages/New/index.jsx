import { Container, Content } from './style'

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from '../../hooks/auth'
import { api } from "../../services/api"

import { MdOutlineArrowBackIos } from 'react-icons/md'
import { FiUpload } from 'react-icons/fi'

import { ButtonTransparrent } from '../../components/ButtonTransparent'
import { HeaderAdmin } from "../../components/HeaderAdmin"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Tag } from "../../components/Tag"

export const New = () => {
  const { user } = useAuth()

  const navigate = useNavigate()

  const [ name,setName ] = useState('')
  const [ price,setPrice ] = useState('')
  const [ description, setDescription ] = useState('')

  const [ ingredients, setIngredients ] = useState([ ])
  const [ newIngredient, setNewIngredient ] = useState('')

  const [ img, setImg ]= useState(null)


  const options = ['Prato Principal', 'Sobremesa', 'Bebida']
  const [ type,setType ] = useState(options[ 0 ])


  const handleAddIngredient = () => {
    setIngredients(prevState => [...prevState, newIngredient])
    setNewIngredient('')
  }

  const handleRemoveIngredient = (item) => {
    const newIngredients = ingredients.filter(ingredient => ingredient != item)

    setIngredients(newIngredients)
  }

  const handleImg = (e) => {
    setImg(e.target.files[0]) 

  }

  const handleCreate = () =>{
    if(newIngredient.length > 0){
      return alert('Existem ingredientes pendentes, que não foram adicionados ainda.')
    }

    if(!name || !price || !description || !type || !img){
      return('Preencha todos os campos')
    }
    const fileUpload = new FormData()

    fileUpload.append('img', img)
    fileUpload.append('data',JSON.stringify({
      title:name, 
      price,
      description, 
      type, 
      ingredients,
    }))

    api.post('/plates',fileUpload ).then(() => {
      alert('Cadastro realizado com sucesso')
       navigate(-1)
    }).catch(error => {
      if(error.response){
        alert(error.response.data.message)
      }else{
        alert('Nao foi possivel realizar o cadastro')
      }
    })
  }

  const handleback = () => {
    navigate(-1)
  }

  return(
    <Container>
      {user.admin ? <HeaderAdmin/> : <Header/>}
      
      <Content>
      <ButtonTransparrent
            Icon={MdOutlineArrowBackIos}
            iconSize={20}
            title='voltar'
          />

      <div>
        <h2>Criar prato</h2>
        
        <form>

          <div className="wrapper">
            <div className="files">
              <p>Imagem do Prato</p>
              <label 
                htmlFor="plate-name" ><FiUpload size={24}/> Selecione imagem 
              </label>
              <input 
                type="file"
                id="plate-name" name="plate-name"
                onChange={handleImg}
                accept="image/png, image/jpeg"/>
            </div>
            
            <div className="inputs-box">
              <Input
                title='Nome'
                type='text'
                placeholder='Ex.: Salada Ceasar'
                name='name'
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className=" select">
              <label htmlFor="food_type">Tipo</label>
              <select 
                value={type}
                onChange={(e)=>setType(e.target.value)}
              >
                {
                  options.map((option, index) => (
                    <option value={option} key={String(index)}>
                      {option}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="wrapper">
            <div className="inputs-box ingredients">
                <h3>Ingredientes</h3>
                <div className="tags">
                  {
                    ingredients.map((item, index) => (
                      <Tag
                        key={String(index)}
                        value={item}
                        click={() => handleRemoveIngredient(item)}
                      />
                    ))
                  }
                    
                  <Tag
                    isNew
                    placeholder='Ingredientes'
                    onChange={(e)=>setNewIngredient(e.target.value)}
                    value={newIngredient}
                    click={handleAddIngredient}
                  />  
                </div>
            </div>

            <div className="inputs-box price">
              <Input
                title='Preço'
                type='text'
                placeholder="R$ 00,00" 
                name='price'
                onChange={(e)=>setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="wrapper">
            <div className="inputs-box textarea">
              <h3>Descrição</h3>
              <textarea 
                name="description" id="description"  
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                onChange={(e)=>setDescription(e.target.value)}
              />
            </div>
          </div>

          <button 
            className="add" 
            type="button"
            onClick={handleCreate}
          >
            Criar Prato
          </button>
        </form>
      </div>
      </Content>
      <Footer/>
    </Container>
  )
}