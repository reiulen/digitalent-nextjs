import { combineReducers } from "redux";

// DASHBOARD KABADAN
// DASHBOARD
import {
  digitalentTotalPenggunaReducer,
  digitalentStatistikAkademiReducer,
  digitalentStatistikMitraReducer,
  digitalentTablePendaftaranReducer,
  digitalentPesertaWilayahReducer,
  digitalentProvinsiReducer,
  digitalentUmurReducer,
  digitalentJenisKelaminReducer,
  digitalentPendidikanReducer,
} from "./dashboard-kabadan/dashboard/digitalent.reducers";
// DATA PESERTA
import {
  allBeasiswaKandidatReducer,
  allBeasiswaFilterReducer,
} from "./dashboard-kabadan/data-peserta/beasiswa.reducers";
import { allSimonasKandidatReducer } from "./dashboard-kabadan/data-peserta/simonas.reducers";
// END DASHBOARD KABADAN

// PUBLIKASI
import {
  allArtikelReducer,
  newArtikelReducer,
  deleteArtikelReducer,
  detailArtikelReducer,
  updateArtikelReducer,
  allArtikelsPesertaReducer,
  detailArtikelsPesertaReducer,
} from "./publikasi/artikel.reducers";
import {
  allArtikelPesertaReducer,
  newArtikelPesertaReducer,
  deleteArtikelPesertaReducer,
  detailArtikelPesertaReducer,
  updateArtikelPesertaReducer,
} from "./publikasi/artikel-peserta.reducers";
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
  detailImagetronReducer,
  updateImagetronReducer,
} from "./publikasi/imagetron.reducers";
import {
  allKategoriReducer,
  paginationKategoriReducer,
  newKategoriReducer,
  deleteKategoriReducer,
  detailKategoriReducer,
  updateKategoriReducer,
} from "./publikasi/kategori.reducers";
import {
  allGaleriReducer,
  newGaleriReducer,
  detailGaleriReducer,
  deleteGaleriReducer,
  updateGaleriReducer,
  viewGaleriReducer,
} from "./publikasi/galeri.reducers";
import {
  allFaqReducer,
  paginationFaqReducer,
  newFaqReducer,
  deleteFaqReducer,
  detailFaqReducer,
  updateFaqReducer,
  updatePinFaqReducer,
} from "./publikasi/faq.reducers";
import {
  allVideoReducer,
  newVideoReducer,
  deleteVideoReducer,
  detailVideoReducer,
  updateVideoReducer,
  playVideoReducer,
} from "./publikasi/video.reducers";

import {
  allSettingPublikasiReducer,
  updateSettingPublikasiReducer,
} from "./publikasi/setting.reducers";

import {
  allDashboardPublikasiReducer,
  allRoleAdminPublikasiReducer,
} from "./publikasi/dashboard-publikasi.reducers";

import { allRolePermissionReducer } from "./publikasi/role-permissions.reducers";

// Subvit
// ============== substansi ===============
import {
  allSubtanceQuestionBanksReducer,
  permissionsSubvitReducer,
  newSubtanceQuestionBanksReducer,
  detailSubtanceQuestionBanksReducer,
  updateSubtanceQuestionReducer,
  deleteSubtanceQuestionBanksReducer,
  updateSubtanceQuestionBanksPublishReducer,
  allReportSubtanceQuestionBanksReducer,
  newCloneSubtanceQuestionBanksReducer,
} from "./subvit/subtance.reducers";
import {
  allSubtanceQuestionTypeReducer,
  newSubtanceQuestionTypeReducer,
  detailSubtanceQuestionTypeReducer,
  deleteSubtanceQuestionTypeReducer,
  updateSubtanceQuestionTypeReducer,
} from "./subvit/subtance-question-type.reducers";
import {
  allSubtanceQuestionDetailReducer,
  randomSubtanceQuestionDetailReducer,
  getDashboardReducer,
  postResultReducer,
  newSubtanceQuestionDetailReducer,
  deleteSubtanceQuestionDetailReducer,
  detailSubtanceQuestionDetailReducer,
  updateSubtanceQuestionDetailReducer,
  importFileSubtanceQuestionDetailReducer,
  importImagesSubtanceQuestionDetailReducer,
} from "./subvit/subtance-question-detail.reducers";
// ============== substansi ===============

// ============== survey ===============
import {
  allSurveyQuestionBanksReducer,
  newSurveyQuestionBanksReducer,
  detailSurveyQuestionBanksReducer,
  updateSurveyQuestionReducer,
  deleteSurveyQuestionBanksReducer,
  updateSurveyQuestionBanksPublishReducer,
  allReportSurveyQuestionBanksReducer,
} from "./subvit/survey-question.reducers";
import {
  allSurveyQuestionDetailReducer,
  randomSurveyReducer,
  newSurveyQuestionDetailReducer,
  deleteSurveyQuestionDetailReducer,
  detailSurveyQuestionDetailReducer,
  updateSurveyQuestionDetailReducer,
  importFileSurveyQuestionDetailReducer,
  importImagesSurveyQuestionDetailReducer,
  postResultSurveyReducer,
} from "./subvit/survey-question-detail.reducers";
// ============== survey ===============

