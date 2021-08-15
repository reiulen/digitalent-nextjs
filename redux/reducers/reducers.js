import { combineReducers } from "redux";

// PUBLIKASI
import {
    allArtikelReducer,
    newArtikelReducer,
    deleteArtikelReducer,
    detailArtikelReducer,
    updateArtikelReducer
} from "./publikasi/artikel.reducers";
import {
    allBeritaReducer,
    newBeritaReducer,
    deleteBeritaReducer,
    detailBeritaReducer,
    updateBeritaReducer,
} from "./publikasi/berita.reducers";
import {
    allImagetronReducer,
    newImagetronReducer,
    deleteImagetronReducer,
} from "./publikasi/imagetron.reducers";
import {
    allKategoriReducer,
    newKategoriReducer,
    deleteKategoriReducer,
} from "./publikasi/kategori.reducers";
import {
    allGaleriReducer,
    newGaleriReducer,
    deleteGaleriReducer,
} from "./publikasi/galeri.reducers";
import {
    allFaqReducer,
    newFaqReducer
} from "./publikasi/faq.reducers";
import {
    allVideoReducer,
    newVideoReducer,
    deleteVideoReducer,
    detailVideoReducer,
    updateVideoReducer
} from "./publikasi/video.reducers";

// Subvit
import {
    allSubtanceQuestionBanksReducer,
    newSubtanceQuestionBanksReducer,
    detailSubtanceQuestionBanksReducer,
    updateSubtanceQuestionReducer,
    deleteSubtanceQuestionBanksReducer,
    updateSubtanceQuestionBanksPublishReducer,
    allReportSubtanceQuestionBanksReducer,
    newCloneSubtanceQuestionBanksReducer,
} from './subvit/subtance.reducers'
import {
    allSubtanceQuestionTypeReducer,
    newSubtanceQuestionTypeReducer,
    detailSubtanceQuestionTypeReducer,
    deleteSubtanceQuestionTypeReducer,
    updateSubtanceQuestionTypeReducer,
} from './subvit/subtance-question-type.reducers'
import {
    allSubtanceQuestionDetailReducer,
    newSubtanceQuestionDetailReducer,
    deleteSubtanceQuestionDetailReducer,
    importFileSubtanceQuestionDetailReducer,
    importImagesSubtanceQuestionDetailReducer,
} from "./subvit/subtance-question-detail.reducers";

import {
    allSurveyQuestionBanksReducer,
    newSurveyQuestionBanksReducer,
    detailSurveyQuestionBanksReducer,
    updateSurveyQuestionReducer,
    deleteSurveyQuestionBanksReducer,
    updateSurveyQuestionBanksPublishReducer,
    allReportSurveyQuestionBanksReducer,
} from './subvit/survey-question.reducers'

// Partnership
import { allMitraReducer, newMitraReducer } from "./partnership/mitra.reducers";

const reducer = combineReducers({

    // PUBLIKASI
    allArtikel: allArtikelReducer,
    newArtikel: newArtikelReducer,
    deleteArtikel: deleteArtikelReducer,
    detailArtikel: detailArtikelReducer,
    updatedArtikel: updateArtikelReducer,

    allBerita: allBeritaReducer,
    newBerita: newBeritaReducer,
    deleteBerita: deleteBeritaReducer,
    detailBerita: detailBeritaReducer,
    updatedBerita: updateBeritaReducer,

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
    deleteVideo: deleteVideoReducer,
    detailVideo: detailVideoReducer,
    updatedVideo: updateVideoReducer,

    allKategori: allKategoriReducer,
    newKategori: newKategoriReducer,
    deleteKategori: deleteKategoriReducer,

    // Subvit
    allSubtanceQuestionBanks: allSubtanceQuestionBanksReducer,
    newSubtanceQuestionBanks: newSubtanceQuestionBanksReducer,
    deleteSubtanceQuestionBanks: deleteSubtanceQuestionBanksReducer,
    detailSubtanceQuestionBanks: detailSubtanceQuestionBanksReducer,
    updateSubtanceQuestion: updateSubtanceQuestionReducer,
    updateSubtanceQuestionBanksPublish: updateSubtanceQuestionBanksPublishReducer,
    allReportSubtanceQuestionBanks: allReportSubtanceQuestionBanksReducer,
    newCloneSubtanceQuestionBanks: newCloneSubtanceQuestionBanksReducer,

    allSubtanceQuestionType: allSubtanceQuestionTypeReducer,
    newSubtanceQuestionType: newSubtanceQuestionTypeReducer,
    detailSubtanceQuestionType: detailSubtanceQuestionTypeReducer,
    deleteSubtanceQuestionType: deleteSubtanceQuestionTypeReducer,
    updateSubtanceQuestionType: updateSubtanceQuestionTypeReducer,

    allSubtanceQuestionDetail: allSubtanceQuestionDetailReducer,
    newSubtanceQuestionDetail: newSubtanceQuestionDetailReducer,
    deleteSubtanceQuestionDetail: deleteSubtanceQuestionDetailReducer,
    importFileSubtanceQuestionDetail: importFileSubtanceQuestionDetailReducer,
    importImagesSubtanceQuestionDetail: importImagesSubtanceQuestionDetailReducer,

    allSurveyQuestionBanks: allSurveyQuestionBanksReducer,
    newSurveyQuestionBanks: newSurveyQuestionBanksReducer,
    deleteSurveyQuestionBanks: deleteSurveyQuestionBanksReducer,
    detailSurveyQuestionBanks: detailSurveyQuestionBanksReducer,
    updateSurveyQuestion: updateSurveyQuestionReducer,
    updateSurveyQuestionBanksPublish: updateSurveyQuestionBanksPublishReducer,
    allReportSurveyQuestionBanks: allReportSurveyQuestionBanksReducer,

    // PARTNERSHIP
    allMitra: allMitraReducer,
})

export default reducer
