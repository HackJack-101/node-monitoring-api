import { Router } from 'express';
import si from 'systeminformation';

const router = Router();

router.get('/health', (req, res) =>
    res.status(200).json({
        version: process.env.npm_package_version,
        status: 'OK',
    }),
);

router.get('/cpu', async (req, res) => {
    const data = await si.cpuCurrentSpeed();
    return res.json(data);
});

router.get('/mem', async (req, res) => {
    const data = await si.mem();
    return res.json(data);
});

router.get('/load/current', async (req, res) => {
    const data = await si.currentLoad();
    return res.json(data);
});

router.get('/load/full', async (req, res) => {
    const data = await si.fullLoad();
    return res.json(data);
});

router.get('/load/processes', async (req, res) => {
    const data = await si.processes();
    return res.json(data);
});

router.get('/services/:service', async (req, res) => {
    const { service } = req.params;
    const data = await si.services(service);
    return res.json(data);
});

router.get('/disk', async (req, res) => {
    const data = await si.fsSize();
    return res.json(data);
});

router.get('/docker/info', async (req, res) => {
    const data = await si.dockerInfo();
    return res.json(data);
});

router.get('/docker/containers', async (req, res) => {
    const data = await si.dockerContainers(true);
    return res.json(data);
});

router.get('/docker/containers/:id', async (req, res) => {
    const { id } = req.params;
    const data = await si.dockerContainerStats(id);
    return res.json(data);
});

export default router;
