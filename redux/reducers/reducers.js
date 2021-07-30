import { combineReducers } from 'redux'

// PUBLIKASI
import { allArtikelReducer, newArtikelReducer, deleteArtikelReducer } from './publikasi/artikel.reducers'
import { allBeritaReducer, newBeritaReducer, deleteBeritaReducer } from './publikasi/berita.reducers'
import { allImagetronReducer, newImagetronReducer, deleteImagetronReducer } from './publikasi/imagetron.reducers'
import { allKategoriReducer, newKategoriReducer, deleteKategoriReducer } from './publikasi/kategori.reducers'
import { allGaleriReducer, newGaleriReducer, deleteGaleriReducer } from './publikasi/galeri.reducers'
import { allFaqReducer, newFaqReducer } from './publikasi/faq.reducers'
import { allVideoReducer, newVideoReducer } from './publikasi/video.reducers'

const reducer = combineReducers({

    // PUBLIKASI
    allArtikel: allArtikelReducer,
    newArtikel: newArtikelReducer,
    deleteArtikel: deleteArtikelReducer,

    allBerita: allBeritaReducer,
    newBerita: newBeritaReducer,
    deleteBerita: deleteBeritaReducer,

    allImagetron: allImagetronReducer,
    newImagetron: newImagetronReducer,
    deleteImagetron: deleteImagetronReducer,

    allGaleri: allGaleriReducer,
    newGaleri: newGaleriReducer,
    deleteGaleri: deleteGaleriReducer,

    allFaq: allFaqReducer,
    newFaq: newFaqReducer,

    allVideo: allVideoReducer,
    newVideo: newVideoReducer,

    allKategori: allKategoriReducer,
    newKategori: newKategoriReducer,
    deleteKategori: deleteKategoriReducer,

    // TRIVIA

    // PARTNERSHIP
})

export default reducer