// ============== trivia ===============
import {
  allTriviaQuestionBanksReducer,
  newTriviaQuestionBanksReducer,
  detailTriviaQuestionBanksReducer,
  updateTriviaQuestionReducer,
  deleteTriviaQuestionBanksReducer,
  updateTriviaQuestionBanksPublishReducer,
  allReportTriviaQuestionBanksReducer,
} from "./subvit/trivia-question.reducers";
import {
  allTriviaQuestionDetailReducer,
  randomTriviaReducer,
  newTriviaQuestionDetailReducer,
  deleteTriviaQuestionDetailReducer,
  detailTriviaQuestionDetailReducer,
  updateTriviaQuestionDetailReducer,
  importFileTriviaQuestionDetailReducer,
  importImagesTriviaQuestionDetailReducer,
  postResultTriviaReducer,
} from "./subvit/trivia-question-detail.reducers";
// ============== trivia ===============

// ============== sertifikat ===============
import {
  allSertifikatReducers,
  deleteSertifikatReducer,
  detailSertifikatReducer,
  newSertifikatReducer,
  updateSertifikatReducer,
  singleSertifikatReducer,
  publishedSertifikatReducer,
  allAcademyOptionsReducer,
  allThemeOptionsReducer,
} from "./sertifikat/sertifikat.reducers";

import {
  allPesertaReducers,
  detailPesertaReducer,
} from "./sertifikat/list-peserta.reducer";
// ============== sertifikat ===============

// start Partnership
import { allMitraReducer } from "./partnership/mitra.reducers";

//
// ================= admin
// category management kerjasama
import { allMKCooporationReducer } from "./partnership/mk_cooporation.reducers";
// management kerjasama
import { allMCooporationReducerMK } from "./partnership/managementCooporation.reducer";
import { allTandaTanganReducer } from "./partnership/tandaTangan.reducers";
// permission
import { partnershipPermissionsReducer } from "./partnership/partnership_permission.reducer";
// ================== user
import { authenticationReducer } from "./partnership/user/authentication.reducer";
import { cooperationUserReducer } from "./partnership/user/cooperation.reducer";
import { dashboardReducer } from "./partnership/dashboard.reducer";
import { allTandaTanganUserReducer } from "./partnership/user/tanda-tangan.reducer";
// end Partnership

// Site Management
// ============== page ===============
import {
  allPageReducer,
  deletePageReducer,
  newPageReducer,
  detailPageReducer,
  updatePageReducer,
} from "./site-management/settings/page.reducers";
// ============== data export ===============
import {
  allExportDataReducer,
  detailExportDataReducer,
  updateExportDataReducer,
  deleteExportDataReducer,
} from "./site-management/export-data.reducers";
// ============== provinces site ===============
import { allProvincesSiteReducer } from "./site-management/option/option-provinces.reducers";
// ============== option reference site ===============
import { allOptionReferenceSiteReducer } from "./site-management/option/option-reference.reducers";
// ============== api ===============
import {
  allApiReducer,
  deleteApiReducer,
  newApiReducer,
  updateApiReducer,
  detailApiReducer,
  listApiReducer,
  listFieldReducer,
  listLogReducer,
} from "./site-management/settings/api.reducers";
// ============== mitra site ===============
import {
  allMitraSiteReducer,
  newMitraSiteReducer,
  updateMitraSiteReducer,
  detailMitraSiteReducer,
} from "./site-management/user/mitra-site.reducers";
// ============== admin site ===============
import {
  allAdminSiteReducer,
  newAdminSiteReducer,
  updateAdminSiteReducer,
  detailAdminSiteReducer,
  deleteAdminSiteReducer,
  allUnitWorkListReducer,
  allRolesListReducer,
  allAcademyListReducer,
  allListPelatihanReducer,
  updateStatusAdminReducer,
} from "./site-management/user/admin-site.reducers";
// ============== data reference ===============
import {
  allDataReferenceReducer,
  deleteDataReferenceReducer,
  detailDataReferenceReducer,
  newDataReferenceReducer,
  updateDataReferenceReducer,
} from "./site-management/data-reference.reducers";
// ============== general ===============
import {
  allGeneralReducer,
  deleteGeneralReducer,
  detailGeneralReducer,
  newGeneralReducer,
  updateGeneralReducer,
} from "./site-management/settings/general.reducers";
// ============== zonasi ===============
import {
  allZonasiReducer,
  deleteZonasiReducer,
  detailZonasiReducer,
  newZonasiReducer,
  updateZonasiReducer,
} from "./site-management/zonasi.reducers";
// ============== roles ===============

