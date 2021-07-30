import { combineReducers } from 'redux'

// PUBLIKASI
import { allArtikelReducer, newArtikelReducer, deleteArtikelReducer } from './publikasi/artikel.reducers'
import { allBeritaReducer, newBeritaReducer } from './publikasi/berita.reducers'
import { allFaqReducer, newFaqReducer } from './publikasi/faq.reducers'
import { allVideoReducer, newVideoReducer } from './publikasi/video.reducers'
import { allKategoriReducer, newKategoriReducer } from './publikasi/kategori.reducers'
// Subvit

import { allSubtanceQuestionBanksReducer, newSubtanceQuestionBanksReducer, deleteSubtanceQuestionBanksReducer } from './subvit/subtance.reducers'
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

    // Subvit
    allSubtanceQuestionBanks: allSubtanceQuestionBanksReducer,
    newSubtanceQuestionBanks: newSubtanceQuestionBanksReducer,
    deleteSubtanceQuestionBanks: deleteSubtanceQuestionBanksReducer,
    
    // PARTNERSHIP
})

export default reducer