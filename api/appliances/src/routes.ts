import express, { Request, Response } from 'express'

import applianceDB, { addAppliance, getAppliance, deleteAppliance, updateAppliance } from './db'
import {isAppliance, isValidApplianceId} from './validations';

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.json(applianceDB)
});

router.post('/', (req: Request, res: Response) => {
  if (!isAppliance(req.body)) {
    res.status(400).send();
    return;
  }

  if (getAppliance(req.body.id)) {
    res.status(422).send();
    return;
  }

  res.status(201)
    .json(addAppliance(req.body));
});

router.put('/:id', (req: Request, res: Response) => {
  if (!isValidApplianceId || !isAppliance(req.body)) {
    res.status(400).send();
    return;
  }

  if (!getAppliance(req.params.id)) {
    res.status(404).send();
    return;
  }

  try {
    const result = updateAppliance(req.params.id, req.body);
    res.status(200)
      .json(result);
  } catch (error) {
    res.status(500).send();
  }

});

router.get('/:id', (req: Request, res: Response) => {
    if (isValidApplianceId(req.params.id)) {
      const appliance = getAppliance(req.params.id);

      appliance ? res.status(200).json(appliance) : res.status(404);
    }

    res.status(400).send();
});

router.delete('/:id', (req: Request, res: Response) => {
  if (!isValidApplianceId(req.params.id)) {
    res.status(400).send();

    return;
  }

  if(getAppliance(req.params.id)) {
    try {
      deleteAppliance(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send();
    }

    return;
  }

  res.status(404).send();
});

router.get('/:id/commands', (req: Request, res: Response) => {
  res.status(501).send();
});

router.post('/:id/commands', (req: Request, res: Response) => {
  res.status(501).send();
});

router.get('/:applianceId/commands/:commandId', (req: Request, res: Response) => {
  res.status(501).send()
});

export default router
