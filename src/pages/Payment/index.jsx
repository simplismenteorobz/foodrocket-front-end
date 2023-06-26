import { Container, Content } from './style'

import { useEffect, useState } from "react"
import { useAuth } from '../../hooks/auth'
import { api } from "../../services/api"

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import { ButtonTransparrent } from "../../components/ButtonTransparent"
import { OrdersPayment } from "../../components/OrdersPayment"

export const Payment = () => {
  const {user} = useAuth()
  
  const [ value, setValue ] = useState(0)

  const [ allOrders, setAllOrders ] = useState(() =>{
    const localData = localStorage.getItem("@foodexplorer:plates")
    return localData ? JSON.parse(localData) : []
  })

  const removePlate = (id) => {

    const filteredAllOrders = allOrders.filter(plate => plate.id !== id)

    setAllOrders(filteredAllOrders)

    localStorage.setItem("@foodexplorer:plates", JSON.stringify(filteredAllOrders))
  }

  useEffect(()=> {
    let sum = 0
    allOrders.forEach(plate => {
      sum += Number(plate.quantity) * Number(plate.price.replace(',', '.'))
    });
    setValue(sum)
  },[allOrders])

  return(
    <Container>
      {user.admin ? <HeaderAdmin/> : <Header/>}
      <Content>
        
        <div className="orders">
          <h4>Meu pedido</h4>

          <div className="scroll">

          { allOrders &&
            allOrders.map(order => (
              <div key={order.id} className='foods'>
                <img src={`${api.defaults.baseURL}/plates/${order.img}`} alt="food img" />
                <div>
                  <div className="infos">
                    <span className="quantity">{order.quantity} x</span>
                    <span className="name">{order.name}</span>
                    <span className="value"> R$ {order.price}</span>
                  </div>

                  <ButtonTransparrent
                    title='Excluir'
                    onClick={() => removePlate(order.id)}
                  />
                </div>
            </div>
            ))
          }
          </div>

          <h5>Total: R$ {value} </h5> {/* */}
        </div>
        
        <div className="payments">
          <h4>Pagamentos</h4>

          <OrdersPayment
            status='pending'
            allOrders={allOrders}
          />
        </div>
      </Content>
      <Footer/>
    </Container>
  )

}