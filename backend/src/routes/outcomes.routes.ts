import { Router, Request, Response } from "express";

const router = Router();

// Outcome model (temporary in-memory)
interface Outcome {
  id: number;
  experimentId: number;
  result: string;
  notes: string;
  createdAt: Date;
}

// Temporary storage
let outcomes: Outcome[] = [];
let nextId = 1;


/**
 * POST /outcomes
 * Create a new outcome
 */
router.post("/", (req: Request, res: Response) => {
  try {
    const { experimentId, result, notes } = req.body;

    if (!experimentId || !result) {
      return res.status(400).json({
        success: false,
        message: "experimentId and result are required",
      });
    }

    const newOutcome: Outcome = {
      id: nextId++,
      experimentId,
      result,
      notes: notes || "",
      createdAt: new Date(),
    };

    outcomes.push(newOutcome);

    res.status(201).json({
      success: true,
      data: newOutcome,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create outcome",
    });
  }
});


/**
 * GET /outcomes
 * Get all outcomes
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: outcomes,
  });
});


/**
 * GET /outcomes/:experimentId
 * Get outcomes for a specific experiment
 */
router.get("/:experimentId", (req: Request, res: Response) => {

  const experimentId = Number(req.params.experimentId);

  const filtered = outcomes.filter(
    outcome => outcome.experimentId === experimentId
  );

  res.json({
    success: true,
    data: filtered,
  });

});


export default router;
