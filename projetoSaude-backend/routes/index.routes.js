const express = require("express")
const router = express.Router()
const paciente = require("../controller/paciente.controller")
const auth = require("../api/auth")
const schedule = require("../api/schedule")
const options = require("../api/options")
const doctor = require("../api/doctor")
const ubs = require("../api/ubs")
const queries = require("../api/queries")



router.route('/consultas/:page').get(schedule.loadAllSchedules)

router.route("/auth/register").post(auth.registerUser)
router.route("/auth/login").post(auth.loginUser)

router.route("/auth/consulta/:page/:ubs/:tipo").get(schedule.loadSchedule)
router.route("/consulta/:id").put(schedule.makeSchedule)

router.route("/auth/validateToken").post(auth.validateToken)

router.route("/options").get(options.loadOptions)

router.route("/doctor").post(doctor.createDoctor)

router.route("/ubs").post(ubs.createUbs)

router.route("/query").post(queries.createQuery)

router.route("/consulta/:id/:page").get(schedule.loadUserSchedule)

router.route("/cancel/:id").put(schedule.cancelSchedule)

router.route("/delete/:id").delete(schedule.deleteSchedule)


module.exports = router