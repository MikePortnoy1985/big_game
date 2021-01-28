import { Header } from './components/01_header/Header'
import { Layout } from './components/02_layout/Layout'
import { Footer } from './components/03_footer/Footer'
import bg1 from './assets/bg2.jpg'
import bg2 from './assets/bg1.jpg'

export const App = () => {
   return (
      <>
         <Header title="Pokemons's BIG Game" descr='Добро пожаловать на БОЛЬШУЮ игру Покемонов' />
         <Layout id={1} title={'Title 1'} descr={'Some descr'} urlBg={bg1} />
         <Layout id={2} title={'Title 2'} descr={'Some descr'} colorBg={'aquamarine'} />
         <Layout id={3} title={'Title 3'} descr={'Some descr'} urlBg={bg2} />
         <Footer />
      </>
   )
}