import {
  allRolesReducer,
  newRolesReducer,
  detailRolesReducer,
  updateRolesReducer,
  deleteRolesReducer,
  allPermissionReducer,
  allSidebarReducer,
} from "./site-management/role.reducers";

// ============== unit work ===============
import {
  allUnitWorkReducer,
  newUnitWorkReducer,
  detailUnitWorkReducer,
  updateUnitWorkReducer,
  deleteUnitWorkReducer,
} from "./site-management/unit-work.reducers";

// ============== pelatihan ===============
import { allPromptReducer } from "./site-management/settings/pelatihan.reducers";

// ============== dashboard ===============
import { allDataZonasiReducer } from "./site-management/dashboard.reducers";
import { allDataPesertaReducer } from "./site-management/dashboard-data-peserta.reducers";

// End Site Management

//PELATIHAN
// ====================== akademi =====================
import {
  allAcademyReducer,
  newAcademyReducer,
  detailAcademyReducer,
  updateAcademyReducer,
  deleteAcademyReducer,
} from "./pelatihan/admin/academy.reducers";

// ====================== tema =====================
import {
  allThemeReducer,
  newThemeReducer,
  detailThemeReducer,
  updateThemeReducer,
  deleteThemeReducer,
} from "./pelatihan/admin/theme.reducers";

// ====================== pelatihan =====================
import {
  newTrainingReducer,
  cardTrainingReducer,
  allTrainingReducer,
  deleteTrainingReducer,
  updateStatusReducer,
  getEditTrainingReducer,
  getEditTraining2Reducer,
  getEditTraining3Reducer,
  getFormLPJReducer,
  getFormEvidenceReducer,
  cloneTrainingReducer,
  updateTrainingReducer,
} from "./pelatihan/admin/training.reducers";
// =================== review pelatihan ==================
import {
  allListReviewReducer,
  cardReviewReducer,
  listRevisiReducer,
  getReviewStep1Reducer,
  getReviewStep2Reducer,
  getReviewStep3Reducer,
  revisiReviewReducer,
  tolakReviewReducer,
  getReviewStep4Reducer,
} from "./pelatihan/admin/review.reducers";
// =================== report pelatihan ==================

import {
  detailReportTrainingReducer,
  getDataReportTrainingReducer,
} from "./pelatihan/admin/report-training.reducers";
// =================== rekap pelatihan ==================
import {
  getFormBuilderReducer,
  getPelatihanReducer,
  newPendaftaranPelatihanReducer,
  formRegisterReducer,
} from "./pelatihan/peserta/register-training.reducers";
// ================ pendaftaran pelatihan ===============
import {
  allSummaryReducer,
  updateStatusPesertaReducer,
  updateReminderReducer,
  getAkademiByPelatihanReducer,
  getPendaftaranPesertaReducer,
  getStatusPendaftarReducer,
  getReminderBerkasReducer,
  getDataPribadiRowReducer,
  getRiwayatPelatihanReducer,
  getBerkasPendaftaranReducer,
  getFormKomitmenReducer,
  getFormLpjReducer,
  newLPJReducer,
} from "./pelatihan/admin/summary.reducers";

// ================ profile peserta ===============
import {
  dataAlamatReducer,
  dataPendidikanReducer,
  dataKeterampilanReducer,
  dataPekerjaanReducer,
  updateDataPribadiReducer,
  updateAlamatReducer,
  updatePendidikanReducer,
  updateKeterampilanReducer,
  updatePekerjaanReducer,
  getAsalSekolahReducer,
} from "./pelatihan/peserta/profile.reducers";

import { dashboardPesertaReducer } from "./pelatihan/peserta/dashboard-reducers";
//END PELATIHAN

// functional reducer
import {
  getDataPribadiReducer,
  trainingStep1Reducer,
  registrationStep2Reducer,
  commitmentStep3Reducer,
  drowpdownTemabyAkademiReducers,
  drowpdownAkademiReducers,
  drowpdownPelatihanbyTemaReducers,
  drowpdownTemaReducers,
  drowpdownPelatihanReducers,
  drowpdownAgamaReducers,
  drowpdownPendidikanReducers,
  drowpdownStatusPekerjaanReducers,
  drowpdownLevelPelatihanReducers,
  drowpdownMitraReducers,
  drowpdownZonasiReducers,
  drowpdownProvinsiReducers,
  drowpdownKabupatenReducers,
  drowpdownKabupatenDomisiliReducers,
  drowpdownProvinsiToDesaReducers,
  drowpdownKecamatanToDesaReducers,
  drowpdownPenyelenggaraReducers,
  drowpdownFormBuilderReducers,
  drowpdownTempatLahirReducers,
  drowpdownYearReducers,
} from "./pelatihan/admin/function.reducers";
import {
  allProvinsiReducer,
  allKotaReducer,
  adminPermissionReducer,
} from "./utils/utils.reducers";
import { reducerFunctionals } from "./utils/functionals.reducer";

