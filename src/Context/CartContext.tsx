import { createContext, useState, useEffect, useRef } from 'react'
import type { articles } from '../types'

type CartContextType = {
  cart: articles[]
  setCart: React.Dispatch<React.SetStateAction<articles[]>>
  handleAddToCart: (item: articles) => void
}

export const CartContext = createContext<CartContextType | any>(null)

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<articles[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setCart([])
    setIsOpen(false)
  }

  /*LocalStorage*/

  useEffect(() => {
    const item = window.localStorage.getItem('productsInCart')

    if (item) {
      try {
        const parsedCart: articles[] = JSON.parse(item)
        setCart(parsedCart)
      } catch (error) {
        console.error('error')
      }
    }
  }, [])

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.localStorage.setItem('productsInCart', JSON.stringify(cart))
  }, [cart])

  /*Agregar al carrito*/

  const handleAddToCart = (item: articles) => {
    const inCart = cart.find((product) => product.id === item.id)

    if (inCart) {
      setCart(
        cart.map((product) => {
          if (product.id === item.id) {
            return {
              ...product,
              amount: product.amount + 1,
            }
          } else {
            return product
          }
        })
      )
    } else {
      setCart([...cart, { ...item, amount: 1 }])
    }
  }

  const handleDeleteCart = (item: articles) => {
    const inCart = cart.find((product) => product.id === item.id)

    if (inCart?.amount === 1) {
      setCart(cart.filter((product) => product.id !== item.id))
    } else {
      setCart(
        cart.map((product) => {
          if (product.id === item.id) {
            return {
              ...product,
              amount: product.amount - 1,
            }
          } else {
            return product
          }
        })
      )
    }
  }

  const handleDeleteAllCart = (item: articles) => {
    setCart(cart.filter((product) => product.id !== item.id))
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleDeleteCart,
        handleDeleteAllCart,
        isOpen,
        handleOpen,
        handleClose,
      }}>
      {children}
    </CartContext.Provider>
  )
}
