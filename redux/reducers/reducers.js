import { combineReducers } from 'redux'
import { allArtikelReducer, newArtikelReducer } from './publikasi/artikel.reducers'

const reducer = combineReducers({

    // PUBLIKASI
    allArtikel: allArtikelReducer,
    newArtikel: newArtikelReducer,

    // TRIVIA

    // PARTNERSHIP
})

export default reducer