// BERANDA
// ========== beranda ========
import {
  allAkademiReducer,
  allKotaPesertaReducer,
  allPenyelenggaraPesertaReducer,
  allPenyelenggaraPageReducer,
  temaByAkademiReducer,
  pelatihanByTemaReducer,
  allPublikasiBerandaReducer,
  addNotifTemaReducer,
  berandaFooterReducer,
  allTemaOriginalReducer,
  berandaFooterPesertaReducer,
} from "../reducers/beranda/beranda.reducers";

// ========== detail akademi ========
import {
  detailAkademiReducer,
  allPelatihanReducer,
} from "../reducers/beranda/detail-akademi.reducers";

// ========== detail pelatihan ========
import {
  detailPelatihanReducer,
  checkRegisteredPelatihanReducer,
} from "../reducers/beranda/detail-pelatihan.reducers";

// ========== artikel ========
import {
  allBerandaArtikelReducer,
  detailBerandaArtikelReducer,
  kategoriBerandaArtikelReducer,
  allTagBerandaArtikelReducer,
  cekLulusPelatihanReducer,
} from "../reducers/beranda/artikel.reducers";

// ========== galeri ========
import {
  allBerandaGaleriReducer,
  detailBerandaGaleriReducer,
  kategoriBerandaGaleriReducer,
  allTagBerandaGaleriReducer,
} from "../reducers/beranda/galeri.reducer";

// ========== berita ========
import {
  allBerandaBeritaReducer,
  detailBerandaBeritaReducer,
  kategoriBerandaBeritaReducer,
  allTagBerandaBeritaReducer,
} from "../reducers/beranda/berita.reducers";

// ========== video ========
import {
  allVideoContentReducer,
  detailBerandaVideoReducer,
  kategoriVideoContentReducer,
  allTagVideoContentReducer,
  playVideoContentReducer,
} from "../reducers/beranda/video-content.reducer";

// ========== faq ========

import {
  allFaqContentReducer,
  kategoriBerandaFaqReducer,
} from "../reducers/beranda/faq-content.reducers";

//END BERANDA

import {
  getAllRiwayatPelatihanPesertaReducer,
  getDetailRiwayatPelatihanReducer,
} from "../reducers/pelatihan/peserta/riwayat-pelatihan.reducer";
import {
  allBeasiswaReducer,
  allSimonasReducer,
} from "./beranda/simonasAndBeasiswa";

import {
  allMasterPelatihanListReducer,
  deleteMasterPelatihanReducer,
  detailMasterPelatihanReducer,
  detailMasterCopyEditPelatihanReducer,
  newMasterTrainingReducer,
  updateMasterPelatihanReducer,
  updateStatusMasterReducer,
} from "./pelatihan/admin/master-pendaftaran.reducer";

import { getAllBookmarkPesertaReducer } from "../reducers/pelatihan/peserta/bookmark.reducer";
import { allPencarianReducer } from "./pelatihan/peserta/pencarian.reducer";
import {
  allDetailPesertaReducer,
  allListPelatihanByPesertaReducer,
  allListPesertaReducer,
} from "./site-management/user/peserta-dts.reducers";
import { TTEP12DataReducer } from "./sertifikat/TTE-P12.reducer";

