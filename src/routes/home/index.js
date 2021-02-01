import s from './Style.module.css'
import { Header } from '../../components/01_header/Header.js'
import { Layout } from '../../components/02_layout/Layout.js'
import { Footer } from '../../components/03_footer/Footer.js'
import { PokemonCard } from '../../components/pokemonCard/PokemonCard.js'
import { MenuHeader } from '../../components/04_menuHeader/MenuHeader'
import bg1 from '../../assets/bg2.jpg'
import bg2 from '../../assets/bg1.jpg'
import jsonData from './pokemons.json'
import PropTypes from 'prop-types'

const POKEMONS = [...jsonData]

export const HomePage = ({ handleChangePage }) => {
   return (
      <>
         <MenuHeader />
         <Header
            title="Pokemon's BIG Game"
            descr='This is a simple triple triad card game'
            handleChangePage={handleChangePage}
         />
         <Layout id={1} title={'Introduction'} urlBg={bg1}>
            <p>
               In the game two players face off against one another, one side playing as "blue", the other as "red" on a
               3x3 grid.
            </p>
            <p>
               Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into
               the player's own color of red or blue.
            </p>
         </Layout>
         <Layout id={2} title={'Cards'} colorBg={'aquamarine'}>
            <div className={s.flex}>
               {POKEMONS.map(pokemon => (
                  <PokemonCard
                     key={pokemon.id}
                     name={pokemon.name}
                     img={pokemon.img}
                     id={pokemon.id}
                     type={pokemon.type}
                     values={pokemon.values}
                  />
               ))}
            </div>
         </Layout>
         <Layout id={3} title={'Rules'} urlBg={bg2}>
            <p>
               To win, a majority of the total ten cards played (including the one card that is not placed on the board)
               must be of the player's card color.
            </p>
            <p>
               To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the
               'ranks' of the sides where the two cards touch will be compared.
            </p>
            <p>
               If the rank of the opponent's card is higher than the player's card, the player's card will be captured
               and turned into the opponent's color. If the player's rank is higher, the opponent's card will be
               captured and changed into the player's color instead.
            </p>
         </Layout>
         <Footer />
      </>
   )
}

HomePage.propTypes = {
   handleChangePage: PropTypes.func.isRequired,
}
