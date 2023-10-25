import asyncHandler  from 'express-async-handler';
import { Router } from "express";

const router = Router();

router.get('/abc', asyncHandler(
  async (req, res) => {
    res.send('---- ABC ----');
  }
));

export default router;