const reducer = combineReducers({
  // DASHBOARD KABADAN
  // ============= DTS ============
  digitalentTotalPengguna: digitalentTotalPenggunaReducer,
  digitalentStatistikAkademi: digitalentStatistikAkademiReducer,
  digitalentStatistikMitra: digitalentStatistikMitraReducer,
  digitalentTablePendaftaran: digitalentTablePendaftaranReducer,
  digitalentPesertaWilayah: digitalentPesertaWilayahReducer,
  digitalentProvinsi: digitalentProvinsiReducer,
  digitalentUmur: digitalentUmurReducer,
  digitalentJenisKelamin: digitalentJenisKelaminReducer,
  digitalentPendidikan: digitalentPendidikanReducer,
  // ============= BEASISWA ============
  allBeasiswaKandidat: allBeasiswaKandidatReducer,
  allBeasiswaFilter: allBeasiswaFilterReducer,
  // ============= SIMONAS ============
  allSimonasKandidat: allSimonasKandidatReducer,
  // END DASHBOARD KABADAN

  // PUBLIKASI
  allArtikel: allArtikelReducer,
  allArtikelsPeserta: allArtikelsPesertaReducer,
  detailArtikelsPeserta: detailArtikelsPesertaReducer,
  newArtikel: newArtikelReducer,
  deleteArtikel: deleteArtikelReducer,
  detailArtikel: detailArtikelReducer,
  updatedArtikel: updateArtikelReducer,
  cekLulusPelatihan: cekLulusPelatihanReducer,

  allArtikelPeserta: allArtikelPesertaReducer,
  newArtikelPeserta: newArtikelPesertaReducer,
  deleteArtikelPeserta: deleteArtikelPesertaReducer,
  detailArtikelPeserta: detailArtikelPesertaReducer,
  updatedArtikelPeserta: updateArtikelPesertaReducer,

  allBerita: allBeritaReducer,
  newBerita: newBeritaReducer,
  deleteBerita: deleteBeritaReducer,
  detailBerita: detailBeritaReducer,
  updatedBerita: updateBeritaReducer,

  allImagetron: allImagetronReducer,
  newImagetron: newImagetronReducer,
  deleteImagetron: deleteImagetronReducer,
  detailImagetron: detailImagetronReducer,
  updatedImagetron: updateImagetronReducer,

  allGaleri: allGaleriReducer,
  newGaleri: newGaleriReducer,
  detailGaleri: detailGaleriReducer,
  deleteGaleri: deleteGaleriReducer,
  updatedGaleri: updateGaleriReducer,
  viewedGaleri: viewGaleriReducer,

  allFaq: allFaqReducer,
  newFaq: newFaqReducer,
  paginationFaq: paginationFaqReducer,
  deleteFaq: deleteFaqReducer,
  detailFaq: detailFaqReducer,
  updateFaq: updateFaqReducer,
  updatePinFaq: updatePinFaqReducer,

  allVideo: allVideoReducer,
  newVideo: newVideoReducer,
  deleteVideo: deleteVideoReducer,
  detailVideo: detailVideoReducer,
  updatedVideo: updateVideoReducer,
  playedVideo: playVideoReducer,

  allKategori: allKategoriReducer,
  paginationKategori: paginationKategoriReducer,
  newKategori: newKategoriReducer,
  deleteKategori: deleteKategoriReducer,
  detailKategori: detailKategoriReducer,
  updateKategori: updateKategoriReducer,

  allSettingPublikasi: allSettingPublikasiReducer,
  updateSettingPublikasi: updateSettingPublikasiReducer,

  allDashboardPublikasi: allDashboardPublikasiReducer,
  allRoleAdminPublikasi: allRoleAdminPublikasiReducer,

  allRolePermission: allRolePermissionReducer,

  // allKategoriContent: kategoriVideoContentReducer,
  // allTagContent: allTagReducer,
  // playVideo: playVideoContentReducer,

  // Subvit
  // =============== substansi ==================
  allSubtanceQuestionBanks: allSubtanceQuestionBanksReducer,
  permissionsSubvit: permissionsSubvitReducer,
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
  randomSubtanceQuestionDetail: randomSubtanceQuestionDetailReducer,

  dashboardSubvit: getDashboardReducer,
  postResultSubvit: postResultReducer,
  newSubtanceQuestionDetail: newSubtanceQuestionDetailReducer,
  detailSubtanceQuestionDetail: detailSubtanceQuestionDetailReducer,
  updateSubtanceQuestionDetail: updateSubtanceQuestionDetailReducer,
  deleteSubtanceQuestionDetail: deleteSubtanceQuestionDetailReducer,
  importFileSubtanceQuestionDetail: importFileSubtanceQuestionDetailReducer,
  importImagesSubtanceQuestionDetail: importImagesSubtanceQuestionDetailReducer,
  // =============== end substansi ==================

  // =============== survey ==================
  allSurveyQuestionBanks: allSurveyQuestionBanksReducer,
  postResultSurveySubvit: postResultSurveyReducer,
  newSurveyQuestionBanks: newSurveyQuestionBanksReducer,
  deleteSurveyQuestionBanks: deleteSurveyQuestionBanksReducer,
  detailSurveyQuestionBanks: detailSurveyQuestionBanksReducer,
  updateSurveyQuestion: updateSurveyQuestionReducer,
  updateSurveyQuestionBanksPublish: updateSurveyQuestionBanksPublishReducer,
  allReportSurveyQuestionBanks: allReportSurveyQuestionBanksReducer,
  randomSurvey: randomSurveyReducer,
  allSurveyQuestionDetail: allSurveyQuestionDetailReducer,
  newSurveyQuestionDetail: newSurveyQuestionDetailReducer,
  deleteSurveyQuestionDetail: deleteSurveyQuestionDetailReducer,
  detailSurveyQuestionDetail: detailSurveyQuestionDetailReducer,
  updateSurveyQuestionDetail: updateSurveyQuestionDetailReducer,
  importFileSurveyQuestionDetail: importFileSurveyQuestionDetailReducer,
  importImagesSurveyQuestionDetail: importImagesSurveyQuestionDetailReducer,
  // =============== end substansi ==================

  // =============== trivia ==================
  randomTrivia: randomTriviaReducer,
  postResultTriviaSubvit: postResultTriviaReducer,
  allTriviaQuestionBanks: allTriviaQuestionBanksReducer,
  newTriviaQuestionBanks: newTriviaQuestionBanksReducer,
  deleteTriviaQuestionBanks: deleteTriviaQuestionBanksReducer,
  detailTriviaQuestionBanks: detailTriviaQuestionBanksReducer,
  updateTriviaQuestion: updateTriviaQuestionReducer,
  updateTriviaQuestionBanksPublish: updateTriviaQuestionBanksPublishReducer,
  allReportTriviaQuestionBanks: allReportTriviaQuestionBanksReducer,

  allTriviaQuestionDetail: allTriviaQuestionDetailReducer,
  newTriviaQuestionDetail: newTriviaQuestionDetailReducer,
  deleteTriviaQuestionDetail: deleteTriviaQuestionDetailReducer,
  detailTriviaQuestionDetail: detailTriviaQuestionDetailReducer,
  updateTriviaQuestionDetail: updateTriviaQuestionDetailReducer,
  importFileTriviaQuestionDetail: importFileTriviaQuestionDetailReducer,
  importImagesTriviaQuestionDetail: importImagesTriviaQuestionDetailReducer,
  // =============== end trivia ==================

  // =============== sertifikat ==================
  allCertificates: allSertifikatReducers,
  newCertificates: newSertifikatReducer,
  singleCertificate: singleSertifikatReducer,
  detailCertificates: detailSertifikatReducer,
  deleteCertificates: deleteSertifikatReducer,
  updateCertificates: updateSertifikatReducer,
  publishCertificate: publishedSertifikatReducer,
  allParticipant: allPesertaReducers,
  detailParticipant: detailPesertaReducer,
  allAcademy: allAcademyOptionsReducer,
  allTheme: allThemeOptionsReducer,
  // =============== end sertifikat ==================

  // PARTNERSHIP
  // ================================= => admin
  // kerjasama mitra
  allMitra: allMitraReducer,
  // category management kerjasama
  allMKCooporation: allMKCooporationReducer,
  // management kerjasama
  allMK: allMCooporationReducerMK,
  // tanda tangan
  allTandaTangan: allTandaTanganReducer,
  // dashboard
  allDashboard: dashboardReducer,
  // permission
  partnershipPermissions: partnershipPermissionsReducer,

  // ================================= => user
  allCooperationUser: cooperationUserReducer,
  allTandaTanganUser: allTandaTanganUserReducer,
  allProvinsi: allProvinsiReducer,
  allKota: allKotaReducer,
  allFunctionls: reducerFunctionals,
  allAuthentication: authenticationReducer,

  // SITE MANAGEMENT
  // ============ PAGE =======
  allPage: allPageReducer,
  deletePage: deletePageReducer,
  newPage: newPageReducer,
  detailPage: detailPageReducer,
  updatePage: updatePageReducer,
  listApi: listApiReducer,
  listField: listFieldReducer,
  listLog: listLogReducer,
  // ============ PAGE =======
  allProvincesSite: allProvincesSiteReducer,
  allOptionReferenceSite: allOptionReferenceSiteReducer,
  // ============ API =======
  allApi: allApiReducer,
  deleteApi: deleteApiReducer,
  newApi: newApiReducer,
  detailApi: detailApiReducer,
  updateApi: updateApiReducer,
  // ============ MITRA SITE =======
  allMitraSite: allMitraSiteReducer,
  newMitraSite: newMitraSiteReducer,
  detailMitraSite: detailMitraSiteReducer,
  updateMitraSite: updateMitraSiteReducer,
  // ============ ADMIN SITE =======
  allAdminSite: allAdminSiteReducer,
  newAdminSite: newAdminSiteReducer,
  updateAdminSite: updateAdminSiteReducer,
  detailAdminSite: detailAdminSiteReducer,
  deleteAdminSite: deleteAdminSiteReducer,
  allUnitWorkList: allUnitWorkListReducer,
  allRolesList: allRolesListReducer,
  allAcademyList: allAcademyListReducer,
  allListPelatihan: allListPelatihanReducer,
  allListPelatihanByPeserta: allListPelatihanByPesertaReducer,

  // ============ DATA REFERENCE =======
  allDataReference: allDataReferenceReducer,
  deleteDataReference: deleteDataReferenceReducer,
  newDataReference: newDataReferenceReducer,
  detailDataReference: detailDataReferenceReducer,
  updateDataReference: updateDataReferenceReducer,
  // ============ GENERAL =======
  allGeneral: allGeneralReducer,
  deleteGeneral: deleteGeneralReducer,
  newGeneral: newGeneralReducer,
  detailGeneral: detailGeneralReducer,
  updateGeneral: updateGeneralReducer,
  // ============ DATA ZONASI =======
  allZonasi: allZonasiReducer,
  deleteZonasi: deleteZonasiReducer,
  newZonasi: newZonasiReducer,
  detailZonasi: detailZonasiReducer,
  updateZonasi: updateZonasiReducer,
  // ============ UNIT WORK =======
  allUnitWork: allUnitWorkReducer,
  deleteUnitWork: deleteUnitWorkReducer,
  newUnitWork: newUnitWorkReducer,
  detailUnitWork: detailUnitWorkReducer,
  updateUnitWork: updateUnitWorkReducer,
  // ============ ROLE =======
  allRoles: allRolesReducer,
  newRoles: newRolesReducer,
  detailRoles: detailRolesReducer,
  updateRoles: updateRolesReducer,
  deleteRoles: deleteRolesReducer,
  allPermission: allPermissionReducer,
  allSidebar: allSidebarReducer,
  updateStatusAdmin: updateStatusAdminReducer,
  // ============ PELATIHAN =======
  allPrompt: allPromptReducer,
  // ============ Dashboatd =======
  allDataZonasi: allDataZonasiReducer,
  allDataPeserta: allDataPesertaReducer,
  // ============ Export Data =======
  allExportData: allExportDataReducer,
  detailExportData: detailExportDataReducer,
  updateExportData: updateExportDataReducer,
  deleteExportData: deleteExportDataReducer,
  allListPeserta: allListPesertaReducer,
  allDetailPeserta: allDetailPesertaReducer,

  // END SITE MANAGEMENT

  //PELATIHAN
  // ========== akademi ===========
  allAcademy: allAcademyReducer,
  newAcademy: newAcademyReducer,
  detailAcademy: detailAcademyReducer,
  updateAcademy: updateAcademyReducer,
  deleteAcademy: deleteAcademyReducer,
  // ========== tema ===========
  allTheme: allThemeReducer,
  newTheme: newThemeReducer,
  detailTheme: detailThemeReducer,
  updateTheme: updateThemeReducer,
  deleteTheme: deleteThemeReducer,
  // ========== pelatihan ===========
  allTraining: allTrainingReducer,
  cardTraining: cardTrainingReducer,
  newTraining: newTrainingReducer,
  deleteTraining: deleteTrainingReducer,
  getEditTraining: getEditTrainingReducer,
  getEditTraining2: getEditTraining2Reducer,
  getEditTraining3: getEditTrainingReducer,
  getFormLPJ: getFormLPJReducer,
  newLPJ: newLPJReducer,
  getFormEvidence: getFormEvidenceReducer,
  cloneTraining: cloneTrainingReducer,
  updateTraining: updateTrainingReducer,
  // ========== review pelatihan ========
  allListReview: allListReviewReducer,
  cardReview: cardReviewReducer,
  listRevisi: listRevisiReducer,
  getReviewStep1: getReviewStep1Reducer,
  getReviewStep2: getReviewStep2Reducer,
  getReviewStep3: getReviewStep3Reducer,
  getReviewStep4: getReviewStep4Reducer,
  revisiReview: revisiReviewReducer,
  tolakReview: tolakReviewReducer,

  // ========== rekap pelatihan ========
  allSummary: allSummaryReducer,
  updateStatusPeserta: updateStatusPesertaReducer,
  updateReminder: updateReminderReducer,
  getAkademiByPelatihan: getAkademiByPelatihanReducer,
  getPendaftaranPeserta: getPendaftaranPesertaReducer,
  getStatusPendaftar: getStatusPendaftarReducer,
  getReminderBerkas: getReminderBerkasReducer,
  getDataPribadiRow: getDataPribadiRowReducer,
  getRiwayatPelatihan: getRiwayatPelatihanReducer,
  getBerkasPendaftaran: getBerkasPendaftaranReducer,
  getFormKomitmen: getFormKomitmenReducer,
  getFormLpj: getFormLpjReducer,

  // =============== rpoert oelatihan ========
  getDataReportTraining: getDataReportTrainingReducer,
  detailReportTraining: detailReportTrainingReducer,

  // ========== pendaftaran pelatihan ========
  getFormBuilder: getFormBuilderReducer,
  getPelatihan: getPelatihanReducer,
  newPendaftaranPelatihan: newPendaftaranPelatihanReducer,
  formRegister: formRegisterReducer,

  getDataPribadi: getDataPribadiReducer,
  trainingStep1: trainingStep1Reducer,
  registrationStep2: registrationStep2Reducer,
  commitmentStep3: commitmentStep3Reducer,

  dashboardPeserta: dashboardPesertaReducer,

  // ======= dropdown ==========
  drowpdownAkademi: drowpdownAkademiReducers,
  drowpdownTema: drowpdownTemaReducers,
  drowpdownTemabyAkademi: drowpdownTemabyAkademiReducers,
  drowpdownPelatihan: drowpdownPelatihanReducers,
  drowpdownPelatihanbyTema: drowpdownPelatihanbyTemaReducers,
  drowpdownAgama: drowpdownAgamaReducers,
  drowpdownPendidikan: drowpdownPendidikanReducers,
  drowpdownStatusPekerjaan: drowpdownStatusPekerjaanReducers,
  drowpdownLevelPelatihan: drowpdownLevelPelatihanReducers,
  drowpdownMitra: drowpdownMitraReducers,
  drowpdownZonasi: drowpdownZonasiReducers,
  drowpdownProvinsi: drowpdownProvinsiReducers,
  drowpdownKabupaten: drowpdownKabupatenReducers,
  drowpdownTempatLahir: drowpdownTempatLahirReducers,
  drowpdownKabupatenDomisili: drowpdownKabupatenDomisiliReducers,
  drowpdownProvinsiToDesa: drowpdownProvinsiToDesaReducers,
  drowpdownKecamatanToDesa: drowpdownKecamatanToDesaReducers,
  drowpdownPenyelenggara: drowpdownPenyelenggaraReducers,
  drowpdownFormBuilder: drowpdownFormBuilderReducers,
  updateStatus: updateStatusReducer,
  drowpdownYear: drowpdownYearReducers,

  // ========== profile peserta ========
  dataAlamat: dataAlamatReducer,
  dataPendidikan: dataPendidikanReducer,
  dataKeterampilan: dataKeterampilanReducer,
  dataPekerjaan: dataPekerjaanReducer,
  updateDataPribadi: updateDataPribadiReducer,
  updateAlamat: updateAlamatReducer,
  updatePendidikan: updatePendidikanReducer,
  updateKeterampilan: updateKeterampilanReducer,
  updatePekerjaan: updatePekerjaanReducer,
  getAsalSekolah: getAsalSekolahReducer,
  //END PELATIHAN

  //BERANDA
  // ========== beranda ========
  addNotifTema: addNotifTemaReducer,
  allAkademi: allAkademiReducer,
  allPenyelenggaraPeserta: allPenyelenggaraPesertaReducer,
  allPenyelenggaraPage: allPenyelenggaraPageReducer,
  allKotaPeserta: allKotaPesertaReducer,
  temaByAkademi: temaByAkademiReducer,
  pelatihanByTema: pelatihanByTemaReducer,
  allPublikasiBeranda: allPublikasiBerandaReducer,
  berandaFooter: berandaFooterReducer,
  allTemaOriginal: allTemaOriginalReducer,
  berandaFooterPeserta: berandaFooterPesertaReducer,

  // ========== detail akademi ========
  detailAkademi: detailAkademiReducer,
  allPelatihan: allPelatihanReducer,

  // ========== detail pelatihan ========
  detailPelatihan: detailPelatihanReducer,
  checkRegisteredPelatihan: checkRegisteredPelatihanReducer,

  // ========== artikel ========
  allBerandaArtikel: allBerandaArtikelReducer,
  detailBerandaArtikel: detailBerandaArtikelReducer,
  kategoriBerandaArtikel: kategoriBerandaArtikelReducer,
  allTagBerandaArtikel: allTagBerandaArtikelReducer,

  // ========== galeri ========
  allBerandaGaleri: allBerandaGaleriReducer,
  detailBerandaGaleri: detailBerandaGaleriReducer,
  kategoriBerandaGaleri: kategoriBerandaGaleriReducer,
  allTagBerandaGaleri: allTagBerandaGaleriReducer,

  // ========== berita ========
  allBerandaBerita: allBerandaBeritaReducer,
  detailBerandaBerita: detailBerandaBeritaReducer,
  kategoriBerandaBerita: kategoriBerandaBeritaReducer,
  allTagBerandaBerita: allTagBerandaBeritaReducer,

  // ========== video ========
  allVideoContent: allVideoContentReducer,
  detailBerandaVideo: detailBerandaVideoReducer,
  kategoriVideoContent: kategoriVideoContentReducer,
  allTagVideoContent: allTagVideoContentReducer,
  playVideoContent: playVideoContentReducer,

  // ========== faq ========
  allFaqContent: allFaqContentReducer,
  kategoriBerandaFaq: kategoriBerandaFaqReducer,
  //END BERANDA

  // ========== Riwayat Pelatihan ========
  getAllRiwayatPelatihanPeserta: getAllRiwayatPelatihanPesertaReducer,
  getDetailRiwayatPelatihanPeserta: getDetailRiwayatPelatihanReducer,
  allBeasiswa: allBeasiswaReducer,
  allSimonas: allSimonasReducer,

  // ========== Master Pelatihan ========
  getAllMasterPelatihan: allMasterPelatihanListReducer,
  deleteMasterPelatihan: deleteMasterPelatihanReducer,
  getDetailMasterPelatihan: detailMasterPelatihanReducer,
  getDetailMasterCopyEditPelatihan: detailMasterCopyEditPelatihanReducer,
  newMasterPelatihan: newMasterTrainingReducer,
  updateMasterPelatihan: updateMasterPelatihanReducer,
  updateStatusMaster: updateStatusMasterReducer,

  allBookmark: getAllBookmarkPesertaReducer,

  adminPermission: adminPermissionReducer,
  allPencarian: allPencarianReducer,

  // TTE P12
  TTEP12Data: TTEP12DataReducer,
});

export default reducer;
