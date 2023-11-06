const express = require("express")
const router = express.Router()
const paciente = require("../controller/paciente.controller")
const auth = require("../api/auth")
const schedule = require("../api/schedule")


router.route("/auth/register").post(auth.registerUser)
router.route("/auth/login").post(auth.loginUser)

router.route("/consulta").get(schedule.loadSchedule)
    .post(schedule.saveSchedule)
router.route("/auth/consulta/:page").get(schedule.loadSchedule)
router.route("/consulta/:id").put(schedule.makeSchedule)
    .get(schedule.loadUserSchedule)
//     .delete(consulta.delete)

// router.route("/endereco").get(endereco.all)
//     .post(endereco.create)
// router.route("/endereco/:id").put(endereco.update)
//     .get(endereco.one)
//     .delete(endereco.delete)

// router.route("/medico").get(medico.all)
//     .post(medico.create)
// router.route("/medico/:id").put(medico.update)
//     .get(medico.one)
//     .delete(medico.delete)

router.route("/paciente").get(paciente.all)
    .post(paciente.create)
router.route("/paciente/:id").put(paciente.update)
    .get(paciente.one)
    .delete(paciente.delete)

// router.route("/ubs").get(ubs.all)
//     .post(ubs.create)
// router.route("/ubs/:id").put(ubs.update)
//     .get(ubs.one)
//     .delete(ubs.delete)

module.exports = router