const express = require('express');
const router = express.Router();
const {
    createPatientRecord,
    getPatientRecord,
    getPatientRecordById,
    updatePatientRecord,
    deletePatient,
    signIn,
    signUp
  } = require("../controllers/doctor");
  const { authMiddleware, adminMiddleware } = require('../midddelware/auth');
router.route('/create-patient').post(authMiddleware,createPatientRecord)
router.route('/get-patient').get(getPatientRecord)
router.route('/get-patientById/:id').get(authMiddleware,getPatientRecordById)
router.route('/update-patient/:id').put(authMiddleware,updatePatientRecord)
router.route('/delete-patient/:id').delete(authMiddleware,adminMiddleware, deletePatient)

router.route('/sign-in').post(signIn)
// router.route('/sign-up').post(signUp)
module.exports = router;