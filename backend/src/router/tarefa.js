import { Router } from "express";
import ControllerTarefa from "../controller/tarefa.js";

const router = Router();

router.get("/", (req, res) => ControllerTarefa.Listar(req, res));
router.get("/:id", (req, res) => ControllerTarefa.BuscarPorId(req, res));
router.post("/", (req, res) => ControllerTarefa.Criar(req, res));
router.patch("/:id", (req, res) => ControllerTarefa.Atualizar(req, res));
router.delete("/:id", (req, res) => ControllerTarefa.Deletar(req, res));

export default router;
