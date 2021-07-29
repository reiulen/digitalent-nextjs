import { combineReducers } from 'redux'

// PUBLIKASI
import { allArtikelReducer, newArtikelReducer, deleteArtikelReducer } from './publikasi/artikel.reducers'
import { allBeritaReducer, newBeritaReducer } from './publikasi/berita.reducers'
import { allFaqReducer, newFaqReducer } from './publikasi/faq.reducers'
import { allVideoReducer, newVideoReducer } from './publikasi/video.reducers'
import { allKategoriReducer, newKategoriReducer } from './publikasi/kategori.reducers'

const reducer = combineReducers({

    // PUBLIKASI
    allArtikel: allArtikelReducer,
    newArtikel: newArtikelReducer,
    deleteArtikel: deleteArtikelReducer,

    allBerita: allBeritaReducer,
    newBerita: newBeritaReducer,

    allFaq: allFaqReducer,
    newFaq: newFaqReducer,

    allVideo: allVideoReducer,
    newVideo: newVideoReducer,

    allKategori: allKategoriReducer,
    newKategori: newKategoriReducer,

    // TRIVIA

    // PARTNERSHIP
})

export default reducer